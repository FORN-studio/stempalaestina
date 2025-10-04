import type { Actions } from '@sveltejs/kit';
import {
	GATEWAY_API_TOKEN,
	SERVER_SECRET,
	SUPABASE_SERVICE_SECRET,
	SUPABASE_URL
} from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as jose from 'jose';
import { hmac } from '@oslojs/crypto/hmac';
import { SHA512 } from '@oslojs/crypto/sha2';
import { encodeBase64url } from '@oslojs/encoding';
import { createClient } from '@supabase/supabase-js';

const secret = new TextEncoder().encode(SERVER_SECRET);
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_SECRET);

const createToken = async (payload: jose.JWTPayload) =>
	await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('5m')
		.sign(secret);

const verifyToken = async (token: string) => await jose.jwtVerify(token, secret);

const createOTP = () => {
	const arr = new Uint32Array(1);
	crypto.getRandomValues(arr);
	const mod = 10 ** 6; // gets us a 6 digit otp
	return String(arr[0] % mod).padStart(6, '0');
};

const hashPhone = (phone: string) => {
	const key = new TextEncoder().encode(SERVER_SECRET);
	const msg = new TextEncoder().encode(phone);
	const mac = hmac(SHA512, key, msg);
	return encodeBase64url(mac);
};

export const load = async ({ setHeaders }) => {

	// prevent caching to avoid token chaos
	setHeaders({ 'cache-control': 'no-store' })

	// create a short-lived token
	const timingToken = await new jose.SignJWT({})
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setIssuedAt()
		.setExpirationTime('30m')
		.sign(secret)

	return { timingToken }
}

export const actions: Actions = {
	attempt: async ({ request, cookies }) => {
		// grab data and validate
		const data = await request.formData();
		const accepted = data.get('accept') as string;
		const phone = data.get('phone') as string;
		const timingToken = data.get('timing-token') as string

		if (!accepted) return fail(400, { error: 'Du kan ikke underskrive uden at godkende løftet og acceptere privatlivspolitikken.' })
		if (!phone) return fail(400, { error: 'Indtast dit telefon-nummer for at fortsætte' });
		const normedPhone = parsePhoneNumberFromString(phone, 'DK');
		if (!normedPhone || !normedPhone.isValid())
			return fail(400, { error: 'Det indtastede telefon-nummer er ikke et gyldigt dansk nummer' });
		if (!timingToken) return fail(402, { error: 'Noget ser ikke helt rigtigt ud. Prøv igen om et øjeblik.' })
		
		// ensure the timing token was issued no less than 3 seconds ago
		// this protects against automated, fast-acting bots
		const vt = await jose.jwtVerify(timingToken, secret)
		const issuedAt = vt.payload.iat
		const currentTime = Math.floor(Date.now() / 1000)
		const tokenAge = currentTime - (issuedAt || 0)
		console.log(tokenAge)
		if (tokenAge < 5) return fail(402, { error: 'Der skete en fejl. Prøv igen om et øjeblik.' })

		// generate otp
		const otp = createOTP();

		// generate signed token
		const token = await createToken({ phone: normedPhone.number, otp });

		// deliver pin via sms
		const target = `https://gatewayapi.eu/rest/mtsms?token=${GATEWAY_API_TOKEN}&message=${encodeURI(`Din engangskode til underskrivning er: ${otp}. Den er gyldig i fem minutter.`)}&recipients.0.msisdn=${normedPhone.number.replace('+', '')}&sender=Stem P.`;
		const res = await fetch(target);
		if (res.status !== 200)
			return fail(500, {
				error: 'Der skete en ukendt fejl. Kontakt os gerne hvis fejlen fortsætter.'
			});

		cookies.set('token', token, { path: '/', maxAge: 60 * 5 });

		return { success: true, nextStep: 2 };
	},
	validate: async ({ request, cookies }) => {
		// grab data and validate
		const data = await request.formData();
		const subOTP = Object.values(Object.fromEntries(data)).join('');
		console.log(subOTP || data.get('pin-0') || 'missing');
		const subToken = cookies.get('token');

		if (!subOTP) return fail(400, { error: 'Dobbelt-tjek din indtastning, og prøv igen.' });
		if (!subToken) return fail(400, { error: 'Din kode er udløbet. Prøv igen.', nextStep: 1 });

		// clear cookie
		cookies.delete('token', { path: '/' });

		// verify
		const verified = await verifyToken(subToken);
		if (!verified.payload)
			return fail(400, { error: 'Vi kunne ikke godkende din session. Prøv igen.' });
		const phone = verified.payload.phone as string | undefined;
		const otp = verified.payload.otp as string | undefined;
		if (!phone || !otp)
			return fail(400, { error: 'Vi kunne ikke godkende din session. Prøv igen.' });
		if (otp !== subOTP) return fail(400, { error: 'Den indtastede engangskode er ikke gyldig.' });

		// save
		const { error: err } = await sb.from('signatures').insert({ phone_hash: hashPhone(phone) });
		if (err?.code === '23505')
			return fail(409, { error: 'Du har allerede afgivet din underskrift.' }); // hash is deterministic, this is safe enough
		if (err) return fail(500, { error: 'Der skete en ukendt fejl. Prøv igen senere.' });

		return { success: true, nextStep: 3 };
	},
	subscribe: async ({ request }) => {
		// grab data
		const data = await request.formData();
		const email = data.get('email');

		// validate
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string))
			return fail(400, 'Den indtastede email er ikke gyldig.');

		// save
		const { error: err } = await sb.from('subscriptions').insert({ email });

		if (err?.code === '23505')
			return fail(409, { error: 'Du er allerede meldt til mailinglisten.' });
		if (err) return fail(500, { error: 'Der skete en ukendt fejl. Prøv igen senere.' });

		return { success: true, nextStep: 4 };
	}
};

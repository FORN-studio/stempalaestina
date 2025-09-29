# Stem Palaestina

StemPalaestina is a subsite for stempalaestina.dk, used to host a petition and collect signatures.

## The broad strokes

This is a pretty minimal project built around Sveltekit, TypeScript and Supabase. The code should be self-explanatory - have a look around. The only complexity arises around encryption of phone numbers.

## Security and identity

Phone numbers are hashed (SHA-256) with a [pepper](<https://en.wikipedia.org/wiki/Pepper_(cryptography)>) available server-side. Given the major constraint that we have to ensure uniqueness, this is our best option.

Phone numbers cannot be enumerated via API or the web interface, as uniqueness checks are carried out after phone number ownership validation via OTP. However, given the small amount of potential combinations supplied by phone numbers, it is theoretically possible to brute-force the stored phone numbers, given that the attacker holds the pepper and has complete database access.

## Third parties

TOTP's are delivered via a European service, [GatewayAPI](gatewayapi.eu). Cloud database delivered by Supabase, and hosted via Vercel.

## Contributing

Feel free to open an issue, PR or chime in in any other way.

# Stem Palaestina

StemPalaestina is a subsite for stempalaestina.dk, used to host a petition and collect signatures.

## The broad strokes

This is a pretty minimal project built around Sveltekit, TypeScript and Supabase. The code should be self-explanatory - have a look around. The only complexity arises around hashing of phone numbers.

## Security and identity

Phone numbers are hashed (SHA-256) with a [pepper](<https://en.wikipedia.org/wiki/Pepper_(cryptography)>) available server-side. Given the major constraint that we have to ensure uniqueness, this is our best option.

Phone numbers cannot be enumerated via API or the web interface, as uniqueness checks are carried out after phone number ownership validation via a TOTP by SMS. The obvious weakness here, given the small amount of potential combinations supplied by phone numbers, it is theoretically possible to brute-force the stored phone numbers - although this would require that the attacker holds not only the complete database, but also the secret. 

Lastly, everything works without JavaScript, to further protect the users identity.

## Bot protection

To protect against fast acting bots consuming the messaging budget, a short-lived signed token is minted on page load. When the form is initially submitted (the step triggering TOTP being sent via SMS), we verify that the token is both valid and at least a few seconds old. The obvious side effect of this is that a few users able to submit the form in less than 3 seconds may be blocked, as their token would not have had time to warm, and very slow users submitting the form more than 30 minutes after the initial page load will have stale tokens and thus catch strays too. Presumably, very few users will fall into either of these situations.

This approach has been chosen due to privacy concerns. The classic approaches (IP limiting, proof-of-work, captchas) are either invasive or require storing user information. This approach works without JavaScript (by using server-side rendering), doesn't store user information, and doesn't even use cookies.

## Third parties

TOTP's are delivered via a European service, [GatewayAPI](gatewayapi.eu). Cloud database delivered by Supabase, and hosted via Vercel.

## Contributing

Feel free to open an issue, PR or chime in in any other way.

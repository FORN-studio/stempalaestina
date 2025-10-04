<script lang="ts">

    import Vandmelon from '$lib/assets/vandmelon.svg';

</script>

<div id="privacy">
    <div class="contents">
        <h1>Privatlivspolitik</h1>
        <span class="subtitle">Sidst opdateret d. 4/10 '25</span>

        <div class="body">
            <p>
                Når du underskriver på stempalaestina.dk, behandler vi kun de oplysninger, der er nødvendige for at validere din underskrift, og sørge for, at man ikke kan stemme mere end en enkelt gang, med det samme telefonnummer.<br /><br />

                Sådan fungerer det:<br />
            </p>
            <ol>
                <li>Du indtaster dit telefonnummer.</li>
                <li>Vi sender en engangskode (TOTP) via vores SMS-leverandør GatewayAPI (baseret i EU og underlagt GDPR).</li>
                <li>Når du har bekræftet koden, gemmer vi ikke dit telefonnummer som det er. I stedet gemmer vi en "pseudonymiseret" version: en salted hash. På den måde kan vi sikre, at samme nummer ikke underskriver flere gange, men beskytter samtidigt dine oplysninger.</li>
            </ol>
            <br />
            <p>

                Vi tracker ikke brugere og anvender ingen cookies til analyse eller profilering. Vi har desuden bygget hele systemet sådan, at det også fungerer uden JavaScript, for at sikre dit privatliv.<br /><br />

                <b>Nyhedsbrev (frivilligt):</b>
                Efter du har underskrevet, kan du vælge at tilmelde dig vores nyhedsbrev. Hvis du gør det, gemmer vi din e-mailadresse og bruger den kun til at sende dig nyheder. Du kan til enhver tid afmelde dig ved at kontakte os. 

                <b>Open source:</b>
                Projektet bag Stem Palæstina er fri og open source software, udgivet under Mozilla Public License. Kildekoden er frit tilgængelig.

                <b>Dine rettigheder:</b>
                Du har ret til indsigt, rettelse og sletning af de personoplysninger, vi opbevarer.

                <b>Kontakt:</b>
                Hvis du har spørgsmål om vores behandling af data, kan du skrive til stempalaestina@stempalaestina.dk.
            </p>
        </div>
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    #privacy {
        background: $blue;
        min-height: 100vh;
        
        .contents {
            max-width: $colsize;
            margin: 0 auto;
            padding: 7rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .body p {
                display: flex;
                flex-direction: column;
                gap: .5rem;
            }

            .body ol {
                margin: .5rem 0;
            }
        }
    }

</style>

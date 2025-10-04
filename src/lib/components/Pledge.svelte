<script lang="ts">

    import { getIcon } from "$lib/icons";

    const wants: { title: string, description: string, icon: Parameters<typeof getIcon>[0] }[] = [
        {
            title: 'Afinvestering',
            description: 'Tag ansvar og prioriter menneskerettigheder ved at afinvestere 1,2 milliarder i virksomheder, der er medskyldige i folkedrab og besættelse.',
            icon: 'activist'
        },
        {
            title: 'Bekæmp racisme',
            description: 'Bekæmp den stigende antimuslimske racisme og diskrimination af medborgere, som har rødder i det Globale Syd.',
            icon: 'fist'
        },
        {
            title: 'Ytringsfrihed',
            description: 'Beskyt pro-palæstinensisk ytringsfrihed i Københavns Kommune - på gader, kulturelle institutioner, arbejdspladser og skoler.',
            icon: 'union'
        }
    ]

</script>

<div class="pledge">

    <p class="intro">
        I årevis har københavnere udvist en stærk, mangfoldig og stadig voksende solidaritet med Palæstina. 
        Alligevel har Københavns Kommune investeringer for 1,2 milliarder kr. i selskaber, der er medskyldige 
        i folkemord, besættelse og brud på menneskerettigheder i Palæstina. Samtidig ser vi en stigende og 
        systematisk antimuslimsk racisme i vores gader, og at retten til pro-palæstinensiske ytringsfrihed 
        og solidaritet er blevet gjort kontroversiel. Derfor har Stem Palæstina sendt 
        følgende krav til alle kandidater.
    </p>

    <div class="wants">
        {#each wants as want}
            <div class="want">
                <span class="icon">{@html getIcon(want.icon)}</span>
                <div class="contents">
                    <h3>{want.title}</h3>
                    <p>{want.description}</p>
                </div>
            </div>
        {/each}
    </div>
    
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    :global(.pledge .icon svg) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    div.pledge {
        max-width: $colsize;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;

        p.intro {
            text-align: justify;
        }

        .wants {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 2rem;

            @media (max-width: 968px) {
                flex-direction: column;
                max-width: 500px;
                margin: 0 auto;
            }

            .want {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                gap: 1rem;

                .icon {
                    width: 70px;
                    height: 70px;
                    flex-shrink: 0;
                    border: solid 2px $red;
                    border-radius: 50%;
                    padding: 10px;
                }
            }
        }
    }

</style>
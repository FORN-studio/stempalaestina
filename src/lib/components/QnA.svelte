<script lang="ts">
	import Vandmelon from '$lib/assets/vandmelon_full.svg';
	import { slide } from 'svelte/transition';
	import { getIcon } from '$lib/icons';

	const items: { question: string; answer: string }[] = [
		{
			question: 'Bliver mit telefon-nummer gemt når jeg skriver under?',
			answer: `
                For at sikre os, at den samme person ikke kan stemme to gange, bliver en "hashet" version af dit 
                telefon-nummer gemt. Dit telefon-nummer bliver altså ikke gemt som det er - i stedet bruger vi en 
                kryptografisk teknik, <a href="https://en.wikipedia.org/wiki/HMAC" target="_blank">HMAC-SHA512</a>, til at gemme
                en beskyttet version af dit telefon-nummer. Det betyder, at selv hvis databasen skulle lække,
                fx. som følge af et cyberangreb, kan dit telefon-nummer ikke fremfindes uden den hemmelige nøgle,
                som naturligvis er sikkert opbevaret.
            `
		},
		{
			question: 'Bliver mit telefon-nummer videregivet til tredjeparter?',
			answer: `
                Ja - men vi har gjort vores bedste for at vælge en tredjepart der er til at stole på. For at sende
                en SMS til dit telefon-nummer, så vi kan være sikre på at det faktisk er dig der ejer det,
                bruger vi den europæiske tjeneste <a href="https://gatewayapi.com/" target="_blank">GatewayAPI</a>.
            `
		},
		{
			question: 'Kan jeg fortryde min underskrift?',
			answer: `
                Fordi vi kun gemmer en hashed version af dit telefon-nummer, kan din underskrift ikke trækkes tilbage,
                når du først har underskrevet.
            `
		},
		{
			question: 'Gemmer I andre oplysninger om mig?',
			answer: `
                Nej. Vi tracker dig ikke, og gemmer heller ingen personlige oplysninger på anden vis. Hvis du melder dig til
                vores nyhedsbrev, bliver din email gemt, men det er selvfølgelig noget du selv bestemmer. 
            `
		},
		{
			question: 'Hvor kan jeg læse mere om projektet?',
			answer: `
                Det kan du på hovedsiden, <a href="https://www.stempalaestina.dk/">stempalaestina.dk</a>. Hvis du er interesseret
                i kildekoden, kan du finde den på <a href="https://github.com/FORN-studio/stempalaestina" target="_blank">Github</a>.
            `
		}
	];

	let expandedItemIdx: number | null = $state(null);
	let expandedItem: (typeof items)[number] | null = $derived(expandedItemIdx);
	const toggleItem = (i: number) => (expandedItemIdx = expandedItemIdx === i ? null : i);
</script>

<div class="qna">
	<div class="header">
		<h2>Har du spørgsmål?</h2>
		<p>
			Vi har samlet de mest almindelige spørgsmål herunder. Hvis du ikke kan finde et svar her, kan
			du altid <a href="https://www.stempalaestina.dk/kontakt-os/" target="_blank">kontakte os</a>.
		</p>
		<img src={Vandmelon} alt="Stem Palæstina" />
	</div>

	<div class="items">
		{#each items as item, i}
			<button class="item unstyled" onclick={() => toggleItem(i)}>
				<div class="question" class:active={expandedItemIdx === i}>
					<span class="text">{item.question}</span>
					<span class="icon">{@html getIcon('navArrowDown')}</span>
				</div>

				{#if expandedItemIdx === i}
					<div class="answer" transition:slide={{ duration: 300, axis: 'y' }}>
						<p>{@html item.answer}</p>
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.qna {
		padding: 1rem;
		max-width: $colsize;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.items {
			display: flex;
			flex-direction: column;

			.item {
				background-color: transparent;
				border: none;
				cursor: pointer;

				&:last-child .question {
					border-bottom: solid 1px rgba($black, 0.1);
				}

				.question {
					display: flex;
					flex-direction: row;
					gap: 1rem;
					justify-content: space-between;
					align-items: center;
					padding: 1rem;
					border-top: solid 1px rgba($black, 0.1);
					text-align: left;
					font-weight: 500;
				}

				.answer {
					text-align: left;
					padding: 1rem;
					padding-bottom: 2rem;
					border-top: solid 1px rgba($black, 0.1);
					color: rgba($black, 0.8);
				}
			}
		}

		.header {
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;

            p { max-width: 550px; }

			img {
				width: 200px;
				margin: 2rem 0;
			}
		}
	}
</style>

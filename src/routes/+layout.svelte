<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';
	import Vandmelon from '$lib/assets/vandmelon.svg';
	import { getIcon } from '$lib/icons';
	import { page } from '$app/state';
	import '$lib/scss/reset.scss';

	let { children } = $props();

	console.log(page)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Stem Palæstina | Skriv Under</title>
	<meta
		name="description"
		content="Stem Palæstina er en kampagne startet af en bred vifte af Palæstina solidaritetsbevægelsen i København. Vi er partipolitisk uafhængige og vores formål er at presse kandidaterne til at tage reel handling. Vi kæmper for retfærdighed og menneskerettigheder for Palæstinas befolkning, pro-palæstinensisk ytringsfrihed og en tryg by for alle københavnere."
	/>
</svelte:head>

{#snippet backnav(href: string, text: string)}
	<a {href} class="back">
		<span class="icon">{@html getIcon('arrowLeft')}</span>
		<span class="text">{text}</span>
	</a>
{/snippet}

<div class="nav">
	{#if page.route.id === '/'}
		{@render backnav('https://stempalaestina.dk', 'Tilbage til forsiden')}
	{:else}
		{@render backnav('/', 'Tilbage til underskrivning')}
	{/if}

	<div class="logo">
		<img src={Vandmelon} alt="Stem Palaestina" />
	</div>
</div>

<Toaster richColors duration={10000} closeButton closeButtonAriaLabel="Luk" position="top-center" />

{@render children?.()}

<style lang="scss" global>
	@use 'src/lib/scss/variables' as *;

	*,
	*::after,
	*::before {
		font-family: 'Alan Sans', sans-serif;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: $blue;
		z-index: 999;

		a {
			display: flex;
			align-items: center;
			gap: 1rem;
			color: $black;
			text-decoration: none;
		}

		.logo {
			height: 40px;

			@media (max-width: 768px) {
				height: 30px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
	}
</style>

<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';
	import '$lib/scss/reset.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Stem Palæstina | Skriv Under</title>
	<meta
		name="description"
		content="Stem Palæstina er en kampagne startet af en bred vifte af Palæstina solidaritetsbevægelsen i København. Vi er partipolitisk uafhængige og vores formål er at presse kandidaterne til at tage reel handling. Vi kæmper for retfærdighed og menneskerettigheder for Palæstinas befolkning, pro-palæstinensisk ytringsfrihed og en tryg by for alle københavnere."
	/>
</svelte:head>

<Toaster duration={10000} closeButton closeButtonAriaLabel="Luk" position="bottom-center" />

{@render children?.()}

<style lang="scss" global>
	@use 'src/lib/scss/variables' as *;

	*,
	*::after,
	*::before {
		font-family: 'Alan Sans', sans-serif;
	}
</style>

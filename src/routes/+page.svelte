<script lang="ts">
	import { getIcon } from '$lib/icons';
	import Vandmelon from '$lib/assets/vandmelon.svg';
	import StepPhone from '$lib/components/StepPhone.svelte';
	import StepOTP from '$lib/components/StepOTP.svelte';
	import StepSubscribe from '$lib/components/StepSubscribe.svelte';
	import StepThanks from '$lib/components/StepThanks.svelte';
	import QnA from '$lib/components/QnA.svelte';
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';
	import type { PageProps } from './$types';
	import { toast } from 'svelte-sonner';

	let { form }: PageProps = $props();

	const steps: { title: string; Component: Component }[] = [
		{
			title: 'Skriv under',
			Component: StepPhone
		},
		{
			title: 'Godkend',
			Component: StepOTP
		},
		{
			title: 'Tak :)',
			Component: StepSubscribe
		},
		{
			title: 'Afslutningsvis',
			Component: StepThanks
		}
	];

	let currentStep: 1 | 2 | 3 = $derived((form?.nextStep as any) || 1);
	let ActiveStepComponent = $derived(steps[currentStep - 1].Component);

	$effect(() => {
		if (form?.error) toast.error(form.error);
	});
</script>

{#snippet stepper(num: number, title: string)}
	<div class="stepper" class:active={currentStep === num}>
		<span class="num">{num}</span>
		<span class="title">{title}</span>
	</div>
{/snippet}

<div id="main">
	<div class="nav">
		<a href="https://stempalaestina.dk" class="back">
			<span class="icon">{@html getIcon('arrowLeft')}</span>
			<span class="text">Tilbage til forsiden</span>
		</a>

		<div class="logo">
			<img src={Vandmelon} alt="Stem Palaestina" />
		</div>
	</div>

	<div class="header">
		<h1>Underskriv vaelgerloefte</h1>
		<p>
			Skriv under på vores vælgerløfte og vis kandidaterne, at du vil stemme Palæstina til kommunalvalg d. 18. november 2025
		</p>

		<!-- <button>
            Skriv under
        </button> -->
	</div>

	<div class="sign">
		<div class="steppers">
			{#each steps.slice(0, 3) as step, i}
				{@render stepper(i + 1, step.title)}
			{/each}
		</div>

		<div class="step">
			<ActiveStepComponent />
		</div>
	</div>

	<QnA />

	<a
		href="https://github.com/FORN-studio/stempalaestina"
		target="_blank"
		rel="noopener noreferrer"
		class="source"
	>
		<span class="text">Se på Github</span>
		<span class="icon">{@html getIcon('github')}</span>
	</a>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	:global(button:not(.unstyled)) {
		background-color: $red;
		color: $white;
		padding: 0.5rem 2rem;
		border-radius: 5px;
		border: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	#main {
		min-height: 100vh;
		background: $blue;
		padding-bottom: 4rem;

		a.source {
			color: $black;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: .5rem;
			text-decoration: none;
			border: solid 1px rgba($black, 0.2);
			width: 200px;
			margin: 6rem auto;
			border-radius: 999px;
			padding: .5rem;
		}

		.sign {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			margin: 4rem auto;
			background-color: $white;
			padding: 2rem;
			max-width: calc(100% - 2rem);
			border-radius: .5rem;

			@media (max-width: 968px) {
				max-width: calc(100% - 1rem);
				padding: 2rem 1rem;
			}

			> * {
				max-width: $colsize;
				margin: 0 auto;
			}

			.steppers {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				gap: 1rem;
				margin-bottom: 1rem;

				.stepper {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;
					width: 100px;

					&:not(:last-child) {
						.num::after {
							content: '';
							width: 84px;
							height: 1px;
							background: $red;
							position: absolute;
							top: 17px;
							left: 100%;
						}
					}

					&:not(.active) {
						.num {
							background-color: transparent;
							color: $black;
						}
					}

					.num {
						background-color: $red;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 34px;
						height: 34px;
						border-radius: 50%;
						color: $white;
						transition: ease all 500ms;
						border: solid 1px $red;
						font-weight: 600;
						position: relative;
					}

					.title {
						text-transform: uppercase;
						font-weight: 500;
						font-size: 0.85rem;
					}
				}
			}
		}

		.header {
			max-width: $colsize;
			margin: 0 auto;
			text-align: center;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 1rem;
			padding-top: 70px;

			h1 {
				font-size: 3rem;

				@media (max-width: 768px) {
					font-size: 2rem;
				}
			}

			p {
				color: rgba($black, 0.8);
			}
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
	}
</style>

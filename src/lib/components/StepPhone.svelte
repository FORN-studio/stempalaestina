<script lang="ts">
	import { getIcon } from '$lib/icons';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let props = $props()

	let accepted = $state(false);

	onMount(() => document.querySelector('.accept.no-js')?.classList.remove('no-js'))
</script>

<form class="step phone" method="POST" action="?/attempt" use:enhance>
	<input type="hidden" name="timing-token" value={props.timingToken}>

	<p class="description">
		Når du har indtastet dit telefon-nummer, modtager du en kode via SMS, som du kan bruge til at
		godkende din underskrift.
	</p>

	<div class="pledge">
		<p>
			Jeg, som vælger i Københavns kommune, bekræfter at jeg til Kommunalvalget 2025 kun vil stemme på kandidater, der har underskrevet og forpligtet sig til Stem Palæstinas krav, og accepterer <a href="/privacy">privatlivspolitikken</a>.
		</p>

		<div class="accept no-js">
			<div class="input-wrapper">
				<label for="accept">Ja</label>
				<input bind:checked={accepted} type="checkbox" name="accept" id="accept">
			</div>

			<label class="toggle" for="accept">
				<span class="option" class:active={!accepted}>Nej</span>
				<div class="switch"><div class="handle" class:on={accepted}></div></div>
				<span class="option" class:active={accepted}>Ja</span>
			</label>
		</div>
	</div>

	<div class="input">
		<span class="country"> +45 </span>

		<input type="tel" name="phone" placeholder="Telefon-nummer" />
	</div>

	<button type="submit">
		<span class="text">Fortsæt</span>
		<span class="icon">{@html getIcon('arrowRight')}</span>
	</button>
</form>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.step {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		max-width: 500px;
		gap: 2rem;

		.description {
			color: rgba($black, 0.8);
		}

		.pledge {
			padding-bottom: 1rem;
			border: solid 1px rgba($black, 0.1);
			padding: 1rem;
			border-radius: .5rem;

			.accept {
				.input-wrapper {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: .5rem;
					font-weight: 500;
					margin-top: 1rem;
				}

				&:not(.no-js) {
					.input-wrapper { display: none; }
					.toggle { display: flex; }
				}
			}

			.toggle {
				flex-direction: row;
				justify-content: center;
				align-items: center;
				text-transform: uppercase;
				gap: 1rem;
				margin-top: 1rem;
				display: none; // overwritten when no-js class is removed

				.option {
					transition: ease all 300ms;
					font-weight: 500;
					font-size: .9rem;

					&:not(.active) { opacity: .5; }
					&.active { color: $red; }
				}

				.switch {
					display: block;
					border: solid 1px rgba($black, 0.2);
					height: 24px;
					width: 50px;
					border-radius: 9999px;
					display: flex;
					align-items: center;
					position: relative;
					padding: 2px;
					cursor: pointer;

					.handle {
						height: 20px;
						width: 20px;
						display: block;
						background-color: $red;
						border-radius: 50%;
						position: absolute;
						transition: ease all 300ms;
						left: 2px;

						&.on {
							left: calc(100% - 22px);
						}
					}
				}
			}
		}

		.input {
			position: relative;
			display: flex;

			input {
				padding: 0.5rem;
				border: solid 1px rgba($black, 0.2);
				border-left: none;
				border-radius: 0 5px 5px 0;
			}

			.country {
				border: solid 1px rgba($black, 0.2);
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.5rem;
				border-radius: 5px 0 0 5px;
			}
		}
	}
</style>

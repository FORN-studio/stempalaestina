<script lang="ts">
	import { getIcon } from '$lib/icons';
	import { enhance } from '$app/forms';
</script>

<form class="step phone" method="POST" action="?/attempt" use:enhance>
	<p class="description">
		Når du har indtastet dit telefon-nummer, modtager du en kode via SMS, som du kan bruge til at
		godkende din underskrift.
	</p>

	<p class="pledge">
		Jeg, som vælger i Københavns kommune, bekræfter ved at fortsætte, at jeg til Kommunalvalget 2025 kun vil stemme på kandidater, der har underskrevet og forpligtet sig til Stem Palæstinas krav.
	</p>

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

<script lang="ts">
	import { getIcon } from '$lib/icons';
	import { enhance } from '$app/forms';
</script>

<form class="step phone" method="POST" action="?/subscribe" use:enhance>
	<p class="description">
		Tak for din underskrift. Vi sender regelmæssigt opdateringer ud via email, når der sker nyt i
		sagen. Hvis du har lyst til at følge med i udviklingen, kan du skrive dig op nedenfor.
	</p>

	<div class="input">
		<span class="mail-icon">
			{@html getIcon('mail')}
		</span>

		<input type="email" name="email" placeholder="Email-adresse" />
	</div>

	<button type="submit">
		<span class="text">Tilmeld</span>
		<span class="icon">{@html getIcon('check')}</span>
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

		.input {
			position: relative;
			display: flex;

			input {
				padding: 0.5rem;
				border: solid 1px rgba($black, 0.2);
				border-left: none;
				border-radius: 0 5px 5px 0;
			}

			.mail-icon {
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

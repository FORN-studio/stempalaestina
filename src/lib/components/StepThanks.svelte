<script lang="ts">
	import { getIcon } from '$lib/icons';
</script>

<div class="step phone">
	<p class="description">Vi holder dig opdateret. Tusind tak for din hjælp.</p>
</div>

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
		padding-bottom: 2rem;

		.description {
			color: rgba($black, 0.8);
		}
	}
</style>

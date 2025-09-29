<script lang="ts">
	import { getIcon } from '$lib/icons';

	let values: (string | null)[] = $state(Array.from({ length: 6 }, (_, i) => null));
	let submitBtn: HTMLElement | undefined = $state();

	const focusNext = () => {
		const current = document.activeElement as HTMLInputElement | undefined;
		if (!current) return;

		const next = current.nextSibling as HTMLElement | undefined;
		if (next?.focus) next.focus();
	};

	const focusPrev = () => {
		const current = document.activeElement as HTMLInputElement | undefined;
		if (!current) return;

		const prev = current.previousSibling as HTMLElement | undefined;
		if (prev?.focus) prev.focus();
	};

	const handleInput = (e: Event) => {
		const current = document.activeElement as HTMLInputElement | undefined;
		if (!current) return;

		if (current.value) {
			focusNext();
		}

		if (values.every((d) => d && Number.isInteger(parseInt(d)))) {
			submitBtn?.click();
		}
	};

	const handleKeyDown = (e: KeyboardEvent, i: number) => {
		const current = e.target as HTMLInputElement;
		if (!current) return;

		if (e.key === 'Backspace' && !current.value) {
			e.preventDefault();
			focusPrev();
		} else if (current.value) {
			current.value = '';
			values[i] = null;
		}
	};

	const handlePaste = (e: ClipboardEvent) => {
		e.preventDefault();
		const current = e.target as HTMLInputElement;
		if (!current) return;

		const pasted = e.clipboardData?.getData('text') || '';
		const digits = pasted.replace(/\D/g, '').slice(0, 6);

		if (!digits || digits.length !== 6) return;

		digits.split('').forEach((d, i) => (values[i] = d));

		setTimeout(() => submitBtn?.click(), 50);
	};
</script>

<form class="step phone" method="POST" action="?/validate">
	<p class="description">
		Om et øjeblik modtager du en kode vla SMS, som du skal bruge til at godkende din underskrift.
	</p>

	<div class="input">
		{#each { length: 6 } as _, i}
			<input
				bind:value={values[i]}
				type="text"
				maxlength="1"
				name="otp-{i}"
				oninput={handleInput}
				onkeydown={(e) => handleKeyDown(e, i)}
				onpaste={handlePaste}
			/>
		{/each}
	</div>

	<button type="submit" bind:this={submitBtn}>
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

		.input {
			position: relative;
			display: flex;
			flex-direction: row;
			gap: 0.5rem;

			input {
				padding: 0.5rem;
				border: solid 1px rgba($black, 0.2);
				border-radius: 5px;
				width: 50px;
				height: 50px;
				text-align: center;
				overflow: hidden;
			}
		}
	}
</style>

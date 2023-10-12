<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	let container: HTMLDivElement;

	function getImgLoaded(): Promise<HTMLImageElement> {
		const image = new Image(500, 500);
		image.src = src;
		image.classList.add('__post-img-cover');

		return new Promise(async (resolve) => {
			await image.decode();
			resolve(image);
		});
	}

	onMount(async () => {
		try {
			const img = await getImgLoaded();
			container.innerHTML = '';
			container.appendChild(img);
		} catch (error) {
			// todo: handle error (report to user that loading failed, retry, etc)
			console.error('image load failed', { error });
		}
	});
</script>

<div bind:this={container}>
	<div class="placeholder-container">
		<div class="placeholder">Loading...</div>
	</div>
</div>

<style lang="less">
	:global(.__post-img-cover) {
		object-fit: cover;
		width: 100%;
		height: 100%;
		display: block;
	}

	@keyframes pulsate {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 0.7;
		}
	}

	.placeholder-container {
		background-color: #634832;
		color: #ffffff;
		font-size: 1.8em;
		animation: pulsate 1s alternate infinite;
		aspect-ratio: 1;
		display: flex;

		.placeholder {
			margin: auto;
		}
	}
</style>

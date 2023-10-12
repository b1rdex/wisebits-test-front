<script lang="ts">
	import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
	import PostCard from '../components/PostCard.svelte';
	import type { Post } from '$lib/test';
	import { getPost } from '$lib/test';
	import { AUTOLOAD_NEXT_POST_TIMEOUT } from '$lib/config';

	let scrollable: HTMLDivElement;
	let autoscroll: boolean;

	let isLoading: boolean = true;
	let scheduledLoad: ReturnType<typeof setTimeout>;

	let posts: Array<Post> = [];

	async function loadNewPost() {
		if (scheduledLoad) {
			clearTimeout(scheduledLoad);
		}

		try {
			isLoading = true;
			const post = await getPost();
			posts = [...posts, post];
		} catch (error) {
			// todo: handle error (report to user that loading failed, retry, etc)
			console.log('post load failed', { error });
		} finally {
			isLoading = false;
		}
	}

	function scrollToTop() {
		scrollable && scrollable.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function scheduleNewPostLoad() {
		if (isLoading) {
			return;
		}
		if (scheduledLoad) {
			clearTimeout(scheduledLoad);
		}

		scheduledLoad = setTimeout(loadNewPost, AUTOLOAD_NEXT_POST_TIMEOUT);
	}

	beforeUpdate(() => {
		autoscroll = Boolean(
			scrollable && scrollable.offsetHeight + scrollable.scrollTop > scrollable.scrollHeight - 500,
		);
	});

	afterUpdate(() => {
		if (autoscroll) {
			scrollable.scrollTo({ top: scrollable.scrollHeight, behavior: 'smooth' });
		}
		scheduleNewPostLoad();
	});

	onMount(loadNewPost);

	onDestroy(() => {
		if (scheduledLoad) {
			clearTimeout(scheduledLoad);
		}
	});
</script>

<div class="wrapper">
	<div class="navbar" role="heading" aria-level={1}>
		<a class="logo" on:click|preventDefault={scrollToTop} href="/">Coffeegram</a>
	</div>
	<div class="scrollable" bind:this={scrollable}>
		{#each posts as post (post.uid)}
			<PostCard {post} />
		{:else}
			<div class="no-posts">Loading posts...</div>
		{/each}
	</div>
	<button on:click={loadNewPost} class="load-more" disabled={isLoading}
		>{isLoading ? 'Loading...' : 'Load more'}</button
	>
</div>

<style lang="less">
	:global(body) {
		font-family: 'Comic Sans MS', serif;
	}

	:global(*) {
		margin: 0;
		padding: 0;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100svh;

		.navbar {
			border-bottom: 1px solid #eeeeee;

			.logo {
				display: block;
				max-width: 1024px;
				margin: 0 auto;
				font-size: 2em;
				padding: 0.2em 0.4em;
				cursor: pointer;
				text-decoration: none;
				color: #634832;
				font-weight: bold;
			}
		}

		.scrollable {
			flex: 1 1 auto;
			overflow-y: auto;
			padding-top: 2em;

			.no-posts {
				max-width: 600px;
				margin: 1em auto;
				font-size: 1.4em;
				text-align: center;
			}
		}

		.load-more {
			line-height: 2em;
			font-size: 1.2em;
		}
	}
</style>

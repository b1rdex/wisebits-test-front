<script lang="ts">
	import PostImage from './PostImage.svelte';
	import type { Post } from '$lib/test';

	export let post: Post;
</script>

<article data-testid="post-card">
	<PostImage src={post.image} />
	<div class="origin">{post.origin}</div>
	<div class="blend-name">{post.blend_name}</div>
	<div class="variety">{post.variety}</div>
	<div class="notes">
		{#each post.notes as note}<span class="note">
				{note}
			</span>{/each}
	</div>
	<div class="intensifier">{post.intensifier}</div>
</article>

<style lang="less">
	article {
		max-width: 600px;
		border: 2px solid #eeeeee;
		border-radius: 4px;
		padding: 1em;
		position: relative;
		margin: 0 auto 2em;

		.origin {
			font-size: 1.2em;
			margin: 0.4em 0;
			color: #666;
		}

		.blend-name {
			font-weight: bold;
			font-size: 1.6em;
			margin: 0 0 0.4em;
		}

		.variety {
			font-size: 1.2em;
		}

		.notes {
			margin-top: 1em;
			display: flex;
			overflow-y: scroll;
			align-items: center;
			justify-content: stretch;

			.note {
				padding: 1em;
				border: 1px solid #eeeeee;
				white-space: nowrap;

				& + .note {
					margin-left: 1em;
				}
			}
		}

		.intensifier {
			position: absolute;
			top: 1em;
			right: 1.4em;
			font-size: 2em;
			color: #ffffff;
		}
	}
</style>

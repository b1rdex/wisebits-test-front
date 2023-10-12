import { COFFEE_API_URL, COFFEE_IMAGE_URL } from '$lib/config';

type ApiPost = {
	id: number;
	uid: string;
	blend_name: string;
	origin: string;
	variety: string;
	notes: string;
	intensifier: string;
};

export type Post = Omit<ApiPost, 'notes'> & {
	notes: Array<string>;
	image: string;
};

export async function getPost(): Promise<Post> {
	return (
		fetch(COFFEE_API_URL)
			.then((res) => res.json())
			// todo: validate api response
			.then((post) => post as unknown as ApiPost)
			.then((post) => {
				return {
					...post,
					notes: post.notes.split(/[\s,]+/),
					image: `${COFFEE_IMAGE_URL}?random=${post.uid}`,
				};
			})
	);
}

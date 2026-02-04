import clubs from '$lib/data/clubs.json';
import type { Club, ClubKey } from '$lib/types/club';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const slug = params.slug as ClubKey;

	try {
		return {
			clubs: clubs as Record<ClubKey, Club>,
			slug
		};
	} catch (e) {
		throw error(404, `'${slug}.json' not found: ${e}`);
	}
}

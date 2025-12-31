import clubs from '$lib/data/clubs.json';
import type { HeaderElement, Hero } from '$lib/types/page';
import type { Club, ClubKey } from '$lib/types/club';
import { error } from '@sveltejs/kit';
import { normalizeNavbarUrl } from '$lib/services/urls';

export async function load({params}) {

	const slug = params.slug as ClubKey;

	try {
		const page = await import(`$lib/data/pages/${slug}/members.json`);
		const navbar = (page.navbar).map((item: HeaderElement) => normalizeNavbarUrl(item, slug));
		return {
			navbarData: navbar as HeaderElement[],
			heroData: page.hero as Hero,

			clubs: clubs as Record<ClubKey, Club>,
			selectedClub: clubs[slug] as Club
		}
	} catch (e) {
		throw error(404, `'${slug}.json' not found: ${e}`);
	}
}

import projects from '$lib/data/projects.json';

import type { HeaderElement, Hero } from '$lib/types/page';
import type { ClubKey } from '$lib/types/club';
import type { ClubProject } from '$lib/types/project';

import { error } from '@sveltejs/kit';
import { getClubProjects } from '$lib/services/projects';
import { normalizeNavbarUrl } from '$lib/services/urls';
import type { EventTimeDate } from '$lib/types/event';
import { partitionEvents, timeStringToDate } from '$lib/services/events';


export async function load({ params, data }) {
	const slug = params.slug as ClubKey;
	
	const events: EventTimeDate[] = data.serverEvents.map((event) => timeStringToDate(event));
	const { meetings, nonMeetings } = partitionEvents(events);

	try {
		const page = await import(`$lib/data/pages/${slug}/main.json`);
		const navbar = page.navbar.map((item: HeaderElement) => normalizeNavbarUrl(item, slug));

		return {
			navbarData: navbar as HeaderElement[],
			heroData: page.hero as Hero,
			projects: getClubProjects(projects, slug) as ClubProject[] ?? undefined,
			events: nonMeetings ?? [],
			meetings: (meetings ?? []).slice(0, 3)
		};
	} catch (e) {
		throw error(404, `'${slug}.json' not found: ${e}`);
	}
}

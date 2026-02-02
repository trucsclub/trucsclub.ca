import clubs from '$lib/data/clubs.json';
import projects from '$lib/data/projects.json';

import type { HeaderElement, Hero } from '$lib/types/page';
import type { Club, ClubKey } from '$lib/types/club';
import type { ClubProject } from '$lib/types/project';

import { error } from '@sveltejs/kit';
import { getClubProjects } from '$lib/services/projects';
import { normalizeNavbarUrl } from '$lib/services/urls';
import { ensureClubEvents } from '$lib/services/events';
import { get } from 'svelte/store';
import type { EventTimeDate } from '$lib/types/event';
import { eventsStore } from '$lib/stores/events';


export async function load({ params, fetch }) {
	const slug = params.slug as ClubKey;

	// Store events so a request is not needed every navigation.
	await ensureClubEvents(slug, fetch);

	const clubEvents = get(eventsStore)[slug] ?? { events: [], meetings: [] };
	const events: EventTimeDate[] = clubEvents.events ?? [];
	const meetings: EventTimeDate[] = clubEvents.meetings ?? [];

	try {
		const page = await import(`$lib/data/pages/${slug}/main.json`);
		const navbar = page.navbar.map((item: HeaderElement) => normalizeNavbarUrl(item, slug));

		return {
			navbarData: navbar as HeaderElement[],
			heroData: page.hero as Hero,
			clubs: clubs as Record<ClubKey, Club>,
			slug,
			projects: getClubProjects(projects, slug) as ClubProject[] ?? undefined,
			events,
			meetings
		};
	} catch (e) {
		throw error(404, `'${slug}.json' not found: ${e}`);
	}
}

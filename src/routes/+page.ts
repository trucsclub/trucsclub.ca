import clubs from '$lib/data/clubs.json';
import page from '$lib/data/pages/home.json';
import events from '$lib/data/events.json';
import projects from '$lib/data/projects.json';

import { getTopProjects } from '$lib/services/projects';
import type { HeaderElement, Hero } from '$lib/types/page';
import type { Club, ClubKey } from '$lib/types/club';
import type { EventTimeDate } from '$lib/types/event';
import type { ClubProject } from '$lib/types/project';
import { repeatEvent } from '$lib/services/events';

export function load() {
	const eventsTimeDate = events.map((event) => ({ ...event, time: new Date(event.time) })) as EventTimeDate[];
	const normalizedEvents: EventTimeDate[] = eventsTimeDate.flatMap((event) => repeatEvent(event));
	normalizedEvents.sort((a, b) => a.time.getTime() - b.time.getTime());

	return {
		navbarData: page.navbar as HeaderElement[],
		heroData: page.hero as Hero,

		clubs: clubs as Record<ClubKey, Club>,
		selectedClub: undefined,
		events: normalizedEvents as EventTimeDate[],
		topProjects: getTopProjects(projects) as ClubProject[]
	};
}

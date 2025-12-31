import clubs from '$lib/data/clubs.json';
import events from '$lib/data/events.json';
import meetings from '$lib/data/meetings.json'
import projects from '$lib/data/projects.json';

import type { HeaderElement, Hero } from '$lib/types/page';
import type { Club, ClubKey } from '$lib/types/club';
import { error } from '@sveltejs/kit';
import type { EventTimeDate, EventTimeString } from '$lib/types/event';
import { getClubProjects } from '$lib/services/projects';
import type { ClubProject } from '$lib/types/project';
import { repeatEvent } from '$lib/services/events';
import type { ClubMeeting } from '$lib/types/meeting';
import { getClubMeetings } from '$lib/services/meetings.js';
import { normalizeNavbarUrl } from '$lib/services/urls';

export async function load({ params }) {
	const slug = params.slug as ClubKey;

	const eventsTimeString = events.filter((event) => event.clubs.includes(slug)) as EventTimeString[];
	const eventsTimeDate: EventTimeDate[] = eventsTimeString.map((event) => ({ ...event, time: new Date(event.time) }));
	const normalizedEvents: EventTimeDate[] = eventsTimeDate.flatMap((event) => repeatEvent(event));
	normalizedEvents.sort((a, b) => a.time.getTime() - b.time.getTime());

	const clubMeetings = getClubMeetings(meetings, slug)
	const meetingsTimeDate: ClubMeeting[] = clubMeetings.map((meeting) => ({ ...meeting, time: new Date(meeting.time) }));

	try {
		const page = await import(`$lib/data/pages/${slug}/main.json`);
		const navbar = (page.navbar).map((item: HeaderElement) => normalizeNavbarUrl(item, slug));
		return {
			navbarData: navbar as HeaderElement[],
			heroData: page.hero as Hero,
			
			clubs: clubs as Record<ClubKey, Club>,
			selectedClub: clubs[slug] as Club,
			events: normalizedEvents as EventTimeDate[],
			projects: getClubProjects(projects, slug) as ClubProject[] ?? undefined,
			meetings: meetingsTimeDate ?? undefined,
		};
	} catch (e) {
		throw error(404, `'${slug}.json' not found: ${e}`);
	}
}

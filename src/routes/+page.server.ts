import clubs from '$lib/data/clubs.json';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';

import type { ClubKey } from '$lib/types/club';
import type { EventTimeDate } from '$lib/types/event';

export async function load() {
	const allEvents: EventTimeDate[] = [];

	for (const slug of Object.keys(clubs) as ClubKey[]) {
		const calendarId = clubs[slug].calendarId;
		if (!calendarId) {
			console.warn(`No calendarId for club: ${slug}`);
			continue;
		}
		const rawEvents = await getEvents(calendarId);
		const converted = rawEvents.map(event => convertEvent(event, slug));
		
		const clubEvents: EventTimeDate[] = [];
		for (const event of converted) {
			if (event.is_meeting == true || event.title?.toLowerCase().endsWith('meeting')) {
				continue;
			}
			clubEvents.push(event);
		}
		allEvents.push(...clubEvents.slice(0, 3));
	}

	return {
		serverEvents: allEvents
	};
}

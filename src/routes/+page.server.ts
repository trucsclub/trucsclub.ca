import clubs from '$lib/data/clubs.json';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';
import type { EventTimeString } from '$lib/types/event';
import type { calendar_v3 } from 'googleapis';

export async function load() {
	const allEvents: EventTimeString[] = [];

	const calendarIds = new Set<string>((Object.values(clubs)).map(club => club.calendar.id));

	for (const calendarId of calendarIds) {
		console.log(calendarId);
		const rawEvents: calendar_v3.Schema$Event[] = await getEvents(calendarId);
		const parsedEvents: EventTimeString[] = rawEvents.map(event => convertEvent(event));
		
		const clubEvents: EventTimeString[] = [];
		for (const event of parsedEvents) {
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

import clubs from '$lib/data/clubs.json';
import type { ClubKey } from '$lib/types/club';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';
import type { EventTimeString } from '$lib/types/event';
import type { calendar_v3 } from 'googleapis';

export async function load({ params }) {
	const slug = params.slug as ClubKey;

	const selectedClubCalendar = clubs[slug].calendar;
	if (!selectedClubCalendar.id) {
		console.warn(`No calendarId for club: ${slug}`);
		return {serverEvents: []};
	}
	const rawEvents: calendar_v3.Schema$Event[] = await getEvents(selectedClubCalendar.id);
	const parsedEvents: EventTimeString[] = rawEvents.map((event) => convertEvent(event, slug));
	const clubEvents = parsedEvents.filter(event => (event.clubs).includes(slug));

	return {
		serverEvents: clubEvents
	};
}

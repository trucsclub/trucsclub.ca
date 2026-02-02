import clubs from '$lib/data/clubs.json'
import { error } from '@sveltejs/kit';
import type { ClubKey } from '$lib/types/club';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';

export async function load({ params }) {
	const slug = params.slug as ClubKey;

	const calendarId = clubs[slug].calendarId;
	if (!calendarId) {
		console.warn(`No calendarId for club: ${slug}`);
		return {serverEvents: { events: [], meetings: [] }};
	}
	const rawEvents = await getEvents(calendarId);

	const events = rawEvents.map((event) =>
		convertEvent(event, slug)
	);

	return {
		serverEvents: events
	};
}

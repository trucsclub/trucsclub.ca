import clubs from '$lib/data/clubs.json';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';
import type { ClubKey } from '$lib/types/club';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const slug = params.club as ClubKey;
	if (!clubs[slug].calendarId) {
		return json([]);
	}

	const rawEvents = await getEvents(clubs[slug].calendarId);
	const events = rawEvents.map(e => convertEvent(e, slug));

	return json(events);
}

import clubs from '$lib/data/clubs.json';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';
import type { ClubKey } from '$lib/types/club';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const slug = params.club as ClubKey;
	const selectedClubCalendar = clubs[slug].calendar;
	if (!selectedClubCalendar.id) {
		return json([]);
	}

	const rawEvents = await getEvents(selectedClubCalendar.id);
	// console.log(rawEvents);
	const clubEvents = rawEvents.filter(event => event.creator.email == selectedClubCalendar.email);
	const events = clubEvents.map(event => convertEvent(event, slug));

	return json(events);
}

import { eventsStore } from '$lib/stores/events';
import type { ClubKey } from '$lib/types/club';
import type { EventTimeDate, EventTimeString } from '$lib/types/event';
import { get } from 'svelte/store';

export function partitionEvents(events: EventTimeDate[]) {
	const meetings: EventTimeDate[] = [];
	const nonMeetings: EventTimeDate[] = [];

	for (const event of events) {
		if (event.is_meeting == true || event.title?.toLowerCase().endsWith('meeting')) {
			meetings.push(event);
		} else {
			nonMeetings.push(event);
		}
	}

	return { meetings, nonMeetings };
}

export async function ensureClubEvents(slug: ClubKey, fetch: typeof window.fetch) {
    const store = get(eventsStore);
    if (store[slug]) {
        return;
    }
    const result = await fetch(`/api/events/${slug}`);
    if (!result.ok) {
        return;
    }

    const rawEvents: EventTimeString[] = await result.json();
    const events: EventTimeDate[] = rawEvents.map((event) => timeStringToDate(event));
    const { meetings, nonMeetings } = partitionEvents(events);
    eventsStore.update(store => ({...store, [slug]: {events: nonMeetings, meetings}}));
}


function timeStringToDate(event: EventTimeString): EventTimeDate {
    if (!event.time) {
        return event as EventTimeDate;
    }

    return {
        ...event, 
        time: {
            start: new Date(event.time.start),
            end: new Date(event.time.end),
            timeZone: event.time.timeZone
        }
    };
}

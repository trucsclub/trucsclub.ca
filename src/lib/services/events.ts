import { IMAGE_EXTENSIONS, IMAGE_MIME_PREFIX } from '$lib/constants';
import { eventsStore } from '$lib/stores/events';
import type { ClubKey } from '$lib/types/club';
import type { EventTimeDate, EventTimeString } from '$lib/types/event';
import type { calendar_v3 } from 'googleapis';
import { get } from 'svelte/store';

export function convertEvent(event: calendar_v3.Schema$Event, club: ClubKey): EventTimeString {

    let custom: Record<string, unknown> = {};
    let cleanDescription = '';
    if (event.description) {
        ({ custom, cleanDescription } = parseDescription(event.description));
    }

    let images: string[] = [];
    if (event.attachments) {
        const imageObjects = (event.attachments).filter((attachment) => isAttachmentImage(attachment))
        images = imageObjects.flatMap((image) => image.fileId ? `/api/image/${image.fileId}` : []);
    }

    const startDateTime = event.start?.dateTime;
    const endDateTime = event.end?.dateTime;
    const timeZone = event.start?.timeZone;
    const hasTime = startDateTime && endDateTime && timeZone;

    console.log(event);

    const baseEvent: EventTimeString = {
        clubs: [club],
        title: event.summary ?? '',
        description: cleanDescription,
        time: hasTime ? {
            start: startDateTime,
            end: endDateTime,
            timeZone: timeZone
        } : null,
        location: event.location ?? '',
        image: images[0] ? {
            url: images[0],
            has_info: false
        } : null,
        url: null
    }

    const newEvent = {...baseEvent, ...custom};
    console.log(newEvent.image)
    return newEvent;
}

// Description can optionally have a json object to replace parts of the event json.
// In Google Calendar event description, type:
// <json>
//     {
//         "clubs": ["comp", "cyber"],
//         "url": "some_link"
//         ...
//     }
// </json>
// ...Description text...
function parseDescription(description?: string): {custom: Record<string, unknown>; cleanDescription: string;} {
	if (!description) {
		return { custom: {}, cleanDescription: '' };
	}
	description = decodeHtmlEntities(description);
	const jsonRegex = /<json>([\s\S]*?)<\/json>/i;
	const match = description.match(jsonRegex);

	let custom: Record<string, unknown> = {};

	if (match && match[1]) {
		let jsonText = match[1].trim();

		if (jsonText) {
            // Remove all HTML tags inside <json> block
            jsonText = jsonText.replace(/<[^>]+>/g, '');
            // Remove whitespace/newlines.
            jsonText = jsonText.replace(/\s+/g, '').trim();
            console.log(jsonText)
			try {
				custom = JSON.parse(jsonText);
			} catch (err) {
				console.error('Invalid JSON in description:', err);
			}
		}
	}

	const cleanDescription = description.replace(jsonRegex, '').trim();
	return {custom, cleanDescription};
}

function decodeHtmlEntities(input: string): string {
    return input
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/<br\s*\/?>/gi, '\n');
}

function isAttachmentImage(attachment: calendar_v3.Schema$EventAttachment): boolean {
    // MIME type check
    if (attachment.mimeType?.startsWith(IMAGE_MIME_PREFIX)) {
        return true;
    }

    // Fallback file extension check
    const url = attachment.fileUrl ?? attachment.title ?? '';
    return IMAGE_EXTENSIONS.some((extension) => url.toLowerCase().endsWith(extension));
}




// ---------------------- client side below --------------------//



export function partitionEvents(events: EventTimeDate[]) {
	const meetings: EventTimeDate[] = [];
	const nonMeetings: EventTimeDate[] = [];

	for (const event of events) {
		if (event.isMeeting == true || event.title?.toLowerCase().endsWith('meeting')) {
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

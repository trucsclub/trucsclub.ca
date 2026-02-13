import { IMAGE_EXTENSIONS, IMAGE_MIME_PREFIX } from '$lib/constants';
import clubs from '$lib/data/clubs.json';
import { CLUB_KEYS, type ClubKey } from '$lib/types/club';
import type { EventImage } from '$lib/types/common';
import type { EventTimeString } from '$lib/types/event';
import type { calendar_v3 } from 'googleapis';

export function convertEvent(event: calendar_v3.Schema$Event, club?: ClubKey): EventTimeString {
    
    // clubEmail = clubs[club].calendar.email;

    const creatorEmail = event.creator?.email;
    let eventClub: ClubKey | null = null; 

    // Find the key (e.g., 'comp', 'cyber') where the calendar email matches
    if (creatorEmail) {
        const foundKey = CLUB_KEYS.find((key) => clubs[key].calendar.email === creatorEmail);
        if (foundKey) {
            eventClub = foundKey;
        }
    }
    else if (club) {
        eventClub = club;
    }

    let custom: Record<string, unknown> | Partial<EventTimeString> = {};
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

    const baseEvent: EventTimeString = {
        clubs: (eventClub ? [eventClub] : []),
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

    if (custom.image) {
        const newImage = {...baseEvent.image, ...custom.image} as EventImage;
        custom.image = newImage; 
    }
    const newEvent = {...baseEvent, ...custom};
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
            // console.log(jsonText)
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
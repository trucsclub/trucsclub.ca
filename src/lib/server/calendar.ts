import { google } from "googleapis";
import { GOOGLE_SERVICE_ACCOUNT_JSON } from '$env/static/private';
import { MAX_CALENDAR_EVENTS } from "$lib/constants";

const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON);

const auth = new google.auth.JWT({
	email: credentials.client_email,
	key: credentials.private_key,
	scopes: ['https://www.googleapis.com/auth/calendar.readonly']
});

export const calendar = google.calendar({version: 'v3', auth: auth});

export async function getEvents(calendarId: string) {
	console.log('Fetching calendar:', calendarId);
	const res = await calendar.events.list({
		calendarId,
		timeMin: new Date().toISOString(),
		singleEvents: true,
		orderBy: 'startTime',
		maxResults: MAX_CALENDAR_EVENTS
	});
	const events = res.data.items ?? []; 
	return events;
}

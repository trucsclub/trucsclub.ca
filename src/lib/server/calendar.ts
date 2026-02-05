import { GOOGLE_SERVICE_ACCOUNT_JSON } from '$env/static/private';
import { MAX_CALENDAR_EVENTS } from '$lib/constants';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

type ServiceAccount = {
	client_email: string;
	private_key: string;
};

function base64UrlEncode(buffer: ArrayBuffer | Uint8Array) {
	const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
	let binary = '';
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function importPrivateKey(pem: string) {
	const pemContents = pem.replace('-----BEGIN PRIVATE KEY-----', '').replace('-----END PRIVATE KEY-----', '').replace(/\s+/g, '');

	const binary = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

	return crypto.subtle.importKey('pkcs8', binary, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
}

async function getAccessToken() {
	const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON) as ServiceAccount;

	const header = {
		alg: 'RS256',
		typ: 'JWT'
	};

	const now = Math.floor(Date.now() / 1000);

	const payload = {
		iss: credentials.client_email,
		scope: SCOPES.join(' '),
		aud: TOKEN_URL,
		iat: now,
		exp: now + 3600
	};

	const encodedHeader = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
	const encodedPayload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));

	const data = `${encodedHeader}.${encodedPayload}`;

	const key = await importPrivateKey(credentials.private_key);
	const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(data));

	const jwt = `${data}.${base64UrlEncode(signature)}`;

	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion: jwt
		})
	});

	if (!res.ok) {
		throw new Error(`Failed to get access token: ${await res.text()}`);
	}

	const json = await res.json();
	return json.access_token as string;
}

export async function getEvents(calendarId: string) {
	if (GOOGLE_SERVICE_ACCOUNT_JSON) {
		const accessToken = await getAccessToken();

		const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);

		url.searchParams.set('timeMin', new Date().toISOString());
		url.searchParams.set('singleEvents', 'true');
		url.searchParams.set('orderBy', 'startTime');
		url.searchParams.set('maxResults', String(MAX_CALENDAR_EVENTS));

		const res = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (!res.ok) {
			throw new Error(`Calendar fetch failed: ${await res.text()}`);
		}

		const data = await res.json();
		return data.items ?? [];
	}
	return [];
}

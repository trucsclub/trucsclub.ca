import { writable } from 'svelte/store';
import type { EventTimeDate } from '$lib/types/event';
import type { ClubKey } from '$lib/types/club';

export type ClubEvents = {
	events: EventTimeDate[];
	meetings: EventTimeDate[];
};

export type EventsByClub = Partial<Record<ClubKey, ClubEvents>>;

export const eventsStore = writable<EventsByClub>({});
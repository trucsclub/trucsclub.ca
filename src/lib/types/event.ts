import type { ClubKey } from '$lib/types/club';
import type { EventImage, Repeat } from './common';

export interface EventTimeString {
	clubs: ClubKey[];
	title: string;
	description: string;
	time: {
		start: string;
		end: string;
		timeZone: string;
	} | null
	location: string;
	image: EventImage | null;
	url: string | null;
	repeat?: Repeat;
	is_meeting?: boolean;
}

export interface EventTimeDate {
	clubs: ClubKey[];
	title: string;
	description: string;
	time: {
		start: Date;
		end: Date;
		timeZone: string;
	} | null
	location: string;
	image: EventImage | null;
	url: string | null;
	repeat?: Repeat;
	is_meeting?: boolean;
}

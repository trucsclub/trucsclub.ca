import type { ClubKey } from '$lib/types/club';
import type { EventImage, Repeat } from './common';

export interface EventTimeString {
	clubs: ClubKey[];
	title: string;
	description: string;
	time: string;
	location: string;
	image?: EventImage;
	url?: string;
	repeat?: Repeat;
}

export interface EventTimeDate {
	clubs: ClubKey[];
	title: string;
	description: string;
	time: Date;
	location: string;
	image?: EventImage;
	image_has_info?: boolean; // Setting to true hides the title, description, time, location, and club on card. Careful of accessibility issues.
	url?: string;
	repeat?: Repeat;
}

import type { ClubKey } from '$lib/types/club';

export interface EventString {
	title: string;
	description: string;
	time: string;
	location: string;
	image: string;
	image_has_info?: boolean; // Setting to true hides the title, description, time, location, and club on card. Careful of accessibility issues.
	url?: string; // Link to event attendance form.
}

export interface ClubEventDate {
	title: string;
	description: string;
	time: Date;
	location: string;
	image: string;
	image_has_info?: boolean; // Setting to true hides the title, description, time, location, and club on card. Careful of accessibility issues.
	url?: string; // Link to event attendance form.
	club: ClubKey;
}

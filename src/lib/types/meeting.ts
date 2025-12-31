import meetingsData from '$lib/data/meetings.json';
import type { ClubKey } from '$lib/types/club';
import type { EventImage, Repeat } from './common';

type MeetingsData = typeof meetingsData;
export type MeetingsClubKey = keyof MeetingsData;
export type MeetingKeys<Club extends MeetingsClubKey> = keyof MeetingsData[Club];

export interface MeetingTimeString {
	title: string;
	description?: string;
	time: string;
	location: string;
	image?: EventImage;
	repeat?: Repeat;
}

export interface MeetingTimeDate {
	title: string;
	description?: string;
	time: Date;
	location: string;
	image?: EventImage;
	repeat?: Repeat;
}

export type ClubMeeting = MeetingTimeDate & {
	club: ClubKey;
};
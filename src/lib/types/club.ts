import type clubs from '$lib/data/clubs.json';

export type ClubKey = keyof typeof clubs;

interface SocialWithLogo {
	image: string; // logo is present
	title?: string; // title optional
	url: string;
}

interface SocialWithoutLogo {
	image?: undefined; // logo missing
	title: string; // title required
	url: string;
}

export type Social = SocialWithLogo | SocialWithoutLogo;

export interface Member {
	name: string,
	position: string,
	description: string,
	image?: string
}

export interface Club {
	name: string;
	image: string;
	socials?: Record<string, Social>; // <platform (key), info (value)>
	members?: Member[];
}

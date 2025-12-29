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

export interface Club {
	name: string;
	image: string;
	url: string;

	socials?: Record<string, Social>; // <platform (key), info (value)>
}

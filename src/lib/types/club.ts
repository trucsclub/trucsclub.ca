import clubs from '$lib/data/clubs.json';

export type ClubKey = keyof typeof clubs;
export const CLUB_KEYS = Object.keys(clubs) as ClubKey[];

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

interface Contact {
	address: string,
	title: string
}

export interface Member {
	name: string,
	position: string,
	description: string,
	image?: string
}

export interface Club {
	name: string;
	image: string;
	calendar: {
		email: string;
		id: `${string}@${string}`;
	};
	socials?: Record<string, Social>; // <platform (key), info (value)>
	contact?: Record<string, Contact>;
	members?: Member[];
}

interface SocialWithLogo {
	logo: string; // logo is present
	title?: string; // title optional
	url: string;
}

interface SocialWithoutLogo {
	logo?: undefined; // logo missing
	title: string; // title required
	url: string;
}

export type Social = SocialWithLogo | SocialWithoutLogo;

export default interface Club {
	name: string;
	logo: string;
	url: string;

	socials?: Record<string, Social>; // <platform (key), info (value)>
}

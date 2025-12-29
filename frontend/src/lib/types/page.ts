interface LinkBox {
	title: string;
	content?: string;
	image?: string;
	url: string;
}

export interface HeaderLink {
	title: string;
	entries?: never;
	url: string;
}

export interface HeaderDropdown {
	title: string;
	entries: LinkBox[];
	url?: never;
}

export type HeaderElement = HeaderLink | HeaderDropdown;

export interface Hero {
	title: string;
	content?: string;
	color?: string; // CSS-valid color name or value for text.
	image?: string;
}

export default interface Page {
	navbar: HeaderElement[];
	hero: Hero;
}

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

export default interface Page {
	navbar: HeaderElement[];
}

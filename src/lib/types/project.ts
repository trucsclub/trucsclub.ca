import projectsData from '$lib/data/projects.json';
import type { ClubKey } from '$lib/types/club';

type ProjectsData = typeof projectsData;
export type ProjectsClubKey = keyof ProjectsData;
export type ProjectKeys<Club extends ProjectsClubKey> = keyof ProjectsData[Club]['projects'];

export interface Project {
	title: string;
	description: string;
	image: string;
	url: string;
}

export type ClubProject = Project & {
	club: ClubKey;
};

export interface ClubProjects<Club extends ProjectsClubKey = ProjectsClubKey> {
	top?: ProjectKeys<Club>;
	projects: Record<ProjectKeys<Club>, Project>;
} // <Club extends ProjectsClubKey> lets Club be a variable. <... = ProjectsClubKey> sets ProjectsClubKey as the default if none is specified when used.

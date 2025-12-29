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

export function getTopProjects(clubsProjects: typeof projectsData): ClubProject[] {
	const result: ClubProject[] = [];

	for (const clubKey of Object.keys(clubsProjects) as ProjectsClubKey[]) {
		const clubData = clubsProjects[clubKey];
		if (!clubData.top) continue;

		const topKey = clubData.top as keyof typeof clubData.projects;
		const project = clubData.projects[topKey] as Project; // typed as Project

		// project is now always Project
		result.push({ ...project, club: clubKey });
	}
	return result;
}

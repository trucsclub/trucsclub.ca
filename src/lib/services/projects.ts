import projectsData from '$lib/data/projects.json';
import type { ClubProject, Project, ProjectsClubKey } from '$lib/types/project';

export function getTopProjects(clubsProjects: typeof projectsData): ClubProject[] {
	const result: ClubProject[] = [];

	for (const clubKey of Object.keys(clubsProjects) as ProjectsClubKey[]) {
		const clubData = clubsProjects[clubKey];
		if (!clubData.top) continue;

		const topKey = clubData.top as keyof typeof clubData.projects;
		const project = clubData.projects[topKey] as Project;

		result.push({ ...project, club: clubKey });
	}
	return result;
}

export function getClubProjects(clubsProjects: typeof projectsData, selectedClub: ProjectsClubKey): ClubProject[] {
	const result: ClubProject[] = [];

	const clubData = clubsProjects[selectedClub];
	if (!clubData) {
		return [];
	}

	for (const project of Object.values(clubData.projects)) {
		result.push({ ...project, club: selectedClub });
	}
	return result;
}

import meetingsData from '$lib/data/meetings.json';
import type { MeetingsClubKey, MeetingTimeString } from '$lib/types/meeting';

export function getClubMeetings(clubsMeetings: typeof meetingsData, selectedClub: MeetingsClubKey) {
	const result: (MeetingTimeString & {club: MeetingsClubKey})[] = [];

	const clubData = clubsMeetings[selectedClub];
	for (const meeting of Object.values(clubData)) {
		result.push({ ...meeting, club: selectedClub });
	}
	return result;
}

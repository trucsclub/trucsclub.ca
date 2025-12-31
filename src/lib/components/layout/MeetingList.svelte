<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { H3, P, Small } from '$lib/components/ui/typography/index.js';
	import { getLastDate } from '$lib/services/events';
	import type { Club, ClubKey } from '$lib/types/club';
	import type { ClubMeeting } from '$lib/types/meeting';
	import Large from '../ui/typography/Large.svelte';

	let { meetings, clubs }: { meetings: ClubMeeting[], clubs: Record<ClubKey, Club> } = $props();
</script>

<div class="flex flex-wrap justify-center gap-8">
	{#each meetings as meeting}
        <Card.Root class="h-96">
            <Card.Content class="flex items-center gap-4 h-full">
                <img src={meeting.image?.url} alt="" class="max-h-full max-w-full object-contain" />
                {#if !meeting.image?.has_info}
                    <div class="flex flex-col items-start justify-between min-w-64 gap-2">
                        <div class="flex gap-1">
                            <img src={clubs[meeting.club].image} alt={clubs[meeting.club].name} class="w-6" />
                            <Small>{clubs[meeting.club].name}</Small>
                        </div>
                        <H3 class="my-2">{meeting.title}</H3>
                        <Large>Start Time: {meeting.time.toLocaleString()}</Large>
                        {#if meeting.repeat}
                            <p>Every <Large class="inline">{meeting.repeat.every} {meeting.repeat.unit}</Large> until <Large class="inline">{getLastDate(meeting.time, meeting.repeat).toLocaleString()}</Large></p>
                        {/if}
                        <Large class="my-2">Location: {meeting.location}</Large>
                        <P>{meeting.description}</P>
                    </div>
                {/if}
            </Card.Content>
        </Card.Root>
	{/each}
</div>
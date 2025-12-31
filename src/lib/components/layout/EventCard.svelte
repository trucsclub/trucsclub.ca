<script lang="ts">
	import { H3, Large, P, Small } from '$lib/components/ui/typography/index.js';
	import { Link } from '$lib/components/ui/link/index.js';
	import type { EventTimeDate } from '$lib/types/event';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Club, ClubKey } from '$lib/types/club';

	let { event, clubs }: { event: EventTimeDate; clubs: Record<ClubKey, Club> } = $props();
</script>

<Card.Root class="h-full w-full">
	<Card.Content class="flex aspect-square flex-col items-start gap-2">
		<img src={event.image?.url} alt="" />
		{#if !event.image?.has_info}
			<div class="flex w-full items-center justify-between gap-2">
				<H3 class="flex-3">{event.title}</H3>
				<div class="flex flex-2 flex-col gap-1">
					{#each event.clubs as club}
						{#if clubs[club]}
							<div class="flex flex-2 items-center gap-2">
								<img src={clubs[club].image} alt={clubs[club].name} class="w-6" />
								<Small>{clubs[club].name}</Small>
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<Large>Time: {event.time.toLocaleString()}</Large>
			<Large>Location: {event.location}</Large>
			<P>{event.description}</P>
		{/if}
		{#if event.url}
			<div>
				<Link href={event.url}>Register here!</Link>
			</div>
		{:else}
			<P>No registration required!</P>
		{/if}
	</Card.Content>
</Card.Root>

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { H3, P, Small } from '$lib/components/ui/typography/index.js';
	import type { Club, ClubKey } from '$lib/types/club';
	import type { ClubProject } from '$lib/types/project';

	let { projects, clubs }: { projects: ClubProject[]; clubs: Record<ClubKey, Club> } = $props();
</script>

<div class="flex flex-wrap justify-center gap-8">
	{#each projects as project}
		<a href={project.url} class="w-96 max-w-full duration-150 hover:scale-105">
			<Card.Root class="h-full w-full">
				<Card.Content class="flex aspect-square flex-col items-center justify-center gap-2">
					<img src={project.image} alt="" />
					<div class="flex w-full items-center justify-between gap-2">
						<H3 class="flex-3">{project.title}</H3>
						<div class="flex flex-2 items-center gap-2">
							<img src={clubs[project.club].image} alt={clubs[project.club].name} class="w-6" />
							<Small>{clubs[project.club].name}</Small>
						</div>
					</div>
					<P>{project.description}</P>
				</Card.Content>
			</Card.Root>
		</a>
	{/each}
</div>

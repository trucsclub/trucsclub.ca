<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	import { H1, H4 } from '$lib/components/ui/typography/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import EventCarousel from '$lib/components/layout/EventCarousel.svelte';
	import ProjectCollection from '$lib/components/layout/ProjectCollection.svelte';

	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const navbarData = $derived(data.navbarData);
	const heroData = $derived(data.heroData);
	const clubs = $derived(data.clubs);
	const topProjects = $derived(data.topProjects);
	const selectedClub = $derived(data.selectedClub);
	const events = $derived(data.events);

	// Derived store: two upcoming non-meeting events per club

</script>


<Header {selectedClub} {clubs} {navbarData} />
<Hero {heroData} />

<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Club Pages</H1>
	<Separator />
	<div class="flex flex-wrap justify-center gap-8">
		{#each Object.entries(clubs) as [slug, club]}
			<a href={`/club/${slug}`} class="w-96 max-w-full duration-150 hover:scale-105">
				<Card.Root>
					<Card.Content class="flex aspect-square flex-col items-center justify-center gap-2 p-8">
						<img src={club.image} alt="" class="h-48" />
						<H4>{club.name}</H4>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</div>
	<Separator />
</section>

{#if events.length}
<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Upcoming Events</H1>
	<Separator />
	<EventCarousel {events} {clubs} />
	<Separator />
</section>
{/if}

<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Top Project Picks</H1>
	<Separator />
	<ProjectCollection projects={topProjects} {clubs} />
	<Separator />
</section>

<Footer {selectedClub} {clubs} />

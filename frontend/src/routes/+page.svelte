<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { H1, H3, H4, Large, P, Small } from '$lib/components/ui/typography/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Link } from '$lib/components/ui/link/index.js';

	import clubs from '$lib/data/clubs.json';
	import page from '$lib/data/pages/home.json';
	import events from '$lib/data/events.json';
	import clubsProjects from '$lib/data/projects.json';

	import type { Club, ClubKey } from '$lib/types/club';
	import type { EventString, ClubEventDate } from '$lib/types/event';
	import { getTopProjects, type ClubProject, type ClubProjects } from '$lib/types/project';

	const { children } = $props();
	const navbarData = page.navbar;
	const heroData = page.hero;
	const selectedClub: Club | undefined = undefined;

	function eventStringToDate(event: EventString, club: ClubKey) {
		const time = new Date(event.time);
		if (Number.isNaN(time.getTime())) {
			console.warn('Invalid event time:', event);
			return null;
		}
		return { ...event, time, club };
	}

	function eventsStringObjectToDateArray(events: Record<ClubKey, EventString[]>) {
		const result: ClubEventDate[] = [];
		for (const [clubKey, eventStrings] of Object.entries(events) as [ClubKey, EventString[]][]) {
			for (const event of eventStrings) {
				const parsed = eventStringToDate(event, clubKey as ClubKey);
				if (parsed) {
					result.push(parsed);
				}
			}
		}
		return result;
	}

	let eventArray: ClubEventDate[] = eventsStringObjectToDateArray(events);
	eventArray.sort((a, b) => a.time.getTime() - b.time.getTime());

	const topProjects = getTopProjects(clubsProjects);
</script>

<Header {selectedClub} {clubs} {navbarData} />
<Hero {heroData} />

<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Club Pages</H1>
	<Separator />
	<div class="flex flex-wrap justify-center gap-8">
		{#each Object.values(clubs) as club}
			<a href={club.url} class="w-96 max-w-full duration-150 hover:scale-105">
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

<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Upcoming Events</H1>
	<Separator />
	<Carousel.Root class="m-auto w-11/12 max-w-[calc(100%-8rem)]">
		<Carousel.Content class="-ms-1">
			{#each Object.values(eventArray) as event}
				<Carousel.Item class="ps-1 md:basis-1/2 xl:basis-1/3">
					<div class="h-full p-1">
						<Card.Root class="h-full w-full">
							<Card.Content class="flex aspect-square flex-col items-start gap-2">
								<img src={event.image} alt="" />
								{#if !event.image_has_info}
									<div class="flex w-full items-center justify-between gap-2">
										<H3 class="flex-3">{event.title}</H3>
										{#if clubs[event.club]}
											<div class="flex flex-2 items-center gap-2">
												<img src={clubs[event.club].image} alt={clubs[event.club].name} class="w-6" />
												<Small>{clubs[event.club].name}</Small>
											</div>
										{/if}
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
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
	<Separator />
</section>

<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Top Project Picks</H1>
	<Separator />
	<div class="flex flex-wrap justify-center gap-8">
		{#each topProjects as topProject}
			<a href={topProject.url} class="w-96 max-w-full duration-150 hover:scale-105">
				<Card.Root class="h-full w-full">
					<Card.Content class="flex aspect-square flex-col items-center justify-center gap-2">
						<img src={topProject.image} alt="" />
						<div class="flex w-full items-center justify-between gap-2">
							<H3 class="flex-3">{topProject.title}</H3>
							<div class="flex flex-2 items-center gap-2">
								<img src={clubs[topProject.club].image} alt={clubs[topProject.club].name} class="w-6" />
								<Small>{clubs[topProject.club].name}</Small>
							</div>
						</div>
						<P>{topProject.description}</P>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</div>
	<Separator />
</section>

<Footer {clubs} />

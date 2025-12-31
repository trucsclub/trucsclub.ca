<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';

	import type { PageData } from './$types';
	import { H1 } from '$lib/components/ui/typography';
	import { Separator } from '$lib/components/ui/separator';
	import EventCarousel from '$lib/components/layout/EventCarousel.svelte';
	import ProjectCollection from '$lib/components/layout/ProjectCollection.svelte';
	import MeetingList from '$lib/components/layout/MeetingList.svelte';

	const { data }: { data: PageData } = $props();
	const navbarData = $derived(data.navbarData);
	const heroData = $derived(data.heroData);
	const clubs = $derived(data.clubs);
	const events = $derived(data.events);
	const projects = $derived(data.projects);
	const meetings = $derived(data.meetings);
	const selectedClub = $derived(data.selectedClub);


</script>

<Header {selectedClub} {clubs} {navbarData} />
<Hero {heroData} />

<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
	<H1 class="text-center">Upcoming Events</H1>
	<Separator />
	<EventCarousel {events} {clubs} />
	<Separator />
</section>

{#if projects}
	<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
		<H1 class="text-center">Club Projects</H1>
		<Separator />
		<ProjectCollection {projects} {clubs} />
		<Separator />
	</section>
{/if}

{#if meetings}
	<section class="m-auto my-16 flex w-11/12 flex-col gap-8" id="meetings">
		<H1 class="text-center">Meetings</H1>
		<Separator />
		<MeetingList {meetings} {clubs} />
		<Separator />
	</section>
{/if}

<Footer {selectedClub} {clubs} />
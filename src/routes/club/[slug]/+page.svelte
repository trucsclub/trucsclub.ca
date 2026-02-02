<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	import type { PageData } from './$types';
	import { H1, H3, Muted } from '$lib/components/ui/typography';
	import { Separator } from '$lib/components/ui/separator';
	import EventCarousel from '$lib/components/layout/EventCarousel.svelte';
	import ProjectCollection from '$lib/components/layout/ProjectCollection.svelte';
	import { Link } from '$lib/components/ui/link';

	const { data }: { data: PageData } = $props();
	const navbarData = $derived(data.navbarData);
	const heroData = $derived(data.heroData);
	const clubs = $derived(data.clubs);
	const projects = $derived(data.projects);
	const slug = $derived(data.slug);
	const meetings = $derived(data.meetings);
	const events = $derived(data.events);
	const selectedClub = $derived(clubs[slug]);
</script>

<Header {selectedClub} {clubs} {navbarData} />
<Hero {heroData} />

{#if events.length}
	<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
		<H1 class="text-center">Upcoming Events</H1>
		<Separator />
		<EventCarousel {events} {clubs} />
		<Separator />
	</section>
{/if}

{#if meetings.length}
	<section class="m-auto my-16 flex w-11/12 flex-col gap-8" id="meetings">
		<H1 class="text-center">Meetings</H1>
		<Separator />
		<EventCarousel events={meetings} {clubs} />
		<Separator />
	</section>
{/if}

{#if projects.length}
	<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
		<H1 class="text-center">Club Projects</H1>
		<Separator />
		<ProjectCollection {projects} {clubs} />
		<Separator />
	</section>
{/if}

{#if selectedClub.contact}
	<section class="m-auto my-16 flex w-11/12 max-w-6xl flex-col gap-8" id="contact">
		<H1 class="text-center">Contact</H1>
		<Separator />
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<Card.Root class="bg-card shadow-sm">
				<Card.Content class="flex flex-col gap-4 px-8 py-2">
					<H3>Get in touch</H3>
					<ul class="flex flex-col gap-3">
						{#each Object.values(selectedClub.contact) as item}
							<li class="flex flex-col">
								<Muted class="text-sm">{item.title}</Muted>

								{#if item.title.toLowerCase().includes('email')}
									<Link href={`mailto:${item.address}`} class="text-sm font-medium hover:underline">
										{item.address}
									</Link>
								{:else if item.title.toLowerCase().includes('phone')}
									<Link href={`tel:${item.address}`} class="text-sm font-medium hover:underline">
										{item.address}
									</Link>
								{:else}
									<span class="text-sm font-medium">
										{item.address}
									</span>
								{/if}
							</li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>
			{#if selectedClub.socials}
				<Card.Root class="bg-card shadow-sm">
					<Card.Content class="flex flex-col gap-4 px-8 py-2">
						<H3>Socials</H3>

						<ul class="flex flex-col">
							{#each Object.values(selectedClub.socials) as element}
								<li>
									<a href={element.url} class="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted">
										{#if element.image}
											<img src={element.image} alt={element.title} class="h-6 w-6 object-contain dark:invert" />
										{/if}

										<span class="text-sm font-medium">
											{element.title}
										</span>
									</a>
								</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			{/if}
		</div>
	</section>
{/if}

<Footer selectedClub={clubs[slug]} {clubs} />
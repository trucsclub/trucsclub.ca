<script lang="ts">
	import Announcement from '$lib/components/ui/announcement.svelte';
	import { PageActions, PageHero, PageHeroDescription, PageHeroHeading } from '$lib/components/ui/page-header/index.js';
	import type { Hero } from '$lib/types/page';

	let { heroData }: { heroData: Hero } = $props();
</script>

<PageHero image={heroData.image} size={'large'}>
	<!-- <Announcement style="color: {heroData.color}" /> -->
	<PageHeroHeading class="max-w-4xl" style="color: {heroData.color}">{heroData.title}</PageHeroHeading>
	{#if heroData.content}
		<PageHeroDescription style="color: {heroData.color}">{heroData.content}</PageHeroDescription>
	{/if}
	<!-- <PageActions>
		<Button size="sm" href="/docs/installation">Get Started</Button>
		<Button size="sm" variant="ghost" href="/docs/components">View Components</Button>
	</PageActions> -->
</PageHero>

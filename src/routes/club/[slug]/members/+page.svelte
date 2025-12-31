<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';

	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import MemberCollection from '$lib/components/layout/MemberCollection.svelte';

	const { data }: { data: PageData } = $props();
	const navbarData = $derived(data.navbarData);
	const heroData = $derived(data.heroData);
	const clubs = $derived(data.clubs);
	const selectedClub = $derived(data.selectedClub);

</script>

<Header {selectedClub} {clubs} {navbarData} />
<Hero {heroData} />

{#if selectedClub.members}
	<section class="m-auto my-16 flex w-11/12 flex-col gap-8">
		<MemberCollection members={selectedClub.members} />
		<Separator />
	</section>
{/if}

<Footer {selectedClub} {clubs} />
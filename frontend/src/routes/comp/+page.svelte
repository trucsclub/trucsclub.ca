<script lang="ts">
	import type Club from '$lib/types/club';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import clubs from '$lib/data/clubs.json';
	import page from '$lib/data/pages/comp.json';
	const navbarData = page.navbar;

	const selectedClub: Club | undefined = clubs.comp;
</script>

<Header {selectedClub} {clubs} {navbarData} />
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Footer />

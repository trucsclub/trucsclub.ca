<script lang="ts">
	import type Club from '$lib/types/club';
	import Header from '$lib/components/layout/Header.svelte';

	import clubs from '$lib/data/clubs.json';
	import page from '$lib/data/pages/home.json';

	const selectedClub: Club | undefined = undefined;
</script>

<Header {selectedClub} {clubs} navbar={page.navbar} />
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

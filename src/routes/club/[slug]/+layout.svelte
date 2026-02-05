<script lang="ts">
    import type { PageData } from './$types';
	let { children, data }: { children: () => any, data: PageData } = $props();

    const clubs = $derived(data.clubs);
	const slug = $derived(data.slug);
    const selectedClub = $derived(clubs[slug]);
</script>

<svelte:head>
	<title>
		{selectedClub.name}
	</title>
</svelte:head>
{@render children()}
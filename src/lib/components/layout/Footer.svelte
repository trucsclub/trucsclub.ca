<script lang="ts">
	// This file was AI generated on 2025/December/28th.
	// The +page.svelte file, along with Header.svelte and clubs.json was given as reference material.

	import { H4, P } from '$lib/components/ui/typography/index.js';
	import { Link } from '$lib/components/ui/link/index.js';
	import type { Club, ClubKey, Social } from '$lib/types/club';

	const { selectedClub, clubs }: { selectedClub: Club | undefined; clubs: Record<ClubKey, Club> } = $props();

	// Optionally, general site links
	const siteLinks = [
		{ title: 'Home', url: '/' },
		// { title: 'About TRU Computing', url: '/about' },
		// { title: 'Contact', url: '/contact' }
	];

	// Gather all social links from clubs
	const socials: Record<string, Social> | undefined = $derived(selectedClub?.socials);
</script>

<footer class="border-t bg-background px-6 py-8">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
		<!-- Club links -->
		<div>
			<H4>Clubs</H4>
			<ul class="mt-4 space-y-2">
				{#each Object.entries(clubs) as [slug, club]}
					<li>
						<Link href={`/club/${slug}`}>
							<div class="flex items-center gap-2">
								<img src={club.image} alt={club.name} class="h-6 w-6 rounded-sm object-contain" />
								<span>{club.name}</span>
							</div>
						</Link>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Social links -->
		{#if socials}
			<div>
				<H4>Socials</H4>
				<ul class="mt-4 flex flex-col gap-2">
					{#if socials}
						{#each Object.values(socials) as element}
							<li>
								<Link href={element.url}>
									<div class="flex items-center gap-2">
										{#if element.image}
											<img src={element.image} alt={element.title} class="h-6 w-6 rounded-sm object-contain" />
										{/if}
										<span>{element.title}</span>
									</div>
								</Link>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}

		<!-- Site / info links -->
		<div>
			<H4>Site</H4>
			<ul class="mt-4 space-y-2">
				{#each siteLinks as link}
					<li>
						<Link href={link.url}>{link.title}</Link>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- <div class="mt-8 text-center text-sm text-muted-foreground">
		<P>&copy; {new Date().getFullYear()} TRU Computing. All rights reserved.</P>
	</div> -->
</footer>

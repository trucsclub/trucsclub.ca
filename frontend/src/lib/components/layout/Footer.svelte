<script lang="ts">
	// This file was AI generated on 2025/December/28th.
	// The +page.svelte file, along with Header.svelte and clubs.json was given as reference material.

	import { H4, P } from '$lib/components/ui/typography/index.js';
	import { Link } from '$lib/components/ui/link/index.js';
	import type { Club } from '$lib/types/club';

	export let clubs: Record<string, Club>;

	// Optionally, general site links
	const siteLinks = [
		{ title: 'Home', url: '/' },
		{ title: 'About TRU Computing', url: '/about' },
		{ title: 'Contact', url: '/contact' }
	];

	// Gather all social links from clubs
	const socialLinks = Object.values(clubs).flatMap((club) => (club.socials ? Object.values(club.socials) : []));
</script>

<footer class="border-t bg-background px-6 py-8">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
		<!-- Club links -->
		<div>
			<H4>Clubs</H4>
			<ul class="mt-4 space-y-2">
				{#each Object.values(clubs) as club}
					<li>
						<Link href={club.url}>
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
		<div>
			<H4>Socials</H4>
			<ul class="mt-4 flex flex-col gap-2">
				{#each socialLinks as social}
					<li>
						<Link href={social.url}>
							<div class="flex items-center gap-2">
								{#if social.image}
									<img src={social.image} alt={social.title} class="h-6 w-6 rounded-sm object-contain" />
								{/if}
								<span>{social.title}</span>
							</div>
						</Link>
					</li>
				{/each}
			</ul>
		</div>

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

	<div class="mt-8 text-center text-sm text-muted-foreground">
		<P>&copy; {new Date().getFullYear()} TRU Computing. All rights reserved.</P>
	</div>
</footer>

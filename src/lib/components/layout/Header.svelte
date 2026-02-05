<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import H3 from '../ui/typography/H3.svelte';
	import type { Club, ClubKey } from '$lib/types/club';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import type { HeaderElement } from '$lib/types/page';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';

	const isMobile = new IsMobile();

	const { selectedClub, clubs, navbarData }: { selectedClub: Club | undefined; clubs: Record<ClubKey, Club>; navbarData: HeaderElement[] } = $props();
	const socials: Record<string, Social> | undefined = $derived(selectedClub?.socials);
	// Give TRU Computing a logo when selectedClub == undefined.

	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import type { Social } from '$lib/types/club';
	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string | undefined;
	};

	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
</script>

{#snippet ContentEntry({ title, content, href, class: className, ...restProps }: ListItemProps)}
	<li>
		<NavigationMenu.Link>
			{#snippet child()}
				<a {href} class={cn('block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', className)} {...restProps}>
					<div class="text-sm leading-none font-medium">{title}</div>
					{#if content}
						<p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{content}
						</p>
					{/if}
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

{#snippet NavigationBar({ navbarData, class: className, ...restProps }: HTMLAttributes<HTMLAnchorElement> & { navbarData: HeaderElement[] })}
	<NavigationMenu.Root viewport={isMobile.current}>
		<NavigationMenu.List class="flex-wrap">
			{#each navbarData as element}
				<NavigationMenu.Item>
					{#if element.title == "Calendar"}
						<Dialog.Root >
							<Dialog.Trigger class={navigationMenuTriggerStyle()}>Calendar</Dialog.Trigger>
							<Dialog.Content class="">
								<Dialog.Header>
									<Dialog.Title>Club Calendar</Dialog.Title>
									<Dialog.Description>
										Live club calendar in case event cards stop working.
									</Dialog.Description>
								</Dialog.Header>
								<div class="grid gap-4">
									<iframe class="border-2 w-3xl h-160" title="Club Calendar from Google" src="{element.url}" scrolling="no"></iframe>
								</div>
							</Dialog.Content>
						</Dialog.Root>
					{:else if element.entries}
						<NavigationMenu.Trigger class={buttonVariants({ variant: "secondary" })}>{element.title}</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							{#if element.entries.some((entry) => 'image' in entry)}
								<ul class="grid gap-2 p-2 md:w-96 lg:w-lg lg:grid-cols-[1fr_1fr]">
									{#each element.entries as entry}
										{#if entry.image}
											<li class="row-span-3">
												<NavigationMenu.Link>
													{#snippet child()}
														<a href="/" class={cn('relative flex h-full w-full flex-col justify-end overflow-hidden rounded-md p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6')} {...restProps}>
															<div class="absolute inset-0 bg-cover bg-center" style={`background-image: url(${entry.image});`}></div>
															<div class="absolute inset-0 bg-linear-to-b from-muted/20 to-muted"></div>
															<div class="relative">
																<div class="mt-4 mb-2 text-lg font-medium">
																	{entry.title}
																</div>
																<p class="text-sm leading-tight text-muted-foreground">
																	{entry.content}
																</p>
															</div>
														</a>
													{/snippet}
												</NavigationMenu.Link>
											</li>
										{:else}
											{@render ContentEntry({ href: entry.url, title: entry.title, content: entry.content })}
										{/if}
									{/each}
								</ul>
							{:else}
								<ul class="grid w-75 gap-4 p-2">
									{#each element.entries as entry}
										{@render ContentEntry({ href: entry.url, title: entry.title, content: entry.content })}
									{/each}
								</ul>
							{/if}
						</NavigationMenu.Content>
					{:else}
						<NavigationMenu.Link>
							{#snippet child()}
								<a href={element.url} class={navigationMenuTriggerStyle()}>{element.title}</a>
							{/snippet}
						</NavigationMenu.Link>
					{/if}
				</NavigationMenu.Item>
			{/each}
		</NavigationMenu.List>
	</NavigationMenu.Root>
{/snippet}

<header class="sticky top-0 z-50 border-b bg-background/60 py-4 shadow-sm backdrop-blur-sm">
	<div class="mx-auto grid w-22/23 max-w-7xl grid-cols-[auto_1fr_auto] gap-y-2 lg:items-center min-h-14">
		<!-- Club selector -->
		<div class="col-start-1 row-start-1">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" href="/" class="h-12">
							{#if selectedClub}
								<img class="h-12 w-12 shrink-0 rounded-sm object-contain" src={selectedClub?.image ?? '/'} alt="" />
							{/if}
							<H3 class="hidden sm:block">{selectedClub?.name ?? 'TRU Computing'}</H3>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-64" align="start">
					<DropdownMenu.Item class="cursor-pointer">
						{#snippet child({ props })}
							<a href={`/`} {...props}>
								<!-- <img class="h-8 w-8 shrink-0 rounded-sm object-contain" src={"/"} alt="" /> -->
								<span class="truncate">Home</span>
							</a>
						{/snippet}
					</DropdownMenu.Item>
					<DropdownMenu.Separator/>
					<DropdownMenu.Label>Clubs</DropdownMenu.Label>
					<DropdownMenu.Group>
						
						{#each Object.entries(clubs) as [slug, club]}
							<DropdownMenu.Item class="cursor-pointer">
								{#snippet child({ props })}
									<a href={`/club/${slug}`} {...props}>
										<img class="h-8 w-8 shrink-0 rounded-sm object-contain" src={club.image} alt="" />
										<span class="truncate">{club.name}</span>
									</a>
								{/snippet}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<!-- Header navigation bar -->
		<div class="col-start-2 sm:col-start-1 row-start-1 sm:row-start-2 lg:col-start-2 lg:row-start-1 flex justify-end lg:justify-start">
			{@render NavigationBar({ navbarData })}
		</div>

		<!-- Div to group socials and theme -->
		<div class="col-start-3 row-start-1 justify-end hidden sm:flex">
			<NavigationMenu.Root viewport={isMobile.current}>
				<NavigationMenu.List class="flex-wrap">
					{#if socials}
						<!-- Header socials -->
						{#each Object.values(socials) as element}
							<NavigationMenu.Item>
								<NavigationMenu.Link>
									{#snippet child({ props })}
										{#if element.image}
											<Button {...props} variant="ghost" size="icon-lg" href={element.url}>
												<img class="shrink-0 rounded-sm object-contain" src={element.image} alt="" />
											</Button>
										{:else}
											<a {...props} href={element.url} class={navigationMenuTriggerStyle()}>{element.title}</a>
										{/if}
									{/snippet}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/each}
					{/if}
					<NavigationMenu.Item>
						<!-- Theme selector -->
						<Button onclick={toggleMode} variant="outline" size="icon" class="mx-2">
							<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
							<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
							<span class="sr-only">Toggle theme</span>
						</Button>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
	</div>
</header>

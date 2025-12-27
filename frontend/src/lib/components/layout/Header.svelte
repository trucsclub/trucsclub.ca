<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import H3 from '../ui/typography/H3.svelte';
	import type Club from '$lib/types/club';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import type { HeaderElement } from '$lib/types/page';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';

	const isMobile = new IsMobile();

	let { selectedClub, clubs, navbar }: { selectedClub: Club | undefined; clubs: Record<string, Club>; navbar: HeaderElement[] } = $props();
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



{#snippet NavigationBar({ navbar, class: className, ...restProps }: HTMLAttributes<HTMLAnchorElement> & {navbar: HeaderElement[]})}
    <NavigationMenu.Root viewport={isMobile.current}>
        <NavigationMenu.List class="flex-wrap">
            {#each navbar as element}
                <NavigationMenu.Item>
                    {#if element.entries}
                        <NavigationMenu.Trigger>{element.title}</NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            {#if element.entries.some((entry) => 'image' in entry)}
                                <ul class="grid gap-2 p-2 md:w-96 lg:w-lg lg:grid-cols-[1fr_1fr]">
                                    {#each element.entries as entry}
                                        {#if entry.image}
                                            <li class="row-span-3">
                                                <NavigationMenu.Link>
                                                    {#snippet child()}
                                                        <a href="/" class={cn("relative flex h-full w-full flex-col justify-end overflow-hidden rounded-md p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6")} {...restProps}>
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




<header class="sticky border-b py-2 shadow-sm">
	<div class="mx-auto w-11/12 max-w-7xl grid grid-cols-[auto_1fr_auto] gap-y-2 lg:items-center">
		<!-- Club selector -->
        <div class="col-start-1 row-start-1">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    {#snippet child({ props })}
                        <Button {...props} variant="ghost" href="/" class="h-12">
                            {#if selectedClub}
                                <img class="h-12 w-12 shrink-0 rounded-sm object-contain" src={selectedClub?.logo ?? '/'} alt="" />
                            {/if}
                            <H3>{selectedClub?.name ?? 'TRU Computing'}</H3>
                        </Button>
                    {/snippet}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content class="w-64" align="start">
                    <DropdownMenu.Label>Clubs</DropdownMenu.Label>
                    <DropdownMenu.Group>
                        {#each Object.values(clubs) as club}
                            <DropdownMenu.Item class="cursor-pointer">
                                {#snippet child({ props })}
                                    <a href={club.url} {...props}>
                                        <img class="h-8 w-8 shrink-0 rounded-sm object-contain" src={club.logo} alt="" />
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
        <div class="col-span-3 row-start-2 lg:col-start-2 lg:row-start-1">
            {@render NavigationBar({ navbar })}
        </div>

        <!-- Div to group socials and theme -->
        <div class="col-start-3 row-start-1 flex justify-end">
            <NavigationMenu.Root viewport={isMobile.current}>
                <NavigationMenu.List class="flex-wrap">
                    {#if socials}
                        <!-- Header socials -->
                        {#each Object.values(socials) as element}
                            <NavigationMenu.Item>
                                <NavigationMenu.Link>
                                    {#snippet child({ props })}
                                        {#if element.logo}
                                            <Button {...props} variant="ghost" size="icon-lg" href={element.url}>
                                                <img class="shrink-0 rounded-sm object-contain" src={element.logo} alt="" />
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

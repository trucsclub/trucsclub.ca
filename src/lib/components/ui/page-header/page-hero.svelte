<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';

	const { image, size, children, class: className, ...rest }: { image?: string | undefined; size?: string | undefined; children: () => any } & HTMLAttributes<HTMLElement> = $props();

	let sectionEl = $state<HTMLElement>();
	let bgEl = $state<HTMLElement>();

	const HEADER_HEIGHT_REM = 32;
	const HEADER_HEIGHT_PX = HEADER_HEIGHT_REM * 4;
	function onScroll() {
		if (!sectionEl || !bgEl) return;

		const rect = sectionEl.getBoundingClientRect();

		// Start scrolling once header bottom reaches hero
		const rawScrolled = HEADER_HEIGHT_PX - rect.top;

		const scrolled = Math.min(Math.max(rawScrolled, 0), rect.height);

		const extraHeight = bgEl.offsetHeight - rect.height;

		const speed = 0.25;

		const translateY = -Math.min(scrolled * speed, extraHeight);

		bgEl.style.transform = `translateY(${translateY}px)`;
	}

	onMount(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section bind:this={sectionEl} class={cn('border-grid relative overflow-hidden', className)} {...rest}>
	{#if image}
		<div bind:this={bgEl} class="absolute inset-x-0 h-[150%] bg-cover bg-center bg-no-repeat will-change-transform" style={`background-image: url("${image}")`}></div>

		<div class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 to-transparent backdrop-blur-sm"></div>
	{:else}
		<div class="pointer-events-none absolute inset-0 bg-linear-to-t from-background/50 to-transparent backdrop-blur-sm"></div>
	{/if}

	<!-- Optional noise overlay -->
	<div class="pointer-events-none absolute inset-0">
		<svg class="h-full w-full" preserveAspectRatio="none">
			<filter id="noise">
				<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
			</filter>
			<rect width="100%" height="100%" filter="url(#noise)" opacity="0.12" />
		</svg>
	</div>

	{#if size == 'large'}
		<div class="container-wrapper relative min-h-80 md:min-h-96 lg:min-h-112 xl:min-h-128">
			<div class="container m-auto flex max-w-7/8 flex-col items-center gap-2 py-24 text-center md:py-28 lg:py-32 xl:gap-4">
				{@render children()}
			</div>
		</div>
	{:else}
		<div class="container-wrapper relative min-h-68 md:min-h-72 lg:min-h-76 xl:min-h-80">
			<div class="container m-auto flex max-w-7/8 flex-col items-center gap-2 py-16 text-center md:py-20 lg:py-24 xl:gap-4">
				{@render children()}
			</div>
		</div>
	{/if}
</section>
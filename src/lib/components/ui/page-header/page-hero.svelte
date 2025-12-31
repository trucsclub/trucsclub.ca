<!-- <script lang="ts">
	import { cn } from "$lib/utils";
	const { image, children, class: className, ...rest }: {image: string, children: () => any} = $props();

</script>

<section
	class={cn("border-grid bg-cover bg-center bg-no-repeat", className)}
	style={`background-image: url("${image}")`}
	{...rest}
>
	<div class="container-wrapper">
		<div class="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
			{@render children()}
		</div>
	</div>
</section> -->

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	const { image, children, class: className, ...rest }: { image?: string | undefined; children: () => any } & HTMLAttributes<HTMLElement> = $props();
</script>

<section class={cn('border-grid relative', className)} {...rest}>
	<!-- Blur gradient overlay -->
	{#if image}
		<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style={`background-image: url("${image}")`}></div>
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

	<div class="container-wrapper relative min-h-68 md:min-h-72 lg:min-h-76 xl:min-h-80">
		<div class="container m-auto flex max-w-7/8 flex-col items-center gap-2 py-16 text-center md:py-20 lg:py-24 xl:gap-4">
			{@render children()}
		</div>
	</div>
</section>

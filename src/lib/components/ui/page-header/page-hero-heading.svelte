<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import H1 from '../typography/H1.svelte';
	const { children, class: className, ...rest }: { children: () => any } & HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<H1 class={cn('leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance text-primary lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tight', className)} {...rest}>
	{@render children()}
</H1>

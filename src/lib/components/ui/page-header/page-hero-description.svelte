<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import P from '../typography/P.svelte';
	const { children, class: className, ...rest }: { children: () => any } & HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<P class={cn('max-w-3xl text-base text-balance text-foreground sm:text-lg', className)} {...rest}>
	{@render children()}
</P>

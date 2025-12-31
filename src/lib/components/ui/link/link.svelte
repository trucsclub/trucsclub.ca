<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { children, class: className, ...rest }: HTMLAnchorAttributes = $props();
</script>

<a {...rest} class={cn('font-medium text-foreground underline underline-offset-4', className)}>
	{@render children?.()}
</a>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	const { children, class: className, ...rest }: { children: () => any } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none', className)} {...rest}>
	{@render children()}
</div>

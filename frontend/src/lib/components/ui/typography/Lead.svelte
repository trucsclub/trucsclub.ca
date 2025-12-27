<script lang="ts">
	import { cn } from '$lib/utils';

	const {
		class: className,
		children,
		...rest
	} = $props<{
		class?: string;
		children?: () => unknown;
	}>();
</script>

<p class={cn('text-xl text-muted-foreground', className)} {...rest}>
	{@render children?.()}
</p>

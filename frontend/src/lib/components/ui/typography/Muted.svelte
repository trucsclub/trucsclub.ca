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

<span class={cn('text-sm text-muted-foreground', className)} {...rest}>
	{@render children?.()}
</span>

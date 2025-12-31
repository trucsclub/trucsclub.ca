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

<blockquote class={cn('mt-6 border-l-2 pl-6 text-muted-foreground italic', className)} {...rest}>
	{@render children?.()}
</blockquote>

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

<h4 class={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...rest}>
	{@render children?.()}
</h4>

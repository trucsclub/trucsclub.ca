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

<div class={cn('text-lg font-semibold', className)} {...rest}>
	{@render children?.()}
</div>

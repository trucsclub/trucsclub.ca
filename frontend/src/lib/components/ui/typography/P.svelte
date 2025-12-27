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

<p class={cn('leading-7 not-first:mt-6', className)} {...rest}>
	{@render children?.()}
</p>

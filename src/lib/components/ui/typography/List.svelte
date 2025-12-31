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

<ul class={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...rest}>
	{@render children?.()}
</ul>

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

<h2 class={cn('scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight first:mt-0', className)} {...rest}>
	{@render children?.()}
</h2>

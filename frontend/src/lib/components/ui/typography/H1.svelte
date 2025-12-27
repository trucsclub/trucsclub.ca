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

<h1 class={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...rest}>
	{@render children?.()}
</h1>

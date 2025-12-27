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

<code class={cn('relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)} {...rest}>
	{@render children?.()}
</code>

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

<pre class={cn('relative overflow-x-auto rounded-sm bg-muted p-4 font-mono text-sm font-semibold', className)} {...rest}>
	{@render children?.()}
</pre>

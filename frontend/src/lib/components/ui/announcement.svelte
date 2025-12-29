<script lang="ts">
	// import ArrowRightIcon from "lucide-svelte/icons/arrow-right";
	import { Badge } from './badge/index.js';
	const { ...rest } = $props();
</script>

<Badge variant="secondary" class="bg-transparent" {...rest}>
	<a href="/docs/changelog" class="flex items-center gap-1">
		<span class="flex size-2 rounded-full bg-blue-500" title="New"></span>
		<p class="inline">Important event here</p>
		<!-- <ArrowRightIcon /> -->
	</a>
</Badge>

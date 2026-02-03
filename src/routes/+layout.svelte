<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data } = $props();
</script>

<svelte:head>
<link rel="icon" href={favicon} />
<title>
		{data?.heroData?.title || data?.hero?.title || 'TRU Computing'}
	</title>
</svelte:head>
<ModeWatcher />
{@render children()}

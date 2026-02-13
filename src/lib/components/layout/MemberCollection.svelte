<script lang="ts">
	import type { Member } from '$lib/types/club';
	import MemberCard from './MemberCard.svelte';

	let { members }: { members: Member[] } = $props();
</script>

<div class="flex flex-wrap justify-center gap-8">
	{#each members as member}
        {#if member.url}
            <a href={member.url} class="duration-150 hover:scale-105">
                <MemberCard {member} />
            </a>
        {:else}
            <MemberCard {member} />
        {/if}
	{/each}
</div>
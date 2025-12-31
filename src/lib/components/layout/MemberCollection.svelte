<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { H3, P, Small } from '$lib/components/ui/typography/index.js';
	import type { Member } from '$lib/types/club';

	let { members }: { members: Member[] } = $props();
</script>

<div class="flex flex-wrap justify-center gap-8">
	{#each members as member}
        <Card.Root class="min-h-96 min-w-80">
            <Card.Content class="flex aspect-square flex-col items-center justify-center gap-4">
                <img src={member.image} alt="" class="relative flex size-48 shrink-0 overflow-hidden rounded-full" />
                <div>
                    <div class="flex gap-4 items-center">
                        <H3 class="flex-3">{member.name}</H3>
                        <Small>{member.position}</Small>
                    </div>
                    <P>{member.description}</P>
                </div>
            </Card.Content>
        </Card.Root>
	{/each}
</div>
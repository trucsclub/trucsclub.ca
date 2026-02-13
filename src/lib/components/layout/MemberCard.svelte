<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { H3, P } from '$lib/components/ui/typography/index.js';
	import type { Member } from '$lib/types/club';
    import { Badge } from '$lib/components/ui/badge/index.js';
    import * as Avatar from "$lib/components/ui/avatar/index.js";

	let { member }: { member: Member } = $props();

    function getInitials(name: string): string {
        return name
            .split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .join('');
    }
</script>

<Card.Root class="min-h-96 w-88 lg:w-92">
    <Card.Content class="flex aspect-square flex-col items-center justify-center gap-4">
        <Avatar.Root class="size-48">
            <Avatar.Image class="object-cover" src={member.image} alt={member.name} />
            <Avatar.Fallback class="bg-background text-4xl font-bold">{getInitials(member.name)}</Avatar.Fallback>
        </Avatar.Root>
        <!-- <img src={member.image} alt="" class="relative flex size-48 shrink-0 overflow-hidden rounded-full object-cover" /> -->
        <div>
            <div class="flex gap-4 items-center">
                <H3 class="flex-3">{member.name}</H3>
                <Badge variant="default">{member.position}</Badge>
            </div>
            <P>{member.description}</P>
        </div>
    </Card.Content>
</Card.Root>
import type { ClubKey } from "$lib/types/club";
import type { HeaderElement } from "$lib/types/page";

export function normalizeNavbarUrl(item: HeaderElement, slug: ClubKey): HeaderElement {
    if (!item.url) return item;
    if (item.url.startsWith(`/`)) return { ...item, url: `/club/${slug}${item.url}`};
    return item;
}

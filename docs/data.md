# Data overview

This page is a short index that points to the focused content docs for editing site data.

- Field reference: [docs/data-attributes.md](/docs/data-attributes.md) — describes all attributes available for `src/lib/data/clubs.json` and `src/lib/data/projects.json`.
- Pages & header (navbar): [docs/pages.md](/docs/pages.md) — how to create or edit home and club pages and header dropdowns. See the copy-paste `main.json` template: [docs/templates/club-main.json](/docs/templates/club-main.json).
- Templates & examples: [docs/templates.md](/docs/templates.md) — JSON templates and example files you can copy or reference (e.g., `clubs-example.json`, `projects-example.json`).
- Images & accessibility: [docs/images.md](/docs/images.md) — where to put hero/member/logo/project images and how to reference them.
- Events (calendar JSON): [docs/events.md](/docs/events.md) — how to add a `<json>...</json>` block to Google Calendar event descriptions and parsing notes.

> Tip: Files with the `-example.json` suffix are templates and are not used by the site. They show structure only.

**Important:** Add any new club key to [`src/lib/data/clubs.json`](/src/lib/data/clubs.json) — the club keys defined there are used across pages, events, and projects.

# Data attributes reference

This reference lists the available attributes you can use in [`src/lib/data/clubs.json`](/src/lib/data/clubs.json) and [`src/lib/data/projects.json`](/src/lib/data/projects.json) and shows example usage.

---

## clubs.json — attributes
This file defines all club entries and is the authoritative source of club keys used throughout the site.

Top-level shape:
```json
{
  "<clubKey>": {
    "name": "string",
    "image": "string",
    "calendar": { "id": "string", "email": "string" },
    "socials": { "platform": { "url": "string", "title": "string?", "image": "string?" } },
    "contact": { "<key>"|"phone"|"email": { "address": "string", "title": "string" } },
    "members": [ { "name": "string", "position": "string", "description": "string", "image": "string?" } ]
  }
}
```

Field details:

- `name` (string) — Friendly club name displayed on the site.
- `image` (string) — URL or path to the club image or logo (used in the club selector and cards). Prefer `/images/logos/<file>` or a full URL.
- `calendar` (object) — Google Calendar ID and email used to fetch events for the club.
  ```json
  { "id": "...@group.calendar.google.com", "email": "example@gmail.com" }
  ```
- `socials` (object, optional) — Map of social platforms to social data. Each social has two variants:
  - With logo:
    ```json
    { "url": "https://...", "title": "Platform Name", "image": "https://..." }
    ```
  - Without logo (logo missing):
    ```json
    { "url": "https://...", "title": "Platform Name" }
    ```
  Any entries with `image` are displayed as image buttons in the header; entries without `image` fall back to text links.
- `contact` (object, optional) — Map of contact entries. Each value is an object with `address` and `title`.
- `members` (array, optional) — Array of member objects:
  - `name` (string) — Member's name.
  - `position` (string) — Role or title (e.g., "President").
  - `description` (string) — Short bio/description.
  - `image` (string, optional) — Path or URL to a portrait; prefer `/images/members/<file>`.

Example club entry:
```json
"comp": {
  "name": "Computing Science",
  "image": "/images/logos/comp.png",
  "calendar": { "id": "...@group.calendar.google.com", "email": "string" },
  "socials": {
    "discord": { "url": "https://discord.gg/...", "title": "Discord", "image": "https://...svg" }
  },
  "members": [ { "name": "Aidan", "position": "Web Dev", "description": "...", "image": "/images/members/Aidan_Chan.jpg" } ]
}
```

Notes & best practices:
- To add a new club key (e.g., `photography`), add the club object to [`src/lib/data/clubs.json`](/src/lib/data/clubs.json); this key is used by events, pages, and other data.
- Use absolute site-root paths starting with `/images/` for images stored in `static/images/` so they resolve correctly in the build.
- `*-example.json` files are templates only and are not consumed by the site. See the template examples at [docs/templates.md](/docs/templates.md) for ready-made starter files you can copy.


---

## projects.json — attributes
Projects data is optionally keyed per club and used to display club projects and highlight a top project.

Top-level shape (per club):
```json
{
  "<clubKey>": {
    "top": "<projectKey>",
    "projects": {
      "<projectKey>": {
        "title": "string",
        "description": "string",
        "image": "string",
        "url": "string"
      }
    }
  }
}
```

Field details:

- `top` (string, optional) — The project key to use as the club's top (featured) project.
- `projects` (object) — Map of project keys to `Project` objects.

Project object fields:
- `title` (string) — Project title.
- `description` (string) — Short summary.
- `image` (string) — Image URL or site path for the project. Use `/images/...` for files in `static/images/` or an external URL.
- `url` (string) — Link to project details; may be internal (`/club/comp/project/xyz`) or external (`https://...`).

Example projects entry:
```json
"comp": {
  "top": "skillbridge",
  "projects": {
    "skillbridge": { "title": "SkillBridge", "description": "...", "image": "/images/projects/skillbridge.jpg", "url": "https://github.com/TRU-Enactus/SkillBridge" }
  }
}
```

Notes:
- The TypeScript interfaces for projects are in [src/lib/types/project.ts](/src/lib/types/project.ts) if you want to see types or use editor autocompletion.
- The event object type is in [src/lib/types/event.ts](/src/lib/types/event.ts) and the `<json>` block is parsed in [src/lib/server/events.ts](/src/lib/server/events.ts).

For event JSON overrides and parsing details see [docs/events.md](/docs/events.md).

---

## Quick checklist before publishing
- Add any new club key to [`src/lib/data/clubs.json`](/src/lib/data/clubs.json).
- Put member/hero/logo images into [`static/images/members/`](/static/images/members/), [`static/images/heros/`](/static/images/heros/), or [`static/images/logos/`](/static/images/logos/).
- Reference images with a leading `/images/` path in JSON files.
- Validate JSON (tools or your editor will help) — invalid JSON will cause the site to fail to parse that file.

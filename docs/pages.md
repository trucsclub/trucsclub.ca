# Pages & header (navbar) guide

This file documents the page JSON structure (home and club pages) and how header/navbar items work.

## Where page content lives
- Home page: [`src/lib/data/pages/home.json`](/src/lib/data/pages/home.json)
- Club pages: [`src/lib/data/pages/<slug>/main.json`](/src/lib/data/pages/<slug>/main.json) (where `<slug>` is the club key defined in [`src/lib/data/clubs.json`](/src/lib/data/clubs.json)).

Copy-paste template: see [`docs/templates/club-main.json`](/docs/templates/club-main.json) or the JSON template at `docs/templates/club-main.json`.

## Page JSON structure
Every page file follows the `Page` interface (`src/lib/types/page.ts`):

```json
{
  "navbar": [ /* Header elements */ ],
  "hero": {
    "title": "...",
    "content": "...",
    "color": "white",
    "image": "/images/heros/your-hero.jpg"
  }
}
```

### Navbar elements (HeaderElement)
`navbar` is an array of `HeaderElement` objects of two shapes:

- Link (simple link):
```json
{ "title": "Members", "url": "/members" }
```

- Dropdown (menu):
```json
{ "title": "Resources", "entries": [ /* LinkBox objects */ ] }
```

`LinkBox` structure (items inside a dropdown):
```json
{
  "title": "Get started",
  "content": "Short description",
  "url": "/getting-started",
  "image": "/images/some-image.jpg"
}
```

Behavior notes:
- If any entry in a dropdown has an `image` property, the header displays that dropdown as an image grid; otherwise it renders a simple text list.
- For club page navbars, if a `url` starts with `/` it is `normalized` to the club path at runtime, e.g. on `comp`:
  - `{ "title": "Members", "url": "/members" }` → becomes `/club/comp/members`.
  - External URLs (`https://...`) are left as-is.

### Examples
- Simple link:
```json
{ "title": "Members", "url": "/members" }
```

- Dropdown with images:
```json
{
  "title": "Resources",
  "entries": [
    { "title": "Docs", "content": "How to...", "url": "/docs", "image": "/images/navbar/docs.jpg" },
    { "title": "Sign up", "content": "Registration form", "url": "https://form.example" }
  ]
}
```

### Where to check types
- `src/lib/types/page.ts` defines `Page`, `HeaderElement`, `Hero`, and related shapes.

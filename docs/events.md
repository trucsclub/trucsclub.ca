# Events — JSON overrides & best practices

Use a `<json>...</json>` block inside a Google Calendar event description to override or extend the event object the site uses.

## Where to put the block
Place the block anywhere in the event **description**:

```html
<json>
  { "clubs": ["comp","cyber"], "url": "https://signup.example" }
</json>

...visible description text...
```

Anything inside `<json>...</json>` is parsed and merged into the event the site displays.

## Fields you can override
Most top-level event fields are valid to override. Common fields:

- `clubs` (string[]) — replace the derived single club with multiple club slugs (e.g. `["comp","cyber"]`). Club slugs must match keys in [`src/lib/data/clubs.json`](src/lib/data/clubs.json).
- `title` (string)
- `description` (string) — short description only; long paragraphs should be kept outside the JSON block so they remain visible on the event page
- `time` (object|null) — replace event times: `{ "start": "2026-03-01T18:00:00", "end": "2026-03-01T20:00:00", "timeZone": "America/Vancouver" }` or `null` to remove time
- `location` (string)
- `image` (object|null) — mergeable object: `{ "url": "https://...", "has_info": true|false }` (the server merges this with any detected attachment image)
- `url` (string|null)
- `repeat` (object) — `{ "every": number, "unit": "hours" | "days" | "weeks", "times": number }`
- `is_meeting` (boolean)

## Parsing behaviour & formatting tips
- The server decodes basic HTML entities and converts `<br/>` tags to newlines before cleaning the JSON block.
- HTML tags inside the `<json>` block are removed before parsing.
- IMPORTANT: The current parser removes all whitespace (including spaces inside strings) inside the `<json>` block before parsing. Because of this, multi-word strings inside JSON values may lose spaces. To avoid this:
  - Keep JSON values short (single words) or use hyphens/underscores.
  - Place long, human-readable content in the visible description (outside the `<json>` block).
- Use valid JSON syntax (double quotes for keys and string values).
- Invalid JSON in the block is logged and ignored; the rest of the description will still display.

## Example
```html
<json>
{"clubs":["comp","cyber"],"url":"https://register.example"}
</json>

Come join us for a hands-on session. Free snacks provided.
```

The JSON block is removed from the visible description and the rest is shown to visitors.

## Accessibility note
If you set `"image":{"has_info":true}`, the card will hide textual details (title/description/time/location/club) — ensure the image and linked pages provide equivalent accessibility (e.g., alt text on the image and an accessible event page).

## Where this is implemented
- Parsing and merge logic: [`src/lib/server/events.ts`](src/lib/server/events.ts)
- Event type: [`src/lib/types/event.ts`](src/lib/types/event.ts)

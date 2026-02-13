# Event JSON snippets — copy & paste

Quick, copy-paste-ready `<json>...</json>` snippets you can add to a Google Calendar event description.

---

### 1) Make an event appear on multiple clubs + link to register
```html
<json>
{"clubs":["comp","cyber"],"url":"https://signup.example"}
</json>
```

### 2) Override/replace the event image
```html
<json>
{"image":{"url":"https://example.com/pic.jpg"}}
</json>
```

### 3) Use a large image and hide card text (use carefully)
```html
<json>
{"image":{"url":"/images/heros/event.jpg","has_info":true},"url":"https://register.example"}
</json>
```

### 4) Remove the event time (set to null)
```html
<json>
{"time":null}
</json>
```

### 5) Mark as a meeting
```html
<json>
{"is_meeting":true}
</json>
```

---

Notes:
- Always use valid JSON (double quotes for keys and strings).
- Avoid putting long multi-word phrases inside JSON values (whitespace removal can merge words); put those phrases in the visible description below the JSON block.
- If your JSON is invalid the block will be ignored and the visible description will still be shown.

For full parsing details and best practices see [docs/events.md](/docs/events.md).
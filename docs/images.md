# Images guide

Where to put images and how to reference them in JSON files.

## Static image locations
Store site images under `static/images/` with suggested subfolders:
- `static/images/heros/` — hero/cover images for pages
- `static/images/members/` — member portraits
- `static/images/logos/` — club logos
- `static/images/projects/` — project previews or banners

Use site-root absolute paths in JSON (leading slash):
- Hero: `/images/heros/your-hero.jpg`
- Member: `/images/members/jane-doe.jpg`
- Logo: `/images/logos/comp.png`

## Member images
Members are listed in `clubs.json` under each club's `members` array. Example:
```json
"members": [
  {
    "name": "Aidan Chan",
    "position": "Web Developer",
    "description": "Hunting bugs since 2002.",
    "image": "/images/members/Aidan_Chan.jpg"
  }
]
```

## Hero images
Set `hero.image` in `src/lib/data/pages/*` to point to your hero image:
```json
"hero": { "title": "Club", "image": "/images/heros/club-hero.jpg" }
```

## Project & navbar images
- Project images: link from `projects.json` via `image` field. Example: `/images/projects/skillbridge.jpg`.
- Navbar dropdowns can include an `image` in entries to display rich visual link boxes.

## Accessibility & performance
- Use reasonable image sizes for web (optimize or resize before uploading).
- If an event or card sets `"image":{"has_info":true}` it hides textual info on the card — ensure text and accessible equivalents exist elsewhere (e.g., accessible event page, descriptive alt text on images).

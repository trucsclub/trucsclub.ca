## TRU Computing
This website will be used for the computing clubs at Thompson Rivers University.
Content is currently defined in [`src/lib/data`](src/lib/data). Each club must define images and data to be shown on their respective pages. Available attributes should be able to be inferred from the existing json files. For anything that may be missing, see the [`src/lib/types`](src/lib/types) directory where available attributes are defined.

## Content & Docs
Detailed guidance for creating and updating content is available in the `docs/` folder:

- [`docs/events.md`](docs/events.md) — How to use `<json>...</json>` blocks in Google Calendar event descriptions to control event display (e.g., multiple clubs, image overrides) and parsing notes.
- [`docs/pages.md`](docs/pages.md) — How to add pages and create header/navbar dropdowns for clubs. Includes a copy-paste `main.json` template at [`docs/templates/club-main.json`](docs/templates/club-main.json) and other templates in [`docs/templates.md`](docs/templates.md).
- [`docs/images.md`](docs/images.md) — Where to place hero/member/logo/project images and accessibility guidance.
- [`docs/data-attributes.md`](docs/data-attributes.md) — Field reference for `clubs.json` and `projects.json`.

Please share these links with club owners so they can add content correctly.

## Initializing repo

```sh
git clone https://github.com/Aidanjosiah02/trucomputing.ca.git
cd trucomputing.ca
nvm install latest
nvm use latest

cd frontend
npm install
```

## start development server:

```sh
# ensure you're in the frontend directory first.
npm run dev
```

## Create production version:

```sh
# preview
npm run preview
#build
npm run build
```

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Installation result & packages

```
PS C:\Users\user\OneDrive - Thompson Rivers University\Documents\Vault\Projects\trucomputing.ca> npx sv create frontend

┌  Welcome to the Svelte CLI! (v0.11.0)
│
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, tailwindcss, mdsvex
│
◇  tailwindcss: Which plugins would you like to add?
│  none
│
◆  Project created
│
◆  Successfully setup add-ons: prettier, eslint, tailwindcss, mdsvex
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
│  npx sv create --template minimal --types ts --add prettier eslint tailwindcss="plugins:none" mdsvex --install npm frontend
│
│
◆  Successfully installed dependencies with npm
│
◇  Successfully formatted modified files
│
◇  What's next? ───────────────────────────────╮
│                                              │
│  📁 Project steps                            │
│                                              │
│    1: cd frontend                            │
│    2: npm run dev -- --open                  │
│                                              │
│  To close the dev server, hit Ctrl-C         │
│                                              │
│  Stuck? Visit us at https://svelte.dev/chat  │
│                                              │
├──────────────────────────────────────────────╯
│
└  You're all set!
```

### To-do

Check if page data currently is loading before or after rendering starts. If after, use a +page.ts module that exports a load function.

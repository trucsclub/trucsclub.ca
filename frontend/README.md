# Frontend

Insert words

## Initializing repo

```sh
git remote add origin https://github.com/Aidanjosiah02/trucomputing.ca.git
# fetch and switch to main.
nvm install latest
nvm use latest
npm install
# Then switch to your desired branch.

```

## start development server:

```sh
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

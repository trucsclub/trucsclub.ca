# Frontend

Insert words

## Initializing repo

```sh
git remote add origin https://github.com/Tru-Enactus/SkillBridge.git
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

## frontend

```
frontend/                              # SvelteKit (Svelte 5 + ShadCN-Svelte)
├── src/
│   ├── lib/
│   │   ├── api/                       # Fetchers for Go API
│   │   │   ├── auth.ts
│   │   │   ├── jobs.ts
│   │   │   ├── applications.ts
│   │   │   ├── payments.ts
│   │   │   ├── users.ts
│   │   │   └── disputes.ts
│   │   │
│   │   ├── stores/                    # Svelte stores (session, role, modals)
│   │   │   ├── session.ts
│   │   │   ├── role.ts
│   │   │   ├── toast.ts
│   │   │   └── modal.ts
│   │   │
│   │   ├── utils/                     # formatDate, debounce, roleGuard, etc.
│   │   ├── components/                # Shared UI library
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── templates/
│   │   └── types/                     # Shared TypeScript interfaces
│   │
│   ├── params/                        # Custom route matchers (validators)
│   │   ├── jobid.ts
│   │   ├── appid.ts
│   │   ├── userid.ts
│   │   └── uuid.ts
│   │
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +layout.server.ts          # SSR session loader
│   │   ├── +page.svelte               # Landing page
│   │   ├── +error.svelte
│   │   │
│   │   ├── auth/
│   │   │   ├── +page.svelte           # Combined login/register
│   │   │   └── +page.server.ts        # Calls Go API
│   │   │
│   │   ├── role/
│   │   │   └── +page.svelte
│   │   │
│   │   ├── dashboard/
│   │   │   ├── +layout.svelte
│   │   │   ├── +layout.server.ts      # Auth + role checks
│   │   │   ├── customer/
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── +page.svelte
│   │   │   │   │   ├── [jobid=jobid]/+page.svelte
│   │   │   │   ├── applications/+page.svelte
│   │   │   │   ├── payments/+page.svelte
│   │   │   │   ├── reviews/+page.svelte
│   │   │   │   └── disputes/+page.svelte
│   │   │   └── worker/
│   │   │       ├── jobs/+page.svelte
│   │   │       ├── applications/+page.svelte
│   │   │       ├── payments/+page.svelte
│   │   │       ├── reviews/+page.svelte
│   │   │       └── disputes/+page.svelte
│   │   │
│   │   └── api/                       # SvelteKit server routes (proxy → Go backend)
│   │       ├── auth/+server.ts
│   │       ├── jobs/+server.ts
│   │       ├── applications/+server.ts
│   │       ├── payments/+server.ts
│   │       ├── users/+server.ts
│   │       └── notifications/+server.ts
│   │
│   ├── styles/
│   ├── app.d.ts
│   ├── hooks.server.ts                # SSR session middleware
│   └── hooks.client.ts                # Client-side sync (optional)
│
├── static/
├── svelte.config.js
├── tailwind.config.js
├── vite.config.ts
├── package.json
├── Dockerfile                         # Frontend image
└── .dockerignore
```

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

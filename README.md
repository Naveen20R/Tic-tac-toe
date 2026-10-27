# Tic-Tac-Toe

A classic game of Xs and Os for two players, built with React, TypeScript and Material UI.

## Features

- Two-player game with win and draw detection; the winning line is highlighted
- Scoreboard (X wins, O wins, draws) with reset
- Move history with row and column for every move
- Undo the last move and start a new game
- Toast messages for wins, draws and game reset
- Light and dark themes, remembered between visits
- Online / offline indicator
- Custom 404 page
- Responsive layout that scales up on large screens

## Tech stack

| Area | Library |
| --- | --- |
| UI | React 19, Material UI 9 (Emotion) |
| Language | TypeScript |
| Build tool | Vite 8 |
| State | Redux Toolkit (theme, loader) |
| Routing | React Router 7 |
| HTTP | Axios |
| Icons | MUI Icons, React Icons |

## Getting started

Requires **Node.js 20.19+ or 22.12+** (needed by Vite 8).

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server using `.env.local` |
| `npm run dev:uat` | Start the dev server using `.env.uat` |
| `npm run dev:prod` | Start the dev server using `.env.prod` |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run build:uat` | Build with `.env.uat` |
| `npm run build:prod` | Build with `.env.prod` |
| `npm run preview` | Serve the built `dist/` folder locally |
| `npm run lint` | Run ESLint |

## Environment variables

| File | Used by | Committed |
| --- | --- | --- |
| `.env.local` | `dev`, `build` | No (git-ignored) |
| `.env.uat` | `dev:uat`, `build:uat` | Yes |
| `.env.prod` | `dev:prod`, `build:prod` | Yes |

| Variable | Description |
| --- | --- |
| `VITE_BASE_URL` | API base URL, no trailing slash |

Only variables starting with `VITE_` are exposed to the app, and they end up in the browser bundle, so never put secrets in these files. Restart the dev server after changing them.

## Project structure

```
src/
├── app/            App root and routes
├── components/
│   ├── common/     Shared UI (GlassCard, Logo, Mark, ThemeToggle, Loader, BlinkDot)
│   ├── layout/     Page layout
│   └── ...         App-wide pieces (favicon, network banner)
├── features/
│   └── game/       Game components, hook, logic, types and API
├── pages/          Home and NotFound pages
├── hooks/          Shared hooks (online status, viewport scale, error handler)
├── services/       Axios API client
├── store/          Redux store and slices
├── theme/          MUI theme, colour tokens and theme provider
├── utils/          Helper functions and store selectors
├── config/         Environment config
└── styles/         Global CSS
```

## How the game works

The game stores only the list of clicked squares (`moves`). Everything else is derived from it:

- **Board:** built from `moves`; even moves are X, odd moves are O
- **Current player:** X when the number of moves is even, otherwise O
- **Winner:** the board is checked against the 8 winning lines (3 rows, 3 columns, 2 diagonals)
- **Undo / new game:** remove the last move / clear all moves

See `src/features/game/utils/gameLogic.ts` and `src/features/game/hooks/useTicTacToe.ts`.

## Theming

Colours for both themes live in `src/theme/colors.ts`. The selected mode is stored in Redux (`store/common/themeSwitcher.reducer.ts`) and saved to `localStorage`.

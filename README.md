# Tic-Tac-Toe

## 1. Project overview

A browser-based Tic-Tac-Toe game built with React, TypeScript and Material UI. Two people can play on the same device, or one person can play against the computer. The game keeps a scoreboard and a move history, supports undo, and comes with light and dark themes that follow the provided design.

This is a **frontend-only** project: all game logic runs in the browser and nothing is stored on a server.

## 2. Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, Material UI 9 (Emotion styling) |
| Language | TypeScript |
| Build tool | Vite 8 |
| State | React state for the game; Redux Toolkit for theme and loader |
| Routing | React Router 7 |
| HTTP client | Axios (set up, not used yet; see Known limitations) |
| Icons | MUI Icons, React Icons |
| Font | Outfit (Google Fonts) |
| Linting | ESLint (typescript-eslint, react-hooks) |

## 3. Features implemented

- **Two modes:** "Two players" on one device, or "vs Computer" (you are X, the computer is O)
- **Game rules:** win and draw detection, with the winning line highlighted in green
- **Scoreboard:** X wins, O wins and draws, with a reset button
- **Move history:** every move with its player, row and column; scrolls and auto-follows the latest move
- **Undo and New game:** in vs Computer mode, undo also takes back the computer's reply
- **Toast messages:** for wins, draws and game reset
- **Status chip:** whose turn it is (blinking dot in the player's colour), or the result
- **Light and dark themes:** follow the system setting on first visit, then remember the user's choice
- **Online/offline indicator:** a pill in the header and a banner when the connection drops
- **Custom 404 page:** matches the game's design and links back to the game
- **Responsive layout:** stacks on small screens and scales up on large screens to keep the design's proportions
- **Accessibility and SEO basics:** semantic landmarks, ARIA labels, keyboard-usable controls, reduced-motion support for blinking dots, meta and Open Graph tags

## 4. How to run the backend locally

Not applicable. There is no backend in this project; the game runs entirely in the browser.

## 5. How to run the frontend locally

Requires **Node.js 20.19+ or 22.12+** (required by Vite 8).

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

### Scripts

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

### Environment variables

| File | Used by | Committed |
| --- | --- | --- |
| `.env.local` | `dev`, `build` | No (git-ignored) |
| `.env.uat` | `dev:uat`, `build:uat` | Yes |
| `.env.prod` | `dev:prod`, `build:prod` | Yes |

| Variable | Description |
| --- | --- |
| `VITE_BASE_URL` | API base URL, no trailing slash (reserved for a future backend) |

Only variables starting with `VITE_` reach the app, and they end up in the browser bundle, so these files must never contain secrets. Restart the dev server after changing them.

### Project structure

```
src/
├── app/            App root and routes
├── components/
│   ├── common/     Shared UI (GlassCard, Logo, Mark, ThemeToggle, Loader, BlinkDot)
│   ├── layout/     Page layout
│   └── ...         App-wide pieces (favicon, network banner)
├── features/
│   └── game/       Game components, hook, logic, types and API placeholder
├── pages/          Home and NotFound pages
├── hooks/          Shared hooks (online status, viewport scale, error handler)
├── services/       Axios API client
├── store/          Redux store and slices (theme, loader)
├── theme/          MUI theme, colour tokens and theme provider
├── utils/          Helper functions and store selectors
├── config/         Environment config
└── styles/         Global CSS
```

## 6. API endpoint summary

Not applicable. The game does not call any API. An Axios client (`src/services/apiClient.ts`) and a placeholder (`src/features/game/services/gameApi.ts`) are in place for a future backend.

## 7. How to run tests

No automated tests are included yet (see Future improvements). The project is checked with:

```bash
npx tsc -b      # type check
npm run lint    # ESLint
npm run build   # production build
```

## 8. AI tools and prompt summary

**Tool:** Claude Code (Anthropic's Claude), used as a coding assistant in VS Code.

**How it was used:** the developer directed the work step by step, reviewed the output and requested changes. Main prompt themes:

- **Setup:** environment files per stage (local, UAT, prod), config exports, React Router setup, folder restructuring into `app/`, `features/`, `pages/` and `components/common/`
- **UI from design:** build the game screen and the 404 page to match provided light and dark mockups, using a supplied colour palette; match sizes exactly; 3D-looking cells and buttons; glass cards
- **Features:** win/draw logic, scoreboard, move history with scrolling, undo, toast messages, blinking status dots, online/offline indicator, favicon, vs Computer mode
- **State:** Redux Toolkit for theme and loader, with selector hooks in `utils/storeData.ts`
- **Quality:** fixing TypeScript errors, finding unused code, shared helpers, a central error handler hook, SEO and semantic HTML, `.gitignore` and README
- **Learning:** explanations of the game logic, `useMemo` and the theme provider

All generated code was type-checked, linted and built after each change. UI changes were also checked with headless browser screenshots.

## 9. Design decisions

- **Moves as the single source of truth:** the game stores only the ordered list of clicked squares. The board, current player, winner and history are derived from it, which makes undo and new game one-line operations and avoids out-of-sync state.
- **Scores updated in the click handler:** the score is added on the move that ends the game rather than in an effect, so a win can never be counted twice.
- **Computer player uses minimax:** with only 9 squares it is instant, and it always finds the best move.
- **Feature-based folders:** game code lives in `features/game`; reusable UI lives in `components/common`.
- **Theme tokens:** all colours for both themes are defined once in `theme/colors.ts` and read through the MUI theme, so components never hard-code colours.
- **Redux only for app-wide state:** theme and loader live in Redux; game state stays local to the game hook because nothing else needs it.
- **Design-size scaling:** the layout is built 1:1 at the design's viewport (1364 × 800) and scaled up with CSS `zoom` on larger screens, so it keeps the mockup's proportions.

## 10. Clarifications and assumptions

- X always moves first.
- In vs Computer mode the human is always X and the computer is always O.
- Switching between modes starts a new game and resets the scoreboard, so scores from the two modes don't mix.
- Undo is disabled once a game is over, so a finished game's score can't be changed.
- Scores and history last only for the current browser session; only the theme choice is saved.
- The online/offline status uses the browser's network events; it reflects the device's connection, not a server's availability.

## 11. Known limitations

- No backend, API or automated tests.
- Scores and move history are lost on page refresh.
- The computer cannot be beaten; the best outcome is a draw.
- The Axios client, global loader and `VITE_BASE_URL` are set up but not used, because there are no API calls.
- The UAT and production API URLs in `.env.uat` and `.env.prod` are placeholders.
- The Outfit font loads from Google Fonts, so it needs internet access; offline, a system font is used.
- No social-share image, canonical URL, `robots.txt` or sitemap, as the production domain is not known yet.
- On screens narrower than 900px the 404 page hides its decorative board so the page fits without scrolling.

## 12. Future improvements

- Add unit tests (Vitest) for the game logic and component tests (React Testing Library) for the board, toasts and modes.
- Add a backend to save scores and match history, using the existing Axios client and loader.
- Add computer difficulty levels (Easy, Medium, Hard).
- Persist scores in `localStorage` so they survive a refresh.
- Online multiplayer between two devices.
- Add a share image and canonical URL once the site is deployed.

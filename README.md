# ministry-of-friendship-ui

React (webpack, MUI Joy, Redux, Parse JS SDK) front end for Ministry of Friendship. Sign in is handled by Clerk.

## How authentication works

- `src/auth/AppProviders.js` wraps the app in `ClerkProvider`, themed through Clerk's `appearance` variables in
  `src/auth/clerkAppearance.js`.
- `src/auth/AuthGate.js` shows a sign in wall (Clerk sign in / sign up modals) until there is a Clerk session.
- `src/auth/ClerkTokenBridge.js` hands Clerk's `getToken` to `src/utils/ParseUtils.js`, which adds
  `Authorization: Bearer <Clerk session token>` to every Parse request. The API verifies it before any Parse
  query or cloud code runs.
- A new Clerk user picks a gamer tag on first visit (`src/views/ProfileSetup.js`); the API stamps the Profile with the
  Clerk user id. `/profile` (`src/views/ProfileView.js`) opens Clerk's account management and signs out.

## Local setup

```bash
cp .env.example .env
npm install
npm start
```

| Variable | Purpose |
| --- | --- |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key, inlined into the bundle at build time |
| `PARSE_SERVER_URL` | Parse endpoint (default `http://localhost:1337/parse`) |
| `PARSE_APP_ID` | Must match the API's `APP_ID` |
| `CLERK_SECRET_KEY` | Only for Playwright e2e runs (creates and deletes Clerk test users); never bundled |

`npm run build` writes the production bundle to `dist/`.

## Tests

- `npm test` runs Jest.
- `npm run test:e2e` runs Playwright against the e2e UI (port 8081) and the API test server (port 1338). See
  `tests/README.md` and `tests/e2e/SIMULATION.md`.

## Deploying to Render

`render.yaml` is a Render Blueprint that defines two static sites (free plan), one per environment. Render runs
`npm ci && npm run build` and publishes `dist/`.

| Environment | Service | Branch | `/api/*` rewrites to |
| --- | --- | --- | --- |
| Production | `ministry-of-friendship-ui` | `master` | `https://ministry-of-friendship-api.onrender.com/parse/*` |
| Test | `ministry-of-friendship-ui-test` | `develop` | `https://ministry-of-friendship-api-test.onrender.com/parse/*` |

Everything else rewrites to `/index.html`. Pushing to `master` deploys production; pushing to `develop` deploys test.
Build-time variables are set per service: `PARSE_SERVER_URL` is that site's own `/api` URL, and in the Render
dashboard (New > Blueprint, point it at this repo) set the `sync: false` values `CLERK_PUBLISHABLE_KEY` and
`PARSE_APP_ID` on each service. `PARSE_APP_ID` must match the `APP_ID` of the API in the same environment. Both
environments use the same Clerk development instance publishable key.

In the Clerk dashboard, add both `https://ministry-of-friendship-ui.onrender.com` and
`https://ministry-of-friendship-ui-test.onrender.com` to the allowed origins / domains of that instance.

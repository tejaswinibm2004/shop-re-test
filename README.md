# Demo shop (Amazon-style buggy storefront for BugShield testing)

Dependency-free static clone-style store: header with search, subnav, hero,
product grid, cart with quantities, checkout, footer. Its ONLY link to
BugShield is the report widget (`index.html` bottom: loads
`/sdk/bugshield.js` from `BUGSHIELD_CONFIG.host`). No other coupling — no
shared code, no API calls, no backend.

## Local preview
```bash
cp config.example.js config.js   # then edit host/appId/key
npx serve .   # any static server
node --test tests/cart.test.js   # money + search tests RED by design
```

## Deploy (Render static site, own repo)
1. This folder IS the repo (`shop-re-test`), branch `main`.
2. Render → Static Site, build `node scripts/build.mjs`, publish `./`, Auto-Deploy ON.
3. Env: `BUGSHIELD_HOST` (dashboard URL), `BUGSHIELD_APP_ID`, `BUGSHIELD_INGESTION_KEY`.
4. In the dashboard: Websites → connect this repo + site URL, set origin allow-list.

See `PLANTED_BUGS.md` for the answer key (gitignored — never pushed).

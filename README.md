# Demo shop (buggy shopping site for BugShield testing)

Dependency-free static site. Its ONLY link to BugShield is the report widget
(`index.html` bottom: loads `/sdk/bugshield.js` from `BUGSHIELD_CONFIG.host`).
No other coupling — no shared code, no API calls, no backend.

## Local preview
```bash
cp config.example.js config.js   # then edit host/appId/key
npx serve .   # or: node scripts/serve.mjs (if added)
```

## Deploy (Render static site, own repo)
1. Copy this folder into its own repo, push to `main`.
2. Render → New Static Site, build `node scripts/build.mjs`, publish `./`.
3. Env: `BUGSHIELD_HOST` (dashboard URL), `BUGSHIELD_APP_ID`, `BUGSHIELD_INGESTION_KEY`.
4. In the dashboard: Websites → connect this repo + site URL, set origin allow-list.

See `PLANTED_BUGS.md` for the answer key (keep out of the production repo if you like).

# The Idea Shelf

A warm little creative home for marketers: explore and unbox practical ideas, keep a personal shelf, write notes, and make a tiny creative brief. The artwork and ideas were created for this independent project.

## Work on it

The site is plain HTML, CSS, and JavaScript. No installation or build step is required to preview `public/` with a local static file server.

- `public/index.html` — page structure and copy
- `public/styles.css` — visual system and responsive layout
- `public/ideas.js` — the original idea collection
- `public/app.js` — browsing, saving, notes, sharing, and brief maker
- `public/assets/` — original artwork, font and license
- `public/_headers` — security headers for Workers static assets
- `wrangler.jsonc` — Cloudflare Worker configuration

Run `npm run check` to check the scripts. Cloudflare Workers Builds is connected to this repository and deploys the `public/` directory when changes are pushed to `main`. When authenticated with the appropriate Cloudflare account, `npx wrangler deploy` can also deploy the Worker manually.

The shelf, notes, and last brief live in the visitor's browser on their device. There is no account, backend, mailing list, or public community submission service in this version. The Club section is honest about future community features. Share links point to a specific idea.

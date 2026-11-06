# The Idea Shelf

A warm little creative home for marketers: explore and unbox practical ideas, keep a personal shelf, write notes, and make a creative brief. The collection includes 54 original ideas, including 30 illustrated entries arranged in five themed collections. Examples are fictional starting points, not claims about campaign performance.

## Work on it

The site is plain HTML, CSS, and JavaScript; it does not need a build step or package installation.

- `public/index.html` — page structure and copy
- `public/styles.css` — visual system and responsive layout
- `public/ideas.js` — the original idea collection; keep its IDs stable
- `public/new-ideas.js` — the 30 illustrated ideas and their collections
- `public/app.js` — browsing, saving, notes, backup, sharing, and brief maker
- `public/assets/ideas/` — 30 optimized original illustrations, one per new idea
- `ARTWORK.md` — illustration brief and subject list
- `public/_headers` — security headers for Workers static assets
- `wrangler.jsonc` — existing Cloudflare Worker configuration

Run `npm run dev` to preview locally and `npm run check` to check script syntax and validate idea IDs, required fields, and illustrated asset paths. Cloudflare Workers Builds is connected to this repository and deploys the `public/` directory when changes are pushed to `main`. When authenticated with the appropriate Cloudflare account, `npx wrangler deploy` can also deploy the Worker manually.

The shelf, notes, and latest brief live in the visitor's browser on their device. The Shelf can export a JSON backup and import one later; imports add saved ideas and keep existing notes when there is a conflict. There is no account, backend, mailing list, or public community submission service. The Club section is honest about future community features. Share links point to a specific idea.

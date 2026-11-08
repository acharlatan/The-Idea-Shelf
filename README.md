# The Idea Shelf

A creative home for marketers, makers, and small businesses. The Idea Shelf has 54 practical ideas, eight original field guides, eight practical playbooks, a creative Studio, project boards, and self-guided challenges. The examples are fictional and do not imply campaign results.

## Work on it

The site uses static HTML, CSS, and JavaScript; no package installation or build step is required. Run `npm run dev` for a local preview and `npm run check` for syntax, content, links, and backup-merge checks. Cloudflare Workers Builds is connected to this repository and deploys `public/` when changes are pushed to `main`.

- `public/index.html` — home and interactive shelf
- `public/explore.html`, `idea.html` — collections, idea search, and shareable idea pages
- `public/playbooks.html`, `playbook.html`, `playbooks-data.js`, `playbook-model.js`, `playbooks.js` — guided playbooks and safe project starter plans
- `public/studio.html`, `projects.html`, `shelf.html` — creative tools, project boards, saved ideas, and backup
- `public/guides.html`, `guide.html`, `guides.js` — illustrated field guides and exercises
- `public/club.html` — date-based and self-guided creative challenges
- `public/v2.css`, `editorial.css`, `v2.js`, `backup.js` — shared design, editorial styling, interactions, and backup merging
- `public/ideas.js`, `new-ideas.js` — the original idea data; preserve IDs
- `public/assets/ideas/` — the 30 original illustrated idea covers; `public/assets/` also includes original department illustrations and the licensed display font
- `public/_headers`, `wrangler.jsonc` — security headers and existing Cloudflare configuration

## Data and compatibility

Saved ideas, idea notes, projects, Studio work, guide exercises, and challenge progress are stored in the visitor's browser on their device. There are no accounts, cross-device synchronization, backend submissions, or public community. Visitors can export and import a JSON backup from My Shelf. Imports merge saved ideas and preserve existing notes and projects when there is a conflict. Version 1 backups and the previous saved-idea, note, and brief storage keys remain supported. Previous `/?idea=<id>` share links and the former Explore, Shelf, and Club anchors redirect to the corresponding new pages. The previous brief is accessible in the Studio when it exists.

Playbooks add starter tasks, related ideas, and a reference plan to a new or existing local project. Matching tasks, ideas, and playbook plans are skipped on repeat; existing notes and completion state are preserved. These additions use the existing project format and are included in shelf backups.

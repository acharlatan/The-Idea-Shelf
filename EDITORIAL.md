# The Idea Shelf editorial edition

## Product purpose

Discover real marketing decisions, understand their mechanisms, and adapt an idea to a smaller team's work. The homepage leads into field notes, a dated briefing, a reference library and a private browser-local experiment notebook. Existing ideas, playbooks, guides, projects and Studio tools remain available.

## Content model and maintenance

- public/field-notes-data.js: 12 real references with source URL, source organization, event year, checked date, factual summary, editorial interpretation, limitations and proposed adaptation.
- public/publication.js: article rendering, four original longer analyses, search/filter URLs, reference saving, personal notes and experiment notebooks.
- public/stories.html: the four featured campaign breakdowns.
- public/briefing.html: dated edition 01, November 14, 2026. Includes original announcement dates; an older announcement is included when the described event is relevant to the issue.
- public/about.html: evidence, artwork and correction policies.

For each new issue: research the original sources, verify availability/market limitations, distinguish company assertions from independent evidence, write the practical relevance, record dates, update the fixed issue labels, and run npm run check. Review source links before release. The briefing is manually edited; there is no background news ingestion or scheduled publishing. Do not leave the November edition labeled as a new edition after it ages.

Artwork is an existing original thematic illustration, not a brand asset or campaign screenshot. Campaign originals are linked at their first-party source. No reported performance or experiment outcomes have been invented. The notebook is a proposed-test workflow; it is not a public submission system.

## Data compatibility

The idea-shelf:publication:v1 key stores saved reference IDs, per-reference notes and per-reference experiments. Existing storage keys and IDs are retained. Version 1 shelf backups now include an optional publication property. Import preserves existing notes and experiment records on conflicts. Legacy backups work without the new field. Experiment text can also be downloaded independently.

## Validation

npm run check passes existing content, backup and playbook tests plus publication content/link checks and backup preservation/rejection tests. Browser checks covered desktop navigation, search and reset, empty results, saved references in My Shelf, reference notes after reload and experiment notes after reload. Responsive iframe checks at 320 and 390 CSS pixels covered homepage, library, notebook and mobile navigation. Other engines and actual mobile devices were not tested.

## Release boundary

Changes are prepared on feature/editorial-publication. The existing Cloudflare Worker has its workers.dev URL enabled, and main is documented as an automatic production build trigger. Do not merge or deploy to that public production route until the owner approves public release. No hosting audience or routing was changed.

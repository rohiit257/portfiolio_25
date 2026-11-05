# AGENTS.md

Project rules:

- The main page (`/`, `src/pages/Index.tsx`) uses the editorial "About" layout (light hero headline + sidebar lists + bio + stack) with a dark Selected Work grid at the bottom. The old About page is removed; `/about` redirects to `/`. Do not reintroduce a separate about page.
- The list view lives at `/work` (`src/pages/Work.tsx`) and the navbar grid/list toggle points to `/` and `/work` respectively. Project detail pages count as "list" for the toggle state.
- Project data lives in `src/data/projects.ts` with only real projects from the owner's resume; `year` and `link` are optional and conditionally rendered in `ProjectDetail`. Why: resume has no project years or GitHub URLs, so they must not be fabricated.

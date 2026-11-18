# Astro migration progress

This is a tracking template, not a claim about current repository state. Codex should inspect the repository and update statuses based on verified evidence.

| Area | Status | Verification / notes |
| --- | --- | --- |
| React application audit | Not verified | Inventory routes, dependencies and APIs |
| Astro foundation and integrations | Not verified | Check installed versions, React, Tailwind, TypeScript |
| Shared assets and styles | Not verified | Check fonts, colors, images and shadcn/ui |
| Shared layout and navigation | Not verified | Check Navbar, Footer, SEO head |
| Homepage | Implemented and verified locally | Static build, HTML inspection, desktop and mobile Edge comparison, quiz, FAQ and drawer checks |
| About page | Implemented and verified locally | Static HTML, metadata, desktop/mobile screenshot comparison and navigation checks |
| Course overview | Not verified | API data and rendering |
| Course details | Not verified | Slugs, API data, SEO |
| Enrollment interactions | Not verified | Validation, submission, success/error |
| Contact and informational pages | Not verified | Functionality and metadata |
| Blog index and articles | Not verified | Dynamic routes, structured data, sitemap |
| Technical SEO | Not verified | Canonical, OG, sitemap, robots, redirects |
| Production preview and cutover | Not started | Requires explicit approval |

## Migration log

Add an entry for each completed or attempted task:

### YYYY-MM-DD — [route/page]
- Status: Planned / In progress / Implemented / Verified / Blocked
- Source files:
- Astro files:
- React islands and hydration directives:
- Checks actually run and results:
- Manual checks still needed:
- Known differences or follow-ups:

### 2026-11-18 — Public homepage (/)

- Ported the active React route from `appRoutes/ManusRoutes.tsx` and `routes/NormalUser/Home.tsx`, including its Manus shell, content, quiz, images and Montserrat typography.
- Astro owns `src/pages/index.astro`, `src/layouts/Layout.astro`, header, footer, hero, service cards, FAQ and final banner. Reused presentational React components render at build time. The two islands are `ManagerQuizOverlay` (`client:load`) and `MobileNav` (`client:media="(width < 64rem)"`). The quiz uses the existing scoring logic and destinations. The homepage requires no API calls.
- `npm run build` generated one static page. `tsc --noEmit` passed for TypeScript/TSX. The project has no `@astrojs/check` dependency. Inspected generated HTML for the canonical URL, one main landmark, one H1, nine sections, five FAQ disclosures, two islands and resolving local asset paths.
- Compared local builds in headless Edge at 1440 × 900 and 390 × 900. Heading text, link destinations and all nine rounded section heights matched, with no horizontal overflow. Reviewed a side-by-side screenshot overview. The React reference was built in a temporary directory with placeholder API URLs because the existing local build failed during initialization.
- Browser checks passed for FAQ keyboard toggling and exclusivity, all four quiz triggers, required answers, back navigation, an eight-answer result, restart, Escape and focus restoration. The mobile drawer exposed its five navigation links and scheduling link, dismissed on Escape and restored focus.
- Remaining coverage includes real touch-device gestures, Safari/Firefox and live third-party destinations. Other public paths still resolve through the React deployment. Production analytics and a hosted preview were not tested. npm reported 17 dependency advisories during install, including one critical. No deployment or cutover was performed.

### 2026-11-18 ? About page (/despre-mine)

- Ported the seven sections from React's `routes/NormalUser/About.tsx` to Astro's `src/pages/despre-mine.astro` and `src/content/about.ts`. Reused SplitStory and BulletBeliefs as build-time React components, the existing hero image and the shared section, quote and button components.
- Added the amber variant to FinalBanner. Layout and SiteHeader use a normalized path for canonical metadata and active navigation. The only hydrated components are the existing mobile drawer (media query below 64rem) and footer quiz (on load). The page uses the existing Zoom booking URL and requires no backend calls.
- The production build generated both routes. TypeScript passed. Inspected the generated About HTML for one main landmark, one H1, seven sections, matching description and Open Graph description, and two islands. The Astro-specific type checker is not configured.
- Automated Edge comparisons at 1440 ? 900 and 390 ? 900 matched the React reference on body copy, section heights, link destinations and targets. Full-page screenshots matched within the comparison tolerance of eight RGB levels per channel. Checked the About and homepage banner colors, direct and trailing-slash About URLs, active navigation, round-trip navigation, mobile drawer and footer quiz open/dismiss behavior.
- Browser coverage was limited to Edge. Live scheduling, physical touch gestures and production routing were outside local verification.

### 2026-11-18 ? Share the homepage and About components

- Both apps now render the frontend's `components/manus/HomeContent.tsx` and `AboutContent.tsx`. The original React routes provide PageShell and the React FAQ. The Astro pages provide their layout, metadata and native FAQ. Shared content, links, images, fonts, quiz logic and dialog components come directly from the frontend source. Removed 35 Astro copies.
- Astro continues to render the page bodies at build time. Only the mobile drawer and manager quiz hydrate. The React app supplies its router link through context. The static Astro render emits ordinary anchors. The shared quiz supports early clicks during Astro hydration and restores focus on dismissal.
- The React project passed TypeScript and its Vite production build. Astro passed TypeScript and its production build in an isolated checkout with dependencies installed only in the Astro project. Both generated routes were also exercised through the local Astro dev server.
- Desktop and mobile Edge checks passed for both routes at 1440px and 390px, including the FAQ, quiz, drawer, links, metadata and round-trip navigation. The React app retained same-document navigation. About screenshots matched within the previous tolerance. External scheduling and hosted deployment were outside these local checks.
- Deployment dependency: the Astro build needs read access to the sibling frontend source directory. On Vercel, enable inclusion of files outside the Astro project's Root Directory. No hosting settings were changed.

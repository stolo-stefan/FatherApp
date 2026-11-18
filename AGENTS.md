# Aspiring Managers — Codex repository instructions

## Project goal
Incrementally migrate the public Aspiring Managers website from React/Vite to Astro. Keep the original React app working as a reference and rollback option until production cutover.

## Required reading
Before proposing or implementing migration work:
1. Read `docs/astro-migration/migration-guide.md` (the original migration plan, converted from Word).
2. Read `docs/astro-migration/migration-progress.md`.
3. Inspect both the original React implementation and the existing Astro implementation. The migration guide describes intended architecture, not necessarily current repository state.

## Architectural rules
- Astro owns public routes, page layouts, SEO metadata and mostly static content.
- React owns interactions that genuinely need browser JavaScript. Compatible presentational React components may be server-rendered without hydration; prefer native Astro where it improves simplicity.
- Use the smallest practical React island; do not indiscriminately add `client:load`.
- Be mindful that separate React islands do not share React Context automatically.
- Replace React Router navigation with ordinary links/Astro routing where appropriate.
- Preserve existing design, responsive behavior, brand colors, assets, accessibility, and public URLs.
- Preserve backend API contracts, enrollment behavior, validation, loading/error states, and email integrations. Do not change backend code unless specifically requested.
- Use appropriate asset imports, not hardcoded `/src/assets/...` URLs.
- Prefer SSG for public content; propose SSR only when justified by freshness requirements.
- Keep secrets server-side. Only expose configuration through `PUBLIC_` variables when safe for browsers.
- Keep production React deployment available until explicit approval to cut over.

## Per-task workflow
1. Work only on the page(s) explicitly named by the user. Do not start unrelated migration phases.
2. Inspect the source page, imported components, styling, state, assets, routing, API calls, and the target Astro structure.
3. Present a concise plan, file list, rendering/hydration strategy, SEO implications, and unresolved questions. **Wait for explicit user approval before editing** unless the user specifically asks to skip planning.
4. Implement only the approved scope. Reuse existing Astro layouts and components; avoid unnecessary dependencies and unrelated refactors.
5. Run relevant checks where available (`npm run build`, `npx astro check` if configured, lint/tests as appropriate). Report checks that could not run. Flag browser interactions requiring manual testing.
6. Update `docs/astro-migration/migration-progress.md` with actual status, checks, and known gaps. Never mark manual visual checks complete unless they were performed.
7. Summarize files changed, decisions, hydration directives, API changes (if any), validation results, and remaining issues.

## Safety and version control
- Do not commit, push, deploy, change Vercel settings, or switch the production domain without explicit user approval.
- Do not delete or modify the original React project as part of a normal page migration.
- Do not overwrite unrelated in-progress changes. Ask if conflicts or unclear ownership arise.
- If a document example conflicts with the actual repository or installed Astro version, identify the discrepancy and propose the smallest compatible solution.

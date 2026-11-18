# Codex task: migrate one page to Astro

Migrate **[PAGE NAME AND EXACT ROUTE]** from the existing React/Vite application into Astro.

Before changing files:
1. Read `AGENTS.md`, `docs/astro-migration/migration-guide.md`, and `docs/astro-migration/migration-progress.md`.
2. Locate the original React route and inspect its components, styles, assets, hooks/state, navigation, API calls, and responsive behavior.
3. Inspect the Astro app to identify what already exists; do not recreate completed work.
4. Propose a concise implementation plan listing exact files to create/change, what will be native Astro versus server-rendered React versus hydrated React islands, SEO requirements, API considerations, and potential blockers.
5. **Stop and wait for my approval before editing files.**

After I approve:
- Implement only the requested route, preserving visual appearance, content, navigation, and functionality.
- Use Astro for page structure and static content; hydrate only interactions that need browser JavaScript.
- Reuse existing Astro components, styles, and assets; preserve backend API contracts.
- Do not edit the old React project, unrelated routes, backend, deployment configuration, or production domain unless I explicitly authorize it.
- Run relevant available checks, including the Astro build. Report checks that could not run and manual browser checks still needed.
- Update `migration-progress.md` accurately and summarize changed files, technical choices, differences, and outstanding issues.
- Do not commit or push.

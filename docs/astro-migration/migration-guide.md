Recommended: Incremental migration

Your current setup is a good starting point. You have two separate projects:

workspace/

├── aspiring-managers-astro/ \# New Astro project

│ ├── public/

│ ├── src/

│ ├── astro.config.mjs

│ ├── package.json

│ └── tsconfig.json

└── aspiring-managers-frontend/ \# Existing React + Vite project

├── public/

├── src/

├── .env

└── package.json

I recommend keeping both projects separate until Astro is fully working in production. The React project will serve as your reference implementation, while the Astro project gradually becomes the new public website.

The objective is not to rewrite everything. It is to preserve your existing design and React components while changing how pages are rendered, routed, and delivered to visitors.

# 1. Target architecture

aspiringmanagers.ro

Astro on Vercel — SEO-friendly public pages

├── Astro pages: Homepage, About, courses, blog, legal pages

└── React islands: Enrollment forms, interactive navigation, filters, carousels

↕ HTTPS API calls

Existing backend: Courses, blog content, enrollments, email integrations, database

The backend does not need to change simply because you’re moving from React to Astro.

# 2. Migration roadmap

| Phase | Work                              | Goal                                                    |
|-------|-----------------------------------|---------------------------------------------------------|
| 01    | Audit the React application       | Identify routes, components, dependencies and API calls |
| 02    | Configure Astro                   | React integration, Tailwind, TypeScript and aliases     |
| 03    | Migrate shared assets and styles  | Fonts, colors, images, shadcn/ui and utilities          |
| 04    | Build the Astro layout            | SEO head, navigation, footer and shared structure       |
| 05    | Port static pages                 | Homepage, About and marketing sections                  |
| 06    | Port interactive React components | Forms, menus, carousels and state                       |
| 07    | Implement courses and blog        | Dynamic routes, API fetching, SSG or SSR                |
| 08    | Implement technical SEO           | Metadata, sitemap, canonical URLs and structured data   |
| 09    | Test and optimize                 | Functionality, accessibility, performance and SEO       |
| 10    | Deploy and cut over on Vercel     | Preview, production domain, monitoring and rollback     |

# Phase 1 — Audit the existing React project

Before copying anything, document how the current frontend works.

## What to inspect

| Area            | What you need to identify               |
|-----------------|-----------------------------------------|
| src/routes/     | Every public route and its URL          |
| src/components/ | Shared and reusable components          |
| src/features/   | Page-specific components and logic      |
| src/lib/        | Asset mappings, constants and utilities |
| src/store/      | Zustand or Context dependencies         |
| src/services/   | API calls and environment variables     |
| src/styles/     | Global CSS, Tailwind theme and fonts    |
| package.json    | Dependencies and scripts                |

The most important task is classifying components by whether they require JavaScript in the browser.

| Component type                      | Migration approach                             |
|-------------------------------------|------------------------------------------------|
| Static headings, text, images       | Astro or server-rendered React                 |
| Presentational React cards          | Reuse as .tsx without hydration                |
| React components using useState     | Hydrate if interaction is required             |
| Forms using React Hook Form         | Hydrated React islands                         |
| React Router navigation             | Replace with Astro-native links                |
| Components using window or document | Check SSR compatibility                        |
| Global React Context                | Refactor boundaries or hydrate a shared parent |

Why: Copying your entire React application into Astro without understanding these dependencies can result in hydration errors, broken navigation, or an application that still behaves like an SPA.

Deliverable: A migration inventory listing every page and its component dependencies.

# Phase 2 — Configure Astro

Your Astro project already exists, so you don’t need to recreate it.

## Step 1. Install integrations

Inside aspiring-managers-astro:

npx astro add react

npm install tailwindcss @tailwindcss/vite

Also install the libraries actually used by your React components, such as lucide-react, clsx, tailwind-merge, and the necessary Radix packages. Do not blindly copy every dependency from the React project.

## Step 2. Configure Astro

In astro.config.mjs:

import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({

site: "https://www.aspiringmanagers.ro",

integrations: \[react()\],

vite: { plugins: \[tailwindcss()\] },

});

The site property is useful for generating canonical URLs and sitemaps.

## Step 3. Configure TypeScript

In tsconfig.json:

{

"extends": "astro/tsconfigs/strict",

"compilerOptions": {

"baseUrl": ".",

"paths": { "@/\*": \["src/\*"\] },

"jsx": "react-jsx",

"jsxImportSource": "react"

}

}

This preserves imports such as:

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

## Step 4. Verify the development server

npm run dev

At this stage, Astro should run independently, without depending on the old React project. Completion criteria: Astro starts, React components can be imported, TypeScript aliases resolve, and Tailwind styles compile.

# Phase 3 — Migrate assets, styles and shadcn/ui

This phase is important because you want the new website to look identical to the existing one.

## Recommended structure

aspiring-managers-astro/

└── src/

├── assets/

│ ├── heroBackground.png

│ ├── managementCrossroads.png

│ ├── fondatorPortrait.png

│ └── logoNoBackground.png

├── components/ui/

├── lib/

│ ├── utils.ts

│ └── brandAssets.ts

└── styles/global.css

Copy the original images, fonts, and icons from the React project. For images, continue using proper Vite imports:

import heroBackground from "@/assets/heroBackground.png";

Avoid hardcoded paths such as /src/assets/heroBackground.png, which caused problems in your earlier Vercel deployment. For assets used directly in .astro files, Astro also supports importing images and rendering them with its image component.

## Tailwind and brand theme

Preserve existing color definitions: Teal \#2B6A70, Green \#89b80a, Navy \#2A3A4E, Cream \#F9F9F6. Also preserve the orange accent and navy gradients used in your newer page designs.

## shadcn/ui considerations

You can reuse the existing component source files under src/components/ui. However, shadcn components that use Radix primitives, React hooks, or browser interactions need special attention.

- A static Card can render without hydration.

- A Dialog needs client-side JavaScript.

- A mobile navigation Drawer needs client-side JavaScript.

- A React form needs hydration to handle submission and validation.

Do not add client:load to every component. Hydrate the smallest practical interactive component tree. Completion criteria: Fonts, images, colors, spacing and basic UI components match your React website.

# Phase 4 — Build the shared Astro layout

Astro pages should share a common layout rather than each page defining its own HTML document.

src/

├── layouts/BaseLayout.astro

├── components/layout/

│ ├── Navbar.tsx

│ └── Footer.tsx

└── pages/index.astro

Example BaseLayout.astro:

---

import "../styles/global.css";

import Navbar from "../components/layout/Navbar.tsx";

import Footer from "../components/layout/Footer.tsx";

interface Props { title: string; description: string; }

const { title, description } = Astro.props;

---

\<!doctype html\>

\<html lang="ro"\>

\<head\>

\<meta charset="UTF-8" /\>

\<meta name="viewport" content="width=device-width, initial-scale=1" /\>

\<title\>{title}\</title\>

\<meta name="description" content={description} /\>

\</head\>

\<body\>

\<Navbar /\>

\<main\>\<slot /\>\</main\>

\<Footer /\>

\</body\>

\</html\>

If your existing Navbar uses React Router or interactive menus, it may need to be refactored or hydrated. Why: This gives every public page consistent navigation, styling, and SEO metadata.

# Phase 5 — Port the public marketing pages

I would migrate pages in this order:

1.  Homepage

2.  About / Despre mine

3.  Course overview

4.  Course detail pages

5.  Contact and other informational pages

Start with the homepage because it will reveal most styling and component compatibility problems.

## Example homepage

---

import BaseLayout from "../layouts/BaseLayout.astro";

import Hero from "../components/home/Hero.tsx";

import Benefits from "../components/home/Benefits.tsx";

import AudienceSection from "../components/home/AudienceSection.tsx";

---

\<BaseLayout

title="Aspiring Managers \| Leadership pentru manageri la început de drum"

description="Cursuri practice și mentorat pentru manageri aflați la început de carieră."

\>

\<Hero /\>

\<Benefits /\>

\<AudienceSection /\>

\</BaseLayout\>

These React components have no client:\* directives. Astro can render compatible React components to HTML at build time without hydrating them in the browser. This provides much of the SEO and performance benefit without a complete rewrite. Components using useEffect for animations or browser behavior may require hydration; for simple visual animations, consider CSS instead.

# Phase 6 — Port interactive React components

Astro uses islands architecture: each interactive React component can run independently within an otherwise static HTML page.

| Directive           | Behavior                         | Example                                     |
|---------------------|----------------------------------|---------------------------------------------|
| No directive        | Render HTML only                 | Course description                          |
| client:load         | Hydrate when the page loads      | Enrollment form                             |
| client:idle         | Hydrate when the browser is idle | Noncritical interactive widget              |
| client:visible      | Hydrate near the viewport        | Testimonial carousel                        |
| client:only="react" | Render only in the browser       | Browser-dependent component that cannot SSR |

For your course enrollment form:

---

import EnrollmentForm from "../components/forms/EnrollmentForm.tsx";

---

\<section\>

\<h2\>Înscrie-te la curs\</h2\>

\<EnrollmentForm client:load /\>

\</section\>

You can keep existing React form logic, including React Hook Form, Zod validation, loading states, and API requests.

## Important: React Context and Zustand

If your current components depend on a shared React Context provider, Astro islands won’t automatically share that provider. For example, separate EnrollmentForm and EnrollmentSummary islands are separate React roots. Wrap related components in one hydrated React parent or use an external state mechanism when shared state is genuinely necessary. Keep the enrollment form self-contained where possible.

## Navigation

Replace React Router Link or NavLink with regular links where appropriate:

\<a href="/despre-mine"\>Despre mine\</a\>

Astro handles navigation between pages without requiring React Router. Completion criteria: Mobile menus, enrollment forms, buttons, carousels, and other interactive components work correctly without hydrating the entire website.

# Phase 7 — Integrate courses and the blog

Your backend already manages course and blog data. Keep that responsibility in the backend and let Astro handle public presentation.

## 7.1 Course pages

src/pages/

└── cursuri/

├── index.astro

└── \[slug\].astro

Each course receives its own URL, such as /cursuri/leadership-pentru-manageri and /cursuri/primii-pasi-in-management. You can generate pages using getStaticPaths().

---

import BaseLayout from "../../layouts/BaseLayout.astro";

import { getCourses } from "../../services/courses";

export async function getStaticPaths() {

const courses = await getCourses();

return courses.map((course) =\> ({

params: { slug: course.slug },

props: { course },

}));

}

const { course } = Astro.props;

---

\<BaseLayout title={course.title} description={course.description}\>

\<h1\>{course.title}\</h1\>

\<p\>{course.description}\</p\>

\</BaseLayout\>

This assumes your API provides a stable slug, title, and description. If it does not, define how course URLs are generated.

## 7.2 Blog pages

src/pages/blog/

├── index.astro

└── \[slug\].astro

Each blog article should have a unique URL, meaningful HTML title, meta description, publication date, semantic heading structure, appropriate featured image, and internal links to related content.

## 7.3 Choose static generation or SSR

Static Site Generation (SSG): Astro fetches courses and blog posts when Vercel builds the website and generates HTML files. Advantages: fast delivery, straightforward hosting, fewer runtime dependencies. Tradeoff: publishing or editing an article requires a new build to update generated HTML.

Server-Side Rendering (SSR): Astro renders pages when requested using server-side code. Advantages: newly published articles and course changes can appear without rebuilding. Tradeoff: more runtime complexity, backend dependency, caching considerations, and potentially greater hosting costs.

Recommendation: Start with SSG for public pages. Introduce SSR selectively if frequent blog publishing or course changes make rebuilds inconvenient. Static course information and dynamic enrollment availability are different: a statically generated course page can still request current seat availability and submit enrollments to the backend.

# Phase 8 — Implement technical SEO

Moving to Astro provides a better rendering foundation, but you still need to implement SEO deliberately.

- [ ] Unique title and meta description for every page

- [ ] Canonical URLs using the production domain

- [ ] Open Graph and social sharing metadata

- [ ] XML sitemap

- [ ] robots.txt

- [ ] Semantic HTML headings and landmarks

- [ ] Article structured data for blog posts

- [ ] Appropriate Course structured data where applicable

- [ ] Internal links between blog posts and courses

- [ ] Descriptive image alt text

- [ ] Redirects for any changed URLs

For the sitemap, install Astro’s official integration:

npx astro add sitemap

For dynamically generated blog pages, ensure the pages are discoverable through the sitemap and internal navigation. Check that the old React website and new Astro website do not create duplicate indexed pages. Completion criteria: Each public URL returns meaningful HTML content and appropriate SEO metadata without requiring JavaScript execution.

# Phase 9 — Testing before production

Do not replace the existing production website until the following tests pass.

## Functional tests

Verify navigation, enrollment, course information, blog articles, mobile menus, and API integrations. Pay special attention to enrollment submissions, validation, and success/error messages.

## SSR compatibility tests

Look for errors such as:

window is not defined

document is not defined

localStorage is not defined

These typically indicate browser-dependent code executing during server rendering. Move browser-only operations into appropriate client-side lifecycle logic or change the component boundary.

## Production build tests

npm run build

npm run preview

Inspect the generated HTML using View Page Source. You should see actual headings and paragraphs, not merely \<div id="root"\>\</div\>.

## Performance tests

Use Lighthouse and PageSpeed Insights to compare React with Astro.

| Metric | Good threshold | Meaning                   |
|--------|----------------|---------------------------|
| LCP    | ≤ 2.5 s        | Largest Contentful Paint  |
| INP    | ≤ 200 ms       | Interaction to Next Paint |
| CLS    | ≤ 0.1          | Cumulative Layout Shift   |

These are Google’s recommended good Core Web Vitals thresholds, not measured results for your website. Also run npx astro check after installing @astrojs/check.

# Phase 10 — Deploy Astro to Vercel

Treat production migration as a separate release rather than immediately replacing the existing React deployment.

## Step 1. Deploy Astro as a separate Vercel project

Connect the Astro project to Vercel. If both projects live in the same Git repository, configure Root Directory as aspiring-managers-astro. If Astro has its own repository, the root can remain at repository root.

| Setting          | Value                                        |
|------------------|----------------------------------------------|
| Framework Preset | Astro                                        |
| Build Command    | npm run build                                |
| Output Directory | dist for static output                       |
| Node version     | Supported version matching local environment |

For a static Astro site, you generally do not need the Vercel server adapter. If you later introduce SSR, install and configure @astrojs/vercel.

## Step 2. Configure environment variables

Move only necessary frontend configuration to Astro:

PUBLIC_API_URL=https://your-backend-domain.example

Use PUBLIC\_ only for values safe to expose in client-side code. Backend credentials, API secrets, and private keys must remain server-side.

## Step 3. Test on the Vercel preview URL

- All public pages load directly by URL

- Blog and course pages render properly

- Images load from production assets

- API requests reach your backend

- Enrollment works end to end

- Metadata is correct

- Mobile layout matches the existing website

If your backend restricts CORS origins, add the appropriate preview origin for testing rather than allowing arbitrary origins.

## Step 4. Move the production domain

6.  Keep the React deployment available for rollback.

7.  Assign aspiringmanagers.ro and www.aspiringmanagers.ro to the Astro project.

8.  Configure one canonical hostname and redirect the other.

9.  Confirm HTTPS, routing, assets, and API connectivity.

10. Check the sitemap and canonical URLs.

11. Monitor production errors and enrollment submissions.

Avoid changing existing URLs unless necessary. If URLs change, add permanent redirects.

## Step 5. Keep a rollback option

Do not delete the old React project immediately. Keep its last working deployment so you can restore the production domain if Astro causes a serious issue.

# 11. Recommended final folder structure

aspiring-managers-astro/

├── public/

│ ├── favicon.ico

│ └── robots.txt

├── src/

│ ├── assets/

│ │ ├── images/

│ │ └── fonts/

│ ├── components/

│ │ ├── ui/ \# shadcn React components

│ │ ├── layout/

│ │ ├── home/

│ │ ├── courses/

│ │ ├── blog/

│ │ └── forms/

│ ├── layouts/BaseLayout.astro

│ ├── pages/

│ │ ├── index.astro

│ │ ├── despre-mine.astro

│ │ ├── contact.astro

│ │ ├── cursuri/

│ │ │ ├── index.astro

│ │ │ └── \[slug\].astro

│ │ └── blog/

│ │ ├── index.astro

│ │ └── \[slug\].astro

│ ├── features/enrollment/

│ ├── services/

│ │ ├── courses.ts

│ │ ├── blogs.ts

│ │ └── enrollments.ts

│ ├── lib/

│ │ ├── utils.ts

│ │ ├── brandAssets.ts

│ │ └── seo.ts

│ └── styles/global.css

├── astro.config.mjs

├── tsconfig.json

├── package.json

└── .env

This is close to your existing React structure, which makes migrating components easier.

# 12. How I would actually execute this project

Work in small increments, with a build and visual check after each phase. Do not migrate all pages at once.

## Milestone 1 — Astro foundation

- [ ] Configure React, Tailwind and TypeScript

- [ ] Copy assets and global CSS

- [ ] Build shared layout and Navbar

- [ ] Render one existing React component

## Milestone 2 — Homepage

- [ ] Port homepage sections

- [ ] Fix React Router dependencies

- [ ] Implement responsive styling

- [ ] Verify server-generated HTML

## Milestone 3 — Functionality

- [ ] Migrate enrollment forms

- [ ] Connect backend API

- [ ] Implement course and blog routes

- [ ] Test loading and error states

## Milestone 4 — SEO and production

- [ ] Implement metadata and sitemap

- [ ] Test performance and accessibility

- [ ] Deploy to Vercel preview

- [ ] Switch domain and verify production

## The first thing I would implement

Get one existing React page rendering correctly through Astro, without hydration unless it needs interactivity. That single step will validate your component imports, Tailwind theme, asset handling, layouts, and React integration. Once that works, the remaining migration becomes much more predictable.

## Useful official documentation

- https://docs.astro.build/en/guides/integrations-guide/react/

- https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app/

- https://docs.astro.build/en/guides/on-demand-rendering/

- https://docs.astro.build/en/guides/deploy/vercel/

The main architectural rule throughout the migration is: Astro owns pages, layouts and SEO; React owns the interactions that genuinely need JavaScript.

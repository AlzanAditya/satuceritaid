# AI Agent --- Project Development Rules

> **IMPORTANT:** Read this file before executing any development prompt
> in this project. These rules are persistent project conventions and
> should be followed unless a specific prompt explicitly overrides them.

------------------------------------------------------------------------

## 1. Core Architecture

The project uses:

-   Vite
-   React
-   TypeScript
-   TanStack Router
-   Tailwind CSS
-   Static prerendering / SSG for public SEO pages
-   shadcn/ui primarily for the application/editor area

Do not replace this architecture with Next.js, another framework, or a
different routing solution unless explicitly instructed.

The project should remain modular, maintainable, and easy to extend.

------------------------------------------------------------------------

## 2. TanStack Router

Use **TanStack Router** as the routing system.

Prefer file-based routing and keep route definitions inside the
appropriate `src/routes/` structure.

Routes should be separated by responsibility instead of placing the
entire application inside a single route file.

Example structure:

''' src/ ├── routes/ │ ├── \_\_root.tsx │ ├── index.tsx │ ├──
pricing.tsx │ ├── themes.tsx │ ├── about.tsx │ ├── how-to-create.tsx │
├── editor/ │ └── invitation/ ├── components/ ├── features/ ├── styles/
├── lib/ ├── hooks/ ├── utils/ └── types/ '''

Use route-level files for routing and page composition. Move reusable
functionality into components/features instead of putting large amounts
of implementation directly inside route files.

------------------------------------------------------------------------

## 3. SEO and Static Prerendering

The public/marketing website is an important SEO surface.

Public pages such as:

-   `/`
-   `/pricing`
-   `/themes`
-   `/about`
-   `/how-to-create`
-   `/faq`
-   other public marketing/content pages

should use **static prerendering / SSG** whenever appropriate.

The goal is for these routes to produce real static HTML during the
build process instead of depending entirely on client-side JavaScript
execution.

Conceptually, the build output should be capable of producing:

''' dist/ ├── index.html ├── pricing/ │ └── index.html ├── themes/ │ └──
index.html ├── about/ │ └── index.html └── how-to-create/ └── index.html
'''

Do not assume that creating a `.tsx` route automatically makes it
SEO-friendly. Verify that the intended public routes are actually
prerendered.

SEO pages should have appropriate:

-   `<title>`
-   meta description
-   canonical URL where appropriate
-   semantic headings
-   meaningful HTML content
-   Open Graph metadata where appropriate
-   descriptive image `alt` text

Do not add unnecessary client-side complexity to static marketing pages.

------------------------------------------------------------------------

## 4. Rendering Strategy

Use the appropriate rendering strategy for each type of page.

### Public / Marketing

Prefer:

**SSG / static prerendering**

Examples:

''' / /pricing /themes /about /how-to-create '''

### User Application / Editor

Client-side rendering is acceptable and generally preferred for highly
interactive application interfaces.

Examples:

''' /editor /dashboard /settings '''

### Published Dynamic Invitation

Dynamic invitation pages may require a different rendering strategy
depending on the final data architecture.

Do not force every route to use the same rendering strategy.

------------------------------------------------------------------------

## 5. Modular Architecture

The project must be modular.

Do not create large monolithic files containing:

-   page layout
-   business logic
-   data fetching
-   state management
-   reusable UI
-   utility functions
-   routing logic

all at once.

Prefer responsibility-based organization:

''' src/ ├── components/ │ ├── ui/ │ ├── layout/ │ └── marketing/ ├──
features/ │ ├── invitation/ │ ├── themes/ │ ├── editor/ │ └── auth/ ├──
routes/ ├── hooks/ ├── lib/ ├── utils/ ├── types/ └── styles/ '''

### Components

Use `components/` for reusable UI components.

### Features

Use `features/` for functionality that belongs to a specific domain or
feature.

### Routes

Use `routes/` for TanStack Router route definitions and route-level
composition.

### Hooks

Use `hooks/` for reusable React hooks.

### Lib

Use `lib/` for shared integrations, clients, configuration, and
libraries.

### Utils

Use `utils/` for generic reusable utility functions.

Do not create excessive fragmentation. A component does not need its own
file merely because it contains a few lines of JSX.

The goal is **balanced modularity**, not maximum file count.

------------------------------------------------------------------------

## 6. Component Responsibility

Prefer the single-responsibility principle.

## 6.1 Reusable Component Content

Components that have a realistic possibility of being reused across multiple pages should not hardcode page-specific content.

Separate **component structure/presentation** from **variable content/data**.

For example, avoid locking a reusable component to one page:

'''
<ProductsGrid>
  <h2>...</h2>
  <p>...</p>
  ...
</ProductsGrid>
'''

Prefer passing content through props or structured data:

'''
<ProductsGrid
  tag="Produk Unggulan"
  title="Pilih Format Undangan Sesuai Kebutuhan"
  description="..."
  products={products}
/>
'''

The component should be responsible for rendering the structure and presentation, while the page or feature provides content that may vary by context.

This applies especially to reusable:

- section headers
- cards
- product/service grids
- feature lists
- testimonials
- navigation/content blocks
- marketing sections
- invitation sections
- other components that may reasonably appear in multiple contexts

However, **do not turn every value into a prop unnecessarily**.

Static values that are intrinsic to the component and are not realistically expected to vary may remain inside the component.

Use this principle:

**Potentially page/context-specific content → props/data**

**Intrinsic component behavior or content → may remain internal**

Avoid over-engineering components with excessive props simply for theoretical reuse. Reusability should be based on a realistic possibility of reuse.


If a page contains several independent sections, extract them into
components.

For example:

''' HomePage ├── Hero ├── Features ├── ThemeShowcase ├── PricingSection
├── Testimonials └── Footer '''

Avoid turning a page into a single huge component.

Reusable components should not depend unnecessarily on page-specific
implementation details.

------------------------------------------------------------------------

## 7. Styling Architecture

Use **Tailwind CSS** as the primary styling language.

Use a hybrid approach:

### Component styling

Reusable/component-specific visual styling should generally use semantic
CSS classes with Tailwind `@apply`.

Example:

''' .card { @apply rounded-2xl border border-gray-200 bg-white
shadow-sm; }

.card-title { @apply text-xl font-semibold tracking-tight; } '''

Then:

'''

::: {classname="card"}
```{=html}
<h2 className="card-title">
```
...
```{=html}
</h2>
```
:::

'''

### Contextual layout

Keep these utilities directly in JSX/TSX because they are commonly
contextual:

-   `flex`
-   `grid`
-   `items-*`
-   `justify-*`
-   `content-*`
-   `place-*`
-   `gap-*`
-   `space-*`
-   `grid-cols-*`
-   `col-span-*`
-   contextual `w-*` / `h-*`
-   contextual `p-*` / `m-*`

Example:

'''
```{=html}
<section className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
```
```{=html}
<article className="card">
```
...
```{=html}
</article>
```
```{=html}
<article className="card">
```
...
```{=html}
</article>
```
```{=html}
</section>
```
'''

Do not create generic abstraction classes such as:

''' .flex-center {} .flex-between {} .grid-3 {} .gap-4 {} '''

These simply recreate Tailwind utilities.

Use semantic classes such as:

''' .pricing-card {} .hero-content {} .article-date {} .navbar {} '''

The class name should describe the component or element, not merely its
layout behavior.

------------------------------------------------------------------------

## 8. Inline React Styles

Avoid React inline `style={{ ... }}` for static or predictable visual
styling.

Prefer:

-   `className` with Tailwind utilities
-   semantic CSS classes
-   CSS variables when appropriate

For example, avoid:

''' \<span style={{ fontSize: '0.75rem', color: 'var(--primary)',
fontWeight: 600 }}\> {art.date} `</span>`{=html} '''

Prefer:

''' [{art.date}]{classname="article-date"} '''

or an appropriate Tailwind class combination.

However, inline styles are allowed when the value is genuinely dynamic
or runtime-dependent.

Examples include:

-   calculated positions
-   dynamically calculated dimensions
-   runtime transforms
-   values generated from user interaction
-   values that cannot reasonably be represented by a static class

Do not force genuinely dynamic values into unnecessary CSS files.

The main rule is:

**Avoid unnecessary `style={{ ... }}` usage.**

------------------------------------------------------------------------

## 9. shadcn/ui

Use shadcn/ui primarily for the interactive application/editor area.

Good candidates include:

-   Button
-   Dialog
-   Sheet
-   Dropdown Menu
-   Select
-   Tabs
-   Input
-   Form
-   Calendar
-   Popover
-   Table
-   Tooltip
-   Toast

Do not force the public marketing/SEO website to use shadcn components
when custom components provide a better visual result.

The marketing website should remain visually distinctive and
lightweight.

The editor can use shadcn/ui to reduce development time and provide
consistent accessible primitives.

Do not introduce shadcn components unnecessarily.

------------------------------------------------------------------------

## 10. Public Website vs Editor

Keep the public website and application/editor conceptually separated.

### Public website

Focus on:

-   SEO
-   performance
-   semantic HTML
-   static prerendering
-   marketing content
-   themes
-   pricing
-   information pages

### Editor / application

Focus on:

-   interactivity
-   forms
-   state management
-   live preview
-   asset management
-   editing workflows
-   reusable UI primitives

Do not allow editor-specific complexity to unnecessarily leak into
simple public pages.

------------------------------------------------------------------------

## 11. Assets

Keep assets organized by responsibility.

Do not scatter arbitrary images and static files throughout the source
tree.

Use appropriate asset directories and meaningful filenames.

For reusable template assets, distinguish between:

-   template assets
-   user-uploaded assets
-   global/static assets

Template decorations such as flowers, ornaments, frames, backgrounds,
and illustrations should be treated as reusable assets rather than
duplicated inside every component.

------------------------------------------------------------------------

## 12. Template System

Invitation templates should be treated as separate visual
implementations that consume invitation data.

Do not create a completely separate application architecture for every
template.

A template should ideally be composed from reusable sections/components
and receive structured data.

Conceptually:

''' Invitation Data ↓ Template ↓ Reusable Sections ↓ Rendered Invitation
'''

Template-specific visual assets should remain separate from the data
entered by the user.

Avoid hardcoding user-specific invitation data directly into template
components.

------------------------------------------------------------------------

## 13. Data and Business Logic

Do not hardcode business data inside presentation components when the
data should come from a data source.

Keep:

-   data fetching
-   transformation
-   validation
-   business rules

separate from purely visual components whenever practical.

Presentation components should receive the data they need through props
or appropriate state/context mechanisms.

------------------------------------------------------------------------

## 14. Performance

Avoid unnecessary client-side JavaScript on public SEO pages.

Prefer:

-   static HTML where possible
-   lazy loading for heavy application features
-   code splitting for editor/application areas
-   optimized images
-   appropriate asset loading
-   reusable components

Do not load editor-only dependencies on public marketing pages unless
necessary.

------------------------------------------------------------------------

## 15. Accessibility

All UI should maintain reasonable accessibility.

Use:

-   semantic HTML
-   proper heading hierarchy
-   meaningful button labels
-   accessible form labels
-   descriptive `alt` text
-   keyboard-accessible interactions
-   appropriate ARIA only when necessary

Do not use `<div>` as a replacement for semantic interactive elements
when a native element is appropriate.

------------------------------------------------------------------------

## 16. Do

-   Follow the existing project architecture.
-   Use TanStack Router for routing.
-   Use file-based routing where appropriate.
-   Prerender public SEO pages.
-   Keep public pages lightweight.
-   Build reusable components.
-   Keep features modular.
-   Use Tailwind consistently.
-   Prefer semantic CSS classes with `@apply` for reusable component
    styling.
-   Keep contextual layout utilities in JSX/TSX.
-   Avoid unnecessary React inline styles.
-   Use shadcn/ui where it genuinely speeds up editor/application
    development.
-   Reuse components and logic instead of duplicating them.
-   Keep template assets and user assets conceptually separate.
-   Preserve existing functionality unless explicitly asked to change
    it.

------------------------------------------------------------------------

## 17. Don't

-   Do not replace Vite with Next.js or another framework.
-   Do not replace TanStack Router with another routing library.
-   Do not assume a route is prerendered simply because a `.tsx` route
    exists.
-   Do not make every public page depend entirely on client-side
    rendering.
-   Do not put an entire page into one giant component.
-   Do not duplicate the same component or logic across multiple pages
    without a reason.
-   Do not create generic Tailwind abstraction classes such as
    `.flex-center`.
-   Do not put long static styling chains into JSX when a semantic
    component class is more appropriate.
-   Do not use `style={{ ... }}` for ordinary static styling.
-   Do not force every style into CSS when a simple Tailwind `className`
    is clearer.
-   Do not use shadcn/ui everywhere just because it is available.
-   Do not over-engineer trivial components.
-   Do not modify or delete reference/source folders unless explicitly
    instructed.
-   Do not install unnecessary dependencies.
-   Do not change architecture merely for convenience without
    considering the existing project conventions.

------------------------------------------------------------------------

## 18. Before Finishing Any Task

Before considering a task complete, verify:

1.  The requested feature actually works.
2.  The implementation follows the project architecture.
3.  Routes use TanStack Router correctly.
4.  Public SEO routes remain compatible with static prerendering.
5.  New code is modular and not unnecessarily monolithic.
6.  Styling follows the agreed Tailwind/CSS rules.
7.  Static styling does not unnecessarily use `style={{ ... }}`.
8.  No unnecessary dependencies were introduced.
9.  Existing functionality was not unintentionally broken.
10. The implementation remains understandable for future development.

When a specific task conflicts with these rules, follow the explicit
task instruction, but make the smallest architectural deviation
necessary.

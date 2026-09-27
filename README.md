# GWK University — Homepage

A monochrome (black / grey / white) university homepage built with **Next.js 16**,
**TypeScript** and **Tailwind CSS v4**.

All content is original and fictional. All imagery is procedurally generated
inline SVG — there are no third-party photographs, so the project carries no
image licensing obligations.

## Design system

The palette is deliberately restricted to three values:

| Token  | Value     | Role                          |
| ------ | --------- | ----------------------------- |
| `ink`  | `#111111` | Headings, body, buttons, rules |
| `gray` | `#888888` | Secondary text, meta, artwork  |
| `paper`| `#FFFFFF` | All backgrounds                |

Every other tone is an alpha derivation of `ink` (e.g. `rgb(17 17 17 / 0.12)` for
hairlines). This is enforced by a test — see [Verification](#verification).

Type: **Source Serif 4** for display headings, **Inter** for body, navigation
and buttons.

## Sections

- **Header** — sticky with scroll-triggered shadow, navigation, search sheet,
  mega dropdown, mobile drawer
- **Hero** — 3-slide crossfade carousel, auto-advance with pause-on-hover,
  progress ticks, manual previous/next
- **About** — 40/60 grid, right-aligned serif statement, highlighted figures
- **Faculties** — 7 filterable faculty profiles
- **Research & Publication** — 6 category filters, 4-column card grid, pagination
- **Latest News** — 4-column card grid, pagination
- **Course search** — undergraduate/postgraduate toggle, progress bar, accordion
- **Footer** — quick links, contact, social icons

Scroll reveals use a dependency-free `IntersectionObserver`, and all motion is
disabled under `prefers-reduced-motion`.

## Getting started

Requires **Node.js 18+** (developed on Node 24).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** if `npm` is blocked by your PowerShell execution policy,
> invoke it as `npm.cmd` instead. Also note the build uses `--webpack`; see
> [Troubleshooting](#troubleshooting).

## Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Development server with hot reload            |
| `npm run build`  | Production build                             |
| `npm run start`  | Serve the production build                    |
| `npm run lint`   | ESLint                                        |
| `npm run smoke`  | End-to-end DOM/CSS/JS assertions (see below) |

## Verification

`npm run smoke` starts nothing itself — run it against a live server
(`npm run start`) after a build. It asserts on:

- rendered DOM: every section heading, navigation item, faculty and category
- **palette discipline** — the compiled stylesheet may contain only the three
  declared hex values; any other hue fails the run
- animation wiring: `IntersectionObserver` in the JS bundle, `fadeUp` keyframes
  and `prefers-reduced-motion` in the CSS bundle

## Troubleshooting

**`Turbopack is not supported on this platform`** — the native SWC binary failed
to install. The build scripts are pinned to `--webpack` as a workaround. To
return to Turbopack, delete `node_modules/@next/swc-win32-x64-msvc` and
reinstall, then drop the `--webpack` flags.

**Empty `@types/*` directories** — a truncated install can leave empty type
packages that break `tsc`. `tsconfig.json` pins `"types": ["node"]` to stop
TypeScript auto-including them.

## Project structure

```
app/
  globals.css     design tokens, base layer, reveal + reduced-motion rules
  layout.tsx      fonts, metadata
  page.tsx        section composition
components/
  ui.tsx          shared primitives (Container, SectionHeading, Tab, Reveal)
  Header.tsx  Hero.tsx  About.tsx  Faculties.tsx
  Research.tsx  News.tsx  CourseSearch.tsx  Footer.tsx
lib/
  site.ts         brand config — single source of truth for identity
  tokens.ts       palette and layout constants
  data.ts         all editorial content
  art.tsx         deterministic monochrome SVG artwork generator
smoke.mjs         end-to-end verification suite
```

## Licence

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Shariif Abdi.

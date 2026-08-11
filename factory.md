# Factory Configuration — lukeinglis.me

## Project
- **Name:** lukeinglis-website
- **Description:** Dynamic, time-aware personal website for Luke Inglis
- **Language:** TypeScript
- **Framework:** Next.js 15 (App Router)
- **Deployment:** Vercel

## Target Branch
main

## Modifiable Surfaces
- `app/**` — Next.js pages, layouts, components
- `components/**` — Shared React components
- `lib/**` — Utility functions and libraries
- `public/**` — Static assets
- `content/**` — Markdown and JSON content files
- `e2e/**` — Playwright E2E tests
- `vitest.config.ts` — Vitest configuration
- `vitest.setup.ts` — Vitest setup
- `playwright.config.ts` — Playwright configuration
- `next.config.ts` — Next.js configuration
- `postcss.config.mjs` — PostCSS configuration
- `eslint.config.mjs` — ESLint configuration
- `tsconfig.json` — TypeScript configuration
- `package.json` — Dependencies and scripts
- `.prettierrc` — Prettier configuration
- `.nvmrc` — Node version
- `middleware.ts` — Next.js edge middleware
- `factory.md` — Factory configuration (this file)

## Fixed Surfaces
- `eval/score.py` — Eval harness (CEO-managed)
- `.factory/**` — Factory state and config

## Eval Dimensions
| Dimension | Weight | Description |
|-----------|--------|-------------|
| tests | 0.20 | Vitest unit test pass rate |
| lint | 0.15 | ESLint zero errors |
| type_check | 0.15 | TypeScript strict mode zero errors |
| coverage | 0.10 | Test coverage percentage |
| capability_surface | 0.25 | Feature surface: pages, components, API routes, lib modules |
| observability | 0.15 | Logging, structured logging, tracing coverage |

## Eval Threshold
0.3

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — Lint + format check
- `npm run type-check` — TypeScript type check
- `npm test` — Run unit tests
- `npm run test:e2e` — Run E2E tests
- `npm run test:coverage` — Run tests with coverage

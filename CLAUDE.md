# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevClaw LP is a Japanese-language static landing page for a Mac Mini environment setup service, built with Astro and deployed to Cloudflare Pages.

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Build static site to `dist/`
- `pnpm preview` — Preview built site locally
- `pnpm check` — Run Astro + TypeScript type checking
- `pnpm lint` — Run Biome linter
- `pnpm lint:fix` — Auto-fix lint issues
- `pnpm format` — Format code with Biome
- `pnpm deploy:preview` — Build and preview via Wrangler (Cloudflare Pages)

Package manager is **pnpm**. Do not use npm or yarn.

## Architecture

Static site built with **Astro 5** (static output, no SSR) + **Tailwind CSS v4** + **TypeScript**.

### Component structure

```
src/layouts/Layout.astro    — Base HTML shell (lang="ja")
src/pages/index.astro       — Home page, composes all section components
src/components/
  Hero.astro                — Hero banner with CTA
  Service.astro             — Service offerings (2-column grid)
  Features.astro            — "Why choose us" section (3-column grid)
  Pricing.astro             — Pricing / contact section
  Footer.astro              — Footer with dynamic year
src/styles/global.css       — Tailwind import + theme color variables
```

### Path aliases

`@/*` maps to `src/*` (configured in tsconfig.json).

## Code Style

Enforced by **Biome** (biome.json):

- Tab indentation, 100-char line width
- Double quotes, always semicolons, trailing commas
- Biome does **not** lint `.astro` files (excluded in config)

**Lefthook** pre-commit hooks run `biome check --staged` and `astro check` automatically.

## Theme Colors

Defined as CSS custom properties in `src/styles/global.css`:

- `--color-primary`: `#1e3a5f` (dark blue)
- `--color-accent`: `#3b82f6` (bright blue)

Referenced in Tailwind as `bg-primary`, `text-accent`, etc.

## Deployment

Cloudflare Pages via Wrangler. Config in `wrangler.jsonc`, serves static files from `dist/`.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on push/PR to main: `biome check` → `astro check` → `pnpm build`.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Galaxtc Grimoire is an interactive spell book portfolio website for cosmic art. It features a realistic page-flip book interface with antique grimoire styling, magical particle effects, and a space background.

## Commands

```bash
npm run dev      # Development server at localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Architecture

### Core Components

- **GrimoireBook.tsx** - Main interactive book using `page-flip` library. Handles page navigation, blacklight toggle state, and renders all pages (cover, artwork spreads, contact page). Contains inline SVG `CornerOrnament` component for medieval-style decorations.

- **SpaceBackground.tsx** - Canvas-based animated starfield with twinkling stars and moving nebulae.

### Data Flow

Artwork data lives in `data/artworks.ts` as a typed array. Each artwork entry includes image paths, metadata, and optional blacklight version. The GrimoireBook component maps over this array to generate page spreads (left page: artwork image, right page: description).

### Styling Architecture

All styling is in `app/globals.css` using CSS variables:
- `--parchment-*` - Page colors
- `--leather-*` - Cover colors
- `--metal-*` - Metal decoration colors
- `--ink-*` - Text colors

The CSS includes page-flip library overrides (`.stf__*` classes) to customize animation shadows and stiffness.

### Type Definitions

Custom TypeScript declarations for the `page-flip` library are in `types/page-flip.d.ts` since the package lacks native types.

## Adding Artwork

1. Add image to `public/artwork/`
2. Add entry to `data/artworks.ts` with: id, title, image path, technique, description
3. For blacklight versions: set `hasBlacklight: true` and provide `blacklightImage` path

## Key Implementation Details

- Book fills 75% of viewport width when open (2 pages side by side)
- Page-flip settings tuned for thick parchment feel: `flippingTime: 1200`, `maxShadowOpacity: 0.35`
- Cover includes SVG cobwebs, stardust particles, dust motes, and mystical glow animations
- Inner pages have aging effects: vignette, foxing (brown spots), water stains, binding shadow

# Galaxtc Grimoire Portfolio

An interactive spell book / grimoire portfolio website for Galaxtc cosmic art.

## Features

- **Interactive Page-Flip**: Realistic book page turning animations using StPageFlip
- **Animated Space Background**: Dynamic starfield with twinkling stars and moving nebulae
- **Parchment Textures**: Authentic old book feel with aged parchment pages
- **Leather Cover**: Detailed grimoire cover with metal corner decorations
- **Magic Particles**: Floating golden dust particles for atmosphere
- **Blacklight Toggle**: Some artworks can be viewed in UV blacklight mode
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Keyboard Navigation**: Arrow keys to flip pages

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + Custom CSS
- **Page Flip**: page-flip (StPageFlip)
- **Fonts**: Google Fonts (Cinzel, Cinzel Decorative, Crimson Text)
- **Deployment**: Vercel-ready

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Adding New Artwork

1. Add the image to `/public/artwork/`
2. Edit `/data/artworks.ts` and add a new entry:

```typescript
{
  id: "unique-id",
  title: "Artwork Title",
  image: "/artwork/your-image.jpg",
  technique: "Acrylic on canvas",
  size: "40x50 cm",  // optional
  description: "Description of the artwork...",
  hasBlacklight: false,  // set to true if there's a UV version
  blacklightImage: "/artwork/uv-version.jpg",  // if hasBlacklight is true
}
```

## File Structure

```
galaxtc-website/
├── app/
│   ├── globals.css      # All styling including grimoire theme
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page component
├── components/
│   ├── GrimoireBook.tsx # Main book component with page-flip
│   └── SpaceBackground.tsx # Animated starfield canvas
├── data/
│   └── artworks.ts      # Artwork data (images, titles, descriptions)
└── public/
    └── artwork/         # Artwork images and logo
```

## Customization

### Colors
Edit the CSS variables in `globals.css`:
- `--parchment-*`: Page colors
- `--leather-*`: Cover colors
- `--metal-*`: Metal decoration colors
- `--ink-*`: Text colors

### Book Size
Adjust in `GrimoireBook.tsx`:
```typescript
const width = isMobile ? 300 : 450;
const height = isMobile ? 420 : 600;
```

## License

All artwork copyright Galaxtc. Website code can be adapted for personal portfolios.

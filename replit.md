# The Little Jungle Family Child Care

## Overview
A jungle-themed family childcare website for "The Little Jungle Family Child Care" - a home-based daycare business. Single-page marketing site with contact form.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js (minimal - contact form API only)
- **Storage**: In-memory (simple marketing site, no user accounts needed)
- **Routing**: wouter (single page with anchor links)

## Key Files
- `client/src/pages/home.tsx` - Main landing page with all sections (Navbar, Hero Slider, Reasons, Learn/Play/Grow, About, Tuition, Contact Form, Footer)
- `client/src/App.tsx` - Root app component with routing
- `client/src/index.css` - Theme variables (jungle green color scheme)
- `server/routes.ts` - Contact form POST endpoint
- `server/storage.ts` - In-memory storage for contact inquiries

## Theme
- **Brand**: "The Little Jungle Family Child Care"
- **Colors**: Jungle green (#1b5e20) primary, Gold/Amber (#f9a825) accent
- **Font**: Poppins (sans-serif)
- **Style**: Jungle/tropical theme throughout

## Images
Generated AI images stored in `client/public/images/`:
- logo.png, hero1-3.png, reason-home/nurture/trust.png, learn.png, play.png, provider.png

## Sections
1. Fixed navbar with scroll effect
2. Hero image slider (3 slides, auto-rotate)
3. Top 3 Reasons overview (circular images)
4. Detailed reasons with alternating layout
5. "We Are A Family" CTA banner
6. Learn / Play / Grow cards
7. About section with provider bio & environment
8. Tuition pricing cards
9. Contact/Book a Tour form
10. Footer with links and contact info

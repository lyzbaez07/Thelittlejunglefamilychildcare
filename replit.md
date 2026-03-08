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
- `server/routes.ts` - Contact form POST endpoint (sends email via Resend)
- `server/resend.ts` - Resend email client integration
- `server/storage.ts` - In-memory storage for contact inquiries

## Email Integration
- **Service**: Resend (via Replit connector)
- **Forward to**: Thelittlejunglefamilychildcare@gmail.com
- **Trigger**: Contact form submission sends formatted email with all form fields
- **Provider**: Lilly Baez
- **Phone**: (857) 800-6951

## Theme
- **Brand**: "The Little Jungle Family Child Care"
- **Colors**: Jungle green (#1b5e20) primary, Gold/Amber (#f9a825) accent
- **Font**: Poppins (sans-serif)
- **Style**: Jungle/tropical theme throughout

## Business Details
- **Provider**: Lilly Baez (20+ years experience in Early Childhood Education)
- **Phone**: (857) 800-6951
- **Email**: Thelittlejunglefamilychildcare@gmail.com
- **Location**: Lower Mills, 02126
- **Hours**: Monday – Friday, 7:30am – 5:30pm
- **Features**: Bilingual Child Care, Licensed by EEC, CDA Credential, CPR/First Aid Certified
- **Meals**: Breakfast, Lunch & Snack Provided

## Images
- `client/public/images/logo-real.jpg` - Real business logo (rainbow with jungle animals)
- `client/public/images/provider.jpeg` - Real provider photo (Lilly Baez)
- `client/public/images/flyer.jpeg` - Business flyer (Spanish enrollment flyer)
- 15 real daycare photos: real-room-full, real-activity-table, real-welcome-wall, real-play-area, real-toys-storage, real-cubbies, real-highchairs, real-reading-corner, real-books-wall, real-learning-window, real-play-kitchen, real-cozy-corner, real-room-corner, real-info-board, real-changing-station (.jpeg)
- Old AI images no longer used but still in directory

## Sections
1. Fixed navbar with scroll effect (real logo) + Gallery nav link
2. Hero image slider (3 real daycare photos, auto-rotate)
3. Top 3 Reasons overview (real photos)
4. Detailed reasons with alternating layout (real photos)
5. "We Are A Family" CTA banner (with "Now Accepting Enrollments!" and bilingual/meals info)
6. Video section ("A Day In Our Jungle")
7. Learn / Play / Grow cards (real photos)
8. Photo Gallery - masonry layout with all 15 real daycare photos, hover zoom
9. About section with bilingual/EEC/hours/meals badges, provider bio (full text), and learning environment details
10. Tuition pricing cards (7:30am-5:30pm)
11. Contact/Book a Tour form
12. Footer with links, contact info, bilingual/EEC, and hours

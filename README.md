# On Point — Award-Worthy Design

Think outside the box. Break conventions. Surprise and delight.

## What Makes This Different

This isn't a template. It's a statement piece designed to win awards on Awwwards and Lapa.ninja.

### The Experience

1. **Kinetic Typography** — Hero words follow your mouse with parallax depth
2. **Horizontal Scroll** — Work section scrolls horizontally as you scroll vertically (scroll-jacking done right)
3. **Tilt Cards** — Service cards respond to mouse position with 3D perspective
4. **Custom Cursor** — Expands on interactive elements with view indicator
5. **Split Screen About** — Contrasting dark/bright sections
6. **Orb CTA** — Pulsing gradient orbs create depth and atmosphere
7. **Animated Form** — Floating labels with animated underlines

### Design Choices

- **Syne** for display — Bold, geometric, unforgettable
- **Space Grotesk** for body — Technical but friendly
- **Black + Cream** alternating sections for rhythm
- **Single accent** (orange #FF6B35) used strategically
- **Grain overlay** for texture and depth
- **Progress bar** on horizontal scroll section

### Technical Details

- Pure vanilla JS (~13KB)
- No dependencies
- CSS custom properties throughout
- Intersection Observer for reveals
- RequestAnimationFrame for smooth animations
- Passive scroll listeners for performance
- Reduced motion support

## Structure

```
On Point/
├── index.html          
├── css/
│   └── styles.css      # ~1,200 lines
├── js/
│   └── main.js         # ~400 lines
├── assets/
│   ├── favicon.svg
│   ├── logo.svg
│   └── og-image.svg
└── README.md
```

## Sections

1. **Hero** — Kinetic typography, floating shapes, scroll indicator
2. **Marquee** — Scrolling keywords
3. **Work** — Horizontal scroll with progress bar
4. **Services** — 4 tilt cards with accent colors
5. **Process** — Timeline with connecting lines
6. **Testimonials** — Featured + grid layout
7. **About** — Split screen (dark left, orange right)
8. **CTA** — Orb background, magnetic button
9. **Contact** — Floating label form
10. **Footer** — Grid navigation

## Quick Start

```bash
cd ~/Desktop/On Point
python -m http.server 8000
# Open http://localhost:8000
```

## Interactions

| Element | Behavior |
|---------|----------|
| Hero words | Follow mouse with parallax |
| Work section | Horizontal scroll |
| Service cards | 3D tilt on hover |
| Buttons | Magnetic pull toward cursor |
| Cursor | Expands on interactive elements |
| Form inputs | Floating labels + animated line |
| Stats | Count up on scroll |

## Color Palette

```css
--black: #000000;
--cream: #f8f7f4;
--accent-1: #FF6B35;  /* Primary orange */
--accent-2: #4ECDC4;  /* Teal */
--accent-3: #A855F7;  /* Purple */
--accent-4: #FFE66D;  /* Yellow */
```

## Award Criteria Met

✓ **Originality** — Kinetic typography + horizontal scroll
✓ **Creativity** — Unexpected interactions at every turn
✓ **Usability** — Clear hierarchy, intuitive navigation
✓ **Content** — Results-focused, concise copy
✓ **Design** — Bold typography, intentional whitespace
✓ **Mobile** — Fully responsive with adapted interactions

---

Built to win. ✦

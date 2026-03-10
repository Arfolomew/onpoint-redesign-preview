# On Point Web Design — Redesign Plan

## Vision
Florida sunshine energy meets professional design studio. Inspired by supershine.design — warm, retro-playful, animated, memorable. Moving from dark/moody to bright/warm while keeping all existing content and functionality.

## Inspiration
- supershine.design — retro warmth, scroll animations, custom illustrations, playful but pro
- Keep: structure, copy, chatbot, contact form, audit page, blog, portfolio

## Branch Strategy
- Work on `redesign` branch
- Original site stays on `main` untouched
- Merge only when we're happy with the full result
- Can A/B compare by switching branches

## New Color Palette (Florida Sunshine)
TBD — to be finalized in Phase 1. Direction:
- Warm cream/sand base (not stark white)
- Sunset coral/orange accent
- Ocean teal secondary
- Warm navy for text (not black)
- Pops of sunny yellow

## New Tech Stack Additions
- GSAP + ScrollTrigger (scroll-based animations)
- Lottie-web (lightweight animations, optional)
- Custom SVG illustrations (Florida-themed: sun, waves, palms — subtle, not cheesy)

## Phases (Section by Section)

### Phase 1: Foundation
- [ ] Create `redesign` branch
- [ ] New color palette + CSS variables
- [ ] New typography (keep Outfit or explore alternatives)
- [ ] Base styles: backgrounds, spacing, borders
- [ ] Light/warm background replacing dark theme

### Phase 2: Navigation + Hero
- [ ] Redesign navbar (warm, bright)
- [ ] New hero section — bold headline, warm colors, animated elements
- [ ] Scroll marquee update (new colors/style)

### Phase 3: Info Bar + Why + Benefits
- [ ] Info bar / brand bar redesign
- [ ] "Why" section — warm cards, illustrations
- [ ] Benefits section — playful icons, animations

### Phase 4: Services + Process
- [ ] Services cards — new style, warm palette
- [ ] Process steps — illustrated, animated on scroll

### Phase 5: About + CTA + Portfolio
- [ ] About big text section
- [ ] CTA section — warm, inviting
- [ ] Portfolio page refresh (same mockups, new frame)

### Phase 6: Contact + Footer + Areas
- [ ] Contact form — new styling
- [ ] Service areas section
- [ ] Footer redesign

### Phase 7: Sub-Pages
- [ ] Pricing page
- [ ] Audit page
- [ ] Blog listing
- [ ] 404 page

### Phase 8: Animations + Polish
- [ ] GSAP ScrollTrigger integration
- [ ] Scroll-triggered fade-ins, parallels
- [ ] Marquee animations
- [ ] Micro-interactions (hover states, buttons)
- [ ] Custom SVG illustrations throughout

### Phase 9: Logo + Branding
- [ ] New logo designed with logo-design skill
- [ ] Favicon, social images updated
- [ ] OG image regenerated

### Phase 10: Testing + Launch
- [ ] Mobile responsive check
- [ ] Lighthouse audit (perf, a11y, SEO)
- [ ] Cross-browser testing
- [ ] Final review
- [ ] Merge to main + deploy

## Current Site Sections (index.html)
1. Navigation + Mobile Menu
2. Hero (floating project cards)
3. Scroll Marquee
4. Info Bar + Brand Bar
5. Why Section (001)
6. Benefits (002)
7. Color Pipes
8. Services (003)
9. Process (004)
10. About (Big Text)
11. CTA
12. Contact
13. Service Areas
14. Footer

## Files to Redesign
- index.html (main page)
- css/styles.css (complete restyle)
- pricing.html
- audit.html
- blog.html
- portfolio.html
- 404.html
- privacy.html / terms.html (minor)

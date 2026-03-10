# On Point — CMS Options for Client Sites

**Purpose:** Let clients edit their own content (menus, prices, hours, team bios, etc.) without touching code or contacting us.

---

## Option 1: Sanity (Headless CMS) ⭐ Recommended for serious projects

**What it is:** A hosted CMS with a clean dashboard. We define what's editable, client logs in and updates fields like a form.

**Best for:** Standard & Premium tier clients who need ongoing content control.

**Pros:**
- Professional admin dashboard (Sanity Studio)
- We control exactly what they can edit — can't break the design
- Real-time preview of changes
- Image uploads, rich text, structured data
- Free tier: 3 users, 10K API calls/day, 500K API CDN requests
- Works with any frontend (static HTML, Next.js, etc.)

**Cons:**
- Requires initial setup time (~2-4 hours per project)
- Slight learning curve for clients (but way simpler than WordPress)

**Cost to us:** Free tier covers most small businesses. Paid starts at $15/mo if they outgrow it.

**How it works:**
1. We build the site as normal
2. Set up Sanity Studio with editable fields (menu items, prices, hours, etc.)
3. Site fetches content from Sanity API on load
4. Client logs into studio.sanity.io, edits their content, hits publish

---

## Option 2: Supabase as a CMS

**What it is:** We already use Supabase for SnipDish. Build a simple admin panel backed by Supabase tables.

**Best for:** Projects where we want full control over the admin UI.

**Pros:**
- We already know the tech stack
- Full control over the admin experience
- PostgreSQL database — can handle complex data relationships
- Free tier: 500MB database, 50K auth users, 2GB storage
- Can double as a backend if the site needs more features later

**Cons:**
- We have to build the admin panel ourselves (more dev time)
- More maintenance than a hosted CMS

**Cost to us:** Free tier covers it. Paid starts at $25/mo.

**How it works:**
1. Create tables for editable content (e.g., menu_items, pricing, team_members)
2. Build a simple admin page (password protected)
3. Site fetches content from Supabase on load
4. Client logs into the admin page, edits rows, saves

---

## Option 3: Google Sheets as a Backend ⭐ Recommended for simple use cases

**What it is:** Client edits a Google Sheet, the website pulls data from it automatically.

**Best for:** Restaurants, shops, or any business that just needs to update a list of items/prices.

**Pros:**
- Zero learning curve — everyone knows Google Sheets
- No onboarding, no passwords to remember
- Free forever
- Client can edit from their phone
- Can share the sheet with their staff

**Cons:**
- Slightly janky (API rate limits, ~1 min cache delay)
- Not great for complex content (images, rich text)
- Depends on Google Sheets API staying free
- Less "professional" if client peeks behind the curtain

**Cost to us:** $0

**How it works:**
1. Create a Google Sheet with columns (Item, Description, Price, Category, etc.)
2. Publish sheet to web or use Sheets API
3. Site fetches sheet data on load and renders it
4. Client edits the sheet, site updates within minutes

---

## Option 4: Decap CMS (formerly Netlify CMS)

**What it is:** An open-source CMS that saves content as files in the GitHub repo. Admin UI runs in the browser.

**Best for:** Static sites hosted on GitHub Pages or Cloudflare Pages.

**Pros:**
- Free and open source
- No external database or API
- Content stored as markdown/JSON in the repo
- Git-based = version history for free
- Simple admin UI at yoursite.com/admin

**Cons:**
- Requires GitHub account for the client (or proxy auth setup)
- Changes trigger a site rebuild (1-2 min delay)
- Less flexible for complex structured data

**Cost to us:** $0

---

## Recommendation by Client Tier

| Tier | CMS Approach | Why |
|---|---|---|
| **Basic** ($1,500) | Google Sheets or no CMS | Keep it simple, minimal content changes expected |
| **Standard** ($3,000) | Sanity or Decap CMS | Client expects to manage their own content |
| **Premium** ($5,000+) | Sanity or Supabase | Full control, complex content, possibly dynamic features |

---

## Setup Time Estimates

| CMS | Initial Setup | Per-Project Customization |
|---|---|---|
| Sanity | 2-4 hours | 1-2 hours |
| Supabase | 4-6 hours | 2-3 hours |
| Google Sheets | 1-2 hours | 30 min |
| Decap CMS | 2-3 hours | 1 hour |

---

## Action Items
- [ ] Decide on a default CMS for Standard tier
- [ ] Build a reusable Sanity Studio template for common use cases (restaurant menu, service business, retail)
- [ ] Test Google Sheets approach with a demo site
- [ ] Update pricing sheet to explain CMS in client-friendly terms

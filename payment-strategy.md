# On Point — Payment & Client Management Strategy

**Prepared by Norm — March 4, 2026**

---

## The Goal

1. Accept payments (one-time + recurring subscriptions)
2. Automate monthly billing so we're not chasing clients
3. Give clients a portal to view their account, invoices, and subscription status
4. Handle cancellations gracefully — auto-trigger offboarding (domain transfer, file delivery, etc.)
5. Minimize manual work and fees

---

## Option Comparison

### Option A: Square (Card Reader + Invoicing)

**What it is:** Square card reader on your phone for in-person payments + Square Invoices for remote billing.

**Pros:**
- Simple to start — download app, get free card reader
- Good for in-person meetings (tap to pay)
- Can send invoices via email
- Recurring invoices available
- No monthly fee (free tier)

**Cons:**
- Processing fee: **2.6% + $0.10** (in-person) / **3.5% + $0.15** (manual entry) / **2.9% + $0.30** (invoices)
- No real client portal — clients just get email invoices
- No automated offboarding on cancellation
- Recurring invoices aren't true subscriptions (no self-service cancel, no client login)
- Feels less professional — no branded experience
- You'd still be manually tracking who's active, who's cancelled, etc.

**Best for:** Quick in-person payments at client meetings. Not ideal as the primary system.

---

### Option B: Stripe (Online Payments + Subscriptions + Client Portal)

**What it is:** Stripe for payment processing + Stripe Customer Portal for self-service subscription management + a simple client dashboard on onpointfl.com.

**Pros:**
- Processing fee: **2.9% + $0.30** (standard, same as almost everyone)
- True subscription management — clients auto-billed monthly
- **Stripe Customer Portal** — clients can view invoices, update payment method, cancel subscription (all self-service, hosted by Stripe, no code needed)
- Webhook support — we get notified instantly when someone cancels, payment fails, etc.
- Can trigger automated offboarding (send them their files, domain transfer instructions)
- Professional branded checkout (Stripe Checkout or embedded forms)
- Stripe Invoicing for one-time project payments
- Dashboard to track all revenue, active subscriptions, churn
- Stripe Tax can auto-calculate sales tax if needed
- No monthly fee (pay per transaction only)

**Cons:**
- More setup work upfront
- Need to build a simple client page on our site (or use Stripe's hosted pages)
- Slightly higher fee than Square for in-person (but we're mostly online)

**Best for:** Exactly what you described — automated subscriptions, client portal, cancellation handling.

---

### Option C: Hybrid (Stripe + Square Reader)

**What it is:** Stripe as the primary payment/subscription system + a Square reader for the occasional in-person payment.

**Pros:**
- Best of both worlds
- In-person meetings: tap their card with Square for the 50% deposit
- Everything else: Stripe handles subscriptions, invoicing, portal
- Or skip Square entirely — Stripe Terminal exists but requires hardware purchase ($59+ reader)

**Cons:**
- Two systems to reconcile (minor hassle)
- Could just use Stripe invoicing for everything and skip Square

---

## ⭐ Recommendation: Option B (Stripe Only) or Option C (Stripe + Square)

Stripe is the clear winner for your business model. Here's why:

1. **Subscriptions are your bread and butter** — hosting ($50/mo), SEO ($300/mo), chatbot ($75-150/mo). These need to be automated.
2. **Client portal solves the "chase them for payment" problem** — they manage their own billing.
3. **Cancellation webhooks** let us automate offboarding instead of manually tracking who's active.
4. **One dashboard** to see all revenue, active clients, and churn.

Square is only worth keeping if you do a lot of in-person meetings where someone wants to tap their card. Otherwise Stripe handles everything.

---

## Implementation Plan

### Phase 1: Stripe Setup (Day 1)

1. **Create Stripe account** at stripe.com (free)
2. **Verify business** — On Point, sole proprietor or LLC, bank account for payouts
3. **Create Products & Prices in Stripe Dashboard:**

**One-time products:**
| Product | Price |
|---|---|
| Basic Website (5 pages) | $1,500 |
| Standard Website (10 pages + CMS) | $3,000 |
| Premium Website (custom) | $5,000 |
| Technical SEO Audit | $500 |
| Local SEO Setup | $300 |
| AI Chatbot Setup (Standard) | $500 |
| AI Chatbot Setup (Advanced) | $1,000 |
| Logo Design | $400 |
| Brand Identity | $750 |
| Premium Branding | $1,200 |
| Starter Package | $1,999 |
| Growth Package | $4,200 |
| Dominate Package | $6,499 |

**Subscription products (monthly recurring):**
| Product | Price |
|---|---|
| Hosting & Maintenance | $50/mo |
| Content Updates | $100/mo |
| Ongoing SEO | $300/mo |
| AI Chatbot (Standard) | $75/mo |
| AI Chatbot (Advanced) | $150/mo |
| Starter Monthly (Hosting) | $50/mo |
| Growth Monthly (Hosting + SEO + Chatbot) | $425/mo |
| Dominate Monthly (All services) | $525/mo |

4. **Enable Stripe Customer Portal** (Settings → Customer Portal):
   - Allow customers to view invoices ✓
   - Allow customers to update payment method ✓
   - Allow customers to cancel subscriptions ✓
   - Set cancellation to end-of-billing-period (not immediate)

### Phase 2: Client Dashboard on onpointfl.com (Week 1)

Build a simple `/clients` page on the On Point site:

**Option A — Minimal (Stripe-hosted, no code):**
- Use **Stripe Payment Links** for one-time payments (shareable URLs)
- Use **Stripe Customer Portal link** for existing clients to manage billing
- Just add a "Client Login" button in the nav that redirects to Stripe's hosted portal
- **Effort:** ~1 hour. No backend needed.

**Option B — Custom Portal (more professional):**
- `/clients` page with login (email-based, magic link or simple auth)
- Shows: active services, next invoice date, payment history
- "Manage Billing" button → redirects to Stripe Customer Portal
- "Pay Invoice" → Stripe Checkout
- Pulls data from Stripe API
- **Effort:** 1-2 days of development. Needs a small backend (could use Cloudflare Workers).

**Recommendation:** Start with Option A (Stripe-hosted everything). Build Option B later when you have 10+ clients and want a more branded experience.

### Phase 3: Automated Workflows (Week 1-2)

**New client onboarding:**
1. Client signs up → Stripe creates customer
2. Send welcome email with:
   - Login link to client portal
   - Project timeline
   - What we need from them (content, brand assets, etc.)

**Payment flow for projects:**
1. Discovery call → agree on package/services
2. Send Stripe invoice for 50% deposit (one-time)
3. Client pays via Stripe Checkout
4. We start work
5. On launch → send Stripe invoice for remaining 50%
6. Client pays → subscription starts (hosting, SEO, chatbot, etc.)

**Monthly subscriptions (automated):**
1. Stripe auto-charges on billing date
2. Client gets email receipt
3. If payment fails → Stripe retries (3 attempts over ~2 weeks)
4. If all retries fail → subscription marked past due → we get notified

**Cancellation flow (automated via webhook):**
1. Client cancels in portal → subscription ends at period end
2. Stripe fires `customer.subscription.deleted` webhook
3. Webhook triggers offboarding email:
   - Domain transfer instructions
   - Link to download their site files (zip)
   - Any credentials they need
   - "Thank you for being a client" message
4. After 30 days → remove hosting, deactivate chatbot

### Phase 4: Revenue Tracking

**Stripe Dashboard gives you:**
- Monthly Recurring Revenue (MRR)
- Churn rate
- Average Revenue Per Client
- Payment success rate
- Tax reporting (1099-K if applicable)

No need to build custom analytics — Stripe's dashboard handles it.

---

## Fee Comparison

**On a $1,999 Starter Package (one-time):**

| Provider | Fee | You keep |
|---|---|---|
| Stripe | $58.27 (2.9% + $0.30) | $1,940.73 |
| Square (invoice) | $58.27 (2.9% + $0.30) | $1,940.73 |
| Square (in-person) | $52.17 (2.6% + $0.10) | $1,946.83 |

**On $425/mo Growth subscription (annual):**

| Provider | Annual fee | You keep |
|---|---|---|
| Stripe | $151.50 ($12.63/mo) | $4,948.50 |
| Square | $151.50 ($12.63/mo) | $4,948.50 |

Fees are essentially identical. The difference is in features — Stripe wins on subscriptions and automation.

---

## Estimated Monthly Revenue (Projections)

**Per client average (assuming Growth package is most popular):**
- One-time: $4,200
- Monthly: $425/mo

**At 5 active clients:**
- One-time revenue: $21,000 (spread over time)
- Monthly recurring: $2,125/mo ($25,500/year)
- Stripe fees: ~$62/mo

**At 10 active clients:**
- Monthly recurring: $4,250/mo ($51,000/year)
- Stripe fees: ~$124/mo

---

## Quick Start Checklist

- [ ] Create Stripe account (stripe.com)
- [ ] Verify business + connect bank account
- [ ] Create all products & prices (one-time + subscription)
- [ ] Enable Customer Portal in Stripe settings
- [ ] Generate Payment Links for each package
- [ ] Add "Client Login" link to onpointfl.com nav (→ Stripe Portal)
- [ ] Set up webhook endpoint for cancellation notifications
- [ ] Create offboarding email template
- [ ] (Optional) Get Square reader for in-person tap-to-pay at meetings
- [ ] Test full flow: payment → subscription → portal → cancel

---

## Decision Needed from Jake

1. **Stripe only or Stripe + Square?** (I recommend Stripe only to start, add Square later if needed)
2. **Client portal: Stripe-hosted (quick) or custom branded (more work)?** (I recommend Stripe-hosted first)
3. **Do we need an LLC?** Running payments through a business entity looks more professional and has liability protection. Worth discussing.

---

*Ready to implement whichever direction you choose. The Stripe setup can be done in an afternoon.*

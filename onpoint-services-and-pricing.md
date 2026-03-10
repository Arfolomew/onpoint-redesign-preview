# On Point — Services, Pricing & Payment Integration Plan

**Updated: February 21, 2026**

---

## Payment Processor: Stripe

### Why Stripe
- One-time payments (project invoices)
- Recurring subscriptions (monthly services)
- In-person payments via Stripe Terminal (tap-to-pay on phone)
- Built-in customer portal (billing, plan management, invoices)
- No monthly fees — 2.9% + 30¢ per transaction

### Stripe Products to Create

**One-Time Products (Invoices):**

| Product | Price |
|---------|-------|
| Basic Website (up to 5 pages) | $1,500 |
| Standard Website (up to 10 pages + CMS) | $3,000 |
| Premium Website (fully custom) | $5,000+ |
| Technical SEO Audit | $500 |
| Local SEO Setup | $300 |
| Google Business Profile Setup & Optimization | $200 |
| AI Chatbot Setup — Standard | $500 |
| AI Chatbot Setup — Advanced | $1,000 |
| Social Media Account Setup & Strategy | $300 |

**Subscription Products (Monthly):**

| Product | Monthly Price |
|---------|---------------|
| Hosting & Maintenance | $50/mo |
| Content Updates (up to 10 text/image changes) | $100/mo |
| Ongoing SEO | $300/mo |
| AI Chatbot — Standard | $75/mo |
| AI Chatbot — Advanced | $150/mo |
| Social Media Content — Standard (8 posts/mo) | $250/mo |
| Social Media Content — Premium (16 posts/mo) | $400/mo |
| Ad Management — Starter (up to $1K spend) | $200/mo |
| Ad Management — Growth (up to $3K spend) | $400/mo |
| Google Business Profile Management | $150/mo |

**Package Products:**

| Package | Upfront | Monthly |
|---------|---------|---------|
| Starter — "Get On the Map" | $1,800 | $200/mo |
| Growth — "Turn It On" | $3,800 | $475/mo |
| Dominate — "The Full Stack" | $5,999 | $899/mo |

### Payment Terms
- 50% upfront to start, 50% on launch
- Monthly services: 3-month minimum commitment
- Cancel monthly services with 30 days notice after initial commitment
- Ad spend paid directly to Meta/Google by client (not included in our fees)

---

## Client Portal Plan

### Phase 1 (Launch)
- **Stripe Customer Portal** — self-service billing management
  - View/download invoices
  - Update payment method
  - Upgrade/downgrade subscription plan
  - Cancel (with 30-day notice enforcement)
- **Client Dashboard Page** on onpointfl.com
  - Login via Stripe customer link (or simple auth)
  - Shows active plan, next billing date, invoice history
  - "Request Changes" form (sends email notification to team)
  - Link to Stripe portal for billing management

### Phase 2 (Future — Only If Demand Warrants)
- Lightweight CMS for clients to make their own text/image edits
- Would require per-client site architecture planning
- Hold off unless clients are actively requesting it

---

## Implementation Steps

1. [ ] Create Stripe account for On Point
2. [ ] Set up all products & prices in Stripe dashboard
3. [ ] Create subscription plans with 3-month minimum
4. [ ] Enable Stripe Customer Portal
5. [ ] Add "Client Portal" page to onpointfl.com
6. [ ] Integrate Stripe Checkout for online payments
7. [ ] Set up Stripe Terminal for in-person payments
8. [ ] Test full flow: purchase → invoice → portal access → upgrade/cancel
9. [ ] Add payment links to proposals/emails

---

## Notes
- Pricing sheet (full detail with descriptions): `pricing-sheet.md`
- Stripe docs: https://stripe.com/docs
- Customer Portal docs: https://stripe.com/docs/customer-management/portal
- Terminal (tap-to-pay): https://stripe.com/docs/terminal/payments/setup-reader/tap-to-pay

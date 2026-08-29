# CU4 — E-Commerce Marketing: Store Setup & Product Catalogue Management
**Ref:** SBCO-CU4-ECOM-002-v2 
**Organisation:** Superbowl Lipis (SBL Co), Kuala Lipis, Pahang 
**Prepared by:** Zuriel Seong Ming Ee 
**Date:** January 2025 
**Work Activities Covered:** WA3 (Online Store Setup & Management), WA4 (Product Listing & Catalogue Management)

---

## 1. Strategic Purpose

This document records the execution of the e-commerce store setup for Superbowl Lipis, translating the strategy approved in SBCO-CU4-ECOM-001-v2 into a live, operational storefront. It covers all managerial decisions made during platform build, user experience design, product catalogue structuring, and pre-launch quality assurance.

The store URL at launch: **https://superbowllipis.my** (hosted via custom domain, deployed January 2025)

---

## WA3 — Online Store Setup and Management

### 3.1 Store Architecture Decisions

| Component | Decision Made | Rationale |
|-----------|---------------|-----------|
| Platform | Custom HTML/CSS/JS (zero cost) | Eliminates RM 120–500/month Shopify fee at launch stage |
| Hosting | GitHub Pages + custom domain | Free, reliable, global CDN |
| Cart persistence | localStorage (browser-based) | No backend required; cart survives page navigation |
| Payment | Link to WhatsApp for manual order confirmation | Avoids payment gateway setup cost at MVP stage |
| Analytics | Meta Pixel + Google Analytics 4 | Required for ad attribution and conversion tracking |
| SSL/Security | GitHub Pages provides HTTPS by default | Ensures "secure" padlock for customer trust |

**Management note:** The decision to launch with a zero-cost custom store rather than a Shopify subscription was a deliberate capital allocation choice. Monthly savings of RM 120–500 are redirected to Meta Ads spend, accelerating customer acquisition during the validation phase. A Shopify migration is planned once monthly GMV exceeds RM 8,000 consistently.

### 3.2 Store Page Structure

| Page | Purpose | Key Elements |
|------|---------|---------------|
| Homepage (index.html) | Conversion landing + brand introduction | Hero section, trust bar, collections grid, featured products, brand story, newsletter CTA |
| All Products (products.html) | Full catalogue browse | Category filter tabs, sort options, product cards with Add to Cart |
| Cart (cart.html) | Pre-checkout review | Item list, quantity controls, order summary, promo code input, shipping calculator |

### 3.3 User Experience (UX) Design Principles

| UX Element | Implementation | Business Objective |
|------------|----------------|--------------------|
| Announcement bar | "Free shipping above RM 100" | AOV uplift — pushes customers to add another item |
| Promo code SBL10 | 10% off first order | Email capture incentive; reduces first-purchase friction |
| "Best Seller" badge | On SBL Classic Tee | Social proof — anchors buyer confidence on highest-margin item |
| Mobile-responsive layout | Breakpoints at 1024px, 768px, 480px | 72% of Malaysian shoppers use mobile — non-negotiable |
| Cart count badge (red) | Updates in real time | Persistent reminder of cart contents; reduces abandonment |
| Free shipping threshold notice | "Add RM X more for free shipping" | Dynamic AOV booster in cart |
| Toast notifications | "✅ SBL Classic Tee added to cart" | Immediate feedback reduces uncertainty |
| Brand colour system | SBL Red (#c0392b) + Black (#111) | Consistent with SBL physical merchandise and social media branding |

### 3.4 Technical Setup Checklist

| Task | Status | Completed By | Date |
|------|--------|--------------|------|
| Domain registration (superbowllipis.my) | ✅ Done | Zuriel | Jan 5, 2025 |
| GitHub repository setup | ✅ Done | Zuriel | Jan 6, 2025 |
| Store pages built (3 pages) | ✅ Done | Zuriel | Jan 10, 2025 |
| CSS design system completed | ✅ Done | Zuriel | Jan 10, 2025 |
| Cart functionality tested | ✅ Done | Zuriel + Qis | Jan 11, 2025 |
| Mobile responsiveness verified | ✅ Done | Nadiah | Jan 11, 2025 |
| Promo code SBL10 configured | ✅ Done | Zuriel | Jan 12, 2025 |
| Meta Pixel installed | ✅ Done | Zuriel | Jan 12, 2025 |
| Google Analytics 4 installed | ✅ Done | Zuriel | Jan 12, 2025 |
| Newsletter form connected | ✅ Done | Zuriel | Jan 13, 2025 |
| Cross-browser testing (Chrome, Safari, Firefox) | ✅ Done | Qis | Jan 13, 2025 |
| Store soft launch (friends & family) | ✅ Done | All staff | Jan 15, 2025 |
| Meta Pixel event verification | ✅ Done | Zuriel | Jan 15, 2025 |
| **Public launch** | **✅ Done** | **Zuriel** | **Jan 17, 2025** |

### 3.5 Ongoing Store Management Responsibilities

| Activity | Frequency | Responsible | Escalation If |
|----------|-----------|-------------|----------------|
| Check orders and process fulfilment | Daily | Qis | Overdue >24hrs → Zuriel |
| Reply to customer DMs/WhatsApp | Daily (within 4hrs) | Iqa | Complaint → Zuriel |
| Update product availability | As needed | Qis | Out of stock → notify Zuriel immediately |
| Review site performance (GA4) | Weekly | Zuriel | Bounce rate >75% → investigate |
| Update promotional banner | Per campaign | Nadiah | Changes approved by Zuriel |
| Monthly store analytics report | Monthly | Zuriel | — |

---

## WA4 — Product Listing and Catalogue Management

### 4.1 Product Catalogue Overview

| SKU ID | Product Name | Category | Price (RM) | Stock (Launch) | Variants | Badge |
|--------|--------------|----------|-----------|----------------|----------|-------|
| SBL-TEE-01 | SBL Classic Tee | Apparel | 49.00 | 50 units | S, M, L, XL | Best Seller |
| SBL-HOOD-01 | SBL Premium Hoodie | Apparel | 89.00 | 20 units | S, M, L, XL | New |
| SBL-CAP-01 | SBL Snapback Cap | Apparel | 39.00 | 30 units | One Size | — |
| SBL-TOTE-01 | SBL Canvas Tote | Accessories | 25.00 | 40 units | Natural, Black | — |
| SBL-BTL-01 | SBL Water Bottle | Accessories | 45.00 | 25 units | 500ml, 750ml | Popular |
| SBL-MUG-01 | SBL Ceramic Mug | Lifestyle | 29.00 | 35 units | White, Black | — |
| SBL-STK-01 | SBL Sticker Pack (5pcs) | Lifestyle | 15.00 | 100 units | Pack A, B, Mixed | Value |
| SBL-PIN-01 | SBL Enamel Pin Set | Lifestyle | 20.00 | 50 units | Set of 3 | Limited |

**Total launch inventory value:** RM 9,530 (at cost) 
**Total launch SKUs:** 8 products across 3 categories

### 4.2 Pricing Strategy

| Category | Cost of Goods | Selling Price | Gross Margin | Pricing Rationale |
|----------|--------------|---------------|--------------|-------------------|
| Apparel — Tee | RM 18 | RM 49 | 63% | Brand premium over generic tees (Shopee RM 15–20); local identity commands premium |
| Apparel — Hoodie | RM 35 | RM 89 | 61% | Heavy-weight fleece; benchmarked vs streetwear brands |
| Apparel — Cap | RM 15 | RM 39 | 62% | Competitive with Shopee branded caps (RM 25–45) |
| Accessories — Tote | RM 8 | RM 25 | 68% | High-margin impulse add-on |
| Accessories — Bottle | RM 18 | RM 45 | 60% | Insulated bottle — functional + branded |
| Lifestyle — Mug | RM 8 | RM 29 | 72% | Highest margin; gifting use case |
| Lifestyle — Stickers | RM 3 | RM 15 | 80% | Digital-native product; zero fulfilment cost |
| Lifestyle — Pin | RM 7 | RM 20 | 65% | Limited edition — scarcity pricing |

### 4.3 Product Listing Standards

Each product listing follows this content standard, reviewed by Zuriel before publishing:

| Element | Standard | Example (SBL Classic Tee) |
|---------|---------|----------------------------|
| Product name | Brand name + product type, max 6 words | "SBL Classic Tee" |
| Description | 1–2 sentences: material + key feature + use case | "Our iconic classic tee. Soft cotton, bold logo. Available in Black, White and Red." |
| Price | RM prefix, 2 decimal places | RM 49.00 |
| Category tag | One of: apparel / accessories / lifestyle | apparel |
| Variants | Size or colour options listed | S, M, L, XL |
| Badge | Best Seller / New / Popular / Value / Limited — max 1 per product | Best Seller |
| Product visual | Gradient colour block + emoji placeholder (pre-photography) | Red gradient + 👕 |

### 4.4 Catalogue Management Schedule

| Activity | Trigger | Responsible | Process |
|----------|---------|-------------|--------|
| Add new product | New design drop approved | Nadiah (content) → Zuriel (approval) | Nadiah prepares listing draft; Zuriel reviews pricing and description; goes live within 48hrs |
| Update product price | Supplier cost change >10% | Zuriel | Review margin impact; update store; notify Iqa for customer queries |
| Mark as Out of Stock | Stock count reaches 5 units | Qis | Update store listing; alert Zuriel; initiate reorder |
| Remove discontinued product | No sales in 60 days OR design retired | Zuriel | Remove listing; offer remaining stock at 20% discount |
| Add seasonal variant | Campaign period | Nadiah + Zuriel | New colour/edition launched with dedicated ad set |

### 4.5 Photography & Visual Content Plan

| Phase | Content Type | Responsible | Timeline | Budget |
|-------|-------------|-------------|----------|--------|
| Phase 1 (Launch) | Gradient colour-block placeholders + emoji | Zuriel (coded) | Jan 2025 | RM 0 |
| Phase 2 (Mar 2025) | Flat-lay product photography (3 hero products) | Nadiah | Mar 2025 | RM 200 |
| Phase 3 (May 2025) | Lifestyle photography (worn/used by real customers) | Nadiah + UGC | May 2025 | RM 150 |

**Rationale for phased approach:** Investing in professional photography before validating which products sell best is a capital allocation mistake. Phase 1 allows us to identify top-sellers from real transaction data before committing photography budget.

### 4.6 Inventory Management Protocol

| Stock Level | Status | Action Required |
|-------------|--------|-----------------|
| >20 units | ✅ Healthy | No action |
| 10–20 units | ⚠️ Watch | Prepare reorder |
| 5–10 units | 🔴 Low | Place reorder immediately; update store with "Low Stock" notice |
| <5 units | ❌ Critical | Mark as Out of Stock; expedite reorder |
| 0 units | Sold Out | Hide listing; consider waitlist capture |

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Prepared by | Zuriel Seong Ming Ee | _____________ | January 2025 |
| Reviewed by | [Supervisor Name] | _____________ | _____________ |
| Approved by | [Manager / Owner Name] | _____________ | _____________ |

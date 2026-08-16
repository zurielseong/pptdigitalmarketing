# LPKT CU1 — Session Context & Handover

## What This Repo Is
PPT (Pengiktirafan Pencapaian Terdahulu) portfolio for **Zuriel Seong Ming Ee**
pursuing **DKM Level 4 — NOSS M731-001-4:2021 (Digital Marketing Planning & Implementation)**
Deadline: **August 15, 2026** | Method: PPT | Document type: **LPKT** (NOT LPKC)

---

## Current Document Status

### LPKT-CU1 (CU C01 — Implement Social Media Marketing Campaign Plan)

**File:** `LPKT-Report/LPKT-CU1-Zuriel-Seong.docx` (v4 — latest)
**Generator script:** `LPKT-Report/LPKT-generator.js` (Node.js, uses `docx` npm package)

**To regenerate:**
```bash
cd LPKT-Report
npm install docx   # if not installed
node LPKT-generator.js
```

### Document Structure (DKM LPKT = 4 chapters ONLY — no Kajian Literatur)

| Chapter | Title | Status |
|---------|-------|--------|
| Cover | LPKT + Title | ✅ Done |
| Pengesahan | PP-PPT + PPL-PPT signature page | ✅ Done |
| Abstrak | Summary of whole report | ✅ Done |
| TOC | Table of contents | ✅ Done |
| BAB 1 | Pendahuluan (1.1–1.6) | ✅ Done — no data needed |
| BAB 2 | Metodologi Kajian (2.1–2.7) | ✅ Done — no data needed |
| BAB 3 | Penemuan dan Analisis (3.1–3.8) | ⚠️ Structure done, data empty |
| BAB 4 | Perbincangan, Cadangan dan Kesimpulan (4.1–4.4) | ✅ Done — needs KPI numbers in 4.1 |
| Rujukan | 17 APA references | ✅ Done |
| Lampiran A–G | Screenshot placeholders with instructions | ⚠️ User inserts screenshots |

### Report Topic
**"Perancangan dan Pelaksanaan Media Sosial bagi Meningkatkan Pengambilan Pelajar Baharu di TVET Lipis"**
→ Topic confirmed acceptable for DKM LPKT per JPK guidelines (PDF reviewed)

### Campaign Covered in Report
- Period: **January – June 2026**
- Platforms: TikTok, Instagram, Facebook (organic) + Meta Ads (paid, Lead Generation)
- Goal: Increase new student inquiries/leads for TVET Lipis
- Lead tracking: **CRM system** (Supabase-backed, at tvetlipis.my CRM) — leads come in from Meta Ads lead forms online, NOT manual WhatsApp tracking

---

## The 8 Numbers Needed (Next Session Priority #1)

Ask the user for these in order. Once received, rewrite BAB 3 with real data + narrative analysis per platform.

| # | Data Point | Source | Format Expected |
|---|-----------|--------|----------------|
| 1 | TikTok total video views (Jan–Jun 2026) | TikTok Analytics → Overview | Number e.g. "45,320 views" |
| 2 | TikTok follower count (end of Jun 2026) | TikTok profile | Number e.g. "1,240 followers" |
| 3 | Instagram follower count (end of Jun 2026) | Instagram profile | Number |
| 4 | Meta Ads total spend in RM (Jan–Jun 2026) | Ads Manager → Billing / Amount Spent | RM amount |
| 5 | Meta Ads total leads generated (Jan–Jun 2026) | Ads Manager → Campaigns → Leads column | Number |
| 6 | Google Search Console total clicks | Already known: **329 clicks** | ✅ Have this |
| 7 | Total leads in CRM (Jan–Jun 2026) | CRM → All Leads → count by date | Number |
| 8 | How many became enrolled students (Customer stage) | CRM → filter Stage = Customer | Number |

**Bonus data (nice to have, ask after the 8):**
- Monthly breakdown of TikTok/Instagram followers (to show growth trend)
- Meta Ads CPL (cost per lead) — or calculate from #4 ÷ #5
- Top 3 performing TikTok video topics/themes
- CRM: leads by course (which DKM program got most interest)
- CRM: leads by source (Facebook vs Instagram vs organic)
- Google Search Console: average CTR and position

---

## What To Do In Next Session

### Step 1 — Collect the 8 numbers from user
Show them this table and ask one at a time if needed.

### Step 2 — Rewrite BAB 3 with real data
For each platform section (3.3, 3.4, 3.5, 3.6, 3.7):
- Fill in all the ⚠️ table cells with real numbers
- Add 2–3 sentences of narrative analysis AFTER each table explaining the trend
  e.g. "TikTok mencatatkan pertumbuhan pesat pada bulan Mac apabila video [tema] mendapat jangkauan organik tertinggi..."
- For 3.8 (KPI achievement table): rate each objective DICAPAI / SEBAHAGIAN / TIDAK DICAPAI

### Step 3 — Update BAB 4 Perbincangan (4.1)
Fill in the KPI comparison paragraph with real numbers.

### Step 4 — Regenerate DOCX and deliver

---

## Known Real Data Points (Already Have)

| Data | Value | Source |
|------|-------|--------|
| Google Search Console total clicks | 329 clicks | User provided |
| Top keyword "tvet lipis" | 120 clicks / 603 impressions | User provided |
| Top keyword "tvet kuala lipis" | 22 clicks / 173 impressions | User provided |
| Top keyword "kolej islam antarabangsa kuala lipis" | 18 clicks / 324 impressions | User provided |
| Mailchimp April 2026 — Kelantan | 114 recipients, 28.8% open rate | User provided |
| Mailchimp April 2026 — Pahang | 109 recipients, 29.6% open rate | User provided |
| Google Ads (PRIMA Lipis) | MYR 19.08/day Performance Max, live since 5 Aug 2026 | User provided — NOTE: This is for PRIMA Tempoyang, not TVET social media |

---

## Key Technical Info

### Social Media Handles
- TikTok: @tvet_lipis
- Instagram: @tvet_lipis
- Facebook: "TVET Lipis" / "Hub TVET Lipis" / "TVET Lipis Edu Hub" (multiple pages)

### CRM System
- URL: TVET Lipis CRM (Cloudflare Workers deployment)
- Supabase URL: `https://qqrmbbwzigjhvopgvspo.supabase.co`
- Repo: `zurielseong/crmtvetlipis` (branch: `claude/notebooklm-access-RKqG8`)
- Note: Supabase API blocked by session proxy — cannot query directly from Claude Code remote session

### JPK LPKT Guidelines (PDF reviewed)
- Source: `Senarai_3__Taklimat_Pelaksanaan_LPKT.pdf` (uploaded by user, 69 pages)
- DKM LPKT = **4 chapters** (BAB 1–4). DLKM has 5 chapters with Kajian Literatur.
- Format: Times New Roman 12pt, 1.5 spacing, Left 4cm, Right 2cm, Top 5cm
- Page count: 15–30 pages (DKM), not counting lampiran
- Binding: Dark blue hardcover (DKM)
- References: APA format
- Lampiran: max 20 pages

---

## Other CUs — Work in Progress

| CU | Title | Status |
|----|-------|--------|
| CU C01 | Implement Social Media Marketing Campaign Plan | ⚠️ In progress (this LPKT) |
| CU C04 | Manage E-Commerce Operations | ⚠️ Files exist in repo (CU4-Ecommerce/) — WARNING: contains fabricated data (superbowllipis.my + fake Meta Ads ROAS 3.04x) — DO NOT USE as-is. Shopee account not approved, TikTok Shop deactivated. Need real platform. |
| CU C03 | Google Ads | ⚠️ PRIMA Lipis Google Ads live since Aug 5, 2026. Check back for performance data. |
| CU C05 | WhatsApp Business Mobile Marketing | Pending — need screenshots of WhatsApp Business broadcasts |
| CU C07 | Online Reputation Management | Pending — reply to Google reviews on TVET Lipis GBP, screenshot |

---

## Repo Info
- GitHub: `zurielseong/pptdigitalmarketing`
- Working branch: `claude/notebooklm-access-RKqG8`
- Clone: `/home/user/pptdigitalmarketing`
- npm docx package must be installed in scratchpad for generation

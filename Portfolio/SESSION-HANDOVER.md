# PPT Portfolio — Session Handover
**Candidate:** Zuriel Seong Ming Ee
**NOSS:** M731-001-4:2021 — Digital Marketing Planning & Implementation (Level 4, DKM)
**Application window:** March – September 2026
**Repo:** `zurielseong/pptdigitalmarketing` · branch `claude/notebooklm-access-RKqG8` · PR #1

---

## 1. The method that works — follow this for every CU

Each Level 4 work activity needs **two layers**:

| Layer | What it is | Where it comes from |
|---|---|---|
| **Decision** | The plan, proposal or framework — what was decided and why | Written now, in management-report format |
| **Proof** | Screenshot showing it was carried out | The client's **Level 3 portfolio** (`PORTFOLIO_PPT_1.docx`, 80 images) |

**Why both.** Level 3 CUs are titled *"Execute…"* — they evidence doing. Level 4 CUs are titled *"Implement… plan"* — they evidence planning, coordinating and optimising. A screenshot alone proves the doing but not the deciding. The screenshot must sit **beneath** the reasoning that produced it.

**Document format that was agreed** — see `CU4-Ecommerce/CU4-Plan-generator.js` as the working template:

- Letterhead: KOWILIP logo left, Superbowl Lipis logo right, red rule beneath
  (extracted to `scratchpad/lh_image1.png` and `lh_image2.jpg`)
- Metadata strip: reference, date, prepared by, position, submitted to, status
- One document per CU covering **all** its WAs as numbered Parts
- Each Part: the decision, then `Figure N` evidence, then a caption tying them together
- Charts and diagrams wherever they replace prose — the client asked for this explicitly
- Red `[ BUKTI DIPERLUKAN — … ]` markers where evidence is still missing
- Approval page: Prepared / Reviewed / Approved signature blocks, decision checkboxes, comments
- English. Concise — the client rejected a 1,126-word draft as too long; 566 was right

---

## 2. Hard rules learned in this project

1. **Never invent scores, weightings or figures.** A weighted evaluation matrix was written for CU4 W01 and had to be removed — the scores were reverse-engineered to reach a known answer. The client asked *"on what basis?"* and there was no honest answer. Ask for the client's own reasoning instead.
2. **Never present data from one period as another.** Repeatedly requested and repeatedly declined. The 2026 LPKT data is dated 2026 in every source file.
3. **Every figure traces to a screenshot or export.** If it can't, it doesn't go in.
4. **Plans not executed are labelled as plans.** Don't imply outcomes.
5. **Redact personal data.** The Level 3 shipping label shows a customer's full name, address and phone.
6. **Existing CU documents in the repo are unverified drafts.** `CU1-Social-Media/PENDING-REVIEW.md` records that they were AI-generated and never checked. CU4's originals described spend, buyer counts and ad-set structures that were never confirmed. Treat all of them as starting points only.

---

## 3. Status by CU

| CU | Title | WAs | State |
|----|-------|-----|-------|
| C01 | Implement social media marketing campaign plan | 6 | ✅ LPKT complete (`LPKT-Report/`) |
| C02 | Implement SEO plan | 4 | ⬜ Not started |
| C03 | Implement SEM plan | 3 | ⬜ Not started |
| C04 | Implement e-commerce marketing plan | 6 | 🟡 Built, 5 gaps, awaiting client review |
| C05 | Implement mobile marketing plan | 6 | ⬜ Not started |
| C06 | Implement email marketing plan | 6 | ⬜ Not started |
| C07 | Manage online reputation | 3 | ⬜ Not started |

---

## 4. Level 3 evidence available for reuse

`PORTFOLIO_PPT_1.docx` — 80 images. Mapping to Level 4 CUs:

| L3 section | Images | Feeds L4 |
|---|---|---|
| CU1 Social media (5 WAs) | 1–28 | C01 — already covered by LPKT |
| CU2 SEO (3 WAs) | 29–40 | **C02** |
| CU3 SEM (4 WAs) | 41–51 | **C03** |
| CU4 E-commerce (5 WAs) | 52–69 | **C04** — used |
| CU5 Mobile (4 WAs) | 70–74 | **C05** |
| CU6 Email (4 WAs) | 75–80 | **C06** |

**No Level 3 section exists for reputation management** — C07 evidence must be captured fresh.

Extract with:
```
python3 -c "
import zipfile
z=zipfile.ZipFile('PORTFOLIO_PPT_1.docx')
[open(n.split('/')[-1],'wb').write(z.read(n)) for n in z.namelist() if 'media/' in n]
"
```
Map images to sections by walking `word/document.xml` paragraphs in order and
matching `r:embed` ids against `word/_rels/document.xml.rels`.

---

## 5. What to build for each remaining CU

### C02 — SEO (4 WAs) · L3 images 29–40
| WA | Document section | Evidence |
|----|------------------|----------|
| W01 Analyse SEO channel performance | Baseline audit with Search Console data | GSC performance, queries, pages |
| W02 Prepare SEO campaign plan | Keyword targets, page mapping | Keyword list |
| W03 Prepare SEO improvement plan | Issues found → fixes proposed | Before/after page states |
| W04 Coordinate implementation | Task ownership, timeline | Published pages, indexing status |

**Known data:** tvetlipis.my — 329 organic clicks; "tvet lipis" 120 clicks / 603 impressions; "tvet kuala lipis" 22 / 173; "kolej islam antarabangsa kuala lipis" 18 / 324.
**Suggest adding:** GSC 12-month performance chart, Core Web Vitals / mobile usability, page-level click table, an indexing coverage screenshot.

### C03 — SEM (3 WAs) · L3 images 41–51
| WA | Document section | Evidence |
|----|------------------|----------|
| W01 Prepare SEM campaign plan | Objectives, keywords, budget, targets | Campaign structure |
| W02 Implement SEM campaign plan | Ad groups, ads, keywords live | Google Ads screenshots |
| W03 Optimise SEM performance | Metrics + decisions taken | Change history, performance over time |

**Known:** PRIMA Lipis Performance Max, MYR19.08/day, live since 5 Aug 2026.
⚠️ **Aug 2026 post-dates the application window.** Check whether earlier Google Ads activity exists in 2025.
**Suggest adding:** Google Ads change history (proves optimisation), search terms report, conversion tracking setup.

### C05 — Mobile marketing (6 WAs) · L3 images 70–74
| WA | Document section | Evidence |
|----|------------------|----------|
| W01 Determine mobile channel | Why WhatsApp Business over SMS/app | Profile setup |
| W02 Content calendar | Broadcast schedule | Sent broadcasts |
| W03 Campaign plan | Segments, messaging, KPI | Broadcast lists, labels |
| W04 Coordinate implementation | Sends executed, replies handled | Message logs |
| W05 **Mobile app campaign proposal** | ⚠️ Requires an *app* proposal | — |
| W06 Optimise performance | Read/response rates, changes | Metrics |

⚠️ **W05 asks specifically for a mobile application proposal.** If no app exists, write it honestly as a proposal that was prepared but not implemented — do not imply an app was launched.
**Suggest adding:** WhatsApp Business catalogue, quick replies, away message, labels/segments, broadcast list sizes.

### C06 — Email marketing (6 WAs) · L3 images 75–80
| WA | Document section | Evidence |
|----|------------------|----------|
| W01 Prepare customer list | List building method, segments | Mailchimp audience |
| W02 Content calendar | Send schedule | Campaign calendar |
| W03 Campaign plan | Objectives, segments, KPI | Plan document |
| W04 Coordinate implementation | Campaigns sent | Campaign list |
| W05 Paid advertisement proposal | Paid/promoted email proposal | — |
| W06 Optimise performances | Open/CTR trend + changes | Reports |

**Known:** April 2026 — Kelantan 114 recipients, 28.8% open; Pahang 109 recipients, 29.6% open.
⚠️ April 2026 is close to the application window; check for 2025 Mailchimp activity.
**Suggest adding:** audience growth chart, per-campaign reports, A/B test if any, automation/journey setup.

### C07 — Online reputation (3 WAs) · no L3 source
| WA | Document section | Evidence |
|----|------------------|----------|
| W01 Handle online customer complaint | Response protocol + worked example | Negative review + reply |
| W02 Handle online customer compliment | Response protocol + worked example | Positive review + reply |
| W03 Handle online community | Moderation approach | Comment/DM threads |

**Start here if a quick win is wanted** — only 3 WAs, evidence is Google Business Profile reviews plus TikTok/Instagram comment threads.
**Suggest adding:** a response-time standard, an escalation rule for serious complaints, before/after rating if available. The TikTok inbox showing 41 unread is real community-management context.

---

## 6. Open questions for the client

1. **C04 review** — feedback pending on the document just delivered.
2. **C04 gaps** — TikTok Ads data for shop campaigns, Seller Centre analytics over time, a documented optimisation decision, the content calendar, and a redacted fulfilment record.
3. **Organisation split** — C04/C05/C07 drafts reference Superbowl Lipis (under KOWILIP); C01/C02/C03/C06 reference TVET Lipis. Confirm which organisation each CU is evidenced against.
4. **C03 and C06 dates** — both known datasets fall in 2026. Check for 2025 equivalents.
5. **C05 W05** — does a mobile app exist, or is it a proposal only?

---

## 7. Files that matter

```
LPKT-Report/LPKT-generator.js              C01 LPKT (2026 data) — complete
LPKT-Report/LPKT-CU1-Zuriel-Seong.docx     built output
CU4-Ecommerce/CU4-Plan-generator.js        working template for all CUs
Portfolio/EVIDENCE-MATRIX.md               all 34 WAs, status, capture instructions
Portfolio/SESSION-HANDOVER.md              this file
7793-a-M731-001-4-2021 ….pdf               the NOSS — CU/WA definitions from p.22
```

Charts and letterhead assets live in the session scratchpad and are regenerated
by the scripts in `Portfolio/` — re-extract the letterhead from
`SUPERBOWL_LETTERHEAD.docx` if the scratchpad is cleared.

---

## 8. Prompt for the next session

> Continuing a PPT Level 4 portfolio for NOSS M731-001-4:2021. Read
> `Portfolio/SESSION-HANDOVER.md` and `Portfolio/EVIDENCE-MATRIX.md` first.
>
> C01 is done (LPKT). C04 is built and under review. Next: build [CU] using the
> two-layer method — planning document plus Level 3 screenshots as evidence —
> following the format of `CU4-Ecommerce/CU4-Plan-generator.js`.
>
> I will attach my Level 3 portfolio (`PORTFOLIO_PPT_1.docx`) and the Superbowl
> letterhead. Extract the relevant images and build one document covering all
> WAs for that CU, with charts, evidence figures, red markers for gaps, and an
> approval page.
>
> Do not invent figures, scores or dates. Ask me for my own reasoning where a
> judgement is needed.

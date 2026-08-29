# C07 — Screenshot Capture List
**M731-001-4:2021-C07 · Manage online reputation** · 3 work activities · CU weightage 5%
**Candidate:** Zuriel Seong Ming Ee

There is **no Level 3 section for reputation management**, so every figure in the C07
document must be captured fresh. This list is the exact set. Each item names where to
find it, what the image must show, and which NOSS performance criterion it satisfies.

**Entity:** Superbowl Lipis (under KOWILIP) — matching the letterhead and the C04/C05
grouping. Confirm before capture; if C07 is to be evidenced against TVET Lipis instead,
capture the same 17 items from the TVET Lipis profiles.

---

## Capture rules — apply to every screenshot

1. **Capture the whole screen or the whole card, not a tight crop.** The assessor needs
   to see which platform it is. A cropped block of text proves nothing.
2. **The date must be visible.** Where the platform shows a relative date ("2 weeks ago"),
   that is acceptable — but capture the review and the reply in the *same* image so the
   gap between them is visible. That gap is the response-time evidence.
3. **Show that you manage the account.** Where possible capture from the *management*
   view (Business Profile manager, TikTok Studio, Meta Business Suite) rather than the
   public view — the logged-in admin interface proves ownership.
4. **Redact customer personal data** before the image goes in the document: surname,
   profile photo, phone number, address, order number. First name alone is fine.
   Reviewer names shown publicly on Google may stay as first-name-plus-initial.
5. **PNG, native resolution, no phone-camera photos of a screen.**
6. **Do not stage anything.** If a complaint was never received, say so — an honest gap
   is assessable, an invented review is not.

---

## W01 — Handle online customer complaint  (40% of the CU)

| # | Capture | Where exactly | Must show | Criterion |
|---|---------|---------------|-----------|-----------|
| 1 | **Reviews overview** | Google Business Profile manager → Reviews | Total review count, star distribution, average rating | 1.1 sources · 1.2 severity baseline |
| 2 | **A critical review with your public reply** | Same → filter *Lowest rating* | Star rating, review text, review date, **"Response from the owner"** and its date | 1.4 action taken · 1.5 response time |
| 3 | **A complaint on a second channel** | TikTok comments, Instagram comments, or Facebook page comments | The complaint comment **and your reply beneath it** | 1.1 types and sources |
| 4 | **Offline resolution thread** | WhatsApp Business chat or platform DM | The complaint being taken off the public thread and resolved. **Redact name and phone.** | 1.4 handling procedure |
| 5 | **Complaint log / ticket register** | Your tracker — Google Sheet, Notion, or the CRM | Columns: ticket ID · date received · channel · complaint type · severity · action taken · owner · date closed · response time | 1.5 ticket · 1.6 report detail |
| 6 | **Complaint report as submitted** | The report file plus the email/WhatsApp sending it to your superior | Report content and the send timestamp | 1.6 report · 1.7 submitted within time frame |

> **On items 5 and 6:** if no tracker or report exists yet, build them now and populate
> them with the complaints that **actually** happened, at their real dates. Creating the
> record is legitimate. Back-dating an incident that did not occur is not.

---

## W02 — Handle online customer compliment  (30% of the CU)

| # | Capture | Where exactly | Must show | Criterion |
|---|---------|---------------|-----------|-----------|
| 7 | **A 5-star review with your reply** | Google Business Profile manager → Reviews → *Highest rating* | Rating, text, date, owner response and its date | 2.1 channel · 2.2 type |
| 8 | **Positive comments with your replies** | TikTok and Instagram comment threads | At least two threads, each showing the compliment and your response | 2.1 channels identified |
| 9 | **Compliment compilation** | Your collection file — folder, Sheet or Canva board | Several compliments gathered from **different** channels in one place | 2.3 evidence compiled |
| 10 | **The compliment republished as content** | The live post — IG Story/feed, TikTok video, or Facebook post | The testimonial reused as published content, on the platform, publicly visible | 2.4 repurposed to various channel |
| 11 | **Repurposing schedule** | Content calendar | The row for the testimonial content: planned date, channel, **assigned person** | 2.5 timeline · 2.6 task assigned |
| 12 | **Performance of the republished post** | TikTok Analytics / Instagram Insights on that specific post | Views, reach or engagement for the testimonial post | 2.7 effectiveness assessed |
| 13 | **Compliment report as submitted** | Report file plus the send record | Compliment content, images, reposting details; send timestamp | 2.8 format · 2.9 submitted |

---

## W03 — Handle online community  (30% of the CU)

| # | Capture | Where exactly | Must show | Criterion |
|---|---------|---------------|-----------|-----------|
| 14 | **Community size, per channel** | TikTok profile · Instagram profile · Facebook page | Handle and follower/liker count — one image per platform | 3.1 followers, likers, subscribers |
| 15 | **Inbox / notification volume** | TikTok Studio inbox, or IG/Meta Business Suite inbox | The unread and incoming message volume — this is the community-management workload | 3.2 channel identified |
| 16 | **Moderation in action** | Comment threads | A **pinned** comment, and a comment you replied to; a hidden or removed comment if any | 3.3 optimisation strategies |
| 17 | **Streaming or group channel** | TikTok LIVE record, or WhatsApp/Telegram community group | The LIVE session, or the group with **member numbers redacted** | 3.2 streaming / group |
| 18 | **Community response roster** | Your schedule document | Who monitors which channel, on what days, at what times | 3.4 timeline · 3.5 work assigned |
| 19 | **Community analytics** | TikTok Analytics → Viewers/Followers · Instagram Insights → Audience | Follower trend and active-hours data over a period | 3.6 monitored · 3.7 effectiveness |
| 20 | **Community report as submitted** | Report file plus the send record | Plan effectiveness assessment; send timestamp | 3.8 format · 3.9 submitted |

---

## Priority order

If time is short, capture in this order — the first six carry the most weight:

1. **#2** critical review + owner reply *(the single most important image in C07)*
2. **#7** positive review + owner reply
3. **#15** inbox volume
4. **#10** compliment republished as content
5. **#1** reviews overview
6. **#14** community size per channel

Items 5, 6, 11, 13, 18 and 20 are documents you produce rather than screens you find —
they can be built in an afternoon and photographed once complete.

---

## Where each capture lands in the document

The generator is `CU7-Reputation-Management/CU7-Plan-generator.js`. Every item above has
a matching red `[ BUKTI DIPERLUKAN — … ]` marker in the built document. Replace the marker
with an `img()` call and a `cap()` caption as each screenshot arrives — the surrounding
reasoning is already written.

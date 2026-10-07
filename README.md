# Habibi Group LLC — Website

A complete static website for Habibi Group LLC, a licensed Illinois real estate brokerage
(firm license #481.014591). Plain HTML/CSS/JS — no build step. Deploys directly to
GitHub Pages: push this folder's contents to the `main` branch of a repo with Pages
enabled (or the `gh-pages` branch), and it just works.

## Files

| File | Purpose |
|---|---|
| `index.html` | All page content: nav, hero, trust strip, how-it-works + net-proceeds example, savings calculator, transparency, team, MLS-search waitlist placeholder, contact form, footer |
| `styles.css` | Full design system: warm ivory background, deep charcoal text, one deep-teal accent, Fraunces (display serif) + Inter (body) from Google Fonts. Responsive with a mobile hamburger nav. No gradients, no emojis |
| `main.js` | Mobile nav, savings calculator, waitlist + contact form handling, scroll-reveal. **Commission rate lives here — see below** |
| `README.md` | This file |

## Changing the commission rate (one edit)

The buyer-side commission rate is a **single constant** at the top of `main.js`:

```js
const COMMISSION_RATE = 0.0025; // 0.25%
```

> **Pending final business decision:** 0.25% vs 0.5%. To switch to 0.5%, change that
> one line to `const COMMISSION_RATE = 0.005;`.

Every rate label on the site (`data-rate-display` spans in the hero stats and the
calculator) and every calculator figure recompute automatically from this constant —
no other edits needed. Two `<!-- NOTE -->` HTML comments in `index.html` mark the
spots where the marketing copy states "0.25%" so they can be reviewed when the rate
is finalized.

The comparison baseline is `TRADITIONAL_RATE = 0.025` (2.5% buyer-side), also in `main.js`.

## Wiring the contact form

The contact form (`#contactForm` in `index.html`) is currently **front-end only**: on
submit it validates name/email and shows a success message. To go live, pick one:

- **Easiest — Formspree:** create a form at formspree.io, then in `main.js` replace the
  simulated submit block with the `fetch(...)` example already written in the code
  comments (uses your `YOUR_FORM_ID`).
- **Netlify Forms:** deploy on Netlify and add `netlify` + `name="contact"` attributes
  to the `<form>` tag — no JS changes needed.
- **Your CRM:** POST the `FormData` as JSON to your endpoint; the field names are
  `name`, `phone`, `email`, `intent` (buy/sell/both/other), `message`.

## Wiring the waitlist

Same pattern as the contact form (`#waitlistForm`): currently shows a success state.
POST the single `email` field to your list tool (Mailchimp, ConvertKit, etc.).

## Dropping in the MLS/IDX home search later

The `#search` section is a deliberate placeholder: a "MLS home search coming soon"
card with an email waitlist. When ready:

1. **Choose a vendor:** IDX Broker (Core $60/mo) or Showcase IDX ($94.95/mo) both
   provide a copy-paste embed snippet for WordPress-style integration; for a static
   site they provide a JavaScript widget / iframe snippet.
2. **Sign the IDX agreement:** the vendor handles the MLS paperwork. Warren Habib,
   as the MRED participant (via NSBAR membership #36103), signs the vendor's IDX
   agreement.
3. **Swap the block:** delete the `.waitlist-card` div inside `#search` in
   `index.html` and paste the vendor's snippet in its place (keep the section
   heading). The `<!-- IDX INTEGRATION POINT -->` comment marks the exact spot.
4. Optional: keep the waitlist form elsewhere (e.g., footer) for non-search visitors.

## Facts used (do not invent beyond these)

- Habibi Group LLC, licensed Illinois real estate brokerage, firm license **#481.014591**
- 4845 N Washtenaw Ave, Chicago, IL 60625 · (630) 263-3619
- Warren Habib — Managing Broker, IL license **#471.001086**
- Blake Habib — co-owner
- Charles Siragusa — real estate attorney (professional partner)
- No testimonials, transaction counts, or "years in business" claims are made anywhere
  on the site — add none without real data.

## Local preview

```bash
cd ~/workspace/habibi/website
python3 -m http.server 8080
# open http://localhost:8080
```

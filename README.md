# Tranzio — Landing Page

Marketing landing page for **Tranzio**, India's next-generation mobility media network. Apple-style minimal design built with plain HTML, CSS, and JavaScript — no build step.

**Live site:** deployed via GitHub Pages.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8080
```

## Structure

- `index.html` — single-page site (hero with live screen simulation, stats, why-transit, ecosystem, solutions, roadmap, FAQ, notify, contact)
- `css/style.css` — design system (Satoshi type, brand palette)
- `js/main.js` — scroll reveals, stat count-up, hero ad rotation, notify form
- `assets/favicon.svg` — Z-road mark

## Needs input before launch

- **Notify form backend** — currently opens the visitor's mail app addressed to hello@tranzioindia.com. Replace with a form endpoint (Formspree, Buttondown, or own API) in `js/main.js`.
- **Social profile URLs** (LinkedIn / Instagram / X) — omitted until handles exist.
- **OG image** — add a 1200×630 `assets/og.png` and reference it in `index.html` for richer link previews.
- **Custom domain** — point `tranzioindia.com` at GitHub Pages and add a `CNAME` file.

Brand: Midnight Navy `#031D54` · Electric Blue `#2563EB` · Sky Blue `#4F8DFF` · Ice White `#F8FAFC` · Slate `#6B7280` · Satoshi.

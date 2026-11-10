# دار ابو ريم (Dar Abu Reem)

An Arabic (RTL) website for prayer beads (سُبَح): a shop (السوق), a live auction (المزاد), an interactive tasbih counter, and a materials guide.

Built with Angular 20: standalone components, signals, the new control flow (`@if`, `@for`), and lazy-loaded routes.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/
```

## Project structure

```
src/
├── index.html                  lang="ar" dir="rtl", Google Fonts
├── styles.scss                 design tokens (colors, fonts), light/dark theme, shared classes (.btn, .chip, .arch…)
└── app/
    ├── app.routes.ts           /  /market  /auction  /auction/:id  /guide
    ├── models/misbaha.model.ts Product, Lot, Bid, CartLine, MisbahaLook
    ├── data/mock-data.ts       example products and auction lots  ← replace with an API
    ├── services/
    │   ├── product.service.ts  product catalogue
    │   ├── cart.service.ts     cart lines, count, total, drawer open state
    │   ├── auction.service.ts  lots, bidding rules, 1-second clock for countdowns
    │   └── ui.service.ts       toast messages, light/dark theme toggle
    ├── shared/
    │   ├── misbaha/            draws any misbaha as SVG (33 or 99 beads, separators, imam, tassel)
    │   ├── khatam-pattern/     8-point star background pattern
    │   ├── product-card/       a product in the shop grid
    │   └── arabic.pipes.ts     arNum, sar, countdown, ago (Arabic-Indic digits)
    ├── layout/                 header, footer, cart drawer, toast
    └── pages/                  home (+ tasbih), market, auction, guide
```

## Design

- Colors are CSS variables in `src/styles.scss`. Change `--accent`, `--ink`, `--bg` there to retheme the whole site. Dark mode values are in the `dark-tokens` mixin.
- Fonts: **Aref Ruqaa** (headings), **Noto Naskh Arabic** (body), **Reem Kufi** (labels, numbers).
- Product pictures are drawn by `<app-misbaha>` from a `look` (three gradient colors plus optional separator and tassel color), so new products need no images. To use real photos, add an `image` field to `Product` and show an `<img>` in `product-card` instead.

## Bidding rules (auction.service.ts)

- Increments: under 5,000 → 100 · under 20,000 → 250 · above → 500 ر.س
- A bid in the final minute extends the lot by 2 minutes.

## Next steps

1. **Backend API**: replace `PRODUCTS` / `createLots()` with `HttpClient` calls in `ProductService` and `AuctionService`.
2. **Real-time auction**: push other people's bids over WebSocket (or Firebase / Supabase) into `AuctionService._lots`. Validate bids on the server; the client check is only for the UI.
3. **Accounts**: login, so bids show the real bidder and the cart is saved.
4. **Checkout**: connect `CartDrawer.checkout()` to a payment provider (e.g. Moyasar, Tap, Stripe).
5. **Product page**: add a route `/market/:id` with photos and full details.
6. **Admin**: a page to add products and create auction lots.
7. **English**: add `@angular/localize` if you want an English version.

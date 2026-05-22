# Cardwell Butchery

Landing page for [Cardwell Butchery](https://www.facebook.com/p/Cardwell-Butchery-100047185008052/) — Shop 1/97 Victoria Street, Cardwell QLD 4849.

Built with **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**. Deploys to Vercel.

---

## 🚀 Deploy to your existing Vercel + GitHub setup

The repo is already at `https://github.com/honestjams/Cardwell-Butchery` and Vercel is wired up to `cardwell-butchery.vercel.app`. To go live:

```bash
# 1. Clone the (currently empty) repo somewhere on your machine
git clone https://github.com/honestjams/Cardwell-Butchery.git
cd Cardwell-Butchery

# 2. Copy ALL files from this project into the repo folder
#    (including hidden files like .gitignore — make sure they come over)

# 3. Install + run locally to preview
npm install
npm run dev
# Open http://localhost:3000

# 4. When you're happy, push it
git add .
git commit -m "feat: initial landing page"
git push origin main
```

Vercel will auto-detect Next.js and deploy within ~30–60 seconds. Check the deployment at `https://cardwell-butchery.vercel.app`.

---

## ✏️ Editing the site

The two files you'll touch most:

### Prices and menu items → `src/lib/products.ts`
Add, remove, or edit any item. Format is plain TypeScript objects — no JSX. Example:

```ts
{
  name: "Scotch Fillet",
  description: "Marbled and tender. Perfect on the grill.",
  price: "$44–$55 / kg",
}
```

### Contact details and hours → `src/lib/site.ts`
Address, phone, email, hours, social links — all in one file.

> ⚠️ **The opening hours are placeholders** — confirm with the shop and update before going live.

### Page copy and layout → `src/app/page.tsx`
The hero text, about section copy, and section headings live here.

---

## 🖼️ Images

All images currently use [Unsplash](https://unsplash.com) URLs as placeholders. Two paths to swap them for real shop photos:

**Option A — Quickest:** Just change the URLs in `src/lib/products.ts` (one per category) and the hero image in `src/app/page.tsx` (search for `images.unsplash.com`).

**Option B — Self-hosted:** Drop photos into the `/public/images/` folder, then reference them like `src="/images/hero.jpg"`. This is faster to load and doesn't depend on a third party.

Recommended hero size: ~900×1125px (4:5 portrait). Category images: same ratio.

---

## 🎨 Design system

Colours, fonts, and spacing are defined in two places:
- **Palette** → `tailwind.config.ts` (search for `colors:`)
- **Fonts** → `src/app/layout.tsx` (Fraunces for display, Manrope for body)

Current palette:
- `cream` `#FBF7EC` — page background
- `bone` `#F5EFE0` — section background
- `burgundy` `#6B1F1F` — primary / brand
- `sage` `#3E5640` — accents
- `ink` `#1F1A17` — text
- `gold` `#B8893E` — reserved (unused, available for accents)

---

## 📋 Pre-launch checklist

Before sharing the live URL with the public:

- [ ] Confirm all prices in `src/lib/products.ts` match the shop's actual board
- [ ] Confirm opening hours in `src/lib/site.ts` are correct
- [ ] Replace placeholder Unsplash images with real shop photos
- [ ] Test on a phone (open the Vercel URL on mobile)
- [ ] Check the "Call" button works (taps through to dialler)
- [ ] Check the "Open in Google Maps" link lands on the right place
- [ ] Get sign-off from the business owner

---

## 📁 Project structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout, fonts, metadata
│   │   ├── page.tsx            ← The landing page itself
│   │   └── globals.css         ← Global styles + Tailwind directives
│   └── lib/
│       ├── products.ts         ← Menu data — EDIT PRICES HERE
│       └── site.ts             ← Contact details — EDIT INFO HERE
├── public/                     ← Add real shop photos here
├── tailwind.config.ts          ← Palette + font families
├── next.config.mjs             ← Next.js config (allows Unsplash images)
├── package.json
└── README.md
```

---

## 🔧 Local development

Requires Node.js 18.17+ (Node 20 recommended).

```bash
npm install      # install dependencies
npm run dev      # start dev server at localhost:3000
npm run build    # production build (also runs on Vercel)
npm run start    # serve the production build locally
npm run lint     # run ESLint
```

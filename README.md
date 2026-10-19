# Pedra Norte — website

Marketing website for **Pedra Norte**, a construction and renovation company in Portugal (legal entity: HomeCraft Lda, provisional). Live at **https://pedranorte.eu**.

The site presents the company, its services, sample projects, way of working and contact details, and lets visitors send a **quote request ("Pedido de orçamento")** that is delivered by email through Postmark. It is bilingual: **Portuguese (default)** and **English**.

The design comes from the Figma file *Pedra Norte — Brand, Design System & Website* (links per page in [FIGMA.md](FIGMA.md)). The implementation follows that design system strictly: only its colour, type, spacing, radius and elevation tokens are available in code.

---

## Contents

1. [Tech stack](#tech-stack)
2. [Getting started](#getting-started)
3. [Project structure](#project-structure)
4. [Design system in code](#design-system-in-code)
5. [Content layer](#content-layer-and-switching-to-a-cms)
6. [Internationalisation (PT / EN)](#internationalisation-pt--en)
7. [Pages](#pages)
8. [Quote form and Postmark](#quote-form-and-postmark)
9. [SEO](#seo)
10. [Images](#images)
11. [Committing and deploying](#committing-and-deploying)
12. [Open items](#open-items)
13. [SEO improvement backlog](#seo-improvement-backlog)

---

## Tech stack

| Concern    | Choice                                                                                 |
| ---------- | -------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript                    |
| Styling    | Tailwind CSS v4, configured with the Figma design tokens (`src/app/globals.css`)       |
| Icons      | [`lucide-react`](https://lucide.dev), the geometry used by the Figma icon library      |
| Fonts      | Montserrat (display) and Inter (body) via `next/font/google`, self-hosted at build time |
| Email      | [Postmark](https://postmarkapp.com) REST API, called with `fetch` (no SDK)             |
| Hosting    | Vercel, auto-deployed from `main`                                                      |

All pages are statically generated at build time (SSG). Only `/api/quote` runs on the server.

## Getting started

Requirements: **Node.js ≥ 20.9** and npm.

```bash
npm install
cp .env.example .env.local   # fill in the Postmark values (optional for local work)
npm run dev                  # http://localhost:3000 → redirects to /pt
```

| Script              | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                   |
| `npm run build`     | Production build (generates all static pages)        |
| `npm run start`     | Serves the production build                          |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)  |
| `npm run typecheck` | Generates Next.js route types and runs `tsc`         |

Without Postmark variables the site works normally. Only the form's submit returns an error message, because the API responds `503`.

> **Next.js 16 note:** this version differs from older Next.js releases (for example, `middleware` is now `proxy`). The bundled docs in `node_modules/next/dist/docs/` are the reference. See also [AGENTS.md](AGENTS.md).

## Project structure

```
public/
  brand/mark-on-dark.svg       Logo mark exported from Figma (01 · Brand & Logo)
  images/p01.jpg … p08.jpg     Photos; names match the Figma "Photo Slot" IDs (P01–P08)
  images/*icon*, some-*        Icons and the social media image (see Images)
src/
  app/
    [lang]/                    Every page lives under /pt or /en
      layout.tsx               Root layout: fonts, <html lang>, navbar, footer
      page.tsx                 Home
      servicos/ [slug]/        Services overview + one page per service
      projetos/ [slug]/        Projects overview + one page per project
      processo/ sobre/ contactos/
      privacidade/ termos/ cookies/
      not-found.tsx            Localised 404
      [...rest]/page.tsx       Sends unknown paths to the localised 404
    api/quote/route.ts         Quote form endpoint → Postmark
    globals.css                Design tokens + text styles (Tailwind v4 @theme)
    favicon.ico  apple-icon.png  manifest.ts   Favicon, iOS icon, web app manifest
    robots.ts  sitemap.ts      /robots.txt and /sitemap.xml
  components/
    ui/                        Primitives: Button, Icon, Section, SectionHeader, Photo, Badge, CheckList
    layout/                    Navbar, MobileMenu, NavLinks, LanguageSwitch, Footer, Logo
    cards/                     ServiceCard, ProjectCard, ProcessStep, PrincipleItem, ContactDetails …
    sections/                  Page sections (HomeHero, PageHero, About, Services, Process, Projects,
                               Principles, CTA, Contact, LegalPageView)
    forms/                     QuoteForm (client) and form fields
    seo/                       JSON-LD structured data
  content/
    types.ts                   Content interfaces (the contract every page reads)
    repository.ts              The only place that knows where content comes from
    data/company.json          Locale-independent company data (address, phone, email, legal entity, NIF)
    data/pt/*.json             Portuguese content
    data/en/*.json             English content
  i18n/                        Locales and route/slug helpers
  lib/                         Postmark client, quote validation, SEO metadata, helpers
  proxy.ts                     Redirects paths without a locale to /pt or /en
```

**Principles followed:** components are presentational and receive data through props. Pages fetch content from the repository and compose sections. Nothing in `components/` imports content directly.

## Design system in code

Everything in `src/app/globals.css` maps 1:1 to the Figma pages:

| Figma page                 | In code                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 02 · Color                 | Semantic tokens as Tailwind colours: `bg-bg-page`, `text-text-secondary`, `border-border-subtle`, `text-accent-default` … Tailwind's default palette is **disabled**, so only brand tokens can be used. |
| 02 · Color (Light mode)    | `data-theme="light"` re-maps the same tokens (used by `<Section tone="light">`, the one high-contrast section per page). |
| 03 · Typography            | One utility per text style: `type-display-xl`, `type-h1` … `type-h5`, `type-mobile-display`, `type-mobile-h1..h3`, `type-eyebrow`, `type-nav`, `type-button-l/m`, `type-body-l/m/s`, `type-label-m/s`, `type-caption`, `type-number-display`. |
| 04 · Layout & Elevation    | Spacing `2xs`…`5xl` (`p-lg`, `gap-xl` …), radius `sm/md/lg/pill`, shadows `shadow-1/2/3`, `shadow-focus` (3 px sand focus ring on every focusable element), `container-page` (max 1280 px; margins 20 / 40 / 80 px), section rhythm 64 px mobile / 128 px desktop. |
| 05 · Iconography           | `<Icon name="…" />`: Lucide icons with a 1.75 px stroke at 16/20/24/28/32 px.                              |
| 06 · Imagery & Photo Brief | `<Photo>`: radius/sm, `object-cover`, graphite overlays on hero photos.                                    |
| 07 · Components            | Button (Primary/Secondary/Ghost × L/M), Nav Link, Language Switch, Navbar, Input Field (Text/Textarea/Select), Checkbox, Section Header, Service Card, Project Card, Process Step, Principle Item, Contact Row, Badge, Photo Slot. |
| 08–11 · Website            | Home in PT/EN, desktop and mobile.                                                                         |

Breakpoints: mobile first; `md` (768 px) tablet; `lg` (1024 px) desktop typography and layout; `xl` (1280 px) full desktop navbar (below that, the hamburger menu).

## Content layer and switching to a CMS

All text, links and image references live in JSON under `src/content/data/`, typed by `src/content/types.ts`:

| File                     | Content                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| `company.json`           | Brand, legal entity, NIF (`vatNumber`), address, phone, email     |
| `<lang>/site.json`       | Navigation, footer, contact labels, opening hours, UI strings, 404 |
| `<lang>/form.json`       | Quote form labels, placeholders and messages                      |
| `<lang>/home.json`       | Home page sections                                                |
| `<lang>/pages.json`      | Heroes and texts of sub-pages                                     |
| `<lang>/services.json`   | Services (slug, icon, texts, "what it includes", image)           |
| `<lang>/projects.json`   | Projects (slug, category, texts, scope, image)                    |
| `<lang>/process.json`    | The four process steps                                            |
| `<lang>/principles.json` | The four principles                                               |
| `<lang>/legal.json`      | Privacy, terms and cookie policies                                |

- **Editing text:** change the JSON and commit; Vercel redeploys.
- **Placeholders:** `{legalEntity}`, `{year}`, `{email}` and `{address}` are filled in at render time.
- **Links:** internal links are stored as route keys (`{ "route": "contact", "hash": "pedido" }`), never as raw URLs, so they work in both languages.
- **Adding a service or project:** add an entry with the **same `slug`** to both `pt/` and `en/`. Pages, footer links, the form's "Tipo de obra" options and the sitemap update automatically.
- **Filling in the NIF:** set `vatNumber` in `company.json`. It then appears in the footer and in the structured data.

**Switching to a CMS or database:** pages only call the async functions in `src/content/repository.ts` (`getHome`, `getServices`, `getService`, …). To use a headless CMS (Sanity, Contentful, Payload, Strapi …) or a database, re-implement those functions to fetch from it and return the same interfaces from `types.ts`. No component or page changes are needed. If content should change without a redeploy, add revalidation (ISR or on-demand revalidation through a CMS webhook) at that point.

## Internationalisation (PT / EN)

- Locales: `pt` (default, `hreflang="pt-PT"`) and `en`, configured in `src/i18n/config.ts`.
- URLs are prefixed: `/pt/...` and `/en/...`. Slugs are shared, so `/pt/servicos/pintura` and `/en/servicos/pintura` are the same page in two languages.
- `src/proxy.ts` redirects paths without a locale (for example `/` or `/servicos`) to `/en/...` when the browser prefers English, and to `/pt/...` otherwise.
- The language switch (navbar, footer, mobile menu) keeps the visitor on the same page.
- Each page outputs `<link rel="alternate" hreflang>` for both languages plus `x-default` (PT).
- **Adding a language:** add it to `locales` and `localeMeta`, create `src/content/data/<lang>/` with every JSON file, and register it in `repository.ts`.

## Pages

| Route (`/pt` or `/en` prefix)               | Content                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `/`                                         | Home: 1:1 with Figma 08–11                                              |
| `/servicos`                                 | All services, process, CTA                                              |
| `/servicos/{remodelacao,acabamentos,pintura,carpintaria,canalizacoes}` | Service detail: intro, what it includes, other services, CTA |
| `/projetos`                                 | All projects                                                            |
| `/projetos/{apartamento-t3,moradia-unifamiliar,cozinha-casa-de-banho}` | Project detail (marked as sample project)        |
| `/processo`                                 | The four stages with details, principles                                |
| `/sobre`                                    | Who we are, principles                                                  |
| `/contactos`                                | Contact details and the quote form (`#pedido`)                          |
| `/privacidade`, `/termos`, `/cookies`       | Legal pages (provisional text, flagged on the page)                     |
| Livro de Reclamações                        | External link to livroreclamacoes.pt (legally required in Portugal)     |

Every page is reachable from the top navigation and/or the footer, as in the Figma footer.

## Quote form and Postmark

**Flow:** `QuoteForm` (client) validates → `POST /api/quote` validates again → `src/lib/postmark.ts` calls `POST https://api.postmarkapp.com/email` with the `X-Postmark-Server-Token` header → a plain-text email in Portuguese reaches the inbox, with **Reply-To set to the visitor's email** so you can reply directly.

- **Required fields:** name, email, and the privacy consent checkbox (GDPR). Phone, type of work and message are optional.
- Validation rules live in `src/lib/quote.ts` and are shared by the browser and the server.
- **Spam protection:** a hidden honeypot field. Submissions that fill it get a fake "success" response and are not sent.
- **API responses:** `200` sent · `400` invalid input · `502` Postmark error · `503` Postmark not configured. Errors are logged on the server (Vercel → Logs).

### Environment variables

| Variable                | Required | Description                                                                 |
| ----------------------- | -------- | --------------------------------------------------------------------------- |
| `POSTMARK_SERVER_TOKEN` | yes      | Postmark → Servers → *your server* → API Tokens                             |
| `POSTMARK_SENDER`       | yes      | Sender, e.g. `Pedra Norte <geral@pedranorte.eu>`. Must be a confirmed Sender Signature or on a verified domain |
| `POSTMARK_RECIPIENT`    | no       | Inbox that receives requests. Defaults to `POSTMARK_SENDER`                 |

### Postmark setup (one-off)

1. Create a Postmark account and a **Server** (for example "pedranorte.eu"). Use its default **Transactional** stream (`outbound`).
2. Under **Sender Signatures**, verify the domain `pedranorte.eu`: add the DKIM and Return-Path DNS records Postmark shows. Alternatively, verify a single sender address.
3. Copy the **Server API token**.
4. In Vercel → Project → Settings → Environment Variables, add the three variables for **Production** (and Preview if you want to test there). Redeploy.
5. New Postmark accounts are in test mode until approved and can only send to addresses on the verified domain. Request approval before launch.

To test locally, put the variables in `.env.local` (git-ignored), run `npm run dev`, and submit the form at `/pt/contactos#pedido`.

## SEO

Already implemented:

- **`/robots.txt`** (`src/app/robots.ts`): allows everything except `/api/` and points to the sitemap.
- **`/sitemap.xml`** (`src/app/sitemap.ts`): every page in both languages with `hreflang` alternates. Services and projects are read from the content layer, so new entries appear automatically.
- Per-page `<title>` and meta description from content, canonical URL, `hreflang` alternates and `x-default`, `<html lang>`.
- Open Graph and Twitter cards on every page use the brand social image (`/images/some-og.jpg`, 1200×630) with localized alt text.
- Favicon, Apple touch icon and a web app manifest (`/manifest.webmanifest`).
- Structured data: schema.org `GeneralContractor` with logo, address, phone, email and opening hours on the home page.
- Fully static pages, self-hosted fonts and responsive AVIF/WebP images through `next/image` (good Core Web Vitals).
- Semantic HTML: one `h1` per page, ordered headings, landmarks, a skip link, alt text in PT and EN, visible focus.

See the [SEO improvement backlog](#seo-improvement-backlog) for next steps.

## Images

`public/images/pNN.jpg` correspond to the Figma photo slots (page *06 · Imagery & Photo Brief*):

| File | Slot        | Used in                                                   |
| ---- | ----------- | --------------------------------------------------------- |
| p01  | Hero · Home | Home hero; Carpintaria service; About page                 |
| p02  | About       | Home "Sobre"; About hero; Canalizações service             |
| p03  | Team        | *Reserved in Figma, not used in v1* (photo of the partners) |
| p04  | Project 1   | Project card/page; Projects hero; Pintura service          |
| p05  | Project 2   | Project card/page; Contact hero; Remodelação service       |
| p06  | Project 3   | Project card/page; Services hero; Acabamentos service      |
| p07  | Principles  | Principles section; Process hero                           |
| p08  | Map         | Contact section                                           |

**Brand and social files**

| File                                            | Used for                                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/app/favicon.ico` (= `images/simple-mountain-center.ico`) | Browser favicon (`/favicon.ico`)                                    |
| `src/app/apple-icon.png`                        | iOS home-screen icon, 180×180, generated from `images/simple-mountain-center.png`         |
| `images/simple-mountain-center.png`             | Web app manifest icon (`/manifest.webmanifest`, `src/app/manifest.ts`)                    |
| `images/some-bg-png.png`                        | Social media (SoMe) source image, 1600×1000                                                |
| `images/some-og.jpg`                            | Open Graph / Twitter card on every page: `some-bg-png.png` cropped to 1200×630 and saved as JPEG (122 KB, from 1.6 MB). Regenerate it if the source changes |
| `images/on-bright-icon.png`                     | Logo in the schema.org structured data (dark mark, readable on white)                     |
| `brand/mark-on-dark.svg`                        | Logo mark in the navbar and footer (vector export from Figma, sharper than the PNGs)      |
| `images/on-dark-icon.*`, `images/on-bright-icon.ico` | Not used yet: available for light/dark-specific favicons or email signatures         |

**Alt text:** every `<img>` has a descriptive alt in the page's language. Photo alts live with each image in the content JSON (`image.alt`). The logo alt (`brand.logoAlt`), the logo link name (`brand.homeLink`) and the social image alt (`meta.socialImageAlt`) are in `<lang>/site.json`. Icons are decorative SVGs (`aria-hidden`) and always sit next to a text label.

The source photos are smaller than the brief asks for (about 1152–1280 px against 1600–2880 px). `next/image` crops them with `object-cover` to each slot's aspect ratio and serves sized AVIF/WebP. **Replace them with higher-resolution photos as soon as possible** (same filename, any size), especially P01, which is shown full-width.

## Committing and deploying

- **Repository:** https://github.com/nordquist/pedranorte
- **Branching:** don't commit straight to `main`. Create a branch (`feature/…`, `fix/…`, `content/…`), push it and open a pull request.
- **Before pushing:** `npm run lint && npm run typecheck && npm run build`.
- **Commit messages:** short and imperative, e.g. `Add carpentry project`, `Update opening hours`.
- **Deploy:** Vercel is connected to the GitHub repo.
  - Every push to `main` (for example, merging a PR) deploys to **production** (https://pedranorte.eu).
  - Every PR gets a **preview deployment** URL, posted on the PR, for review before merging.
  - Environment variables are managed in Vercel (see [Postmark](#environment-variables)). Never commit `.env*` files; only `.env.example` is tracked.
  - Vercel detects Next.js automatically; no `vercel.json` is needed.
- **Rollback:** in Vercel → Deployments, promote a previous deployment.

## Open items

- [ ] Final legal entity name (HomeCraft Lda vs Pedra Norte Lda) → `company.json` → `legalEntity`
- [ ] NIF → `company.json` → `vatNumber`
- [ ] Legal texts (privacy, terms, cookies) reviewed by a lawyer, then remove the "provisional" `notice`
- [ ] Higher-resolution photos (see [Images](#images)); real project photos and descriptions to replace the sample projects
- [ ] P03 partners photo, if a team section is added later
- [ ] Postmark account approval and DNS (DKIM / Return-Path) for `pedranorte.eu`
- [ ] Optional: replace the P08 static map with an interactive map (as the Figma brief suggests)

## SEO improvement backlog

Ordered roughly by impact versus effort:

1. **Google Search Console and Bing Webmaster Tools:** verify `pedranorte.eu`, submit `/sitemap.xml`, and watch coverage and Core Web Vitals.
2. **Google Business Profile:** create and verify it with the same name, address and phone (NAP) as the site. This is the most important factor for local searches such as "remodelação Lisboa".
3. **Localised slugs:** `/en/services/painting` instead of `/en/servicos/pintura` for better English keyword relevance (needs a slug map per locale in `i18n/routes.ts`).
4. **Real projects with case-study content:** location, scope, duration, before/after photos and client testimonials. Unique content ranks; sample projects don't.
5. **Location-specific pages:** for example "Remodelação de apartamentos em Lisboa" / "… no Porto", if the company serves several areas, plus `areaServed` per city in the structured data.
6. **More structured data:** `Service` on each service page, `BreadcrumbList` on sub-pages, `FAQPage` on a future FAQ, and `Review`/`AggregateRating` once real reviews exist.
7. **Per-page Open Graph images:** every page currently shares the brand social card. A generated 1200×630 image per page (Next.js `opengraph-image.tsx`) with the page title would make shared links more specific.
8. **Higher-quality images:** WebP/AVIF sources at 2× the slot size, under 300 KB, with descriptive filenames (`remodelacao-sala-lisboa.jpg`) and alt text.
9. **Content:** a blog or guides section (renovation costs, licences in Portugal, choosing materials) for long-tail Portuguese keywords; link internally to the services.
10. **FAQ section** on service pages answering real client questions (price ranges, timelines, licences).
11. **Backlinks and citations:** listings in Portuguese directories (Páginas Amarelas, Zaask, Fixando, Habitissimo), supplier and partner sites, local press.
12. **Analytics with consent:** a privacy-friendly tool (Plausible, Vercel Web Analytics) or GA4 with a consent banner, to measure organic traffic and form conversions. Update the cookie policy accordingly.
13. **Performance monitoring:** enable Vercel Speed Insights and keep LCP (the hero photo) under 2.5 s.
14. **Security headers** (CSP, HSTS) in `next.config.ts`: a small trust signal and good practice.
15. **Redirect `www.pedranorte.eu` to `pedranorte.eu`** (or the reverse) in Vercel → Domains, so there is a single canonical host.

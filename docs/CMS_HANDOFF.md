# PennePazze CMS Handoff

## 1. Current Project State

Phases 1, 2, 2.5, and 4 complete. All frontend pages connected to live Sanity CMS. CMS seeded with real content. Build passes (19/19 pages). TypeScript clean. Ready for Vercel deployment.

**Stack:** Next.js 16 (App Router), React 19.2.0, Tailwind CSS 4, Sanity v6 (free tier)
**Sanity project ID:** `2ewynsed` — dataset: `production`

---

## 2. Vercel Deployment

### Step 1 — Import the project

1. Go to [vercel.com](https://vercel.com) → New Project → Import Git Repository
2. Select this repo
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)
6. Install command: `npm install --legacy-peer-deps`
   - **Required** — React 19.2.0 vs Sanity peer dep. Without `--legacy-peer-deps` the Vercel build will fail.

### Step 2 — Add environment variables

In Vercel → Project Settings → Environment Variables, add:

| Variable | Value | Environments | Sensitive? |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `2ewynsed` | Production, Preview, Development | No |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development | No |
| `SANITY_API_TOKEN` | *(your Editor token)* | Production, Preview | **Yes** |

> **Note on `SANITY_API_TOKEN` in Vercel:**
> The token is only used server-side — for ISR revalidation and Studio authentication in hosted deployments. It is NOT used for public page reads (those use the public `NEXT_PUBLIC_SANITY_PROJECT_ID`). You can omit it from Production if you do not need server-side writes or authenticated Studio on Vercel. If in doubt, include it.

### Step 3 — Deploy

Click Deploy. Expected output:
- Build: 19/19 pages generated
- All pages show `Revalidate: 2m` — confirms live Sanity data is being fetched
- `/studio/[[...tool]]` shows as Dynamic (server-rendered on demand)

### Step 4 — Verify live site

1. Visit your Vercel URL → check that text matches Sanity content (not fallback)
2. Visit `your-site.vercel.app/studio` — Studio should load and show your documents
3. Edit a field in Studio → wait ~2 minutes → refresh the page → change should appear (ISR in action)

---

## 3. Sanity CORS Configuration

Studio and frontend reads require CORS origins to be whitelisted in Sanity. You cannot edit CORS via API — it must be done in the dashboard.

**Where:** [sanity.io/manage](https://sanity.io/manage) → PennePazze website → API tab → CORS Origins

**Add these origins (in order):**

| Origin | Allow Credentials | Purpose |
|---|---|---|
| `http://localhost:3000` | ✅ Yes | Local development |
| `http://localhost:3333` | ✅ Yes | Sanity Studio standalone dev |
| `https://your-site.vercel.app` | ✅ Yes | Production (replace with real URL) |
| `https://*.vercel.app` | ✅ Yes | All Preview deployments (wildcard) |

> **Why "Allow Credentials"?** Sanity Studio requires credentialed requests to authenticate the logged-in editor. Without it, Studio will load but show an authentication error. Public page reads work without credentials — but enabling it for all origins is safe and avoids confusion.

> **Wildcard `*.vercel.app`:** Sanity supports this pattern. It covers every Preview branch deployment automatically, so you don't have to add new CORS entries for each PR.

> **Custom domain:** If you later add a custom domain (e.g. `pennepazze.com`), add it here too.

---

## 4. Token Strategy (what token to use where)

### Current situation
You have one **Editor** token that was used to run the seed script.

### Recommended setup after deployment

| Use case | Token type needed | Why |
|---|---|---|
| Public page reads (frontend) | **None** — public API | `NEXT_PUBLIC_*` vars are sufficient for unauthenticated reads |
| Sanity Studio editing | **Editor** token (or owner login) | Studio uses your Sanity account login, not the API token |
| Seed script (`scripts/seed-content.ts`) | **Editor** token | Needs write access to create/replace documents |
| Vercel Production (`SANITY_API_TOKEN`) | **Read-only** or **Editor** | Used for optional server-side auth; read-only is safer |
| Future content edits by owner | Owner logs in at `/studio` | No token needed — Studio uses Sanity's own auth |

### Recommendation

1. **Create a new read-only token** in sanity.io/manage → API → Tokens → Add token → **Viewer** permission. Name it `vercel-production`.
2. **Add that read-only token** as `SANITY_API_TOKEN` in Vercel (instead of the Editor token).
3. **Keep the Editor token** locally in `.env.local` — you'll need it if you re-run the seed script or do bulk content updates.
4. **Do not delete the Editor token** — you may need it again.

This way: the Editor token never leaves your machine, and production only has read access.

---

## 5. Sanity Schemas

### Singletons (one document each)
| Schema | Route | Description |
|---|---|---|
| `siteSettings` | global | Restaurant name, social links, newsletter, SEO |
| `homePage` | `/` | Hero, sections, Instagram |
| `aboutPage` | `/about` | Story, beliefs, press quotes |
| `menuPage` | `/menu` | Hero, freshness strip, order section |
| `cateringPage` | `/catering` | Hero, offerings, form |
| `gelatoPage` | `/gelato-pazzo` | Hero, differentiators, open now |
| `careersPage` | `/careers` | Hero, intro, benefits, positions, form |
| `pressPage` | `/press` | Hero, Google rating, media contact |
| `contactPage` | `/contact` | Hero, form, follow us |

### Collections
| Schema | Description |
|---|---|
| `location` | 4 locations with slug, status, hours, features, orderLink |
| `menuCategory` | Tab categories with description, highlightedItems |
| `menuItem` | Individual dishes with price, popular flag, allergens |
| `award` | Nashville Scene, Google rating badges |
| `pressArticle` | Pull quote style, publication logo, link |
| `updatesSlide` | Home page news carousel |
| `cateringBenefit` | Catering offering cards (legacy collection) |
| `careerRole` | Open positions grouped by department |

---

## 6. Pages Connected to CMS

| Page | Connected | Notes |
|---|---|---|
| `/` | ✅ | authenticityStrip, storyTeaser, updates carousel |
| `/about` | ✅ | originStory, beliefsSection, locations |
| `/menu` | ✅ | heroHeading, heroBody, categories + items |
| `/locations` | ✅ | All 4 locations with status, hours, openingNote |
| `/locations/[slug]` | ✅ | Full location detail, features, hours |
| `/catering` | ✅ | heroHeading, offeringsSection, formSection |
| `/gelato-pazzo` | ✅ | New page, fully CMS-driven |
| `/careers` | ✅ | introSection, openPositionsSection, careerRoles |
| `/press` | ✅ | pullQuotes, awards, mediaContactSection |
| `/contact` | ✅ | heroHeading, formSection.heading, locations |
| Header | ✅ | Location slugs + names for Menu submenu |
| Footer | ✅ | footerTagline, newsletter, copyright, social |
| Order Modal | ✅ | Open-status locations only |

---

## 7. Partially Hardcoded Sections

| Page/Section | What's Hardcoded | Why |
|---|---|---|
| Home — Offering Tiles | Menu/Catering/About nav tiles | Structural navigation, not editorial |
| About — Team Tiles | 3 image tiles (local images) | No image upload from owner yet |
| Careers — Team Tiles | 3 image tiles (local images) | No image upload from owner yet |
| Home — whySection | Not rendered | Schema exists, UI not built yet |
| Home — howItWorksSection | Not rendered | Schema exists, UI not built yet |
| Home — gelatoBanner | Not rendered | Schema exists, UI not built yet |
| About — experienceSection | Not rendered | Schema exists, UI not built yet |
| About — pressQuotes | Not rendered | Schema exists, UI not built yet |
| Careers — benefitsSection | Not rendered | Schema exists, UI not built yet |
| Policy pages | Fully hardcoded | No CMS needed |
| Header nav links | Fully hardcoded | Structural |
| Order modal step labels | Fully hardcoded | UI chrome |

---

## 8. Missing Owner Inputs

**Required before launch:**

| Field | Location in Studio | Status |
|---|---|---|
| Social media URLs | Site Settings → Social | Only handles known, not full URLs |
| General contact email | Contact page sidebar | Not in document — owner to decide |
| Order links | Each location → orderLink | Not provided |
| Google Maps URLs | Each location → googleMapsUrl | Not provided |
| Location photos | Each location → image | Not provided |
| Hero images | About, Menu, Catering, Careers pages | Using local fallbacks |
| Menu prices | Each menu item → price | All empty |
| PDF menu URL | Menu Page → orderSection.pdfUrl | Not provided |
| Special diets URL | Menu Page → orderSection.specialDietsUrl | Not provided |
| Catering phone numbers | Catering Page → formSection | Not in document |
| Gelato location address | Gelato Page → openNowSection.address | Not provided |
| Press article URLs | Each press article → link | Not provided |
| Hero video URL | Home Page → heroVideoUrl | Vimeo fallback — owner to confirm |

---

## 9. Important Constraints

- **Preserve existing design exactly.** Do not redesign. Do not change layout, animations, spacing, typography, colors, or component structure unless required for a bug fix.
- **Word document (`PennePazze_Website_Copy_v3.docx`) is the sole content source of truth.**
- **Sanity free tier only.** No paid plugins or third-party CMS add-ons.
- **`--legacy-peer-deps`** required for all `npm install` commands (including Vercel install command).
- **Restaurant name is "PennePazze"** (one word, no space). Never "Penne Pazze".

---

## 10. Known Non-Blocking Issues

- **Social icons won't link** until owner provides full Instagram/Facebook/TikTok URLs in Studio.
- **Order Now modal dead-ends** — no `orderLink` set for any location yet.
- **`@sanity/image-url` deprecated default export** — warning from Sanity's own library, not our code.
- **Next.js workspace root lockfile warning** — two `package-lock.json` files (one at repo root, one in project). Non-blocking.
- **ESLint not configured** — no `.eslintrc` or `eslint.config.js` in project. `npm run lint` will fail. Non-blocking for deployment; Next.js build catches critical errors.
- **Hero images are local fallbacks** (`/images/*.jpg`) — will 404 if files don't exist in `public/`. Confirm all images are present.

---

## 11. Recommended Next Steps

### Before deploying
1. Add CORS origins in Sanity dashboard (see Section 3)
2. Add env vars to Vercel (see Section 2)
3. Add `npm install --legacy-peer-deps` as Vercel install command

### After first deploy
1. Create a read-only Sanity token and swap it into Vercel `SANITY_API_TOKEN`
2. Test Studio at `your-site.vercel.app/studio`
3. Edit one field in Studio → wait 2 minutes → verify ISR revalidation works on live site

### Content (owner action)
1. Provide social URLs, order links, Google Maps links, photos
2. Add menu items with prices via Studio → Menu → Menu Items
3. Add press article URLs via Studio → Press → Press Articles
4. Upload location photos, hero images, carousel slide images

### Future phases (not yet approved)
- **Phase 5A:** Build UI for unrendered CMS sections (whySection, gelatoBanner, benefitsSection, etc.)
- **Phase 5B:** Wire Order Now button to real `orderLink` per location
- **Phase 5C:** Custom domain setup + Sanity CORS update

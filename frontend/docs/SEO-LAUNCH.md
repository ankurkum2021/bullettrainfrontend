# SEO launch checklist (Lightsail + domain)

## Already in the codebase

- `robots.txt` → allow `/`, block `/api/`, `sitemap` + `host`
- Dynamic `sitemap.xml`: hub pages, `/opening-date`, 12× `/explore/[slug]`, every `/updates/[slug]`
- Per-page title, description, canonical, Open Graph, Twitter cards
- JSON-LD: WebSite, Organization, FAQ (`/opening-date`), TrainStation (hub + explore), NewsArticle, BreadcrumbList
- 301 redirects for legacy URLs (`/kab-shuru-hogi`, `/news`, old per-station paths)
- Footer + nav internal links; `lang="en-IN"`
- RSS: `/feed.xml` (linked from `/updates`)

## You do once at launch

1. **Next.js env on the server** (or Vercel): `BTS_API_URL=https://your-lightsail-api:8000`, `NEXT_PUBLIC_SITE_URL=https://bullettrainstation.com`
2. **Build** with API reachable so `sitemap` and `generateStaticParams` for updates include live slugs
3. **Google Search Console**: submit `https://bullettrainstation.com/sitemap.xml`
4. **URL inspection** → Request indexing: `/`, `/opening-date`, `/stations`, `/explore/surat`, `/explore/bilimora`, `/updates`, latest news article
5. **News timer on Lightsail**: `sudo bash scripts/install-news-timer.sh` so `/updates` and sitemap stay fresh
6. Optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if not verified via DNS only

## Lightsail split

- **API** (Django): crawlable JSON at `/api/news/` — keep `ALLOWED_HOSTS` + HTTPS termination correct
- **Front** (Next): public HTML; set `BTS_API_URL` to the API origin the server can reach at build and runtime
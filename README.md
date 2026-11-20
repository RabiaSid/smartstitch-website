# SmartStitch B2B (new)

    npm install
    cp .env.example .env.local   # set contact email / WhatsApp
    npm run dev

Pages: / , /about , /b2b , /quote , /fabric-guide , /markets/us , /markets/uae , /markets/uk
Business facts live in `src/data/content.ts` (lines tagged CONFIRM need your check).
Form posts to `/api/lead`, which forwards to LEADS_API_URL (same payload as the old site).

## Lead form backend
`POST /api/lead` validates, rate-limits (5 per 10 min per IP), then delivers to every configured channel: MongoDB (`MONGODB_URI`), email via SMTP (`SMTP_*` + `LEAD_NOTIFY_TO`), and/or forward to `LEADS_API_URL`. Success if at least one works; if none is configured it returns 503 (never a fake success). See `.env.example`.

## SEO
Organization/WebSite/Service schema (layout), FAQ + Breadcrumb schema per page, `robots.txt`, `sitemap.xml`, `llms.txt`, per-page OG images. After deploy: submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

# Store analytics

Open `/admin/analytics` or choose **Analytics** in the sidebar. A shortcut is also on `/admin/dashboard`. Reports use Today, Last 7 days and Last 30 days in Asia/Tbilisi. They update on refresh/navigation, without polling or live connections.

## Deployment

Review/apply `prisma/migrations/20261111130000_site_analytics/migration.sql` to the actual deployment database **before** deploying this code. It adds a page-view table and nullable order correlation fields. It does not reconstruct historical traffic. The local database was previously found to differ from the live app's database; verify the Vercel Production connection before running migrations.

```powershell
node node_modules/prisma/build/index.js migrate deploy
node node_modules/prisma/build/index.js generate
```

`SITE_ANALYTICS_SECRET` can be a dedicated strong server-only secret. If omitted, the already-configured `CRON_SECRET` derives a domain-separated cookie-signing key, so no new secret is necessary. Keep the signing key stable; changing it resets recognized browser identities. Never expose either secret in a NEXT_PUBLIC variable.

Collection defaults to production only (Vercel previews are excluded). Set `NEXT_PUBLIC_SITE_ANALYTICS_ENABLED=false` at build time and `SITE_ANALYTICS_ENABLED=false` server-side to disable it. To test locally, explicitly set `NEXT_PUBLIC_SITE_ANALYTICS_ENABLED=true` and use a separate test database. Both page views and order correlation honor the existing opt-out preference. Authenticated admin browsers and known crawler user agents are excluded from page-view collection, so test traffic in an incognito browser without the admin cookie. Orders remain usable if analytics collection fails.

The existing five-minute `/api/internal/meta-events` scheduler also removes site analytics records/order correlation IDs older than 90 days, even while Meta sending is disabled. A failed analytics cleanup does not block Meta processing. Signed HttpOnly, SameSite=Lax cookies recognize a browser; HTTPS cookies are Secure. No fingerprinting, IP storage, geolocation service, Google Analytics, or Meta-derived visitor counts are used.

## Definitions

- **Unique visitors:** distinct opaque browser IDs across the complete selected period. A visitor on three days counts once in the total, once on each daily chart point. Different devices, cleared/blocked cookies, and private windows can count separately; no exact person count is claimed.
- **Sessions:** a recognized browser starts another session after 30 minutes without a measured page view. A session retains its entry source/campaign through internal navigation. A cross-midnight session may appear in both day buckets, while the overall total deduplicates it.
- **Page/product views:** public page loads or Next.js pathname navigation. Product pages are `/product/[slug]`. Admin/API routes and arbitrary paths are rejected; query strings are never stored. Repeated delivery of the same event ID is deduplicated. Basic browser throttling and known-bot filtering are approximate, not proof that every counted visitor is human.
- **Website leads:** database submissions with submissionId created in the period, including those later promoted to an order. Manually created admin orders are excluded. Blocked analytics does not hide the actual lead count.
- **Confirmed orders/value:** website leads from the period whose type became ORDER. Includes later cancellations/returns, since they were previously accepted; the separate outcome counts show current status. Value is the whole expected order total, not quantity multiplied by that total and not collected revenue.
- **Collected revenue:** recorded cashCollected for delivered orders with COLLECTED/SETTLED payment status, among leads submitted in the period. This is an order-creation cohort report, not a statement of bank deposits or payments received on that date. Returned orders are excluded. Existing financial screens serve accounting purposes.
- **Conversion rates:** distinct measured sessions linked to a website lead/confirmed order divided by measured sessions in the period. Several leads in one session cannot inflate the rate beyond 100%. Unlinked submissions are excluded from the numerator; sessions that never loaded the collector cannot be inferred.
- **Traffic sources:** utm_source if provided, otherwise `meta` for fbclid links, otherwise the external referrer hostname or direct. A Meta source alone does not prove paid advertising. Campaigns and full referring URLs are not sent to third-party analytics. Source visitor counts can overlap when a browser returns through another channel.

First-party page views go only to this app's database. Existing Meta Lead/Purchase events remain separate. Review the updated `/privacy` notice against actual business practices before launch.

## Verification

```powershell
node --import tsx --test tests/site-analytics.test.ts
```

An opt-in PostgreSQL report test is also available as `tests/site-analytics-db.test.ts` when `ANALYTICS_TEST_DATABASE_URL` is configured in the test process. It creates only temporary shadow tables with synthetic fixtures, validates distinct-browser/session counts, conversion denominators and booked-versus-collected value, then rolls back and disconnects. It never reads or updates public order tables.

After deployment, visit the public store in a separate non-admin browser. Navigate between the index and product pages, submit a lead, then confirm it from your admin browser. Refresh `/admin/analytics`. One browser should remain one unique visitor across those pages; a repeat visit after 30 minutes starts a new session. Test another browser to add another visitor. Verify opt-out stops requests, admin browsing does not inflate counts, query strings are absent from stored paths, and the actual lead count still increments when analytics is blocked.

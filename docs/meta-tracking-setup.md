# Meta tracking setup

The integration is disabled until explicitly configured. Nothing in this change creates a Meta account, sends test events, applies a production migration, or deploys the app.

## 1. Create the Meta connection

1. Sign in to Meta Business Suite with the business that owns the Facebook Page, Instagram account, and ad account. Use that business's portfolio rather than a developer's personal business.
2. Open **Events Manager**. Choose **Connect data → Web** and create/select the business's dataset/Meta Pixel. Meta's labels and available setup options vary by account.
3. In the dataset's settings, find its ID. This is `NEXT_PUBLIC_META_PIXEL_ID`. Grant the intended ad account access to that dataset.
4. Choose the manual/direct installation path. This app installs Pixel itself: do not also install the same events through GTM, Meta's Event Setup Tool, or another integration. Disable overlapping automatic events if previously configured in Events Manager.
5. Under **Conversions API**, choose the direct/manual integration and generate an access token with permission to send events to this dataset. Store it in your hosting provider's **server-only** `META_CAPI_ACCESS_TOKEN`. Never use a `NEXT_PUBLIC_` token, commit it, put it in an ad URL, or send it in chat.
6. Confirm the supported Graph API version in Meta's setup/API documentation and set `META_GRAPH_API_VERSION` explicitly (for example `v25.0` if supported). No unversioned API requests are made.
7. Set `NEXT_PUBLIC_SITE_URL` to the exact production origin, such as `https://your-domain.ge`, without a path. Complete domain verification if Meta requests it for the account/features you use, and restrict dataset traffic to your real domain using available traffic-permission settings.

Tell the assistant the domain and dataset ID once you reach steps 3 and 7. Neither is a secret. Keep the token in hosting settings.

## 2. Prepare the database and release

Review `prisma/migrations/20261111120000_meta_conversion_tracking/migration.sql`. It only adds nullable attribution/submission fields, a conversion outbox, and indexes/foreign key; it does not clear records or modify order prices.

Apply the migration **before deploying the new application code**, using the intended production environment:

```powershell
node node_modules/prisma/build/index.js migrate deploy
node node_modules/prisma/build/index.js generate
```

Use `migrate deploy`, not `migrate dev` or `reset`, for production. All code paths now expect the new columns even while Meta sending is disabled. An older app remains compatible with the additive migration.

Use `.env.meta.example` as the list of required settings; merge it into existing environment variables without replacing database/Sanity credentials. `NEXT_PUBLIC_` values are embedded at build time, so changing them requires rebuilding/redeploying. Server variables must be set in the same target environment.

## 3. Automatic tracking, preferences, and privacy

Review `/privacy`, `/terms`, `/shipping`, `/returns` and `/contact`, including the business phone/address copied from the existing footer, `info@sheakete.com`, retention, Meta/Telegram disclosures, business identity and actual practices. Shared details live in `src/lib/store-info.ts`. Delivery timing/charges are stated as confirmed by phone because fixed tariffs were not provided. The policy pages are general drafts, not a guarantee of platform approval or verified legal compliance. Automatic advertising tracking may require a different consent arrangement depending on applicable requirements; publishing a privacy notice is not a substitute for required consent.

When the existing enable flags are true, advertising tracking starts automatically on public pages, with no consent popup. Attribution records `trackingMode: automatic` and a random `sessionId`; it does not fabricate an affirmative consent record. Historical opt-in records remain readable. Previous opt-outs are respected. A preference button on `/privacy` lets visitors disable tracking without preventing ordering. The 90-day session cookie links that opt-out to pending events; opting out clears stored attribution and suppresses pending events from the same session, including historical consentSessionId records. Already-sent/in-flight events are not retracted. Pixel is not initialized on `/admin`. Cookies are first-party, SameSite=Lax, Secure on HTTPS.

UTMs/IDs and the query-free landing/referrer URL are stored with the order when tracking is enabled; they are not automatically sent to Meta as custom event parameters. `_fbc` preserves a real `fbclid`; no click identifier is invented. Phone numbers are normalized to Georgian international format and SHA-256 hashed before entering CAPI payloads. Email is not collected from customers by the order form. Browser/IP identifiers are not hashed. IP forwarding is disabled unless the host's proxy behavior is explicitly trusted and `META_TRUST_PROXY_HEADERS=true` is configured.

The scheduler removes event matching payloads after successful sends or after seven days and removes order attribution after 90 days. Business order records are retained separately. Running the scheduler is required for these retention periods. Customer browser matching data is never replaced with the manager's browser/IP.

## 4. Configure retries and retention

Generate `CRON_SECRET` with a password manager or cryptographically secure generator. Configure your hosting scheduler (or an external scheduler) to call:

```text
GET https://YOUR_DOMAIN/api/internal/meta-events
Authorization: Bearer YOUR_CRON_SECRET
```

Use a five-minute interval initially. Protect the secret in scheduler settings. A call handles up to two events; increase frequency if the backlog grows. The endpoint also supports POST. A request without the correct secret returns 401. Verify your hosting plan supports a 60-second route duration. No scheduler has been provisioned automatically.

For Vercel Hobby/free, use an external scheduler such as https://cron-job.org rather than a frequent built-in Vercel cron: Hobby's built-in cron is limited to daily execution. In cron-job.org create a job named `Sheakete Meta retries`, use the GET URL above, choose every five minutes (`*/5 * * * *`), and add the custom header `Authorization` with value `Bearer YOUR_CRON_SECRET`. Use the private CRON_SECRET value from your environment; do not put it in the URL and do not share the Meta access token with the scheduler. Enable failure notifications. The scheduler only receives processing counts and no customer data. Test the job while both Meta enable flags remain false: a configured deployment should return HTTP 200 with `disabled: true`. If it returns 401, check the header and Vercel's deployed CRON_SECRET; a 503 means the outbox/database check failed. After Meta is enabled the same job processes due events. The small batch limits time spent on Meta requests to approximately 16 seconds, but database/network delays can still cause timeouts; monitor execution history and backlog.

New leads and confirmations also attempt delivery using Next.js `after`; the durable scheduler is the recovery path after timeouts, deploys, or outages. Concurrent workers lease rows; retries reuse the original name, ID, value, and event time. Network/5xx/rate-limit failures back off; other permanent errors are marked FAILED. All events are sent individually so one invalid event cannot reject a batch. Pending events older than seven days are marked EXPIRED rather than changing their occurrence timestamp. A recent purchase is not stale simply because its originating lead/click was weeks earlier.

Inspect `MetaConversionEvent` status, attempts, sentAt and lastError using your database admin tool. Errors contain HTTP/Meta numeric codes, not full responses or credentials. For a recoverable FAILED event, fix its cause, then set status=PENDING, attempts=0, nextAttemptAt=now(), lockedUntil=NULL, leaseToken=NULL, preserving its eventId, payload and occurredAt. Do not revive EXPIRED or SUPPRESSED events. Raw event payloads may already have been purged after seven days.

## 5. Test before launch

1. Use a staging deployment and a separate test database. Open the dataset's **Test Events** tool and copy its server test code into `META_TEST_EVENT_CODE`.
2. Set the two enable flags to true in staging, supply the dataset ID, token, site origin and version, then rebuild. Non-production CAPI sends are blocked unless a test code is present. Browser Pixel events may still reach the configured dataset in preview/local builds, so use a separate staging dataset or the browser Test Events workflow and keep preview flags off otherwise.
3. Open a fresh browser session: tracking starts without a popup. Disable tracking on `/privacy`, then confirm no further events are sent and an order can still be submitted. Previous `denied` preference cookies should also remain effective.
4. Enable tracking through the privacy page preference button and open a product. Check one PageView per navigation and one ViewContent per viewed product, including Next.js navigation/back/forward and development Strict Mode. Check content_ids match Sanity document IDs.
5. Submit a valid name/phone. Check one database lead and one Lead conversion after browser/server deduplication. Both copies use `lead_ORDER_ID`. Failed submissions do not emit a Lead. Double clicks and network retries reuse submissionId; Telegram failure never changes a saved lead to failure.
6. Confirm the lead through each admin flow (dialog, quick action, bulk). Check one Purchase with `purchase_ORDER_ID`, currency=GEL and the **confirmed complete order/bundle total**, without multiplying quantity or subtracting costs. Confirming again must not enqueue another purchase. Returning/cancelling/delivering the order must not send a second Purchase.
7. Purchases are `action_source=phone_call`, because the actual agreement happens on a call. They do not claim to be website purchases merely because staff clicks a button in the admin. Check that Events Manager accepts them and that your account's intended campaign/optimization setup supports this source. Do not silently change action_source to website to gain eligibility. Purchase-at-confirmation is order-booking revenue, not collected revenue.
8. Simulate a failed network send and retry. Confirm the event ID/time/value remain unchanged. Disable tracking on the privacy page before confirmation and ensure no purchase is queued for that session. Check Test Events, Diagnostics, deduplication and match quality; do not rely only on an HTTP 200 response.
9. Browser Lead uses no fictional revenue. Delivered/paid revenue remains in the business database; this implementation does not send a second purchase or a custom delivered event. Attribution is retained for later reporting.

Run local checks (mocked events, no real customer data or Meta requests):

```powershell
node --import tsx --test tests/meta-tracking.test.ts
node --max-old-space-size=2048 node_modules/typescript/bin/tsc --noEmit --incremental false
```

After verifying tests in Meta, remove `META_TEST_EVENT_CODE` from production, enable flags there, and rebuild/deploy. Keep local/preview flags false. Confirm automatic startup, opt-out behavior and the scheduler in production. This repository change does not perform a live test submission on your behalf. No new database migration is needed for automatic attribution; the existing JSON column stores both formats.

## Ad attribution URL template

In Ads Manager's URL parameters field, use:

```text
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}
```

Use IDs for stable joins; names can change. Verify the final URL in Meta's preview. Never put names, phones, emails, access tokens, or other personal information into URL parameters.

## References

- https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/server-event/
- https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events/
- https://github.com/meta/capi-param-builder/tree/main/nodejs
- https://nextjs.org/docs/app/api-reference/functions/after

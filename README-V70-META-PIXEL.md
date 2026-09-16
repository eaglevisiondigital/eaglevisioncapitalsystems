# Eagle Vision Prime49 V70 — Meta Pixel Activated

Meta Pixel ID: `1815473789632208`

## What changed

- Activated the existing Prime49 Meta Pixel loader using the supplied Pixel ID.
- Added the Pixel ID as an HTML meta fallback on the Prime49 landing, lead-confirmation and consultation-confirmation pages.
- Added Meta's noscript `PageView` fallback image to those three funnel pages.
- Updated Prime49 asset query versions from V69 to V70 so browsers fetch the activated configuration.

## Events already wired into the funnel

- `PageView` — Prime49 landing and confirmation pages
- `ViewPrime49` — landing-page custom event
- `Lead` — successful savings-review confirmation page
- `Prime49LeadConfirmed` — custom lead-complete event
- `Schedule` — successful preferred-consultation-time confirmation page
- `Prime49ConsultationTimeRequested` — custom booking-complete event
- CTA and funnel-step custom events defined in `prime49-tracking.js`

The tracking script intentionally does not send contact information or calculator dollar figures to Meta.

## After deployment

1. Open Meta Events Manager and use Test Events.
2. Visit `https://eaglevision.biz/prime49/`.
3. Confirm `PageView` and `ViewPrime49`.
4. Submit a test savings-review form and confirm `Lead`.
5. Submit the optional consultation-time request and confirm `Schedule`.

# Propel Contractor Suite V73 verification

Scope: the landing page, its isolated assets, its JavaScript/CSS, and its existing thank-you/privacy pages. Shared styles, unrelated pages, production application, authentication, databases, and release authorization are unchanged.

Brand colors: mint `#48F5AD` and deep emerald `#00543E`. Darker green button surfaces maintain white-text contrast while the mint glow supplies the approved highlight.

## Assets

- `propel-contractor-suite/assets/propel-contractor-suite-approved-v73.webp`: lossless WebP encoding of the exact owner-supplied 1614 × 522 logo, retaining the complete P/arrow, wordmark, Contractor Suite, and by Eagle Vision lockup. Light inset panels preserve its original dark lettering and exact colors on dark sections; no redrawing or recoloring.
- `eagle-vision-propel-light-v73.svg`: page-specific white/blue/silver treatment, embedding the original approved EV orbit bitmap without modifying it. Shared Eagle Vision assets remain untouched.
- `propel-symbol-v73.webp`: optimized crop of the same approved symbol for the illustrative dashboard.
- `bluewater-residence-v73.webp`: property-photo crop from the approved full-page reference. Its available source resolution is 229 × 99.

## Browser checks

Playwright/Chrome captures and programmatic checks pass at 1600 × 900, 1440 × 900, 1024 × 1366, 430 × 932, and 390 × 844. Captures are kept outside the published source. The checks cover document overflow, broken images, heading clipping, legacy logos, navigation offsets, mobile menu open/Escape close, interest validation, attribution fields, timestamp, native form POST payload, thank-you routing, privacy content, and sticky CTA visibility near the form.

WebKit at 390 × 844 also passes with no horizontal overflow or JavaScript errors. CSS uses iPhone safe-area insets for the mobile CTA and reserves footer space. The CTA hides while the hero's buttons or the form are visible.

Axe WCAG A/AA automated checks at desktop 1440 × 900 and mobile 390 × 844 report zero violations. JavaScript syntax and `git diff --check` pass.

All existing form field names and the complete development-status disclosure are preserved. Netlify form name remains `propel-contractor-interest`; honeypot and optional marketing consent remain intact. The form action uses the canonical extensionless thank-you route. Browser POST checks intercept the submission to avoid creating fake leads or sending notifications; Netlify form registration is checked separately. No real test lead is created.

## Reproduction

Install Playwright separately from this buildless website, serve the repository over HTTP, and run:

```sh
NODE_PATH=/path/to/playwright/node_modules node qa/propel-v73/check-page.cjs
```

Optional environment variables:

- `PROPEL_QA_URL`: site origin, default `http://127.0.0.1:8765`.
- `PROPEL_QA_OUT`: screenshot and JSON directory, default `/private/tmp/propel-v73-qa`.

## Visual differences from the reference

The provided exact Propel logo has a dark wordmark, whereas the reference uses a different white uppercase lockup. This implementation uses the exact supplied logo on light inset panels. Devices, chart, icons, and wave effects are responsive HTML/CSS/SVG reconstructions, so their perspective, fine lighting, icon details, and spacing are approximate. The required development disclosure and footer remain visible below the reference's closing form. Small form controls from the reference are enlarged for touch and keyboard accessibility.

# Propel Contractor Suite demo — build and verification report

Built November 14, 2026 against the seven supplied approved mockups, including the amendment requiring a meaningful view for every major sidebar module.

## Result and implementation

The buildless demo lives at `/propel-contractor-suite/demo/`. It includes **17 sidebar modules, 19 bookmarkable views, and 52 internal tab views**, including all seven visual anchors. The existing website remains a static site; no package installation, backend, authentication, database, or hosting configuration is added to it.

All demo records are synthetic. Edits are browser-memory state, reset on reload, and never contact customers, send email, charge a payment method, or write to a service. CSV buttons generate actual, clearly labeled synthetic downloads.

The entire sidebar is constructed exactly once in `demo.js`. It has the same 17 links, order, dimensions, spacing, icons, and CSS on every view. Navigation changes only `aria-current="page"` and the corresponding active styling. Its actual DOM nodes survive page switches. Tablet retains the sidebar; mobile uses the same sidebar in an accessible drawer with backdrop, Escape close, and inert content while closed.

## Exact routes

One physical HTML route uses client-side hash navigation. No nested-directory rewrites are needed. The route with no hash opens Owner Dashboard.

| View                                                         | Exact URL path                                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Owner Dashboard — anchor                                     | `/propel-contractor-suite/demo/` or `/propel-contractor-suite/demo/#dashboard` |
| Digital Blueprint / Industry Showcase — anchor               | `/propel-contractor-suite/demo/#industry-showcase`                             |
| Connected Business Story — anchor                            | `/propel-contractor-suite/demo/#connected-business-story`                      |
| Leads & CRM                                                  | `/propel-contractor-suite/demo/#leads-crm`                                     |
| Estimates & Proposals                                        | `/propel-contractor-suite/demo/#estimates-proposals`                           |
| Jobs & Projects                                              | `/propel-contractor-suite/demo/#jobs-projects`                                 |
| One Job — Completed Lifecycle — anchor                       | `/propel-contractor-suite/demo/#job-lifecycle`                                 |
| Scheduling & Crews                                           | `/propel-contractor-suite/demo/#scheduling-crews`                              |
| Materials & Purchasing                                       | `/propel-contractor-suite/demo/#materials-purchasing`                          |
| Receipts & Expenses / Material Receipt Intelligence — anchor | `/propel-contractor-suite/demo/#material-receipt-intelligence`                 |
| Labor & Time Tracking                                        | `/propel-contractor-suite/demo/#labor-time-tracking`                           |
| Profit Guard & Labor Tracking — anchor                       | `/propel-contractor-suite/demo/#profit-guard-labor-tracking`                   |
| Change Orders                                                | `/propel-contractor-suite/demo/#change-orders`                                 |
| Invoicing & Payments                                         | `/propel-contractor-suite/demo/#invoicing-payments`                            |
| Property Passport                                            | `/propel-contractor-suite/demo/#property-passport`                             |
| Service & Maintenance                                        | `/propel-contractor-suite/demo/#service-maintenance`                           |
| Reporting & Tax Prep — anchor                                | `/propel-contractor-suite/demo/#financial-reporting-tax-prep`                  |
| Team & Subcontractors                                        | `/propel-contractor-suite/demo/#team-subcontractors`                           |
| Settings                                                     | `/propel-contractor-suite/demo/#settings`                                      |

The Connected Business Story highlights Digital Blueprint. The completed lifecycle highlights Jobs & Projects. All other views highlight their own module. No unrelated modules share a placeholder screen.

## Demo-button hookup

Only the landing page hero's primary Demo button changes: its destination is `/propel-contractor-suite/demo/`, and its label is **Explore the Demo**. Its existing CSS classes and presentation are retained. The navigation and mobile **Request a Demo** links still target the existing `#request-demo` inquiry form. The secondary Explore the Platform link, form, submission behavior, header, footer, shared scripts, and other site sections are untouched.

## Exact files changed

Modified:

- `propel-contractor-suite/index.html` — hero Demo button destination and label only.

Added application files:

- `propel-contractor-suite/demo/index.html` — shared application shell.
- `propel-contractor-suite/demo/demo.css` — isolated responsive demo styling.
- `propel-contractor-suite/demo/demo.js` — shared sidebar, routing, dialogs, synthetic state, search, common actions, and CSV exports.
- `propel-contractor-suite/demo/anchors.js` — seven approved anchor experiences and related interactions.
- `propel-contractor-suite/demo/modules.js` — module-specific supporting views, tabs, and sample workflows.

Added exact-source artwork and provenance:

- `propel-contractor-suite/demo/assets/README.md`
- `propel-contractor-suite/demo/assets/approved-industry-showcase.webp`
- `propel-contractor-suite/demo/assets/anderson-residence.webp`
- `propel-contractor-suite/demo/assets/thompson-residence.webp`
- `propel-contractor-suite/demo/assets/connected-website.webp`
- `propel-contractor-suite/demo/assets/industry-roofing.webp`
- `propel-contractor-suite/demo/assets/industry-gutters.webp`
- `propel-contractor-suite/demo/assets/industry-power-washing.webp`
- `propel-contractor-suite/demo/assets/industry-handyman.webp`
- `propel-contractor-suite/demo/assets/industry-remodeling.webp`
- `propel-contractor-suite/demo/assets/industry-construction.webp`
- `propel-contractor-suite/demo/assets/industry-decks-fences.webp`

Added verification files:

- `qa/propel-demo/check-demo.cjs`
- `qa/propel-demo/check-accessibility.cjs`
- `qa/propel-demo/README.md`

The approved logo and application icon are reused from existing assets without modification. No other existing file is changed.

## Responsive and browser verification

`check-demo.cjs` checks all 19 views at:

- 1672 × 941 — the approved screenshots' original dimensions.
- 1440 × 900 — laptop.
- 1024 × 1366 — large tablet.
- 768 × 1024 — tablet.
- 390 × 844 — phone.
- 320 × 740 — narrow phone.

The 114 view checks cover document overflow, broken images, clipped headings and metric text, cards outside the viewport, sidebar/content overlap, exactly one active navigation item, and identical sidebar geometry across screens. It also verifies sidebar DOM identity through all module clicks, every internal tab on desktop and mobile, employee and 1099 hours tied to jobs, lead stage advancement and follow-up tasks, record creation forms, Cancel behavior, expense classification, return credits, workspace save/reset, idempotent receipt decisions, generated change orders, invoice payment balances, CSV contents, search, CTA routing, the mobile drawer, and the industry carousel. WebKit independently checks all seven anchors at 390 × 844.

`check-accessibility.cjs` runs axe WCAG A/AA checks on all 19 desktop/mobile views plus the new-lead dialog at both sizes. Keyboard checks include tab-arrow navigation, Escape dismissal, drawer access, and search shortcuts. Horizontal scrolling is confined to deliberately scrollable data tables, timelines, workflow rows, and the mobile industry carousel.

Browser captures and JSON results are saved outside the published website in `/private/tmp/propel-demo-qa/`. Existing landing-page regression artifacts are in `/private/tmp/propel-v73-qa/`.

Syntax checks use `node --check` on all new JavaScript and QA scripts. Source formatting and `git diff --check` are also checked. There is no framework compilation step: the production artifact is the checked-in static HTML, CSS, JavaScript, and WebP assets.

## Completed check results

- **114/114 responsive view checks passed** across all six sizes; no document overflow, broken images, clipped headings/metrics, outside cards, or sidebar/content overlap.
- **52/52 desktop and 52/52 mobile tab checks passed.** Sidebar geometry and DOM identity stayed consistent across every module.
- **All seven WebKit anchor checks passed** at 390 × 844.
- **40/40 axe view/dialog checks passed**, with zero reported WCAG A/AA violations.
- **5/5 existing landing-page regression cases passed**, including native form payload/redirect verification through interception, mobile navigation, sticky request CTA, and privacy/thank-you pages.
- Record creation, Cancel, lead progression/follow-up, employee and 1099 job hours, receipt-decision idempotence, generated change orders, invoice balances, expense classification, returns, CSV contents, workspace save/reset, carousel navigation, and mobile drawer checks passed.
- Additional settings checks passed for primary-trade persistence and long business names at all six viewport widths.
- JavaScript syntax, source formatting, and `git diff --check` passed. There were **zero browser JavaScript errors and zero failed HTTP requests** in the demo suite.
- Visual inspection covered the supplied references and desktop/mobile anchor captures. This verifies practical fidelity and usable responsive reflow; no pixel-difference equivalence is claimed.

## Reproduce

Serve the repository with a static HTTP server on port 8765. Provide externally installed Playwright and axe-core through `NODE_PATH`, then run:

```sh
node qa/propel-demo/check-demo.cjs
node qa/propel-demo/check-accessibility.cjs
node qa/propel-v73/check-page.cjs
```

`PROPEL_QA_URL` can change the origin, and `PROPEL_QA_OUT` can change the output directory. The existing landing-page form test intercepts its POST locally; it creates no actual lead and sends no notification.

## Deviations from the locked mockups

- The approved green/mint/dark-navy system, exact Propel logo, card treatment, anchor compositions, section hierarchy, and core stories are retained. Native HTML/CSS/SVG reproductions approximate the screenshot typography, fine lighting, gradient contours, icon geometry, and individual spacing; this is not a pixel-identical screenshot viewer.
- The requested single 17-item sidebar replaces the inconsistent sidebar menus in the individual reference images. Supporting pages and internal tabs follow the approved visual language, as authorized by the scope amendment.
- Demo labels, a Demo User profile, explicit synthetic-data text, navigation between the anchor stories, keyboard/touch controls, and responsive reflow are added so prospects can use the showcase without mistaking it for a live tenant.
- The initial desktop industry collage uses the exact supplied artwork. Selected industry previews and mobile swipe cards use native text and controls over clean, corresponding source-photo crops. The small source photos retain their original resolution; no substitute photographs are introduced.
- A few contradictory source numbers are reconciled. The six planned Anderson receipt lines total $1,457; adding $142.97 of extras yields $1,599.97. Its illustrative tax is zero. Estimate costs plus $3,121 profit total $18,420; absorbing the extras leaves $2,978.03. Profit Guard's estimated costs total $261,530 and its forecast costs total $267,530, preserving the $62,470 forecast profit and 18.9% margin; the category variances now sum to $6,000. The dashboard gross-profit figure reconciles to revenue less materials/expenses and labor. Employee/1099 and subcontractor figures explicitly identify their inclusion relationships. The completed job adds 4.5 hours of included supervision so 112.5 total hours reconcile. These changes preserve the financial story while making the synthetic analysis trustworthy.
- Large aggregate dashboard/report totals describe the overview example; detailed module lists are a smaller explorable sample. No production claims, real-time provider feeds, or live customer accounts are implied.

## Delivery state

Production destination: `https://eaglevision.biz/propel-contractor-suite/demo/`, using the existing Eagle Vision Capital Systems Netlify project and its production `main` branch. Deployment is scoped to the demo files and the landing-page hero button. Run the same checks against `PROPEL_QA_URL=https://eaglevision.biz` to verify a published version. Live deployment evidence is collected separately from the application source.

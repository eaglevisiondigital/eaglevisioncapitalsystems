/* Run with NODE_PATH pointing to Playwright; all output artifacts stay outside the website. */
const { chromium, webkit } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const base = process.env.PROPEL_QA_URL || "http://127.0.0.1:8765";
const out = process.env.PROPEL_QA_OUT || "/private/tmp/propel-demo-qa";
fs.mkdirSync(out, { recursive: true });
const routes = [
  "dashboard",
  "industry-showcase",
  "connected-business-story",
  "leads-crm",
  "estimates-proposals",
  "jobs-projects",
  "job-lifecycle",
  "scheduling-crews",
  "materials-purchasing",
  "material-receipt-intelligence",
  "labor-time-tracking",
  "profit-guard-labor-tracking",
  "change-orders",
  "invoicing-payments",
  "property-passport",
  "service-maintenance",
  "financial-reporting-tax-prep",
  "team-subcontractors",
  "settings",
];
const anchors = [
  "dashboard",
  "industry-showcase",
  "connected-business-story",
  "material-receipt-intelligence",
  "profit-guard-labor-tracking",
  "financial-reporting-tax-prep",
  "job-lifecycle",
];
const results = [],
  errors = [],
  badResponses = [],
  activeBrowsers = [];
function monitor(p) {
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("response", (r) => {
    if (r.status() >= 400) badResponses.push(r.url() + " " + r.status());
  });
}
async function go(p, route) {
  await p.goto(base + "/propel-contractor-suite/demo/#" + route, {
    waitUntil: "networkidle",
  });
  await p.waitForFunction((r) => window.PropelDemo?.route === r, route);
  await p.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
  });
}
async function layout(p) {
  return p.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    brokenImages: [...document.images]
      .filter(
        (i) =>
          getComputedStyle(i).display !== "none" &&
          (!i.complete || !i.naturalWidth),
      )
      .map((i) => i.src),
    heading: document.querySelector("main h1")?.textContent,
    clippedText: [
      ...document.querySelectorAll(
        "main h1,main h2,main h3,.nav-link span,.metric .value,.metric .label",
      ),
    ]
      .filter((e) => {
        let r = e.getBoundingClientRect();
        return r.width && e.scrollWidth > e.clientWidth + 2;
      })
      .map((e) => e.textContent),
    outsideCards: [...document.querySelectorAll("main .card,main .metric")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.left < -1 || r.right > innerWidth + 1;
      })
      .map((e) => e.className),
    active: document.querySelectorAll("#module-nav [aria-current=page]").length,
    nav: [...document.querySelectorAll("#module-nav a")].map((e) => {
      const r = e.getBoundingClientRect(),
        s = getComputedStyle(e);
      return {
        label: e.textContent,
        href: e.getAttribute("href"),
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
        padding: s.padding,
        font: s.fontSize,
        gap: s.gap,
      };
    }),
    overlap:
      innerWidth > 760 &&
      document.querySelector("main").getBoundingClientRect().left <
        document.querySelector(".sidebar").getBoundingClientRect().right - 1,
  }));
}
(async () => {
  const browser = await chromium.launch({ headless: true });
  activeBrowsers.push(browser);
  for (const [width, height] of [
    [1672, 941],
    [1440, 900],
    [1024, 1366],
    [768, 1024],
    [390, 844],
    [320, 740],
  ]) {
    const p = await browser.newPage({ viewport: { width, height } });
    monitor(p);
    let navBaseline;
    for (const route of routes) {
      await go(p, route);
      const l = await layout(p);
      const signature = JSON.stringify(l.nav);
      if (!navBaseline) navBaseline = signature;
      const pass =
        l.scrollWidth === width &&
        !l.brokenImages.length &&
        !l.clippedText.length &&
        !l.outsideCards.length &&
        l.active === 1 &&
        !l.overlap &&
        signature === navBaseline &&
        !!l.heading;
      results.push({
        viewport: `${width}x${height}`,
        route,
        pass,
        ...l,
        sidebarConsistent: signature === navBaseline,
      });
      if (!pass)
        console.log(
          "LAYOUT FAIL",
          width,
          route,
          JSON.stringify({
            ...l,
            nav: undefined,
            sidebarConsistent: signature === navBaseline,
          }),
        );
      if (anchors.includes(route) && [1672, 1024, 390].includes(width))
        await p.screenshot({
          path: path.join(out, `${width}-${route}.png`),
          fullPage: true,
        });
    }
    console.log("VIEWPORT", width, "checked", routes.length, "views");
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  monitor(p);
  // Every internal view is real and switches content without altering the sidebar.
  let tabCount = 0;
  for (const route of routes) {
    await go(p, route);
    const selectors = await p
      .locator("[data-tab]")
      .evaluateAll((es) => es.map((e) => e.dataset.tab));
    for (const selector of selectors) {
      await p.locator(`[data-tab="${selector}"]`).click();
      await assert.equal(
        await p
          .locator(`[data-tab="${selector}"]`)
          .getAttribute("aria-selected"),
        "true",
      );
      assert.ok((await p.locator("main").innerText()).length > 300);
      const l = await layout(p);
      assert.equal(l.scrollWidth, 1440, route + " " + selector + " overflow");
      assert.deepEqual(l.clippedText, [], route + " " + selector + " clipping");
      tabCount++;
    }
  }
  console.log("TABS", tabCount, "passed");
  // Sidebar links all resolve to their own module, and the same DOM nodes survive navigation.
  await go(p, "dashboard");
  await p.evaluate(
    () =>
      (window.originalNav = [...document.querySelectorAll("#module-nav a")]),
  );
  for (const route of routes.filter(
    (r) => !["connected-business-story", "job-lifecycle"].includes(r),
  )) {
    await p.locator(`#module-nav a[href="#${route}"]`).click();
    await p.waitForFunction((r) => PropelDemo.route === r, route);
    assert.equal(
      await p.evaluate(() =>
        window.originalNav.every(
          (e, i) => e === document.querySelectorAll("#module-nav a")[i],
        ),
      ),
      true,
    );
    assert.equal(
      await p.locator("#module-nav [aria-current=page]").getAttribute("href"),
      "#" + route,
    );
  }
  // New lead, stage movement, and follow-up task.
  await p.evaluate(() => PropelDemo.actions["confirm-reset"]());
  await go(p, "leads-crm");
  await p
    .getByRole("button", { name: "Add Demo Lead", exact: true })
    .first()
    .click();
  await p.locator("[name=name]").fill("Synthetic QA Contact");
  await p.locator("[name=project]").fill("QA Roof Project");
  await p
    .getByRole("button", { name: "Save demo record", exact: true })
    .click();
  await p
    .getByRole("button", { name: "Synthetic QA Contact", exact: true })
    .click();
  await p.getByRole("button", { name: "Move to next stage" }).click();
  await p
    .getByRole("button", { name: "Synthetic QA Contact", exact: true })
    .click();
  assert.ok(
    (await p.locator("#dialog-body").innerText()).includes("Qualified"),
  );
  await p.getByRole("button", { name: "Create follow-up task" }).click();
  assert.ok(
    (await p.locator("main").innerText()).includes(
      "Follow up with Synthetic QA Contact",
    ),
  );
  // Record a job-specific employee time entry, including visible totals.
  await go(p, "labor-time-tracking");
  const before = await p.evaluate(() => PropelDemo.data.employees[0].actual);
  await p
    .getByRole("button", { name: "Log Time", exact: true })
    .first()
    .click();
  await p.locator("[name=name]").selectOption("Mike Reynolds");
  await p.locator("[name=job]").selectOption("RM-1047");
  await p.locator("[name=hours]").fill("2");
  await p
    .getByRole("button", { name: "Save demo record", exact: true })
    .click();
  assert.equal(
    await p.evaluate(() => PropelDemo.data.employees[0].actual),
    before + 2,
  );
  assert.ok((await p.locator("main").innerText()).includes("2.0"));
  // Unplanned receipt decision creates exactly one draft and remains idempotent.
  await go(p, "material-receipt-intelligence");
  for (let i = 0; i < 2; i++) {
    await p
      .getByRole("button", { name: "Create Change Order", exact: true })
      .click();
    await p
      .getByRole("button", { name: "Apply demo decision", exact: true })
      .click();
  }
  assert.equal(
    await p.evaluate(
      () => PropelDemo.data.changes.filter((c) => c.id === "CO-3024-01").length,
    ),
    1,
  );
  await p.locator('#module-nav a[href="#change-orders"]').click();
  await p.waitForFunction(() => PropelDemo.route === "change-orders");
  assert.ok((await p.locator("main").innerText()).includes("CO-3024-01"));
  await p.getByRole("button", { name: "CO-3024-01", exact: true }).click();
  await p
    .getByRole("button", { name: "Mark demo approved", exact: true })
    .click();
  // Invoice payment adjusts the balance without a network transaction.
  await go(p, "invoicing-payments");
  await p.getByRole("button", { name: "INV-5295", exact: true }).click();
  await p
    .getByRole("button", { name: "Record demo payment", exact: true })
    .click();
  await p.locator("[name=amount]").fill("100");
  await p
    .getByRole("button", { name: "Record demo payment", exact: true })
    .click();
  assert.equal(
    await p.evaluate(
      () => PropelDemo.data.invoices.find((i) => i.id === "INV-5295").paid,
    ),
    100,
  );
  // Creation forms must save visible module records; Cancel must never submit.
  await go(p, "estimates-proposals");
  const estimatesBefore = await p.evaluate(
    () => PropelDemo.data.estimates.length,
  );
  await p.locator('[data-action="new-estimate"]').first().click();
  await p.getByRole("button", { name: "Cancel", exact: true }).click();
  assert.equal(
    await p.evaluate(() => PropelDemo.data.estimates.length),
    estimatesBefore,
  );
  await p.locator('[data-action="new-estimate"]').first().click();
  await p
    .getByRole("button", { name: "Save demo record", exact: true })
    .click();
  assert.equal(
    await p.evaluate(() => PropelDemo.data.estimates.length),
    estimatesBefore + 1,
  );
  const forms = [
    ["scheduling-crews", "new-schedule", "assignments"],
    ["materials-purchasing", "new-purchase", "purchases"],
    ["change-orders", "new-change", "changes"],
    ["invoicing-payments", "new-invoice", "invoices"],
    ["service-maintenance", "new-service", "services"],
    ["team-subcontractors", "new-team", "employees"],
  ];
  for (const [route, action, collection] of forms) {
    await go(p, route);
    const count = await p.evaluate(
      (c) => (PropelDemo.data[c] || PropelDemo.state[c] || []).length,
      collection,
    );
    await p.locator(`[data-action="${action}"]`).first().click();
    await p
      .getByRole("button", { name: "Save demo record", exact: true })
      .click();
    assert.equal(
      await p.evaluate(
        (c) => (PropelDemo.data[c] || PropelDemo.state[c] || []).length,
        collection,
      ),
      count + 1,
      action + " did not save a record",
    );
  }
  await go(p, "materials-purchasing");
  await p.locator('[data-tab="materials-purchasing:returns"]').click();
  await p.locator('[data-action="new-return"]').click();
  await p
    .getByRole("button", { name: "Save demo record", exact: true })
    .click();
  assert.equal(await p.evaluate(() => PropelDemo.data.returns.length), 2);
  await go(p, "material-receipt-intelligence");
  await p.locator('[data-tab="receipts:expenses"]').click();
  await p.locator('[data-action="classify-expense"]').click();
  await p
    .getByRole("button", { name: "Save demo record", exact: true })
    .click();
  assert.ok(
    (await p.locator("main").innerText()).includes("Jobsite equipment rental"),
  );
  await go(p, "labor-time-tracking");
  const subBefore = await p.evaluate(
    () => PropelDemo.data.subcontractors[0].actual,
  );
  await p.locator('[data-action="new-time"]').first().click();
  await p.locator("[name=name]").selectOption("Elite Electric, LLC");
  await p.locator("[name=job]").selectOption("RM-1047");
  await p.locator("[name=hours]").fill("3");
  await p
    .getByRole("button", { name: "Save demo record", exact: true })
    .click();
  assert.equal(
    await p.evaluate(() => PropelDemo.data.subcontractors[0].actual),
    subBefore + 3,
  );
  await go(p, "settings");
  await p.locator("[name=business]").fill("Synthetic QA Workspace");
  await p.getByRole("button", { name: "Save Demo Workspace" }).click();
  assert.ok(
    (await p.locator(".workspace-button").innerText()).includes(
      "Synthetic QA Workspace",
    ),
  );
  await p.evaluate(() => PropelDemo.actions["confirm-reset"]());
  assert.ok(
    (await p.locator(".workspace-button").innerText()).includes("Saul 2 Paul"),
  );
  assert.equal(await p.evaluate(() => PropelDemo.data.estimates.length), 5);
  console.log(
    "CREATION FORMS, Cancel, employee/1099 hours, classification, returns, workspace reset passed",
  );
  // Financial report is a real CSV download.
  await go(p, "financial-reporting-tax-prep");
  const downloadPromise = p.waitForEvent("download");
  await p.locator('[data-action="export-report:tax"]').click();
  const download = await downloadPromise;
  assert.ok(download.suggestedFilename().endsWith(".csv"));
  await download.saveAs(path.join(out, "sample-tax-package.csv"));
  assert.match(
    fs.readFileSync(path.join(out, "sample-tax-package.csv"), "utf8"),
    /SYNTHETIC DEMO/,
  );
  // Global search and return navigation.
  await p.locator("#demo-search").fill("Sarah");
  assert.ok(await p.locator("#search-results").isVisible());
  assert.ok(
    (await p.locator("#search-results").innerText()).includes("Sarah Mitchell"),
  );
  await p.keyboard.press("Escape");
  assert.equal(await p.locator("#search-results").isVisible(), false);
  // Hero CTA hookup; the request form CTAs retain their behavior.
  await p.goto(base + "/propel-contractor-suite/");
  assert.equal(
    await p.locator(".pcs-hero .pcs-button-primary").getAttribute("href"),
    "/propel-contractor-suite/demo/",
  );
  assert.equal(
    await p.locator(".pcs-nav-cta").getAttribute("href"),
    "#request-demo",
  );
  assert.equal(
    await p.locator(".pcs-mobile-cta").getAttribute("href"),
    "#request-demo",
  );
  await p.locator(".pcs-hero .pcs-button-primary").click();
  assert.match(p.url(), /\/propel-contractor-suite\/demo\/$/);
  // Mobile drawer, Escape, and industry carousel.
  await p.setViewportSize({ width: 390, height: 844 });
  await go(p, "dashboard");
  assert.equal(await p.locator(".sidebar").evaluate((e) => e.inert), true);
  await p.getByRole("button", { name: "Open demo navigation" }).click();
  assert.equal(
    await p.locator(".menu-toggle").getAttribute("aria-expanded"),
    "true",
  );
  await p.keyboard.press("Escape");
  assert.equal(
    await p.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  await p.getByRole("button", { name: "Open demo navigation" }).click();
  await p.locator('#module-nav a[href="#industry-showcase"]').click();
  await p.waitForFunction(() => PropelDemo.route === "industry-showcase");
  assert.match(p.url(), /#industry-showcase$/);
  assert.equal(
    await p.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  await p.getByRole("tab", { name: "Decks & Fences", exact: true }).click();
  await p.waitForTimeout(500);
  assert.ok(
    await p
      .locator(".mobile-industry-cards")
      .evaluate((e) => e.scrollLeft > 500),
  );
  await p.screenshot({
    path: path.join(out, "390-industry-carousel-last.png"),
    fullPage: true,
  });
  // Mobile supporting tabs also fit the viewport.
  let mobileTabs = 0;
  for (const route of routes) {
    await go(p, route);
    const selectors = await p
      .locator("[data-tab]")
      .evaluateAll((es) => es.map((e) => e.dataset.tab));
    for (const selector of selectors) {
      await p.locator(`[data-tab="${selector}"]`).click();
      const l = await layout(p);
      assert.equal(
        l.scrollWidth,
        390,
        route + " " + selector + " mobile overflow",
      );
      assert.deepEqual(
        l.clippedText,
        [],
        route + " " + selector + " mobile clipping",
      );
      mobileTabs++;
    }
  }
  console.log("INTERACTIONS passed; mobile tabs", mobileTabs);
  await p.close();
  await browser.close();
  // Separate WebKit engine for iPhone-sized smoke checks.
  const safari = await webkit.launch({ headless: true });
  activeBrowsers.push(safari);
  const sp = await safari.newPage({ viewport: { width: 390, height: 844 } });
  monitor(sp);
  for (const route of anchors) {
    await go(sp, route);
    const l = await layout(sp);
    assert.equal(l.scrollWidth, 390, "WebKit " + route + " overflow");
    assert.deepEqual(l.clippedText, [], "WebKit " + route + " clipping");
  }
  await safari.close();
  console.log("WEBKIT 7 anchors passed");
  fs.writeFileSync(
    path.join(out, "results.json"),
    JSON.stringify(
      { results, tabCount, mobileTabs, errors, badResponses },
      null,
      2,
    ),
  );
  assert.deepEqual(errors, [], "browser errors");
  assert.deepEqual(badResponses, [], "failed HTTP responses");
  assert.equal(results.filter((r) => !r.pass).length, 0, "responsive failures");
  console.log(
    "PASS",
    results.length,
    "responsive views;",
    tabCount + mobileTabs,
    "tabs; sidebar DOM identity; workflows; exports; CTA; mobile drawer; WebKit.",
  );
})().catch(async (e) => {
  await Promise.all(activeBrowsers.map((b) => b.close().catch(() => {})));
  fs.writeFileSync(
    path.join(out, "results.json"),
    JSON.stringify(
      { results, errors, badResponses, error: String(e.stack) },
      null,
      2,
    ),
  );
  console.error(e);
  process.exitCode = 1;
});

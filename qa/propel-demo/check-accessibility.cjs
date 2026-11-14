/* Supply playwright and axe-core through NODE_PATH; no site dependencies are installed. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const base = process.env.PROPEL_QA_URL || "http://127.0.0.1:8765";
const out = process.env.PROPEL_QA_OUT || "/private/tmp/propel-demo-qa";
const axePath = require.resolve("axe-core/axe.min.js");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.addInitScript(() =>
        sessionStorage.setItem(
          "pcs-demo-walkthrough-visit-v1",
          JSON.stringify({ views: [], offered: true, submitted: false }),
        ),
      );
      await page.goto(base + "/propel-contractor-suite/demo/", {
        waitUntil: "networkidle",
      });
      const routes = await page.evaluate(() =>
        Object.keys(PropelDemo.renderers),
      );
      for (const route of routes) {
        await page.goto(base + "/propel-contractor-suite/demo/#" + route);
        await page.waitForFunction((r) => PropelDemo.route === r, route);
        await page.addScriptTag({ path: axePath });
        const result = await page.evaluate(() =>
          axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          }),
        );
        results.push({
          width,
          route,
          violations: result.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({
              html: n.html,
              summary: n.failureSummary,
            })),
          })),
        });
      }
      await page.goto(base + "/propel-contractor-suite/demo/#leads-crm");
      await page.waitForFunction(() => PropelDemo.route === "leads-crm");
      await page.locator('[data-action="new-lead"]').first().click();
      await page.addScriptTag({ path: axePath });
      const form = await page.evaluate(() =>
        axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        }),
      );
      results.push({
        width,
        route: "new-lead-dialog",
        violations: form.violations,
      });
      await page
        .getByRole("button", { name: "Close dialog", exact: true })
        .click();
      await page
        .locator(width <= 760 ? ".lead-mobile-cta" : ".lead-sidebar-cta")
        .click();
      const walkthrough = await page.evaluate(() =>
        axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        }),
      );
      results.push({
        width,
        route: "real-walkthrough-dialog",
        violations: walkthrough.violations,
      });
      await page.close();
    }
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(
      path.join(out, "accessibility.json"),
      JSON.stringify(results, null, 2),
    );
    for (const r of results)
      if (r.violations.length) console.log(JSON.stringify(r));
    assert.equal(
      results.filter((r) => r.violations.length).length,
      0,
      "Accessibility violations",
    );
    console.log(
      "PASS: axe WCAG A/AA checks on " +
        results.length +
        " desktop/mobile views and dialogs.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

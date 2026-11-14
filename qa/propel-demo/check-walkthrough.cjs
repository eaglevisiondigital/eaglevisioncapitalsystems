/* Real-form POSTs are intercepted: no lead, email, or phone contact is created. */
const { chromium, webkit } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.PROPEL_QA_URL || "http://127.0.0.1:8765";
const out = process.env.PROPEL_QA_OUT || "/private/tmp/propel-walkthrough-qa";
fs.mkdirSync(out, { recursive: true });
const storageKey = "pcs-demo-walkthrough-visit-v1";
async function route(page, view) {
  await page.goto(base + "/propel-contractor-suite/demo/#" + view, {
    waitUntil: "networkidle",
  });
  await page.waitForFunction((v) => window.PropelDemo?.route === v, view);
}
(async () => {
  const results = [];
  for (const [engine, width, height] of [
    [chromium, 1440, 900],
    [chromium, 390, 844],
    [webkit, 320, 740],
  ]) {
    const browser = await engine.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width, height } });
      const errors = [],
        posts = [];
      page.on("pageerror", (e) => errors.push(e.message));
      let rejectNext = true;
      await page.route(
        "**/propel-contractor-suite/demo/",
        async (intercepted) => {
          if (intercepted.request().method() !== "POST")
            return intercepted.continue();
          posts.push(
            Object.fromEntries(
              new URLSearchParams(intercepted.request().postData()),
            ),
          );
          if (rejectNext) {
            rejectNext = false;
            return intercepted.fulfill({
              status: 503,
              body: "Simulated delivery failure",
            });
          }
          return intercepted.fulfill({
            status: 200,
            body: "Accepted in intercepted browser test",
          });
        },
      );
      const dialog = page.locator("#walkthrough-dialog"),
        form = page.locator("#walkthrough-form");
      await route(page, "dashboard");
      assert.equal(
        await dialog.isVisible(),
        false,
        "The dashboard must open without a gate",
      );
      await route(page, "industry-showcase");
      await page.evaluate(() => PropelDemo.render());
      await page.waitForTimeout(1950);
      assert.equal(
        await dialog.isVisible(),
        false,
        "Two unique screens or rerendering must not trigger the prompt",
      );
      await route(page, "connected-business-story");
      await dialog.waitFor({ state: "visible" });
      assert.equal(
        await form.locator('[name="first_name"]').evaluate((e) => e.required),
        true,
      );
      assert.equal(
        await form.locator('[name="email"]').evaluate((e) => e.required),
        true,
      );
      assert.equal(
        await form.locator('[name="phone"]').evaluate((e) => e.required),
        false,
      );
      assert.equal(
        await form
          .locator('[name="business_name"]')
          .evaluate((e) => e.required),
        false,
      );
      assert.equal(
        await form.locator('[name="phone"]').getAttribute("type"),
        "tel",
      );
      await dialog
        .getByRole("button", { name: "Continue Exploring", exact: true })
        .click();
      assert.equal(
        await page.evaluate(() => PropelDemo.route),
        "connected-business-story",
      );
      await route(page, "profit-guard-labor-tracking");
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(1950);
      assert.equal(
        await dialog.isVisible(),
        false,
        "A dismissed prompt must not repeat in the same visit",
      );
      await page
        .locator(width <= 760 ? ".lead-mobile-cta" : ".lead-sidebar-cta")
        .click();
      await dialog.waitFor({ state: "visible" });
      await page.keyboard.press("Escape");
      assert.equal(await dialog.isVisible(), false);
      await page
        .locator(width <= 760 ? ".lead-mobile-cta" : ".lead-sidebar-cta")
        .click();
      await dialog
        .getByRole("button", {
          name: "Request a Personalized Walkthrough",
          exact: true,
        })
        .click();
      assert.equal(posts.length, 0, "Empty required fields must not submit");
      await form.locator('[name="first_name"]').fill("   ");
      await form.locator('[name="email"]').fill("browser-qa@example.com");
      await dialog
        .getByRole("button", {
          name: "Request a Personalized Walkthrough",
          exact: true,
        })
        .click();
      assert.equal(
        posts.length,
        0,
        "Whitespace-only first name must not submit",
      );
      await form.locator('[name="first_name"]').fill("Browser QA");
      const phone = width === 390 ? "+1 (850) 555-0142" : "";
      const business = width === 390 ? "Sample Contractor" : "";
      await form.locator('[name="phone"]').fill(phone);
      await form.locator('[name="business_name"]').fill(business);
      assert.equal(
        await form.evaluate((e) => e.checkValidity()),
        true,
        "Phone and business name must be optional",
      );
      await page.screenshot({
        path: path.join(out, `${width}-walkthrough.png`),
        fullPage: true,
      });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      const bounds = await dialog.boundingBox();
      assert.ok(
        bounds.x >= 0 &&
          bounds.x + bounds.width <= width &&
          bounds.y >= 0 &&
          bounds.y + bounds.height <= height + 1,
      );
      const sampleLeadCount = await page.evaluate(
        () => PropelDemo.data.leads.length,
      );
      await dialog
        .getByRole("button", {
          name: "Request a Personalized Walkthrough",
          exact: true,
        })
        .click();
      await page.locator("#walkthrough-error").waitFor({ state: "visible" });
      assert.equal(
        await form.locator('[name="first_name"]').inputValue(),
        "Browser QA",
        "Failures must retain input for retry",
      );
      assert.equal(await form.locator('[name="phone"]').inputValue(), phone);
      await dialog
        .getByRole("button", {
          name: "Request a Personalized Walkthrough",
          exact: true,
        })
        .click();
      await page.locator("#walkthrough-success").waitFor({ state: "visible" });
      assert.equal(posts.length, 2);
      const data = posts.at(-1);
      assert.equal(data["form-name"], "propel-contractor-demo-lead");
      assert.equal(data.first_name, "Browser QA");
      assert.equal(data.email, "browser-qa@example.com");
      assert.equal(data.phone, phone);
      assert.equal(data.business_name, business);
      assert.equal(data.demo_view, "profit-guard-labor-tracking");
      assert.equal(data["bot-field"], "");
      assert.ok(Number.isFinite(Date.parse(data.submitted_at)));
      assert.equal(
        await page.evaluate(() => PropelDemo.data.leads.length),
        sampleLeadCount,
        "Real inquiries must stay out of synthetic CRM records",
      );
      const saved = await page.evaluate(
        (key) => sessionStorage.getItem(key),
        storageKey,
      );
      assert.ok(
        !saved.includes("browser-qa@example.com") &&
          !saved.includes("555-0142") &&
          !saved.includes("Sample Contractor"),
        "Do not store inquiry details in session storage",
      );
      assert.equal(
        await form.locator('[name="phone"]').inputValue(),
        "",
        "Clear personal details after successful submission",
      );
      await dialog
        .getByRole("button", { name: "Continue Exploring", exact: true })
        .click();
      await route(page, "settings");
      await page.waitForTimeout(1950);
      assert.equal(await dialog.isVisible(), false);
      assert.deepEqual(errors, []);
      results.push({
        engine: engine === webkit ? "WebKit" : "Chromium",
        viewport: `${width}x${height}`,
        pass: true,
        postsIntercepted: posts.length,
        optionalPhoneIncluded: !!phone,
      });
      console.log(
        "PASS",
        width,
        "prompt timing, skip, optional fields, error/retry, payload, separation, storage, success",
      );
    } finally {
      await browser.close();
    }
  }
  fs.writeFileSync(
    path.join(out, "results.json"),
    JSON.stringify(results, null, 2),
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

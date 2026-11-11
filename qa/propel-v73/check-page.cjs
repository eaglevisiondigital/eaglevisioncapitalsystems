/* Run with NODE_PATH pointing to a Playwright installation. Screenshots are local QA artifacts. */
const { chromium, webkit } = require("playwright");
const fs = require("fs");
const path = require("path");
const base = process.env.PROPEL_QA_URL || "http://127.0.0.1:8765";
const out = process.env.PROPEL_QA_OUT || "/private/tmp/propel-v73-qa";
fs.mkdirSync(out, { recursive: true });
const sizes = [
  [1600, 900],
  [1440, 900],
  [1024, 1366],
  [430, 932],
  [390, 844],
];
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  for (const [width, height] of sizes) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const errors = [];
    const failures = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("response", (r) => {
      if (r.status() >= 400)
        failures.push({ url: r.url(), status: r.status() });
    });
    await page.goto(
      base +
        "/propel-contractor-suite/?utm_source=visual-qa&utm_campaign=approved-v73&fbclid=qa-click",
      { waitUntil: "networkidle" },
    );
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const im of document.images) {
        if (im.loading === "lazy") im.loading = "eager";
        await im.decode().catch(() => {});
      }
    });
    await page.screenshot({
      path: path.join(out, `${width}x${height}.png`),
      fullPage: true,
    });
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      brokenImages: [...document.images]
        .filter((x) => !x.complete || !x.naturalWidth)
        .map((x) => x.src),
      overflowElements: [...document.querySelectorAll("body *")]
        .filter((x) => {
          const r = x.getBoundingClientRect(),
            s = getComputedStyle(x);
          return (
            r.width &&
            s.position !== "absolute" &&
            s.visibility !== "hidden" &&
            (r.right > innerWidth + 1 || r.left < -1)
          );
        })
        .map((x) => ({
          tag: x.tagName,
          cls: x.className?.baseVal || x.className,
        })),
      clippedHeadings: [...document.querySelectorAll("h1,h2,h3")]
        .filter((x) => x.scrollWidth > x.clientWidth + 1)
        .map((x) => x.textContent),
      formFields: [...document.forms["propel-contractor-interest"].elements]
        .filter((x) => x.name)
        .map((x) => x.name),
      logoCount: document.querySelectorAll(
        'img[src*="propel-contractor-suite-approved-v73"]',
      ).length,
      oldLogos: [...document.images]
        .filter((x) => /lockup-v32|kingdom|propel-by-eagle/.test(x.src))
        .map((x) => x.src),
    }));
    const navChecks = [];
    if (width < 900) {
      await page.getByRole("button", { name: /Menu/ }).click();
      if (!(await page.locator("#pcs-main-nav").isVisible()))
        throw Error("Mobile navigation did not open");
      await page.keyboard.press("Escape");
      if (await page.locator("#pcs-main-nav").isVisible())
        throw Error("Escape did not close navigation");
    }
    for (const anchor of [
      "platform",
      "capabilities",
      "profit-guard",
      "passport",
      "ai",
      "request-demo",
    ]) {
      await page.evaluate((a) => {
        document.documentElement.style.scrollBehavior = "auto";
        location.hash = a;
      }, anchor);
      await page.waitForTimeout(80);
      const top = await page
        .locator("#" + anchor)
        .evaluate((e) => Math.round(e.getBoundingClientRect().top));
      const bottom = await page
        .locator(".pcs-header")
        .evaluate((e) => Math.round(e.getBoundingClientRect().bottom));
      navChecks.push({
        anchor,
        top,
        headerBottom: bottom,
        pass: top >= bottom - 1,
      });
    }
    await page.locator('[name="full_name"]').fill("Browser QA");
    await page
      .locator('[name="business_name"]')
      .fill("Propel visual verification");
    await page.locator('[name="email"]').fill("qa@example.com");
    await page.locator('[name="phone"]').fill("8505550100");
    await page
      .locator('[name="primary_trade"]')
      .selectOption({ label: "General Contractor" });
    await page
      .locator('[name="team_size"]')
      .selectOption({ label: "2–5 people" });
    await page
      .locator('[name="biggest_challenge"]')
      .selectOption({ label: "Disconnected systems" });
    await page.locator(".pcs-submit").click();
    const interestValidation = await page
      .locator("#interest-error")
      .isVisible();
    await page.locator('[name="interest"][value="Demo"]').check();
    const payload = await page
      .locator("form")
      .evaluate((f) => Object.fromEntries(new FormData(f)));
    const stickyHidden =
      width < 600
        ? await page.locator(".pcs-mobile-cta").evaluate((x) => x.hidden)
        : true;
    // Validate native POST and success routing without creating a fake lead or sending notifications.
    let submitted = null;
    await page.route("**/propel-contractor-suite/thank-you", async (route) => {
      if (route.request().method() === "POST") {
        submitted = Object.fromEntries(
          new URLSearchParams(route.request().postData()),
        );
        await route.fulfill({
          status: 303,
          headers: { location: "/propel-contractor-suite/thank-you.html" },
          body: "",
        });
      } else await route.continue();
    });
    await page.locator(".pcs-submit").click();
    await page.waitForURL(/\/propel-contractor-suite\/thank-you(?:\.html)?$/);
    const thankYou = await page
      .getByRole("heading", { name: "Your Propel request is in." })
      .isVisible();
    await page.goto(base + "/propel-contractor-suite/privacy.html");
    const privacy = await page
      .getByRole("heading", {
        name: "How we use your Propel Contractor Suite inquiry.",
      })
      .isVisible();
    const result = {
      viewport: `${width}x${height}`,
      layout,
      navChecks,
      errors,
      failures,
      interestValidation,
      stickyHidden,
      payload,
      submissionMatches:
        submitted?.["form-name"] === "propel-contractor-interest" &&
        submitted?.interest === "Demo",
      thankYou,
      privacy,
    };
    result.pass =
      layout.scrollWidth === width &&
      !layout.brokenImages.length &&
      !layout.clippedHeadings.length &&
      !layout.oldLogos.length &&
      layout.logoCount === 2 &&
      navChecks.every((x) => x.pass) &&
      !errors.length &&
      !failures.length &&
      interestValidation &&
      stickyHidden &&
      result.submissionMatches &&
      thankYou &&
      privacy &&
      payload.utm_source === "visual-qa" &&
      payload.fbclid === "qa-click" &&
      !!payload.submitted_at;
    results.push(result);
    console.log(
      JSON.stringify({
        viewport: result.viewport,
        pass: result.pass,
        height: layout.height,
        overflow: layout.scrollWidth,
        clipped: layout.clippedHeadings,
        errors,
        failures,
        nav: navChecks,
        form: result.submissionMatches,
        stickyHidden,
      }),
    );
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(
    path.join(out, "results.json"),
    JSON.stringify(results, null, 2),
  );
  if (results.some((x) => !x.pass)) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

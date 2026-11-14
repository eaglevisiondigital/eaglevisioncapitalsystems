/* Seven approved visual anchors, rendered inside the shared shell. */
(() => {
  "use strict";
  const D = window.PropelDemo;
  const {
    icon,
    card,
    metric,
    header,
    badge,
    btn,
    link,
    table,
    info,
    money,
    esc,
    total,
  } = D;
  let chartId = 0;
  const period = () =>
    '<label><span class="sr-only">Chart period</span><select data-chart-period><option value="6">Last 6 Months</option><option value="3">Last 3 Months</option></select></label>';
  D.revenueChart = (months = 6) => {
    const id = "chart-" + ++chartId,
      labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(-months),
      rev = [130, 168, 145, 202, 228, 272].slice(-months),
      profit = [34, 54, 48, 77, 88, 136].slice(-months),
      w = 550,
      h = 150,
      left = 38,
      bottom = 127,
      step = (w - left - 15) / months,
      bw = step * 0.7;
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Revenue and net profit, ${labels[0]} through December. Revenue rises to 272 thousand dollars; net profit rises to 136 thousand."><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#005c45"/><stop offset="1" stop-color="#13a17e"/></linearGradient></defs>${[0, 50, 100, 150, 200, 250, 300].map((v) => `<line x1="${left}" x2="${w - 5}" y1="${bottom - v * 0.36}" y2="${bottom - v * 0.36}"/><text x="0" y="${bottom - v * 0.36 + 4}">${v ? "$" + v + "K" : "$0"}</text>`).join("")}${rev.map((v, i) => `<rect x="${left + i * step + 7}" y="${bottom - v * 0.36}" width="${bw}" height="${v * 0.36}" fill="url(#${id})"/><text x="${left + i * step + step / 2}" y="145" text-anchor="middle">${labels[i]}</text>`).join("")}<polyline points="${profit.map((v, i) => `${left + i * step + 7 + bw / 2},${bottom - v * 0.36}`).join(" ")}" stroke="#25f4ae" stroke-width="3" fill="none"/>${profit.map((v, i) => `<circle cx="${left + i * step + 7 + bw / 2}" cy="${bottom - v * 0.36}" r="3.8" fill="#24e6a6" stroke="white" stroke-width="1.8"/>`).join("")}</svg><div class="chart-labels"><span class="chart-key">Revenue</span><span class="chart-key line">Net Profit</span></div>`;
  };
  const laborChart = () =>
    `<svg class="chart" viewBox="0 0 360 145" role="img" aria-label="Weekly labor hours: Monday 44, Tuesday 54, Wednesday 47, Thursday 55, Friday 48.5. Total 248.5 hours."><defs><linearGradient id="labor-gradient" x2="0" y2="1"><stop stop-color="#00533f"/><stop offset="1" stop-color="#129e7e"/></linearGradient></defs>${[0, 10, 20, 30, 40, 50, 60].map((v) => `<line x1="30" x2="355" y1="${125 - v * 1.7}" y2="${125 - v * 1.7}"/><text x="0" y="${129 - v * 1.7}">${v}h</text>`).join("")}${[44, 54, 47, 55, 48.5].map((v, i) => `<rect x="${40 + i * 64}" y="${125 - v * 1.7}" width="44" height="${v * 1.7}" fill="url(#labor-gradient)"/><text x="${62 + i * 64}" y="143" text-anchor="middle">${["Mon", "Tue", "Wed", "Thu", "Fri"][i]}</text>`).join("")}</svg>`;
  const marginChart = () =>
    `<svg class="chart" viewBox="0 0 380 190" role="img" aria-label="Gross margin trends from 20.7 percent in July to 18.9 percent in December; estimated margin 20.7 percent."><defs><linearGradient id="margin-fill" x2="0" y2="1"><stop stop-color="#5bf3b7" stop-opacity=".7"/><stop offset="1" stop-color="#a8f3da" stop-opacity=".4"/></linearGradient></defs>${[16, 18, 20, 22, 24].map((v) => `<line x1="46" x2="328" y1="${160 - (v - 16) * 17}" y2="${160 - (v - 16) * 17}"/><text x="0" y="${164 - (v - 16) * 17}">${v}.0%</text>`).join("")}<path d="M46 80 103 91 159 102 216 106 272 114 328 111V160H46Z" fill="url(#margin-fill)"/><path d="M46 80 103 91 159 102 216 106 272 114 328 111" fill="none" stroke="#008358" stroke-width="2.5"/>${[80, 91, 102, 106, 114, 111].map((v, i) => `<circle cx="${46 + i * 56.4}" cy="${v}" r="4.5" fill="#00815b" stroke="white" stroke-width="1.3"/><text x="${46 + i * 56.4}" y="181" text-anchor="middle">${["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}</text>`).join("")}<path d="M46 80H328" stroke="#9ec1b5" stroke-dasharray="5 4"/><rect x="300" y="86" width="75" height="44" rx="8" fill="#00664f"/><text x="337" y="104" text-anchor="middle" style="fill:white;font-weight:bold;font-size:15px">18.9%</text><text x="337" y="120" text-anchor="middle" style="fill:white">Actual</text><text x="287" y="48" style="font-weight:bold">Est. 20.7%</text></svg>`;
  D.renderers.dashboard = () => {
    const priorities = [
      "Review and approve 2 estimates",
      "Confirm material delivery for Job #1047",
      "Check profit margin on 3 active jobs",
      "Send invoice for Job #1039",
      "Crew check-in and schedule updates",
    ];
    const activity = [
      [
        "file",
        "Estimate #E-1084 sent to homeowner",
        "Pinecrest Roof Replacement",
        "8:42 AM",
      ],
      [
        "card",
        "Payment of $12,500 received",
        "Job #1036 — Oak Ridge Remodel",
        "8:17 AM",
      ],
      [
        "hardhat",
        "Crew checked in: Roof Crew A",
        "Job #1043 — Harbor Roof Repair",
        "7:54 AM",
      ],
      [
        "receipt",
        "Receipt added: $1,248.32 (Materials)",
        "Job #1047 — Maple Ave Addition",
        "Yesterday",
      ],
      [
        "users",
        "New lead from website",
        "Gutter replacement — 218 Riverbend Ln",
        "Yesterday",
      ],
    ];
    return (
      header(
        "",
        "Owner Dashboard",
        "Good Morning, Dave! Here’s what’s happening across your business today.",
      ) +
      `<div class="metrics">${metric("Leads", "42", '<b class="positive">↑ +27%</b> vs. last 30 days', "users")}${metric("Estimates", "$384,620", '<b class="positive">↑ +18%</b> vs. last 30 days', "file")}${metric("Active Jobs", "18", "$2,410,320 in contract value", "briefcase")}${metric("Payments (MTD)", "$296,480", '<b class="positive">↑ +22%</b> vs. prior month', "card")}${metric("Profit Risk", "3 Jobs", "Need attention (≤ 10% margin)", "warning")}</div>` +
      `<section class="tax-banner">${icon("layers")}<strong>From day-to-day job tracking to year-end tax prep, Propel keeps your records <em>organized, categorized, and report-ready.</em></strong><div class="mini-benefits"><span>${icon("chart")}Track income and expenses by job</span><span>${icon("receipt")}Capture receipts and material costs</span><span>${icon("circlecheck")}Be report-ready for a bookkeeper or CPA</span></div></section>` +
      `<div class="grid dashboard-mid">${card("Revenue &amp; Profitability " + info, `<div class="mini-stats"><div><strong>$1,284,900</strong><small>Revenue &nbsp; ${badge("+19%")}</small></div><div><strong>$620,200</strong><small>Gross Profit &nbsp; ${badge("48.3%")}</small></div><div><strong>$304,880</strong><small>Net Profit &nbsp; ${badge("23.7%")}</small></div></div><div data-revenue-chart>${D.revenueChart()}</div>`, period())}${card(
        "Job Status Overview " + info,
        `<div class="donut-wrap"><div class="donut" role="img" aria-label="18 active jobs: 10 in progress, 4 scheduled, 2 wrapping up, 2 on hold"><span><strong>18</strong>Active<br />Jobs</span></div><div class="donut-list">${[
          ["In Progress", "10 (56%)"],
          ["Scheduled", "4 (22%)"],
          ["Wrapping Up", "2 (11%)"],
          ["On Hold", "2 (11%)"],
        ]
          .map(
            ([a, b]) =>
              `<div><i class="dot"></i><span class="legend-name">${a}</span><b>${b}</b></div>`,
          )
          .join("")}</div></div>`,
      )}${card("Today’s Priorities", `<div class="priorities">${priorities.map((text, i) => `<label><input type="checkbox" data-priority="${i}" ${D.state.priorities[i] ? "checked" : ""} /><span>${text}</span></label>`).join("")}</div>`)}</div>` +
      `<div class="grid dashboard-bottom">${card("Recent Activity", `<ul class="activity">${activity.map(([i, a, b, t]) => `<li><span class="activity-icon">${icon(i)}</span><div><b>${a}</b><small>${b}</small></div><time>${t}</time></li>`).join("")}</ul>`, `<a class="link-button" href="#leads-crm">View All →</a>`)}${card(
        "Material Price Comparison " + info,
        table(
          ["Material", "Current Price", "Last 30 Days", "Change"],
          [
            [
              "<b>Roofing Shingles (sq)</b>",
              "$112.00",
              "$108.00",
              badge("▲ +3.7%", "danger"),
            ],
            [
              "<b>OSB Sheathing (4×8)</b>",
              "$18.75",
              "$17.90",
              badge("▲ +4.7%", "danger"),
            ],
            [
              "<b>Gutter (10 ft)</b>",
              "$27.50",
              "$27.50",
              badge("— 0.0%", "neutral"),
            ],
            [
              "<b>2×4 Lumber (8 ft)</b>",
              "$4.28",
              "$4.14",
              badge("▲ +3.4%", "danger"),
            ],
            [
              "<b>Exterior Screws (lb)</b>",
              "$9.98",
              "$10.25",
              badge("▼ −2.6%"),
            ],
          ],
        ),
        '<a class="btn small light" href="#materials-purchasing">Key Materials ⌄</a>',
      )}${card("Labor &amp; Hours (This Week) " + info, `<div class="mini-stats"><div><strong>248.5</strong><small>Total Hours ${badge("+6%")}</small></div><div><strong>8</strong><small>Active Crews</small></div><div><strong>$16,640</strong><small>Labor Cost ${badge("+5%")}</small></div></div>${laborChart()}`)}</div>`
    );
  };
  const industries = [
    {
      name: "Roofing",
      brand: "Oak Ridge Roofing",
      headline: "Roofing Solutions Built to Last.",
      copy: "Expert roof installation, replacement, and repair for lasting protection and peace of mind.",
      icon: "roof",
      position: "50%",
    },
    {
      name: "Gutters",
      brand: "Precision Gutters",
      headline: "Gutter Systems That Protect Your Home.",
      copy: "Installation, replacement, and gutter protection that keeps water where it belongs.",
      icon: "gutter",
      position: "25%",
    },
    {
      name: "Power Washing",
      brand: "AquaPro Power Washing",
      headline: "Power Washing That Brings Your Property Back to Life.",
      copy: "Professional exterior cleaning for a cleaner, safer, more beautiful property.",
      icon: "drop",
      position: "14%",
    },
    {
      name: "Handyman / Repairs",
      brand: "Ace Repairs",
      headline: "Handyman & Repair Services You Can Count On.",
      copy: "Fast, reliable fixes and home improvements for every part of your property.",
      icon: "wrench",
      position: "5%",
    },
    {
      name: "Remodeling",
      brand: "HomeCraft Remodeling",
      headline: "Remodeling That Adds Space, Style and Value.",
      copy: "Kitchen, bath, and whole-home remodeling done right.",
      icon: "home",
      position: "74%",
    },
    {
      name: "General Construction",
      brand: "Summit Construction",
      headline: "General Construction for Homes and Businesses.",
      copy: "Reliable construction services from start to finish.",
      icon: "layers",
      position: "86%",
    },
    {
      name: "Decks & Fences",
      brand: "Pinecrest Decks & Fences",
      headline: "Custom Decks and Fences Built for Your Outdoor Life.",
      copy: "Beautiful, durable outdoor spaces that add value and function.",
      icon: "fence",
      position: "98%",
    },
  ];
  function siteContent(i) {
    const s = industries[i];
    return `<div class="site-brand"><b>${icon(s.icon)} ${s.brand}</b><span>Services · Projects · Contact</span></div><div class="site-preview-photo" style="background-image:url('assets/industry-${["roofing", "gutters", "power-washing", "handyman", "remodeling", "construction", "decks-fences"][i]}.webp')"><h2>${i === 0 ? 'Roofing Solutions <span class="mint-text">Built to Last.</span>' : s.headline}</h2><p>${s.copy}</p>${btn("Get a Free Estimate →", "industry-lead:" + i, "mint")}</div><div class="site-trust">✓ Quality Workmanship &nbsp; ✓ Trusted &amp; Insured &nbsp; ✓ Local Experts</div>`;
  }
  D.renderers["industry-showcase"] = () => {
    const hits = [
      { i: 3, left: 1, width: 8 },
      { i: 2, left: 9, width: 9 },
      { i: 1, left: 18, width: 9 },
      { i: 0, left: 28, width: 39 },
      { i: 4, left: 67, width: 10 },
      { i: 5, left: 78, width: 10 },
      { i: 6, left: 89, width: 10 },
    ];
    return `<div class="page-heading blueprint-heading"><div><div class="eyebrow">Digital Blueprint <span class="phase">PHASE 1: INDUSTRY SHOWCASE</span></div><h1>Built for the trades. <span class="mint-text">Designed to impress.</span></h1><p>High-end website examples powered by Propel Contractor Suite.</p></div></div><nav class="blueprint-switch" aria-label="Digital Blueprint experiences"><a href="#industry-showcase" aria-current="page">Industry Showcase</a><a href="#connected-business-story">The Connected Business Story →</a></nav><div class="showcase-stage"><img class="showcase-art" src="assets/approved-industry-showcase.webp" width="1365" height="476" alt="The seven exact approved contractor homepage previews, layered around the featured Oak Ridge Roofing website." />${hits.map((h) => `<button class="showcase-hit" data-action="industry:${h.i}" style="left:${h.left}%;width:${h.width}%" aria-label="Explore ${industries[h.i].name} website"></button>`).join("")}${D.state.industry !== 0 ? `<div class="industry-selection">${siteContent(D.state.industry)}</div>` : ""}<div class="mobile-industry-cards" aria-label="Swipe through contractor website examples">${industries.map((s, i) => `<article class="mobile-industry-card" data-industry-card="${i}">${siteContent(i)}</article>`).join("")}</div></div><div class="industry-tabs" role="tablist" aria-label="Industry website examples">${industries.map((s, i) => `<button role="tab" aria-selected="${D.state.industry === i}" data-action="industry:${i}">${icon(s.icon)}${s.name}</button>`).join("")}</div><div class="showcase-ctas">${link("Explore the Full Contractor Suite Demo →", "dashboard", "primary")}${link(icon("play") + " See How It All Works", "connected-business-story", "outline")}<div class="carousel-note">${icon("phone")}<span>On mobile, this becomes<br />a <b>swipeable carousel.</b></span></div></div>`;
  };
  D.actions.industry = (index) => {
    D.state.industry = Number(index);
    if (innerWidth <= 760) {
      document
        .querySelectorAll(".industry-tabs button")
        .forEach((el, i) =>
          el.setAttribute("aria-selected", String(i === Number(index))),
        );
      const carousel = document.querySelector(".mobile-industry-cards"),
        c = document.querySelector(`[data-industry-card="${index}"]`);
      carousel.scrollTo({
        left: c.offsetLeft - (carousel.clientWidth - c.clientWidth) / 2,
        behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
          ? "instant"
          : "smooth",
      });
    } else {
      D.render();
      document
        .querySelector(`[data-action="industry:${index}"][role=tab]`)
        ?.focus({ preventScroll: true });
    }
  };
  D.actions["industry-lead"] = (i) => {
    const s = industries[Number(i)];
    D.form(
      s.brand + " — Estimate Request",
      [
        {
          name: "name",
          label: "Synthetic contact name",
          value: "Jamie Parker",
        },
        {
          name: "project",
          label: "Project description",
          value: s.name + " project",
        },
        { name: "property", label: "Demo property", value: "125 Sample Lane" },
      ],
      (f) => {
        D.data.leads.unshift({
          id: "LD-" + (1085 + D.data.leads.length),
          name: f.name,
          project: f.project,
          value: 0,
          source: s.name + " Website",
          stage: "New",
          email: "demo@example.com",
          property: f.property,
          priority: "Normal",
        });
        D.toast(
          "Website request captured in Leads & CRM. No request was sent.",
        );
        return true;
      },
      "Add to demo lead inbox",
    );
  };
  const story = [
    [
      "Website",
      "globe",
      "Attract the right homeowners with a professionally branded, lead-ready website built for contractors.",
      "More qualified leads, 24/7.",
    ],
    [
      "Lead",
      "users",
      "Automatically capture and route leads from your website, ads, and other sources into Propel.",
      "No manual data entry.",
    ],
    [
      "CRM",
      "database",
      "Keep every lead, conversation, and follow-up in one place, so nothing falls through the cracks.",
      "Faster responses and higher conversion rates.",
    ],
    [
      "Estimate",
      "file",
      "Create professional, accurate estimates fast with materials, labor, and margins built in.",
      "Win more jobs with confidence.",
    ],
    [
      "Profit Guard",
      "shield",
      "See real-time profit, cost, and margin on every estimate and job, so you can price and build more profitably.",
      "Protect and grow your margins.",
    ],
    [
      "Job",
      "hardhat",
      "Turn approved estimates into organized jobs with clear scope, timelines, and financials.",
      "Keep projects on track and on budget.",
    ],
    [
      "Crew",
      "users",
      "Schedule the right crew for the right job, share job details in real time, and keep everyone aligned in the field.",
      "More productivity and fewer delays.",
    ],
    [
      "Invoice / Payment",
      "card",
      "Send professional invoices, accept online payments, and get paid faster with automated tracking.",
      "Faster, more reliable cash flow.",
    ],
    [
      "Property Passport",
      "home",
      "A complete property record with job history, materials, documents, and warranties — all in one place.",
      "Full property visibility for better service and future work.",
    ],
    [
      "Follow-Up",
      "refresh",
      "Stay connected with automated check-ins, warranty reminders, and service offers that turn one job into a long-term relationship.",
      "More repeat business and referrals.",
    ],
  ];
  const storyPreviews = [
    '<img src="assets/connected-website.webp" width="244" height="110" alt="Approved Saul 2 Paul contractor homepage preview" />',
    `<strong>${icon("users", "sm")} New Website Lead ${badge("New")}</strong><div class="mini-field">Name <span>Sarah Mitchell</span></div><div class="mini-field">Project <span>Roof Replacement</span></div><div class="mini-field">Source <span>Website</span></div>`,
    `<div class="row">${D.person("Sarah Mitchell", "sarah.mitchell@example.com")}</div><div class="row" style="margin-top:15px">${badge("Roof Replacement", "neutral")}${badge("High Priority", "purple")}</div>`,
    `<strong>Estimate #E-1084 ${badge("Draft", "neutral")}</strong><div class="mini-field">Roof Replacement (28 sq)<b>$14,560</b></div><div class="mini-field">Gutters (120 ft)<b>$1,920</b></div><div class="mini-field"><b>Total</b><b>$16,480</b></div>`,
    `<div class="row spread"><span>Est. Profit <b class="preview-money">$5,485</b></span><span>Margin <b class="preview-money">33.3%</b></span></div>${D.progress(66.7)}<div class="row spread" style="margin-top:8px"><span>Cost: $10,995</span><span>Price: $16,480</span></div>`,
    `<strong>${icon("briefcase", "sm")} Job #J-2941 ${badge("In Progress")}</strong><div class="row"><img src="assets/thompson-residence.webp" alt="Synthetic sample home" style="width:60px;height:48px;object-fit:cover" /><span>Sarah Mitchell<br />614 Oak Ridge Dr<br /><b>Roof Replacement + Gutters</b></span></div><div style="margin-top:7px">${D.progress(65)}</div>`,
    `<strong>Crew Schedule — This Week</strong><div class="row spread"><span>Mon<br />Jan 27</span><b class="badge">Tue<br />Jan 28</b><span>Wed<br />Jan 29</span><span>Thu<br />Jan 30</span><span>Fri<br />Jan 31</span></div><div class="mini-field">${icon("users")} <b>Crew A — Roofing<br />J-2941 — Sarah Mitchell</b>${icon("circlecheck")}</div>`,
    `<strong>${icon("file", "sm")} Invoice #INV-5294 ${badge("✓ Paid")}</strong><div class="mini-field">Amount <b>$16,480.00</b></div><div class="mini-field">Payment <b>ACH — Jan 30, 2025</b></div><div class="mini-field">Balance <b>$0.00</b></div>`,
    `<strong>Property Passport — Sarah Mitchell</strong><div class="row"><img src="assets/thompson-residence.webp" alt="Sample property record" style="width:60px;height:68px;object-fit:cover" /><span>▣ &nbsp; Job History &nbsp; 3 Jobs<br />▣ &nbsp; Documents &nbsp; Warranties<br />▣ &nbsp; Materials &nbsp; CertainTeed<br />▣ &nbsp; Service Plan &nbsp; Annual</span></div>`,
    `<strong>${icon("mail", "sm")} Follow-Up Automation</strong><div class="mini-field">✓ 30-Day Check-In <b>Completed</b></div><div class="mini-field">✓ Warranty Reminder <b>Scheduled</b></div><div class="mini-field">○ Annual Service Offer <b>Apr 1, 2025</b></div>`,
  ];
  D.renderers["connected-business-story"] = () =>
    header(
      "Propel Contractor Suite — Digital Blueprint",
      "The Connected Business Story",
      "From first website lead to long-term customer relationship — one connected system for your entire contracting business.",
    ) +
    `<nav class="blueprint-switch" aria-label="Digital Blueprint experiences"><a href="#industry-showcase">← Industry Showcase</a><a href="#connected-business-story" aria-current="page">Connected Business Story</a></nav><div class="workflow" tabindex="0" role="region" aria-label="Connected business workflow">${story.map(([name, i]) => `<div class="workflow-step"><span class="flow-icon">${icon(i, "lg")}</span>${name}</div>`).join("")}</div><div class="grid workflow-cards">${story.map(([name, i, copy, benefit], n) => `<section class="card story-card"><h2><span class="step-number">${n + 1}</span>${name}</h2><div class="story-preview ${n === 0 ? "website" : ""}">${storyPreviews[n]}</div><p>${copy}</p><div class="benefit">${benefit}</div><a class="sr-only" href="#${["industry-showcase", "leads-crm", "leads-crm", "estimates-proposals", "profit-guard-labor-tracking", "jobs-projects", "scheduling-crews", "invoicing-payments", "property-passport", "service-maintenance"][n]}">Explore ${name}</a></section>`).join("")}</div><div class="benefits-strip">${[
      ["settings", "Less manual work"],
      ["clipboard", "Fewer missed details"],
      ["chart", "Stronger profits"],
      ["users", "Long-term customer relationships"],
    ]
      .map(([i, s]) => `<div>${icon(i)}${s}</div>`)
      .join("")}</div>`;
  const materials = [
    ["Pressure-Treated 4×4 Post", "8", "$168.00"],
    ["Pressure-Treated 2×4", "16", "$224.00"],
    ["Decking 5/4×6", "120 LF", "$612.00"],
    ["Fence Pickets 1×6×6′", "160", "$352.00"],
    ["Concrete Mix (80 lb)", "6", "$42.00"],
    ["Galvanized Screws (box)", "2", "$59.00"],
  ];
  const extras = [
    ["Post Caps (4×4)", "8", "$55.92"],
    ["Stain / Exterior Finish (1 gal)", "2", "$65.00"],
    ["Brush / Roller Kit", "1", "$22.05"],
  ];
  D.renderers["material-receipt-intelligence"] = () => {
    const decision = D.state.receiptDecision,
      absorbed = decision === "Absorb Cost",
      profit = absorbed ? 2978.03 : 3121;
    const tabs = D.tab(
      "receipts",
      [
        ["matching", "Estimate Matching"],
        ["scan", "Receipt Scanning"],
        ["expenses", "Expense Classification"],
      ],
      "matching",
    );
    if (D.activeTab("receipts", "matching") !== "matching")
      return receiptOther(tabs);
    return `<div class="receipt-intro"><div>${header("Material Receipt Intelligence", "Material Receipt Intelligence", "Propel compares receipts to your estimates to catch unplanned material costs before profit is lost.", "", "compact")}</div><div class="receipt-process"><span>${icon("layers")}<span><b>Scan &amp; read receipts</b><small>Capture materials automatically</small></span></span><span>${icon("arrows")}<span><b>Compare to estimate</b><small>Find new or overage items</small></span></span><span>${icon("shield")}<span><b>Protect your profit</b><small>Take action before costs add up</small></span></span></div></div>${tabs}<section class="card job-summary"><img src="assets/anderson-residence.webp" width="133" height="83" alt="Approved deck photograph for the synthetic Anderson job" /><div class="job-summary-title"><span class="job-id">JOB #3024</span><h2>Anderson Residence — Deck &amp; Fence</h2>${badge("● Active")} &nbsp; <span class="text-small">In Construction</span></div><div class="job-summary-stat"><small>ORIGINAL ESTIMATE</small><strong>$18,420</strong></div><div class="job-summary-stat"><small>RECEIPT TOTAL</small><strong>$1,599.97</strong></div><div class="job-summary-stat"><small>DETECTED EXTRAS</small><strong class="positive">$142.97</strong></div><div class="job-summary-stat"><small>STATUS</small>${badge(decision ? "✓ " + decision : "⚠ Unplanned Materials Found")}</div></section><div class="grid receipt-grid"><div class="stack">${card(
      icon("file") + " Original Estimate " + info,
      table(
        ["Estimate component", "Amount"],
        [
          ["<b>Total Estimate</b>", "<b>$18,420.00</b>"],
          ["Materials (Estimated)", "$10,860.00"],
          ["Labor", "$3,679.00"],
          ["Other (Equipment, Disposal, etc.)", "$760.00"],
          ["Projected Profit", "$3,121.00"],
        ],
      ),
    )}${card(
      icon("box") + " Estimated Material List " + info,
      table(
        ["Material (Estimate)", "Qty", "Est. Cost"],
        materials.map(([a, b, c]) => [
          icon("circlecheck", "sm") + " &nbsp; " + a,
          b,
          c,
        ]),
      ) +
        '<div class="total-strip">Estimated Materials in This Purchase <b>$1,457.00</b></div>',
    )}</div>${card(
      icon("file") + " Scanned Receipt",
      `<div class="paper-receipt"><div class="receipt-brand">◩ Builders Supply™</div><div class="receipt-address">4820 Ridgeway Blvd<br />Rivermere, OH 43081<br />(614) 555-0134</div><div class="receipt-rule"></div><div class="row spread"><b>RECEIPT</b><span class="receipt-meta">Mar 3, 2025 &nbsp; 10:24 AM</span></div><div class="receipt-meta">#A784391<br />Customer: Saul 2 Paul Builders<br />Job: #3024 Anderson Res. — Deck &amp; Fence</div><div class="receipt-rule"></div><table class="receipt-table"><thead><tr><th scope="col">ITEM</th><th scope="col">QTY</th><th scope="col">PRICE</th><th scope="col">EXT.</th></tr></thead><tbody>${[
        ["4×4 PT Post (8 ft)", "8", "$21.00", "$168.00"],
        ["2×4 PT Lumber (8 ft)", "16", "$14.00", "$224.00"],
        ["Decking 5/4×6 (12 ft)", "120 LF", "$5.10", "$612.00"],
        ["Fence Pickets 1×6×6′", "160", "$2.20", "$352.00"],
        ["Concrete Mix (80 lb)", "6", "$7.00", "$42.00"],
        ["Galv. Screws (box)", "2", "$29.50", "$59.00"],
        ["Post Caps (4×4)", "8", "$6.99", "$55.92"],
        ["Exterior Stain (1 gal)", "2", "$32.50", "$65.00"],
        ["Brush / Roller Kit", "1", "$22.05", "$22.05"],
      ]
        .map(
          (r, i) =>
            `<tr class="${i >= 6 ? "receipt-extra" : ""}">${r.map((c) => `<td>${c}</td>`).join("")}</tr>`,
        )
        .join(
          "",
        )}</tbody></table><div class="receipt-rule"></div><div class="row spread"><span>Subtotal</span><b>$1,599.97</b></div><div class="row spread"><span>Tax (demo receipt)</span><b>$0.00</b></div><div class="receipt-rule"></div><div class="receipt-total"><span>Total</span><span>$1,599.97</span></div></div>`,
      btn(icon("search", "sm"), "receipt-enlarge", "small light"),
    )}<div class="stack">${card(
      "Additional Materials Detected",
      `<div class="alert-box">${icon("warning")}<div><h2>Additional Materials Detected</h2><p>These items were found on the receipt but are not in the original estimate for <b>Job #3024</b>. Take action to update costs and protect your profit.</p></div></div>${table(
        ["Material (Not in Estimate)", "Qty", "Receipt Cost"],
        extras.map(([a, b, c]) => [
          '<span class="negative">✚</span> &nbsp; <b>' + a + "</b>",
          b,
          c,
        ]),
      )}<div class="total-strip">Total Additional Materials <b>$142.97</b></div>`,
      "",
      "extras-card",
    )}${card(icon("chart") + " Projected Profit Impact (If Absorbed)", `<div class="profit-impact"><div><small>Current Projected Profit</small><strong class="positive">$3,121</strong><small>(17.0% margin)</small></div><span class="muted">→</span><div><small>New Projected Profit</small><strong>$2,978.03</strong><small>(16.2% margin)</small></div><div class="impact-change"><strong>⌄ −$142.97</strong><small>−0.8 pp margin</small></div></div><div class="decision-buttons">${btn("Absorb Cost", "receipt-decision:Absorb Cost", "dark", "layers")}${btn("Bill Customer", "receipt-decision:Bill Customer", "dark", "users")}${btn("Create<br />Change Order", "receipt-decision:Create Change Order", "mint", "file")}${btn("Classify as<br />Nonbillable", "receipt-decision:Classify as Nonbillable", "light", "circlecheck")}</div>${decision ? `<div class="receipt-result"><b>${esc(decision)} applied to this synthetic receipt.</b><br />${absorbed ? "Projected job profit is now " + money(profit) + "." : decision === "Create Change Order" ? "A $142.97 draft is now available in Change Orders." : decision === "Bill Customer" ? "A $142.97 draft invoice is available in Invoicing & Payments." : "The extra items are categorized as a nonbillable business expense."}</div>` : ""}`)}</div></div>`;
  };
  function receiptOther(tabs) {
    const scan = D.activeTab("receipts", "matching") === "scan";
    return (
      header(
        "Receipts & Expenses",
        scan
          ? "Every receipt. Connected to the job."
          : "Expenses, organized before tax season.",
        "Capture purchase detail, compare it to the estimate, and keep every cost categorized.",
      ) +
      tabs +
      (scan
        ? `<div class="grid two-col">${card("Receipt Capture", `<div class="empty-state">${icon("receipt")}<h3>Try the approved sample receipt</h3><p>Read all nine line items, match six planned materials, and flag three unplanned extras.</p>${btn("Scan sample receipt", "scan-receipt", "primary", "search")}</div><p class="module-note">This demonstrates a synthetic receipt workflow. No upload, OCR service, or external processing is required.</p>`)}${card(
            "Recent Receipts",
            table(
              ["Receipt", "Job", "Amount", "Status"],
              [
                [
                  "A784391",
                  D.jobLink("3024"),
                  "$1,599.97",
                  badge("3 Extras Found", "watch"),
                ],
                [
                  "R742208",
                  D.jobLink("RV-10427"),
                  "$5,842.00",
                  badge("Matched"),
                ],
                [
                  "R742209",
                  D.jobLink("RV-10427"),
                  "$1,276.50",
                  badge("Matched"),
                ],
              ],
            ),
          )}</div>`
        : card(
            "Expense Classification",
            table(
              ["Date", "Description", "Job", "Category", "Amount"],
              [
                [
                  "Mar 3, 2025",
                  "Builders Supply receipt",
                  D.jobLink("3024"),
                  "Job Materials",
                  "$1,599.97",
                ],
                [
                  "Dec 19, 2024",
                  "Disposal & permit fees",
                  D.jobLink("RV-10427"),
                  "Job Expenses",
                  "$4,109.00",
                ],
                [
                  "Mar 1, 2025",
                  "Equipment rental",
                  D.jobLink("RM-1047"),
                  "Equipment / Rentals",
                  "$1,250.00",
                ],
              ],
            ) +
              `<div class="form-actions">${btn("Classify a demo expense", "classify-expense", "primary", "receipt")}${link("Export financial reports", "financial-reporting-tax-prep", "light", "download")}</div>`,
          ))
    );
  }
  D.actions["scan-receipt"] = () => {
    D.state.tabs.receipts = "matching";
    D.render();
    D.toast(
      "Sample receipt read: 6 estimated items matched, 3 unplanned items detected.",
    );
  };
  D.actions["receipt-enlarge"] = () =>
    D.showDialog(
      "Sample Receipt #A784391",
      `<div class="dialog-detail">${table(["Item", "Quantity", "Receipt cost"], [...materials, ...extras])}<div class="total-strip">Receipt Total <b>$1,599.97</b></div><p class="dialog-note">Synthetic receipt. Green highlighted items in the main view are missing from the original estimate.</p></div>`,
    );
  D.actions["receipt-decision"] = (decision) => {
    D.showDialog(
      decision + " — $142.97",
      `<div class="dialog-detail"><p>Apply <b>${esc(decision)}</b> to the three unplanned items on receipt #A784391 for Anderson Residence — Deck &amp; Fence.</p>${D.detailList(
        [
          ["Unplanned materials", "$142.97"],
          ["Job", "#3024"],
          ["Projected profit if absorbed", "$2,978.03"],
        ],
      )}<p class="dialog-note">This changes only the synthetic showcase. No customer is charged or notified.</p><div class="form-actions">${btn("Cancel", "close-dialog", "light")}${btn("Apply demo decision", "apply-receipt:" + decision, "primary", "check")}</div></div>`,
    );
  };
  D.actions["apply-receipt"] = (decision) => {
    // One current decision owns its generated draft; switching or repeating cannot double bill.
    D.data.changes = D.data.changes.filter((x) => x.id !== "CO-3024-01");
    D.data.invoices = D.data.invoices.filter((x) => x.id !== "INV-3024-EX");
    if (decision === "Create Change Order")
      D.data.changes.unshift({
        id: "CO-3024-01",
        job: "3024",
        description: "Receipt extras: post caps, stain & roller kit",
        amount: 142.97,
        status: "Draft",
      });
    if (decision === "Bill Customer")
      D.data.invoices.unshift({
        id: "INV-3024-EX",
        customer: "James Anderson",
        job: "3024",
        amount: 142.97,
        paid: 0,
        status: "Draft",
        due: "Mar 21, 2025",
      });
    D.state.receiptDecision = decision;
    dialogClose();
    D.render();
    D.toast(decision + " applied to the demo receipt.");
  };
  function dialogClose() {
    document.querySelector("#demo-dialog").close();
  }
  D.renderers["profit-guard-labor-tracking"] = () => {
    const cats = [
      ["Revenue", 330000, 330000, "100.0%"],
      ["Materials", 114000, 119340, "36.2%"],
      ["Employee Labor", 48000, 54720, "16.6%"],
      ["1099 Subcontractor Labor", 56000, 55500, "16.8%"],
      ["Equipment / Rentals", 12000, 11900, "3.6%"],
      ["Overhead", 31530, 26070, "7.9%"],
    ];
    const rows = cats.map(([a, b, c, p], i) => [
      "<b>" +
        icon(
          ["chart", "box", "users", "hardhat", "truck", "settings"][i],
          "sm",
        ) +
        " &nbsp; " +
        a +
        "</b>",
      money(b),
      money(c),
      i === 0
        ? "—"
        : `<b class="${c > b ? "negative" : "positive"}">${c > b ? "+" : "−"} ${money(Math.abs(c - b))}</b>`,
      p,
    ]);
    rows.push(
      total([
        "<b>Total Cost</b>",
        "$261,530",
        "$267,530",
        '<b class="negative">+ $6,000</b>',
        "81.1%",
      ]),
      total([
        "<b>Profit (Gross)</b>",
        "$68,470",
        "$62,470",
        '<b class="negative">− $6,000</b>',
        "18.9%",
      ]),
    );
    const hours = (people, type) =>
      table(
        [type, "Role / Trade", "Est. Hrs", "Act. Hrs", "Variance"],
        [
          ...people.map((p) => [
            "<b>" + esc(p.name) + "</b>",
            esc(p.role),
            p.est.toFixed(1),
            p.actual.toFixed(1),
            `<span class="${p.actual > p.est ? "negative" : "positive"}">${p.actual > p.est ? "+" : ""}${(p.actual - p.est).toFixed(1)}</span>`,
          ]),
          total([
            "Total " + type + " Hours",
            "",
            people.reduce((s, p) => s + p.est, 0).toFixed(1),
            people.reduce((s, p) => s + p.actual, 0).toFixed(1),
            people.reduce((s, p) => s + p.actual - p.est, 0).toFixed(1),
          ]),
        ],
      );
    return (
      header(
        "Profit Guard™ & Labor Tracking",
        'Job #RM-1047 <span class="heading-divider">|</span><span class="heading-subtitle">Kitchen &amp; Great Room Remodel</span>',
        "Real-time profitability, cost tracking, and labor hours for this job.",
        btn("Job #RM-1047 ⌄", "job-summary:RM-1047", "outline", "calendar") +
          btn("Export Report", "export-profit", "outline", "download"),
        "compact",
      ) +
      `<div class="metrics">${metric("Projected Profit", "$62,470", '<b class="positive">↑ +$3,920</b> vs. prior forecast', "money")}${metric("Gross Margin", "18.9%", '<b class="negative">↓ −1.8 pp</b> vs. estimated 20.7%', "percent")}${metric("Est. Revenue", "$330,000", "", "file")}${metric("Projected Total Cost", "$267,530", "Original estimate: $261,530", "layers")}${metric("Actual Cost (To Date)", "$215,460", "80.5% of projected total", "refresh")}</div><section class="signal-banner">${icon("warning")}<div><h2>Margin Under Pressure</h2><p>Gross margin is 18.9% (−1.8 pp) vs. estimated 20.7%. Employee labor is over plan and materials are 4.7% higher.</p></div>${btn("Review & Take Action →", "review-margin", "outline")}</section><div class="grid profit-main">${card("Estimate vs. Actual by Category", table(["Category", "Estimated", "Forecast at Completion", "Variance", "% of Revenue"], rows))}${card("Why the Margin Changed " + info, `<ul class="margin-reasons"><li><b>Employee labor over plan:</b> +$6,720 (+14.0%) — additional built-ins and trim increased the forecast.</li><li><b>Materials higher:</b> +$5,340 (+4.7%) — millwork and finishes came in above the estimated pricing.</li><li><b>1099 labor on plan:</b> −$500 (−0.9%) — subcontractor costs tracking slightly under estimate.</li><li><b>Equipment and overhead savings:</b> −$5,560 — lower rental duration and allocated overhead offset part of the overage.</li><li><b>Net effect:</b> Total forecast costs are $6,000 over plan, reducing gross margin by 1.8 pp to 18.9%.</li></ul>`)}</div><div class="grid profit-bottom">${card(icon("users") + " Employee Labor Hours (This Job) " + info, hours(D.data.employees, "Employee"))}${card(icon("hardhat") + " 1099 / Subcontractor Labor Hours (This Job) " + info, hours(D.data.subcontractors, "1099"))}${card("Gross Margin Trend " + info, marginChart(), '<a class="btn small light" href="#labor-time-tracking">View time entries →</a>')}</div>`
    );
  };
  D.actions["job-summary"] = (id) => D.openJob(id);
  D.actions["review-margin"] = () =>
    D.showDialog(
      "Protect the margin — Job #RM-1047",
      `<div class="dialog-detail"><p>The $6,000 forecast overage is visible before the job closes. Review the causes and take a specific action.</p>${D.detailList(
        [
          ["Employee labor variance", "+$6,720"],
          ["Material variance", "+$5,340"],
          ["Current projected margin", "18.9%"],
        ],
      )}<div class="form-actions">${link("Review job hours", "labor-time-tracking", "primary", "clock")}${link("Review pending change order", "change-orders", "light", "arrows")}${link("Compare supplier prices", "materials-purchasing", "light", "box")}</div></div>`,
    );
  D.actions["export-profit"] = () =>
    D.reportCSV("RM-1047 Profit Guard", [
      ["Category", "Estimated", "Forecast"],
      ["Revenue", 330000, 330000],
      ["Materials", 114000, 119340],
      ["Employee Labor", 48000, 54720],
      ["1099 Labor", 56000, 55500],
      ["Equipment / Rentals", 12000, 11900],
      ["Overhead", 31530, 26070],
      ["Total Cost", 261530, 267530],
      ["Gross Profit", 68470, 62470],
      ["Gross Margin", 0.2075, 0.1893],
    ]);
  function financialPeriod() {
    return '<label><span class="sr-only">Profitability chart period</span><select data-financial-period><option value="6">Last 6 Months</option><option value="3">Last 3 Months</option></select></label>';
  }
  function financialChart(months = 6) {
    const labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(-months),
      revenue = [170, 194, 228, 240, 268, 301].slice(-months),
      profits = [60, 62, 68, 75, 74, 95].slice(-months),
      margins = [14, 13, 15, 17, 21, 24].slice(-months),
      left = 42,
      bottom = 145,
      step = 440 / months;
    return `<svg class="chart" viewBox="0 0 525 177" role="img" aria-label="Revenue, net profit, and profit margin trend upward from July through December.">${[0, 50, 100, 150, 200, 250, 300, 350].map((v) => `<line x1="42" x2="486" y1="${bottom - v * 0.34}" y2="${bottom - v * 0.34}"/><text x="0" y="${bottom - v * 0.34 + 4}">${v ? "$" + v + "K" : "$0"}</text>`).join("")}${[0, 10, 20, 30, 40].map((v) => `<text x="494" y="${bottom - v * 3 + 4}">${v}%</text>`).join("")}${labels.map((l, i) => `<rect x="${left + i * step + 4}" y="${bottom - revenue[i] * 0.34}" width="${step * 0.36}" height="${revenue[i] * 0.34}" rx="2" fill="#00805d"/><rect x="${left + i * step + step * 0.43}" y="${bottom - profits[i] * 0.34}" width="${step * 0.3}" height="${profits[i] * 0.34}" rx="2" fill="#42efb6"/><text x="${left + i * step + step * 0.4}" y="163" text-anchor="middle">${l}</text>`).join("")}<polyline points="${margins.map((v, i) => `${left + i * step + step * 0.35},${bottom - v * 3}`).join(" ")}" fill="none" stroke="#17edaa" stroke-width="3"/>${margins.map((v, i) => `<circle cx="${left + i * step + step * 0.35}" cy="${bottom - v * 3}" r="4" fill="#2eebb1" stroke="white" stroke-width="2"/>`).join("")}</svg><div class="chart-labels"><span class="chart-key">Revenue</span><span class="chart-key mint">Net Profit</span><span class="chart-key line">Profit Margin</span></div>`;
  }
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-financial-period]"))
      e.target
        .closest(".card")
        .querySelector("[data-financial-chart]").innerHTML = financialChart(
        Number(e.target.value),
      );
  });
  function completedCostChart() {
    return `<div style="padding:8px 0">${[
      ["Materials", 7916.5, 47],
      ["Labor", 4860, 28.8],
      ["Other Costs", 4109, 24.3],
    ]
      .map(
        ([n, v, p]) =>
          `<div style="margin-bottom:12px"><div class="row spread text-small"><b>${n}</b><span>${money(v)} · ${p}%</span></div><div style="margin-top:6px">${D.progress(p)}</div></div>`,
      )
      .join("")}</div>`;
  }
  const reportDonut = () =>
    `<div class="donut-wrap"><div class="donut" style="background:conic-gradient(#00694f 0 58.81%,#6cf8ca 58.81%)" role="img" aria-label="Labor cost 296,480 dollars, employees 59 percent and 1099 contractors 41 percent"><span><strong>$296,480</strong>Total Labor<br />Cost</span></div><div class="donut-list"><div><i class="dot"></i><span class="legend-name">Employees</span><b>$174,360 (59%)</b></div><div><i class="dot"></i><span class="legend-name">1099 Contractors</span><b>$122,120 (41%)</b></div></div></div>`;
  D.renderers["financial-reporting-tax-prep"] = () =>
    `<div class="reporting-hero"><div>${header("Financial Reporting & Tax-Prep Readiness", 'Tax Prep Without the <span class="mint-text">Shoebox</span>', "Propel helps small, medium, and large contractors stay organized and report-ready.", "", "compact")}<p>Keep your business finances connected and tax-ready all year long. Receipts, materials, labor, invoices, payments, and expenses are all tied together in one system—making tax prep faster, easier, and more accurate for your bookkeeper or CPA.</p><div class="size-pills"><span>For Small Contractors</span><span>For Medium Contractors</span><span>For Large Contractors</span></div></div><div class="tax-graphic" aria-hidden="true"><div class="tax-inputs">${["receipt", "box", "hardhat", "card"].map((i) => `<div class="tax-node">${icon(i, "lg")}</div>`).join("")}</div>${icon("arrow", "lg")}<div class="tax-node big"><img src="../assets/propel-contractor-app-icon-approved-v80.webp" width="55" height="55" alt="" /></div>${icon("arrow", "lg")}<div class="tax-ready">TAX<br />PREP<br />READY ✓</div></div></div><div class="metrics report-metrics">${metric("Total Revenue", "$1,284,900", '<b class="positive">↑ +19%</b> vs. prior period', "chart")}${metric("Materials & Expenses", "$368,220", "28.6% of revenue", "layers")}${metric("Labor Cost", "$296,480", "23.1% of revenue", "hardhat")}${metric("Employee vs. 1099", "$174,360 / $122,120", "59% Employees / 41% 1099", "users", "long")}${metric("Subcontractor Costs", "$98,760", "Included in 1099 labor", "hardhat")}${metric("Net Profit", "$304,880", '<b class="positive">↑ +23.7%</b> vs. prior period', "money")}</div><div class="grid reporting-layout"><div class="reporting-left"><div class="grid report-charts">${card(
      "Revenue by Job " + info,
      `<ul class="revenue-bars">${[
        ["Oak Ridge Remodel", 284600, 100],
        ["Harbor Roof Repair", 196700, 73],
        ["Pinecrest Maintenance", 142300, 50],
        ["Lakeside Addition", 118400, 40],
        ["Riverview Siding", 96200, 33],
      ]
        .map(
          ([n, v, p]) =>
            `<li><span>${n}</span><span class="bar-track"><span style="width:${p}%"></span></span><b>${money(v)}</b></li>`,
        )
        .join("")}</ul>`,
      period(),
    )}${card("Profitability Overview " + info, `<div data-financial-chart>${financialChart()}</div>`, financialPeriod())}</div><div class="grid report-lower">${card("Employee vs. 1099 Activity " + info, reportDonut())}${card(
      "Materials &amp; Expenses Breakdown " + info,
      table(
        ["Category", "Cost", "Share"],
        [
          [
            icon("layers", "sm") + " &nbsp; Materials",
            "<b>$247,560</b>",
            "67.2%",
          ],
          [
            icon("truck", "sm") + " &nbsp; Equipment & Rentals",
            "<b>$42,300</b>",
            "11.5%",
          ],
          [
            icon("box", "sm") + " &nbsp; Supplies & Consumables",
            "<b>$28,440</b>",
            "7.7%",
          ],
          ["⋯ &nbsp; Other Expenses", "<b>$49,920</b>", "13.6%"],
        ],
      ),
    )}${card(
      "Exportable Reports " + info,
      `<div class="export-list">${[
        ["file", "Profit & Loss (P&L)", "pnl"],
        ["file", "Job Costing Summary", "jobs"],
        ["file", "Tax Prep Package<br />(CPA/Bookkeeper)", "tax"],
      ]
        .map(
          ([i, n, a]) =>
            `<div>${icon(i)}<span>${n}</span>${btn("Export ↓", "export-report:" + a, "small mint")}</div>`,
        )
        .join("")}</div>`,
    )}</div></div>${card(icon("clipboard") + " Year-Round Financial Readiness", `<p>Stay organized, current, and report-ready all year — so tax prep is simple, accurate, and stress-free for your bookkeeper or CPA.</p><ul class="check-list"><li>Keep receipts, materials, labor, invoices, payments, and expenses connected</li><li>Categorize and track all job costs in real time</li><li>Separate and report employee vs. 1099 activity</li><li>Track subcontractor costs and payments</li><li>Monitor profitability by job and overall</li><li>Maintain clean, export-ready financial records</li><li>Be ready for tax season — not just at year end</li></ul>${btn("Stay Tax-Ready Year-Round →", "readiness-checklist", "mint")}`, "", "dark-card readiness")}</div>`;
  D.actions["export-report"] = (kind) => {
    const rows =
      kind === "jobs"
        ? [
            ["Job", "Contract Revenue", "Projected Margin"],
            ...D.data.jobs.map((j) => [
              j.id + " " + j.name,
              j.amount,
              j.margin + "%",
            ]),
          ]
        : kind === "tax"
          ? [
              ["Category", "Amount", "Notes"],
              ["Revenue", 1284900, "Synthetic reporting period"],
              [
                "Materials & Expenses",
                368220,
                "Categorized receipts and purchases",
              ],
              ["Employee Labor", 174360, "Employee activity"],
              ["1099 Labor", 122120, "Includes subcontractor costs of 98760"],
              [
                "Other Operating Costs",
                315320,
                "Allocated overhead and operating expenses",
              ],
              ["Net Profit", 304880, "Illustrative, not a filed return"],
            ]
          : [
              ["Category", "Amount"],
              ["Revenue", 1284900],
              ["Materials & Expenses", 368220],
              ["Labor", 296480],
              ["Other Operating Costs", 315320],
              ["Net Profit", 304880],
            ];
    D.reportCSV(
      kind === "tax"
        ? "Tax Prep Package"
        : kind === "jobs"
          ? "Job Costing Summary"
          : "Profit and Loss",
      rows,
    );
  };
  D.actions["readiness-checklist"] = () =>
    D.showDialog(
      "Year-Round Financial Readiness",
      `<div class="dialog-detail"><p>Receipts, materials, employee hours, 1099 activity, invoices, and payments are connected to the same job records.</p>${D.detailList(
        [
          ["Receipts categorized", "37 of 37 — Thompson Residence"],
          ["Labor allocated", "112.5 hours linked to Job #RV-10427"],
          ["Invoices reconciled", "$21,840 paid in full"],
          ["Export-ready reports", "P&L, job costing, and tax-prep package"],
        ],
      )}<div class="form-actions">${btn("Download sample tax-prep package", "export-report:tax", "primary", "download")}</div><p class="dialog-note">Sample organizational reports for a bookkeeper or CPA. This demo does not file tax returns.</p></div>`,
    );
  const lifeStages = [
    ["Website Lead", "globe", "Nov 5, 2024"],
    ["Inspection", "search", "Nov 7, 2024"],
    ["Estimate", "file", "Nov 8, 2024"],
    ["Approved", "check", "Nov 10, 2024"],
    ["Scheduled", "calendar", "Nov 12, 2024"],
    ["In Progress", "hardhat", "Nov 13–19, 2024"],
    ["Change Order", "arrows", "Nov 15, 2024"],
    ["Invoice", "file", "Dec 19, 2024"],
    ["Payment", "card", "Dec 20, 2024"],
    ["Completed", "check", "Dec 20, 2024"],
  ];
  const completedChart = () =>
    `<svg class="chart" viewBox="0 0 480 170" role="img" aria-label="Completed job revenue 21,840 dollars; actual cost 16,885.50; actual profit 4,954.50.">${[0, 5, 10, 15, 20, 25].map((v) => `<line x1="42" x2="460" y1="${145 - v * 5}" y2="${145 - v * 5}"/><text x="0" y="${149 - v * 5}">${v ? "$" + v + "K" : "$0"}</text>`).join("")}${[21840, 16885.5, 4954.5].map((v, i) => `<rect x="${70 + i * 139}" y="${145 - v * 0.005}" width="97" height="${v * 0.005}" rx="3" fill="${i === 2 ? "#65f3be" : "#00845f"}"/><text x="${118 + i * 139}" y="${134 - v * 0.005}" text-anchor="middle" style="font-weight:bold;fill:#0b1825">${money(Math.round(v))}</text><text x="${118 + i * 139}" y="166" text-anchor="middle">${["Revenue", "Actual Cost", "Actual Profit"][i]}</text>`).join("")}<polyline points="118,36 257,61 396,120" fill="none" stroke="#13e9a6" stroke-width="2"/>${[
      [118, 36],
      [257, 61],
      [396, 120],
    ]
      .map(
        ([x, y]) =>
          `<circle cx="${x}" cy="${y}" r="5" fill="#27dca5" stroke="#baffea" stroke-width="3"/>`,
      )
      .join("")}</svg>`;
  D.renderers["job-lifecycle"] = () =>
    header(
      "One Job — Completed Lifecycle",
      "Job #RV-10427 — Thompson Residence",
      "Roof Replacement + Gutter Upgrade",
      `<span class="completed-badge">${icon("circlecheck", "sm")} COMPLETED &amp; PAID</span><span>Completed: Dec 20, 2024</span>`,
      "compact lifecycle-heading",
    ) +
    `<div class="lifecycle" aria-label="Completed job lifecycle">${lifeStages.map(([name, i, date], n) => `<button class="life-step" data-action="lifecycle-stage:${n}" style="border:0;background:transparent;color:inherit;padding:0"><span class="life-icon">${icon(i)}</span><b>${name}</b><span>${date}</span></button>`).join("")}</div><div class="grid job-top">${card("Job Overview", `<div class="job-overview"><img src="assets/thompson-residence.webp" width="135" height="174" alt="Approved home photograph for the synthetic Thompson Residence" /><div><span><b>Thompson Residence</b>1234 Ridgeview Dr<br />Oak Ridge, TN 37830</span><b>Roof Replacement +<br />Gutter Upgrade</b><span><b>Job Dates</b>Nov 13 – Dec 19, 2024</span><span><b>Crew</b>Roof Crew A (4)</span></div></div>`, `<a href="#jobs-projects" class="link-button" aria-label="View all jobs">⋮</a>`)}${card("Estimate &amp; Blanket Material Strategy " + info, `<div class="budget-summary"><span class="soft-icon">${icon("file")}</span><span>Approved Estimate</span><strong style="margin-left:auto">$21,840.00</strong></div><div class="strategy-line">${icon("shield")}<div><b>Blanket Material Strategy ${badge("APPLIED")}</b>Roofing (shingles, underlayment, fasteners), gutters &amp; downspouts — covered under pre-negotiated pricing.</div></div><div class="total-strip">${icon("layers")}<span>Material Cost Savings</span><strong class="positive">$1,084.00<small style="font-size:10px;display:block">vs. retail quote</small></strong></div>`)}${card("Labor &amp; Hours " + info, `<div class="budget-summary"><span class="soft-icon">${icon("users")}</span><span>Total Labor Hours<strong>112.5 hrs</strong></span>${badge("On Budget")}</div>${table(["Crew / Role", "Hours", "Labor Cost"], [["Roof Crew A (4)", "96.0", "$4,320.00"], ["Gutter Tech (1)", "12.0", "$540.00"], ["Site supervision", "4.5", "Included"], total(["Total", "112.5", "$4,860.00"])])}`)}${card(
      "Material Purchases &amp; Receipts " + info,
      `<div class="budget-summary"><span class="soft-icon">${icon("cart")}</span><span>Total Material Spend<strong>$7,916.50</strong></span>${badge("37 Receipts")}</div>${table(
        ["Category", "Amount", "Receipts"],
        [
          ["Roofing (shingles, underlayment)", "$5,842.00", "24"],
          ["Gutters & downspouts", "$1,276.50", "8"],
          ["Fasteners, vents, misc.", "$798.00", "5"],
        ],
      )}`,
    )}</div>${card(
      "Profit Guard — Job Profitability " + info,
      `<div class="job-profit-grid"><div class="donut" role="img" aria-label="Actual completed job profit margin 22.7 percent"><span><strong>22.7%</strong>Profit<br />Margin</span></div><div class="profit-ledger"><div><span>Revenue (Actual)</span><b>$21,840.00</b></div><div><span>Total Cost</span><b>$16,885.50</b></div><div class="indent"><span>Materials</span><b>$7,916.50</b></div><div class="indent"><span>Labor</span><b>$4,860.00</b></div><div class="indent"><span>Other (disposal, permits, etc.)</span><b>$4,109.00</b></div><div class="total-strip"><span>Actual Profit</span><b>$4,954.50</b></div></div><div class="chart-panel">${D.tab(
        "lifecycle-chart",
        [
          ["revenue", "Revenue & Profit"],
          ["cost", "Cost Breakdown"],
        ],
        "revenue",
      )}${D.activeTab("lifecycle-chart", "revenue") === "cost" ? completedCostChart() : completedChart()}</div><div class="job-margins"><div>${icon("percent")}<span>Margin (Actual)</span><strong class="positive">22.7%</strong></div><div>${icon("shield")}<span>Margin (Estimated)</span><strong>21.0%</strong></div><div>${icon("chart")}<span>Variance</span><strong class="positive">+1.7 pts</strong></div></div></div>`,
      "",
      "job-profit",
    )}<div class="grid passport-bottom">${card(
      "Property Passport — Thompson Residence " + info,
      `<div class="passport-card-content"><div class="passport-property"><img src="assets/thompson-residence.webp" width="135" height="174" alt="Thompson sample property" /><div>PROPERTY<b>Thompson Residence</b><hr style="border:0;border-top:1px solid #d4e0e5" />ADDRESS<b>1234 Ridgeview Dr</b>Oak Ridge, TN 37830</div></div><div class="connected-history"><strong>CONNECTED HISTORY</strong><div class="history-icons">${[
        ["briefcase", "Jobs", "1", "jobs-projects"],
        ["file", "Estimates", "1", "estimates-proposals"],
        ["arrows", "Change Orders", "1", "change-orders"],
        ["file", "Invoices", "1", "invoicing-payments"],
        ["card", "Payments", "1", "invoicing-payments"],
        ["receipt", "Receipts", "37", "material-receipt-intelligence"],
        ["folder", "Documents", "12", "property-passport"],
      ]
        .map(
          ([i, n, c, r]) =>
            `<a href="#${r}">${icon(i)}<span>${n}</span><b>${c}</b></a>`,
        )
        .join("")}</div></div></div>`,
    )}<section class="card dark-card tax-callout">${icon("layers")}<div><h2>Tax prep is easier.</h2><p>All receipts, labor, materials, invoices, and payments are already categorized and report-ready.</p></div>${icon("circlecheck")}</section></div>`;
  D.actions["lifecycle-stage"] = (n) => {
    const stage = lifeStages[Number(n)];
    const details = [
      "A website request created the contact, property, and source-attribution record.",
      "Roof condition, measurements, and gutter requirements were documented at inspection.",
      "The $21,840 proposal included roofing, gutters, labor, and the blanket material strategy.",
      "The owner approved the scope and schedule. The estimate became a connected job.",
      "Roof Crew A and a gutter technician were assigned to the job calendar.",
      "Employee hours, receipts, and progress were tracked against Job #RV-10427.",
      "The gutter upgrade was documented and included in the final $21,840 contract value.",
      "The final invoice linked the approved scope, change order, materials, and labor.",
      "The full $21,840 payment was recorded, leaving a zero balance.",
      "The property passport now holds all job history, warranties, receipts, and documents.",
    ];
    D.showDialog(
      stage[0] + " — Thompson Residence",
      `<div class="dialog-detail">${badge("✓ " + stage[2])}<p>${details[Number(n)]}</p>${D.detailList(
        [
          ["Job", "#RV-10427"],
          ["Status", "Completed & Paid"],
          ["Actual profit", "$4,954.50"],
        ],
      )}<div class="form-actions">${link("Open Property Passport", "property-passport", "primary", "home")}${link("View financial reporting", "financial-reporting-tax-prep", "light", "chart")}</div></div>`,
    );
  };
})();

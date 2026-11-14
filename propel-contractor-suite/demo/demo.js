/* Propel Contractor Suite — synthetic front-end showcase. No network writes. */
(() => {
  "use strict";
  const D = (window.PropelDemo = {});
  const paths = {
    home: "M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8",
    layers: "m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 17l10 5 10-5",
    users:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    file: "M14 2H6v20h14V8l-6-6Zm0 0v6h6M9 12h8M9 16h8M9 19h4",
    briefcase: "M3 7h18v14H3V7Zm5 0V3h8v4M3 12h18M10 12v3h4v-3",
    calendar: "M3 5h18v17H3V5ZM7 2v6M17 2v6M3 10h18M7 14h2M15 14h2M7 18h2",
    box: "m12 2 10 5v10l-10 5L2 17V7l10-5Zm0 10L2 7m10 5L22 7M12 12v10M7 4.5l10 5",
    receipt: "M5 2h14v20l-3-2-4 2-4-2-3 2V2Zm3 4h1m3 0h4M8 10h8M8 14h8",
    clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2",
    shield: "m12 2 9 4v6c0 5-5 9-9 11-4-2-9-6-9-11V6l9-4Zm-4 10 3 3 5-6",
    arrows: "M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4",
    card: "M2 5h20v15H2V5Zm0 5h20M6 15h4",
    wrench: "M14 6a6 6 0 0 0-6 8l-6 6 2 2 7-7a6 6 0 0 0 8-8l-4 4-3-3 4-4-2 2Z",
    chart: "M3 21h4v-8H3v8Zm7 0h4V8h-4v13Zm7 0h4V3h-4v18Z",
    settings:
      "m9 3 1-2h4l1 2 3 1 2 2-1 3 2 1v4l-2 1 1 3-2 2-3-1-1 2h-4l-1-2-3 1-2-2 1-3-2-1v-4l2-1-1-3 2-2 3 1Zm7 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
    check: "m5 12 4 4L20 5",
    circlecheck: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-15 0 3 3 7-7",
    warning: "m12 2 11 20H1L12 2Zm0 7v5m0 4v.1",
    hardhat: "M4 18v-5a8 8 0 0 1 16 0v5M9 10V3h6v7M2 18h20v4H2v-4Z",
    money:
      "M20 5c0 2-4 3-8 3S4 7 4 5s4-3 8-3 8 1 8 3ZM4 5v14c0 2 4 3 8 3s8-1 8-3V5M4 10c0 4 16 4 16 0M4 15c0 4 16 4 16 0",
    percent:
      "M19 5 5 19M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    download: "M12 2v13m-5-5 5 5 5-5M3 16v6h18v-6",
    globe:
      "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20Z",
    database:
      "M21 5c0 2-4 4-9 4S3 7 3 5s4-4 9-4 9 2 9 4ZM3 5v14c0 2 4 4 9 4s9-2 9-4V5M3 12c0 5 18 5 18 0",
    refresh:
      "M21 10a9 9 0 0 0-16-5L2 8m0-6v6h6M3 14a9 9 0 0 0 16 5l3-3m0 6v-6h-6",
    mail: "M2 4h20v16H2V4Zm0 1 10 8L22 5",
    pin: "M20 9c0 6-8 13-8 13S4 15 4 9a8 8 0 0 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 7 7",
    arrow: "M3 12h18m-7-7 7 7-7 7",
    roof: "m2 14 10-10 10 10M6 11v10h12V11M12 4l-3 8 6-2-3 8",
    gutter: "M3 4h18v6H3V4Zm5 6v12h8V10",
    drop: "M12 2C8 9 4 12 4 16a8 8 0 0 0 16 0c0-4-4-7-8-14Z",
    fence:
      "M4 3 1 6v16h6V6L4 3Zm8 0L9 6v16h6V6l-3-3Zm8 0-3 3v16h6V6l-3-3ZM1 10h22M1 17h22",
    phone: "M4 2 2 6c1 8 8 15 16 16l4-2-5-6-3 2-6-6 2-3-6-5Z",
    folder: "M2 6V3h7l3 3h10v16H2V6Z",
    cart: "M1 2h3l3 15h13l3-11H5M8 22h.1M19 22h.1",
    image: "M2 3h20v18H2V3Zm0 14 7-7 8 8m-3-3 3-3 5 5M18 7h.1",
    play: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM9 7l8 5-8 5V7Z",
    plus: "M12 3v18M3 12h18",
    clipboard: "M8 4H4v18h16V4h-4M8 2h8v5H8V2Zm0 12 3 3 6-7",
    truck:
      "M1 4h14v13H1V4Zm14 5h5l3 5v3h-8M8 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM22 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  };
  D.icon = (name, cls = "") =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.file}"/></svg>`;
  D.esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  D.money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value);
  D.badge = (label, type = "") =>
    `<span class="badge ${type}">${D.esc(label)}</span>`;
  D.btn = (label, action, type = "primary", icon = "") =>
    `<button type="button" class="btn ${type}" data-action="${action}" ${label.replace(/<[^>]*>/g, "").trim() ? "" : `aria-label="${action.split(":")[0].replaceAll("-", " ")}"`}>${icon ? D.icon(icon) : ""}${label}</button>`;
  D.link = (label, route, type = "primary", icon = "") =>
    `<a class="btn ${type}" href="#${route}">${icon ? D.icon(icon) : ""}${label}</a>`;
  D.card = (title, body, action = "", cls = "") =>
    `<section class="card ${cls}"><div class="card-header"><h2>${title}</h2>${action}</div>${body}</section>`;
  D.info = '<span class="info" aria-hidden="true">i</span>';
  D.metric = (label, value, sub = "", icon = "chart", cls = "") =>
    `<article class="metric"><span class="label">${label}</span><span class="metric-icon">${D.icon(icon)}</span><strong class="value ${cls}">${value}</strong><small>${sub}</small></article>`;
  D.header = (eyebrow, title, sub = "", actions = "", cls = "") =>
    `<div class="page-heading ${cls}"><div>${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ""}<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
  D.table = (head, rows, cls = "") =>
    `<div class="table-wrap" tabindex="0" role="region" aria-label="${D.esc(head.join(", "))}"><table class="data-table ${cls}"><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.map((r) => `<tr${r.total ? ' class="total"' : ""}>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${head.length}">No matching demo records. Try another search.</td></tr>`}</tbody></table></div>`;
  D.total = (row) => Object.assign(row, { total: true });
  D.detailList = (rows) =>
    `<div class="detail-list">${rows.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join("")}</div>`;
  D.progress = (pct) =>
    `<div class="progress" role="img" aria-label="${pct}%"><span style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>`;
  D.state = {};
  const freshData = () => ({
    leads: [
      {
        id: "LD-1084",
        name: "Sarah Mitchell",
        project: "Roof Replacement + Gutters",
        value: 16480,
        source: "Website",
        stage: "New",
        email: "sarah.mitchell@example.com",
        property: "614 Oak Ridge Dr",
        priority: "High",
      },
      {
        id: "LD-1083",
        name: "James Anderson",
        project: "Deck & Fence",
        value: 18420,
        source: "Referral",
        stage: "Qualified",
        email: "james.anderson@example.com",
        property: "218 Riverbend Ln",
        priority: "Normal",
      },
      {
        id: "LD-1082",
        name: "Jordan Bennett",
        project: "Kitchen & Great Room Remodel",
        value: 330000,
        source: "Website",
        stage: "Estimate Sent",
        email: "jordan.bennett@example.com",
        property: "72 Willow Lane",
        priority: "High",
      },
      {
        id: "LD-1081",
        name: "Morgan Carter",
        project: "Gutter Replacement",
        value: 3600,
        source: "Google Business",
        stage: "Won",
        email: "morgan.carter@example.com",
        property: "45 Lakeside Dr",
        priority: "Normal",
      },
      {
        id: "LD-1080",
        name: "Taylor Brooks",
        project: "Exterior Maintenance",
        value: 2400,
        source: "Website",
        stage: "Qualified",
        email: "taylor.brooks@example.com",
        property: "803 Pinecrest Ct",
        priority: "Normal",
      },
    ],
    estimates: [
      {
        id: "E-1084",
        customer: "Sarah Mitchell",
        job: "Roof Replacement + Gutters",
        amount: 16480,
        status: "Draft",
        margin: "33.3%",
      },
      {
        id: "E-1083",
        customer: "James Anderson",
        job: "Deck & Fence",
        amount: 18420,
        status: "Approved",
        margin: "17.0%",
      },
      {
        id: "E-1082",
        customer: "Jordan Bennett",
        job: "Kitchen & Great Room Remodel",
        amount: 330000,
        status: "Approved",
        margin: "20.7%",
      },
      {
        id: "E-1081",
        customer: "Morgan Carter",
        job: "Gutter Replacement",
        amount: 3600,
        status: "Sent",
        margin: "28.0%",
      },
      {
        id: "E-1072",
        customer: "Alex Thompson",
        job: "Roof Replacement + Gutter Upgrade",
        amount: 21840,
        status: "Approved",
        margin: "21.0%",
      },
    ],
    jobs: [
      {
        id: "RV-10427",
        name: "Thompson Residence",
        scope: "Roof Replacement + Gutter Upgrade",
        status: "Completed & Paid",
        amount: 21840,
        margin: 22.7,
        crew: "Roof Crew A",
        progress: 100,
      },
      {
        id: "RM-1047",
        name: "Oak Ridge Remodel",
        scope: "Kitchen & Great Room Remodel",
        status: "In Progress",
        amount: 330000,
        margin: 18.9,
        crew: "Interior Crew B",
        progress: 78,
      },
      {
        id: "3024",
        name: "Anderson Residence",
        scope: "Deck & Fence",
        status: "In Progress",
        amount: 18420,
        margin: 17.0,
        crew: "Exterior Crew C",
        progress: 65,
      },
      {
        id: "1043",
        name: "Harbor Roof Repair",
        scope: "Storm Repair & Flashing",
        status: "Scheduled",
        amount: 12750,
        margin: 26.4,
        crew: "Roof Crew A",
        progress: 15,
      },
    ],
    employees: [
      {
        name: "Mike Reynolds",
        role: "Lead Carpenter",
        est: 120,
        actual: 141,
        rate: 42,
        job: "RM-1047",
      },
      {
        name: "Javier Torres",
        role: "Carpenter",
        est: 160,
        actual: 182.5,
        rate: 35,
        job: "RM-1047",
      },
      {
        name: "Chris Mason",
        role: "Installer",
        est: 80,
        actual: 91,
        rate: 30,
        job: "RM-1047",
      },
      {
        name: "Evan Price",
        role: "Helper",
        est: 60,
        actual: 66.5,
        rate: 22,
        job: "RM-1047",
      },
    ],
    subcontractors: [
      {
        name: "Elite Electric, LLC",
        role: "Electrical",
        est: 80,
        actual: 78,
        rate: 90,
        job: "RM-1047",
      },
      {
        name: "Great Walls Drywall",
        role: "Drywall",
        est: 120,
        actual: 122,
        rate: 65,
        job: "RM-1047",
      },
      {
        name: "Prime Plumbing",
        role: "Plumbing",
        est: 60,
        actual: 58,
        rate: 95,
        job: "RM-1047",
      },
      {
        name: "Summit Tile Co.",
        role: "Tile",
        est: 80,
        actual: 80,
        rate: 70,
        job: "RM-1047",
      },
    ],
    timeEntries: [
      {
        name: "Mike Reynolds",
        type: "Employee",
        job: "RM-1047",
        hours: 8,
        date: "2025-03-03",
        notes: "Great room built-ins",
      },
      {
        name: "Javier Torres",
        type: "Employee",
        job: "RM-1047",
        hours: 8.5,
        date: "2025-03-03",
        notes: "Kitchen cabinet installation",
      },
      {
        name: "Elite Electric, LLC",
        type: "1099 / Subcontractor",
        job: "RM-1047",
        hours: 6,
        date: "2025-03-03",
        notes: "Recessed lighting rough-in",
      },
      {
        name: "Roof Crew A",
        type: "Employee",
        job: "RV-10427",
        hours: 96,
        date: "2024-12-19",
        notes: "Completed roof replacement",
      },
    ],
    purchases: [
      {
        id: "PO-2048",
        supplier: "Builders Supply",
        job: "3024",
        description: "Deck framing & supplies",
        amount: 1599.97,
        status: "Received",
      },
      {
        id: "PO-2047",
        supplier: "Ridgeway Roofing Supply",
        job: "RV-10427",
        description: "Shingles & underlayment",
        amount: 5842,
        status: "Received",
      },
      {
        id: "PO-2046",
        supplier: "Oak Ridge Millwork",
        job: "RM-1047",
        description: "Kitchen cabinets & trim",
        amount: 18500,
        status: "Ordered",
      },
      {
        id: "PO-2045",
        supplier: "Ridgeway Roofing Supply",
        job: "1043",
        description: "Flashing & repair materials",
        amount: 1450,
        status: "In Transit",
      },
    ],
    changes: [
      {
        id: "CO-1047-02",
        job: "RM-1047",
        description: "Great room built-ins & trim",
        amount: 6720,
        status: "Pending Approval",
      },
      {
        id: "CO-RV-01",
        job: "RV-10427",
        description: "Gutter upgrade & additional downspout",
        amount: 1240,
        status: "Approved",
      },
    ],
    invoices: [
      {
        id: "INV-5294",
        customer: "Alex Thompson",
        job: "RV-10427",
        amount: 21840,
        paid: 21840,
        status: "Paid",
        due: "Dec 20, 2024",
      },
      {
        id: "INV-5295",
        customer: "James Anderson",
        job: "3024",
        amount: 9210,
        paid: 0,
        status: "Sent",
        due: "Mar 14, 2025",
      },
      {
        id: "INV-5296",
        customer: "Jordan Bennett",
        job: "RM-1047",
        amount: 82500,
        paid: 41250,
        status: "Partially Paid",
        due: "Mar 10, 2025",
      },
      {
        id: "INV-5297",
        customer: "Morgan Carter",
        job: "1043",
        amount: 3600,
        paid: 0,
        status: "Draft",
        due: "Mar 21, 2025",
      },
    ],
    services: [
      {
        id: "SV-201",
        customer: "Alex Thompson",
        property: "Thompson Residence",
        service: "Annual Roof & Gutter Inspection",
        date: "2025-12-20",
        status: "Scheduled",
      },
      {
        id: "SV-202",
        customer: "Sarah Mitchell",
        property: "Mitchell Residence",
        service: "30-Day Check-In",
        date: "2025-03-15",
        status: "Due Soon",
      },
      {
        id: "SV-203",
        customer: "Morgan Carter",
        property: "Lakeside Residence",
        service: "Gutter Cleaning",
        date: "2025-04-01",
        status: "Scheduled",
      },
    ],
    returns: [
      {
        id: "CR-104",
        supplier: "Builders Supply",
        job: "3024",
        description: "Unused galvanized screws — 1 box",
        amount: 29.5,
        status: "Credit Received",
      },
    ],
    tasks: [
      {
        text: "Call Sarah Mitchell about roof inspection",
        due: "Today",
        done: false,
      },
      {
        text: "Follow up on Morgan Carter estimate",
        due: "Today",
        done: false,
      },
      { text: "Send Thompson warranty reminder", due: "Tomorrow", done: true },
    ],
  });
  function resetState() {
    D.data = freshData();
    D.state = {
      tabs: {},
      filters: {},
      priorities: [true, true, false, false, false],
      receiptDecision: null,
      settings: { notifications: true, weekly: true, margin: true },
      industry: 0,
      jobView: "RV-10427",
    };
  }
  resetState();
  D.modules = [
    ["dashboard", "Dashboard", "home"],
    ["industry-showcase", "Digital Blueprint", "layers"],
    ["leads-crm", "Leads & CRM", "users"],
    ["estimates-proposals", "Estimates & Proposals", "file"],
    ["jobs-projects", "Jobs & Projects", "briefcase"],
    ["scheduling-crews", "Scheduling & Crews", "calendar"],
    ["materials-purchasing", "Materials & Purchasing", "box"],
    ["material-receipt-intelligence", "Receipts & Expenses", "receipt"],
    ["labor-time-tracking", "Labor & Time Tracking", "clock"],
    ["profit-guard-labor-tracking", "Profit Guard™", "shield"],
    ["change-orders", "Change Orders", "arrows"],
    ["invoicing-payments", "Invoicing & Payments", "card"],
    ["property-passport", "Property Passport", "home"],
    ["service-maintenance", "Service & Maintenance", "wrench"],
    ["financial-reporting-tax-prep", "Reporting & Tax Prep", "chart"],
    ["team-subcontractors", "Team & Subcontractors", "users"],
    ["settings", "Settings", "settings"],
  ];
  D.anchors = [
    ["dashboard", "Owner Dashboard"],
    ["industry-showcase", "Digital Blueprint — Industry Showcase"],
    ["connected-business-story", "The Connected Business Story"],
    ["material-receipt-intelligence", "Material Receipt Intelligence"],
    ["profit-guard-labor-tracking", "Profit Guard™ & Labor Tracking"],
    ["financial-reporting-tax-prep", "Financial Reporting & Tax Prep"],
    ["job-lifecycle", "One Job — Completed Lifecycle"],
  ];
  D.renderers = {};
  D.actions = {};
  D.tab = (module, options, defaultTab) => {
    const current = D.state.tabs[module] || defaultTab || options[0][0];
    return `<div class="pill-tabs" role="tablist" aria-label="${D.esc(module.replaceAll("-", " "))} views">${options.map(([key, label]) => `<button role="tab" aria-selected="${current === key}" data-tab="${module}:${key}">${label}</button>`).join("")}</div>`;
  };
  D.activeTab = (module, fallback) => D.state.tabs[module] || fallback;
  D.filter = (rows, fields) => {
    const q = (D.state.filters[D.route] || "").toLowerCase();
    return rows.filter((r) =>
      fields.some((k) => String(r[k]).toLowerCase().includes(q)),
    );
  };
  D.filterInput = (placeholder = "Search this module…") =>
    `<input data-module-filter type="search" aria-label="${D.esc(placeholder)}" placeholder="${D.esc(placeholder)}" value="${D.esc(D.state.filters[D.route] || "")}" />`;
  D.recordLink = (kind, id, label) =>
    `<button class="table-link" data-record="${kind}:${D.esc(id)}">${D.esc(label)}</button>`;
  D.jobLink = (id, label) =>
    `<button class="table-link" data-job="${D.esc(id)}">${D.esc(label || "#" + id)}</button>`;
  D.person = (name, sub) =>
    `<span class="contact-cell"><span class="avatar">${D.esc(
      name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join(""),
    )}</span><span><b>${D.esc(name)}</b><small>${D.esc(sub)}</small></span></span>`;
  D.status = (label) =>
    D.badge(
      label,
      /Pending|Due Soon/.test(label)
        ? "watch"
        : /Draft|Scheduled|Ordered|Sent|In Transit/.test(label)
          ? "neutral"
          : "",
    );
  D.reportCSV = (title, rows) => {
    const quote = (v) => {
      let s = String(v ?? "");
      if (/^[=+@\-]/.test(s)) s = "'" + s;
      return '"' + s.replaceAll('"', '""') + '"';
    };
    const csv = [["PROPEL CONTRACTOR SUITE — SYNTHETIC DEMO", title], ...rows]
      .map((r) => r.map(quote).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download =
      "propel-demo-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".csv";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    D.toast("Synthetic report downloaded.");
  };
  let toastTimer;
  D.toast = (message) => {
    const t = document.querySelector("#toast");
    t.textContent = message;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.hidden = true;
    }, 6500);
  };
  const dialog = () => document.querySelector("#demo-dialog");
  let submitHandler = null;
  D.showDialog = (title, body) => {
    document.querySelector("#dialog-title").textContent = title;
    document.querySelector("#dialog-body").innerHTML = body;
    submitHandler = null;
    if (!dialog().open) dialog().showModal();
  };
  D.form = (title, fields, onSubmit, submitLabel = "Save demo record") => {
    D.showDialog(
      title,
      `<p class="dialog-note">Synthetic demo only. This updates the showcase in memory; no email, payment, or live record is created.</p><form id="record-form"><div class="form-grid">${fields.map((f) => `<label class="field ${f.full ? "full" : ""}">${D.esc(f.label)}${f.options ? `<select name="${f.name}" ${f.required !== false ? "required" : ""}>${f.options.map((o) => `<option value="${D.esc(Array.isArray(o) ? o[0] : o)}">${D.esc(Array.isArray(o) ? o[1] : o)}</option>`).join("")}</select>` : f.type === "textarea" ? `<textarea name="${f.name}" maxlength="1000" ${f.required !== false ? "required" : ""}>${D.esc(f.value || "")}</textarea>` : `<input name="${f.name}" type="${f.type || "text"}" value="${D.esc(f.value || "")}" ${f.required !== false ? "required" : ""} ${f.type === "number" ? 'min="0.01" max="10000000" step="0.01"' : ""} maxlength="140" />`}${f.hint ? `<small>${D.esc(f.hint)}</small>` : ""}</label>`).join("")}</div><div class="form-actions">${D.btn("Cancel", "close-dialog", "light")}<button class="btn primary" type="submit">${D.esc(submitLabel)}</button></div></form>`,
    );
    submitHandler = onSubmit;
  };
  D.jobOptions = () =>
    D.data.jobs.map((j) => [j.id, "#" + j.id + " — " + j.name]);
  D.openJob = (id) => {
    const job = D.data.jobs.find((j) => j.id === id);
    if (!job) return;
    if (id === "RV-10427") {
      location.hash = "job-lifecycle";
      return;
    }
    const href =
      id === "RM-1047"
        ? "profit-guard-labor-tracking"
        : "material-receipt-intelligence";
    D.showDialog(
      "Job #" + id + " — " + job.name,
      `<div class="dialog-detail">${D.status(job.status)}<h3>${D.esc(job.scope)}</h3>${D.detailList(
        [
          ["Contract value", D.money(job.amount)],
          ["Assigned crew", D.esc(job.crew)],
          ["Projected margin", job.margin + "%"],
          ["Progress", job.progress + "%"],
        ],
      )}<h3>Connected job records</h3><p>Scope, crew hours, material purchases, receipts, changes, and invoices share this job number.</p><div class="form-actions">${D.link("Review job profitability", href, "primary", "shield")}${D.link("View crew schedule", "scheduling-crews", "light", "calendar")}</div></div>`,
    );
  };
  D.openRecord = (kind, id) => {
    const sets = {
      lead: ["leads", "Lead"],
      estimate: ["estimates", "Estimate"],
      purchase: ["purchases", "Purchase Order"],
      change: ["changes", "Change Order"],
      invoice: ["invoices", "Invoice"],
      service: ["services", "Service Visit"],
    };
    const set = sets[kind];
    if (!set) return;
    const record = D.data[set[0]].find((r) => r.id === id);
    if (!record) return;
    let rows = Object.entries(record).map(([key, value]) => [
      D.esc(key.replace(/^./, (c) => c.toUpperCase())),
      typeof value === "number" && ["amount", "paid", "value"].includes(key)
        ? D.money(value)
        : D.esc(value),
    ]);
    let actions = "";
    if (kind === "lead")
      actions = `${D.btn("Move to next stage", "advance-lead:" + id, "primary", "arrow")}${D.btn("Create follow-up task", "lead-task:" + id, "light", "clipboard")}`;
    if (kind === "estimate" && record.status !== "Approved")
      actions = D.btn(
        record.status === "Draft" ? "Preview proposal" : "Mark demo approved",
        "estimate-status:" + id,
        "primary",
        "check",
      );
    if (kind === "invoice" && record.status !== "Paid")
      actions = D.btn(
        "Record demo payment",
        "pay-invoice:" + id,
        "primary",
        "card",
      );
    if (kind === "purchase" && record.status !== "Received")
      actions = D.btn(
        "Mark received",
        "receive-purchase:" + id,
        "primary",
        "box",
      );
    if (kind === "change" && record.status !== "Approved")
      actions = D.btn(
        "Mark demo approved",
        "approve-change:" + id,
        "primary",
        "check",
      );
    if (kind === "service" && record.status !== "Completed")
      actions = D.btn(
        "Complete demo visit",
        "complete-service:" + id,
        "primary",
        "check",
      );
    D.showDialog(
      set[1] + " #" + id,
      `<div class="dialog-detail">${D.detailList(rows)}<p class="dialog-note">Illustrative record. All names, addresses, and amounts in this workspace are synthetic examples.</p>${record.job ? D.jobLink(record.job, "Open linked job #" + record.job) : ""}<div class="form-actions">${actions}</div></div>`,
    );
  };
  function sidebar(open) {
    const s = document.querySelector(".sidebar"),
      b = document.querySelector(".sidebar-backdrop"),
      t = document.querySelector(".menu-toggle");
    s.classList.toggle("open", open);
    b.classList.toggle("open", open);
    b.hidden = !open;
    t.setAttribute("aria-expanded", String(open));
    s.inert = innerWidth <= 760 && !open;
    if (open) s.querySelector("[aria-current=page]")?.focus();
  }
  function hidePopovers() {
    document.querySelectorAll(".popover").forEach((x) => (x.hidden = true));
    document
      .querySelectorAll('[aria-controls$="menu"]')
      .forEach((x) => x.setAttribute("aria-expanded", "false"));
  }
  D.render = (focus = false) => {
    const requested =
      location.hash.replace(/^#\/?/, "").replace(/\/$/, "") || "dashboard";
    D.route = Object.hasOwn(D.renderers, requested) ? requested : "dashboard";
    const navRoute =
      D.route === "connected-business-story"
        ? "industry-showcase"
        : D.route === "job-lifecycle"
          ? "jobs-projects"
          : D.route;
    document.querySelectorAll("#module-nav a").forEach((a) => {
      if (a.dataset.route === navRoute) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const main = document.querySelector("main");
    main.classList.toggle(
      "dark-page",
      ["industry-showcase", "connected-business-story"].includes(D.route),
    );
    main.innerHTML =
      D.renderers[D.route]() +
      `<footer class="content-footer"><span>Synthetic demo • No live customer data • Changes reset on reload</span><nav class="anchor-links" aria-label="Continue exploring"><a href="#industry-showcase">Digital Blueprint</a><a href="#connected-business-story">Connected Business Story</a><a href="#job-lifecycle">One Job, Start to Finish</a></nav></footer>`;
    const title = main.querySelector("h1")?.textContent || "Demo";
    document.title = title + " | Propel Contractor Suite Demo";
    if (focus) {
      window.scrollTo({ top: 0, behavior: "instant" });
      main.focus({ preventScroll: true });
    }
    sidebar(false);
    hidePopovers();
  };
  D.actions["close-dialog"] = () => dialog().close();
  D.actions.reset = () => {
    D.showDialog(
      "Reset the synthetic demo?",
      `<p class="dialog-detail">Reset sample records, decisions, tasks, and settings to their starting values. This affects only this open demo.</p><div class="form-actions">${D.btn("Keep exploring", "close-dialog", "light")}${D.btn("Reset demo", "confirm-reset", "primary", "refresh")}</div>`,
    );
  };
  D.actions["confirm-reset"] = () => {
    resetState();
    document.querySelector(".workspace-button>span:nth-child(2)").innerHTML =
      "Saul 2 Paul Builders &amp; Gutters <small>DEMO</small>";
    dialog().close();
    D.render();
    D.toast("Demo restored to the original synthetic data.");
  };
  D.actions["advance-lead"] = (id) => {
    const l = D.data.leads.find((x) => x.id === id);
    const stages = ["New", "Qualified", "Estimate Sent", "Won"];
    l.stage = stages[(stages.indexOf(l.stage) + 1) % stages.length];
    dialog().close();
    D.render();
    D.toast(l.name + " moved to " + l.stage + ".");
  };
  D.actions["lead-task"] = (id) => {
    const l = D.data.leads.find((x) => x.id === id);
    D.data.tasks.unshift({
      text: "Follow up with " + l.name + " — " + l.project,
      due: "Today",
      done: false,
    });
    dialog().close();
    D.state.tabs["leads-crm"] = "tasks";
    location.hash = "leads-crm";
    D.render();
    D.toast("Follow-up task added to the lead workspace.");
  };
  D.actions["estimate-status"] = (id) => {
    const r = D.data.estimates.find((x) => x.id === id);
    if (r.status === "Draft") {
      D.showDialog(
        "Proposal Preview — " + id,
        `<div class="dialog-detail"><div class="eyebrow positive">SYNTHETIC PROPOSAL</div><h3>${D.esc(r.customer)} — ${D.esc(r.job)}</h3><p>Detailed scope, materials, labor, scheduling assumptions, and change-order terms are included in one connected estimate.</p>${D.detailList(
          [
            ["Proposed contract", D.money(r.amount)],
            ["Projected margin", r.margin],
            ["Acceptance", "Demo preview — no signature or delivery"],
          ],
        )}<div class="form-actions">${D.btn("Mark demo sent", "send-estimate:" + id, "primary", "check")}</div></div>`,
      );
    } else {
      r.status = "Approved";
      dialog().close();
      D.render();
      D.toast("Synthetic proposal marked approved.");
    }
  };
  D.actions["send-estimate"] = (id) => {
    D.data.estimates.find((x) => x.id === id).status = "Sent";
    dialog().close();
    D.render();
    D.toast("Demo proposal marked sent. No email was delivered.");
  };
  D.actions["pay-invoice"] = (id) => {
    const r = D.data.invoices.find((x) => x.id === id);
    D.form(
      "Record a demo payment",
      [
        {
          name: "amount",
          label: "Payment amount",
          type: "number",
          value: r.amount - r.paid,
        },
        {
          name: "method",
          label: "Payment method",
          options: ["ACH", "Check", "Card", "Cash"],
        },
      ],
      (f) => {
        const amount = Number(f.amount);
        if (amount > r.amount - r.paid) {
          D.toast("Payment exceeds the outstanding balance.");
          return false;
        }
        r.paid += amount;
        r.status = r.paid >= r.amount ? "Paid" : "Partially Paid";
        D.toast("Demo payment recorded; no money moved.");
        return true;
      },
      "Record demo payment",
    );
  };
  D.actions["receive-purchase"] = (id) => {
    D.data.purchases.find((x) => x.id === id).status = "Received";
    dialog().close();
    D.render();
    D.toast("Purchase marked received and linked to its job.");
  };
  D.actions["approve-change"] = (id) => {
    D.data.changes.find((x) => x.id === id).status = "Approved";
    dialog().close();
    D.render();
    D.toast("Synthetic change order approved.");
  };
  D.actions["complete-service"] = (id) => {
    D.data.services.find((x) => x.id === id).status = "Completed";
    dialog().close();
    D.render();
    D.toast("Visit completed in the demo service history.");
  };
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#module-nav").innerHTML = D.modules
      .map(
        ([route, label, icon]) =>
          `<a class="nav-link" href="#${route}" data-route="${route}">${D.icon(icon)}<span>${label}</span></a>`,
      )
      .join("");
    document.querySelector("#tour-menu").innerHTML =
      "<p><b>Explore the signature experiences</b></p>" +
      D.anchors
        .map(
          ([route, label]) =>
            `<a href="#${route}">${D.icon("layers", "sm")}${label}</a>`,
        )
        .join("");
    document.querySelector(".notifications").innerHTML = D.icon("bell");
    document.querySelector("#notifications-menu").innerHTML =
      '<p><b>3 things need your attention</b></p><a href="#profit-guard-labor-tracking">Margin under pressure — Job #RM-1047</a><a href="#material-receipt-intelligence">$142.97 of unplanned materials found</a><a href="#leads-crm">Sarah Mitchell — new website lead</a>';
    document.querySelector(".skip-link").addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("main").focus();
      document.querySelector("main").scrollIntoView();
    });
    document
      .querySelector(".menu-toggle")
      .addEventListener("click", () =>
        sidebar(!document.querySelector(".sidebar").classList.contains("open")),
      );
    document
      .querySelector(".sidebar-backdrop")
      .addEventListener("click", () => {
        sidebar(false);
        document.querySelector(".menu-toggle").focus();
      });
    for (const [toggle, panel] of [
      ["tour-toggle", "tour-menu"],
      ["profile-toggle", "profile-menu"],
    ])
      document.getElementById(toggle).addEventListener("click", () => {
        const open = document.getElementById(panel).hidden;
        hidePopovers();
        document.getElementById(panel).hidden = !open;
        document
          .getElementById(toggle)
          .setAttribute("aria-expanded", String(open));
      });
    document.querySelector(".notifications").addEventListener("click", () => {
      const p = document.getElementById("notifications-menu"),
        open = p.hidden;
      hidePopovers();
      p.hidden = !open;
      document
        .querySelector(".notifications")
        .setAttribute("aria-expanded", String(open));
    });
    document.querySelector("#demo-search").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase(),
        results = document.getElementById("search-results");
      if (!q) {
        results.hidden = true;
        return;
      }
      const modules = [...D.modules, ...D.anchors].filter(
        ([route, label], i, a) =>
          a.findIndex((r) => r[0] === route) === i &&
          (label + " " + route).toLowerCase().includes(q),
      );
      const jobs = D.data.jobs.filter((j) =>
        (j.id + " " + j.name + " " + j.scope).toLowerCase().includes(q),
      );
      const leads = D.data.leads.filter((l) =>
        (l.name + " " + l.project).toLowerCase().includes(q),
      );
      results.innerHTML =
        modules
          .map(
            ([route, label]) =>
              `<a href="#${route}">${D.icon("layers", "sm")}<span>${D.esc(label)}<small>Module</small></span></a>`,
          )
          .join("") +
          jobs
            .map(
              (j) =>
                `<button data-job="${j.id}">${D.icon("briefcase", "sm")}${D.esc(j.name)} · #${j.id}</button>`,
            )
            .join("") +
          leads
            .map(
              (l) =>
                `<button data-record="lead:${l.id}">${D.icon("users", "sm")}${D.esc(l.name)}</button>`,
            )
            .join("") || "<p>No results. Try “roof”, “labor”, or “Sarah”.</p>";
      results.hidden = false;
    });
    document.addEventListener("click", (e) => {
      const button = e.target.closest(
        "[data-action],[data-tab],[data-record],[data-job]",
      );
      if (button) {
        if (button.dataset.action) {
          const [name, ...rest] = button.dataset.action.split(":");
          D.actions[name]?.(rest.join(":"));
        }
        if (button.dataset.tab) {
          const [module, tab] = button.dataset.tab.split(":");
          D.state.tabs[module] = tab;
          D.render();
          document
            .querySelector(`[data-tab="${module}:${tab}"]`)
            ?.focus({ preventScroll: true });
        }
        if (button.dataset.record) {
          const [kind, id] = button.dataset.record.split(":");
          D.openRecord(kind, id);
        }
        if (button.dataset.job) {
          hidePopovers();
          D.openJob(button.dataset.job);
        }
      }
      if (e.target.closest('a[href^="#"]') && dialog().open) dialog().close();
      if (e.target.closest("#module-nav a")) sidebar(false);
      if (
        !e.target.closest(
          ".popover,.workspace-switch,.profile,.global-search,.notifications-wrap",
        )
      )
        hidePopovers();
    });
    document.addEventListener("submit", (e) => {
      if (e.target.id === "record-form") {
        e.preventDefault();
        const f = Object.fromEntries(new FormData(e.target));
        if (submitHandler?.(f) !== false) {
          dialog().close();
          D.render();
        }
      }
    });
    document.addEventListener("input", (e) => {
      if (e.target.matches("[data-module-filter]")) {
        const start = e.target.selectionStart;
        D.state.filters[D.route] = e.target.value;
        D.render();
        const input = document.querySelector("[data-module-filter]");
        input?.focus({ preventScroll: true });
        if (input?.type === "text") input.setSelectionRange(start, start);
      }
    });
    document.addEventListener("change", (e) => {
      if (e.target.matches("[data-priority]"))
        D.state.priorities[Number(e.target.dataset.priority)] =
          e.target.checked;
      if (e.target.matches("[data-task]"))
        D.data.tasks[Number(e.target.dataset.task)].done = e.target.checked;
      if (e.target.matches("[data-setting]")) {
        D.state.settings[e.target.dataset.setting] = e.target.checked;
        D.toast("Demo preference updated for this session.");
      }
      if (e.target.matches("[data-chart-period]")) {
        const months = e.target.value === "3" ? 3 : 6;
        const target = e.target
          .closest(".card")
          .querySelector("[data-revenue-chart]");
        if (target) target.innerHTML = D.revenueChart(months);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k" &&
        innerWidth > 760
      ) {
        e.preventDefault();
        document.querySelector("#demo-search").focus();
      }
      if (e.key === "Escape") {
        hidePopovers();
        if (document.querySelector(".sidebar").classList.contains("open")) {
          sidebar(false);
          document.querySelector(".menu-toggle").focus();
        }
      }
      const tab = e.target.closest('[role="tab"]');
      if (tab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        const tabs = [...tab.parentElement.querySelectorAll('[role="tab"]')];
        let n = tabs.indexOf(tab);
        n =
          e.key === "Home"
            ? 0
            : e.key === "End"
              ? tabs.length - 1
              : (n + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) %
                tabs.length;
        tabs[n].click();
      }
    });
    dialog().addEventListener("click", (e) => {
      if (e.target === dialog()) {
        const r = dialog().getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dialog().close();
      }
    });
    window.addEventListener("hashchange", () => D.render(true));
    window.addEventListener("resize", () => {
      if (innerWidth > 760) sidebar(false);
      else
        document.querySelector(".sidebar").inert = !document
          .querySelector(".sidebar")
          .classList.contains("open");
    });
    D.render();
  });
})();

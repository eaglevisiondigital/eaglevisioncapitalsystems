/* Module-specific supporting views. All records and actions are synthetic. */
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
  const tabs = (m, list, def) =>
    D.tab(
      m,
      list.map((x) =>
        Array.isArray(x) ? x : [x.toLowerCase().replaceAll(" ", "-"), x],
      ),
      def,
    );
  const toolbar = (placeholder, actions = "") =>
    `<div class="module-toolbar">${D.filterInput(placeholder)}<div class="row">${actions}</div></div>`;
  const moduleCard = (title, body, actions = "") =>
    card(title, body, actions, "module-card");
  const metrics = (items) =>
    `<div class="metrics module-hero-metrics">${items.map((x) => metric(...x)).join("")}</div>`;
  const listTimeline = (rows) =>
    `<ol class="timeline-list">${rows.map(([title, sub]) => `<li><b>${title}</b><small>${sub}</small></li>`).join("")}</ol>`;
  const demoNote =
    '<p class="module-note">Illustrative demo records. Changes apply only to this open showcase and reset on reload.</p>';
  function leadRows() {
    return D.filter(D.data.leads, [
      "name",
      "project",
      "source",
      "stage",
      "property",
    ]).map((l) => [
      D.recordLink("lead", l.id, l.name) +
        '<br /><small class="muted">' +
        esc(l.property) +
        "</small>",
      esc(l.project),
      badge(l.source, "neutral"),
      money(l.value),
      D.status(l.stage),
      D.recordLink("lead", l.id, "Open →"),
    ]);
  }
  D.renderers["leads-crm"] = () => {
    const view = D.activeTab("leads-crm", "inbox"),
      nav = tabs(
        "leads-crm",
        [
          ["inbox", "Lead Inbox"],
          ["pipeline", "Pipeline"],
          ["contact", "Contact & Property"],
          ["tasks", "Follow-Up Tasks"],
          ["sources", "Source Attribution"],
          ["activity", "Activity Timeline"],
        ],
        "inbox",
      );
    let body = "";
    if (view === "inbox")
      body = moduleCard(
        "Every inquiry, one connected inbox",
        toolbar(
          "Search leads, projects, sources…",
          btn("Add Demo Lead", "new-lead", "primary", "plus"),
        ) +
          table(
            [
              "Contact / Property",
              "Project",
              "Source",
              "Est. Value",
              "Stage",
              "",
            ],
            leadRows(),
          ),
      );
    if (view === "pipeline")
      body = card(
        "From first inquiry to a won job",
        `<div class="kanban">${["New", "Qualified", "Estimate Sent", "Won"]
          .map(
            (stage) =>
              `<section class="kanban-column"><h3>${stage}<span>${D.data.leads.filter((l) => l.stage === stage).length}</span></h3>${
                D.data.leads
                  .filter((l) => l.stage === stage)
                  .map(
                    (l) =>
                      `<button class="lead-card" data-record="lead:${l.id}"><strong>${esc(l.name)}</strong><p>${esc(l.project)}</p><small>${esc(l.source)} · ${esc(l.priority)} priority</small><span class="amount">${money(l.value)}</span></button>`,
                  )
                  .join("") ||
                '<p class="muted text-small">No demo leads in this stage yet.</p>'
              }</section>`,
          )
          .join(
            "",
          )}</div><p class="module-note">Open a lead to advance its stage, review the property, or create a follow-up task.</p>`,
      );
    if (view === "contact") {
      const l = D.data.leads[0];
      body = `<div class="grid module-detail-grid">${card(
        "One contact. The whole relationship.",
        `<div class="row">${D.person(l.name, l.email)}${badge(l.stage)}</div>${D.detailList(
          [
            ["Property", esc(l.property)],
            ["Project", esc(l.project)],
            ["Source", esc(l.source)],
            ["Potential value", money(l.value)],
            ["Priority", esc(l.priority)],
          ],
        )}<div class="form-actions">${btn("Create follow-up task", "lead-task:" + l.id, "primary", "clipboard")}${link("Prepare an estimate", "estimates-proposals", "light", "file")}</div>`,
      )}${card(
        "Connected Records",
        listTimeline([
          [
            "Website inquiry received",
            "The contact and property record were created together.",
          ],
          [
            "Roof replacement interest captured",
            "Source attribution: contractor website.",
          ],
          [
            "Inspection ready to schedule",
            "Scope and property notes follow the lead into the estimate.",
          ],
        ]),
      )}</div>`;
    }
    if (view === "tasks")
      body = card(
        "Follow-ups that keep work moving",
        `<div class="priorities">${D.data.tasks.map((t, i) => `<label><input type="checkbox" data-task="${i}" ${t.done ? "checked" : ""}/><span>${esc(t.text)} <small class="muted">· ${esc(t.due)}</small></span></label>`).join("")}</div><div class="form-actions">${btn("Add Follow-Up", "new-task", "primary", "plus")}</div>`,
      );
    if (view === "sources")
      body = `<div class="grid two-col">${card(
        "Know where your next job came from",
        table(
          ["Lead Source", "Demo Leads", "Potential Revenue"],
          ["Website", "Referral", "Google Business"].map((source) => {
            const rows = D.data.leads.filter((l) => l.source.includes(source));
            return [
              source,
              String(rows.length),
              money(rows.reduce((s, l) => s + l.value, 0)),
            ];
          }),
        ),
      )}${card(
        "Website → Lead → CRM",
        `<div class="signal-banner" style="margin:0">${icon("globe")}<div><h2>Attribution stays connected.</h2><p>Capture the website, campaign, and inquiry source with the customer and property record.</p></div></div>${D.detailList(
          [
            ["Landing page", "Roof replacement website"],
            ["Campaign", "Spring Roof Care"],
            ["Source / Medium", "Website / Organic"],
            ["Conversion", "Inspection request"],
          ],
        )}`,
      )}</div>`;
    if (view === "activity")
      body = card(
        "Lead Activity Timeline",
        listTimeline([
          [
            "Sarah Mitchell submitted a website inquiry",
            "Today, 8:42 AM · Roof Replacement + Gutters",
          ],
          [
            "James Anderson qualified for an estimate",
            "Today, 8:15 AM · Deck & Fence",
          ],
          [
            "Morgan Carter estimate opened",
            "Yesterday, 4:22 PM · Gutter Replacement",
          ],
          [
            "Taylor Brooks assigned to follow-up",
            "Yesterday, 2:10 PM · Exterior Maintenance",
          ],
        ]),
      );
    return (
      header(
        "Leads & CRM",
        "Turn every inquiry into a clear next step.",
        "Capture leads, understand the property, and keep the full customer relationship connected.",
        btn("Add Demo Lead", "new-lead", "outline", "plus"),
      ) +
      metrics([
        [
          "Open Leads",
          String(D.data.leads.filter((l) => l.stage !== "Won").length),
          "Live sample records in this demo",
          "users",
        ],
        [
          "Pipeline Value",
          money(
            D.data.leads
              .filter((l) => l.stage !== "Won")
              .reduce((s, l) => s + l.value, 0),
          ),
          "Potential contract value",
          "chart",
        ],
        [
          "Follow-Ups Due",
          String(D.data.tasks.filter((t) => !t.done).length),
          "Keep the next step visible",
          "clipboard",
        ],
        [
          "Website Leads",
          String(
            D.data.leads.filter((l) => l.source.includes("Website")).length,
          ),
          "Captured without re-entry",
          "globe",
        ],
      ]) +
      nav +
      body
    );
  };
  D.renderers["estimates-proposals"] = () => {
    const view = D.activeTab("estimates-proposals", "estimates"),
      nav = tabs(
        "estimates-proposals",
        [
          ["estimates", "Estimates"],
          ["proposal", "Proposal Preview"],
          ["pricing", "Pricing & Margin"],
          ["templates", "Scope Templates"],
        ],
        "estimates",
      );
    let body = "";
    if (view === "estimates")
      body = moduleCard(
        "Estimates & Proposals",
        toolbar(
          "Search estimate, customer, project…",
          btn("New Estimate", "new-estimate", "primary", "plus"),
        ) +
          table(
            [
              "Estimate",
              "Customer / Scope",
              "Amount",
              "Projected Margin",
              "Status",
              "",
            ],
            D.filter(D.data.estimates, ["id", "customer", "job", "status"]).map(
              (r) => [
                D.recordLink("estimate", r.id, "#" + r.id),
                "<b>" +
                  esc(r.customer) +
                  "</b><br /><small>" +
                  esc(r.job) +
                  "</small>",
                money(r.amount),
                badge(r.margin),
                D.status(r.status),
                D.recordLink("estimate", r.id, "Review →"),
              ],
            ),
          ),
      );
    if (view === "proposal")
      body = `<div class="grid module-detail-grid">${card("A proposal your customer can understand", `<div class="row spread"><div><div class="eyebrow positive">PROPOSAL #E-1084</div><h3 style="font-size:24px;margin:12px 0">Sarah Mitchell</h3><p>Roof Replacement + Gutters<br />614 Oak Ridge Dr</p></div>${badge("Draft", "neutral")}</div>${table(["Description", "Quantity", "Amount"], [["Roof replacement", "28 sq", "$14,560.00"], ["Gutter system", "120 ft", "$1,920.00"], total(["Proposed Contract", "", "$16,480.00"])])}<p><b>Included:</b> existing roof removal, approved shingles and underlayment, flashing, installation, cleanup, and the specified gutter system.</p><div class="form-actions">${btn("Preview customer proposal", "estimate-status:E-1084", "primary", "file")}${btn("Export sample estimate", "export-estimate", "light", "download")}</div>`)}${card("Confidence before the job begins", `<ul class="check-list"><li>Clear scope and exclusions</li><li>Materials and labor included</li><li>Profit Guard margin review</li><li>Approval connected to a job</li><li>Change orders tracked against scope</li></ul><div class="total-strip"><span>Estimated Gross Profit</span><b>$5,485</b></div><p class="module-note">Interactive proposal preview only. No email, signature, or live acceptance is requested.</p>`)}</div>`;
    if (view === "pricing")
      body = `<div class="grid two-col">${card(
        "Build the price around the real job cost",
        D.detailList([
          ["Materials", "$6,400"],
          ["Employee & subcontractor labor", "$3,800"],
          ["Equipment & allocated overhead", "$795"],
          ["Total estimated cost", "$10,995"],
          ["Proposed price", "$16,480"],
          ["Gross profit / margin", "$5,485 / 33.3%"],
        ]) +
          `<div class="form-actions">${btn("Try a price scenario", "price-scenario", "primary", "percent")}</div>`,
      )}${card("Profit Guard™ Before You Send", `<div class="empty-state">${icon("shield")}<h3>33.3% projected margin</h3><p>Understand materials, employee labor, 1099 labor, and overhead before the customer sees the proposal.</p>${link("Explore Profit Guard", "profit-guard-labor-tracking", "dark", "shield")}</div>`)}</div>`;
    if (view === "templates")
      body = card(
        "Trade-specific scope starters",
        `<div class="document-grid">${[
          [
            "roof",
            "Roof Replacement",
            "Tear-off, underlayment, shingles, flashing & cleanup",
          ],
          [
            "gutter",
            "Gutter Installation",
            "Measured runs, downspouts, hangers & drainage",
          ],
          [
            "home",
            "Interior Remodel",
            "Demolition, framing, finishes & inspections",
          ],
        ]
          .map(
            ([i, n, c]) =>
              `<div class="document-item">${icon(i)}<b>${n}</b><small>${c}</small>${btn("Use template", "template-estimate:" + n, "small mint")}</div>`,
          )
          .join("")}</div>`,
      );
    return (
      header(
        "Estimates & Proposals",
        "Price with confidence. Present with clarity.",
        "Connect scope, material budgets, labor, and margin before the estimate becomes a job.",
        btn("New Estimate", "new-estimate", "outline", "plus"),
      ) +
      metrics([
        [
          "Open Proposals",
          String(
            D.data.estimates.filter((r) => r.status !== "Approved").length,
          ),
          "Drafts and sent proposals",
          "file",
        ],
        [
          "Approved Contracts",
          String(
            D.data.estimates.filter((r) => r.status === "Approved").length,
          ),
          "Ready to become connected jobs",
          "check",
        ],
        ["Featured Proposal", "$16,480", "Roof Replacement + Gutters", "roof"],
        ["Featured Margin", "33.3%", "Built-in profitability review", "shield"],
      ]) +
      nav +
      body
    );
  };
  D.renderers["jobs-projects"] = () => {
    const view = D.activeTab("jobs-projects", "overview"),
      nav = tabs(
        "jobs-projects",
        [
          ["overview", "Job Overview"],
          ["scope", "Scope"],
          ["crew", "Crew"],
          ["materials", "Materials"],
          ["documents", "Photos & Docs"],
          ["financials", "Financials"],
          ["completion", "Completion"],
        ],
        "overview",
      );
    let body = "";
    if (view === "overview")
      body = card(
        "Jobs at a Glance",
        toolbar(
          "Search job, property, scope, status…",
          link(
            "Completed Job Story",
            "job-lifecycle",
            "primary",
            "circlecheck",
          ),
        ) +
          `<div class="job-tiles">${D.filter(D.data.jobs, [
            "id",
            "name",
            "scope",
            "status",
          ])
            .map(
              (j) =>
                `<article class="job-tile"><div class="job-tile-header"><small>JOB #${j.id}</small><b>${esc(j.name)}</b>${icon("briefcase")}${badge(j.status)}</div><div class="job-tile-body"><p>${esc(j.scope)}</p><div class="row spread"><span>Contract Value</span><b>${money(j.amount)}</b></div>${D.progress(j.progress)}<div class="row spread"><small>${j.progress}% complete · ${esc(j.crew)}</small>${badge(j.margin + "% margin", j.margin < 20 ? "watch" : "")}</div><button class="btn small dark" data-job="${j.id}">Open Job →</button></div></article>`,
            )
            .join("")}</div>`,
      );
    if (view === "scope")
      body = `<div class="grid two-col">${card(
        "Thompson Residence — Approved Scope",
        `<ul class="check-list"><li>Remove existing roofing and inspect decking</li><li>Install approved underlayment and architectural shingles</li><li>Replace flashing, vents, and specified fasteners</li><li>Upgrade gutters and downspouts</li><li>Complete cleanup and final inspection</li></ul>${D.detailList(
          [
            ["Contract value", "$21,840.00"],
            ["Change order", "Gutter upgrade — included"],
            ["Customer approval", "Approved · Nov 10, 2024"],
          ],
        )}`,
      )}${card("Scope stays connected", `<p>Each job carries its accepted estimate, approved changes, material strategy, and crew instructions forward.</p>${link("Follow this job from start to finish", "job-lifecycle", "primary", "arrow")}`)}</div>`;
    if (view === "crew")
      body = moduleCard(
        "Crew Assignments by Job",
        table(
          ["Job", "Assigned Crew", "Status", "Progress"],
          D.data.jobs.map((j) => [
            D.jobLink(j.id, j.name),
            esc(j.crew),
            D.status(j.status),
            j.progress + "%",
          ]),
        ) +
          `<div class="form-actions">${link("Open Scheduling & Crews", "scheduling-crews", "primary", "calendar")}${link("View Labor & Time Tracking", "labor-time-tracking", "light", "clock")}</div>`,
      );
    if (view === "materials")
      body = moduleCard(
        "Materials Follow the Job",
        table(
          ["Purchase", "Job", "Description", "Supplier", "Amount", "Status"],
          D.data.purchases.map((p) => [
            D.recordLink("purchase", p.id, p.id),
            D.jobLink(p.job),
            esc(p.description),
            esc(p.supplier),
            money(p.amount),
            D.status(p.status),
          ]),
        ) +
          `<div class="form-actions">${link("Manage Materials & Purchasing", "materials-purchasing", "primary", "box")}</div>`,
      );
    if (view === "documents")
      body = card(
        "Thompson Residence — Photos & Documents",
        `<div class="document-grid">${[
          ["image", "Completion Photos", "8 categorized photos", "photos"],
          ["file", "Approved Proposal", "E-1072 · $21,840", "proposal"],
          ["shield", "Material Warranty", "Roof & gutter warranty", "warranty"],
          [
            "clipboard",
            "Final Inspection",
            "Completed Dec 19, 2024",
            "inspection",
          ],
          [
            "receipt",
            "Receipt Collection",
            "37 job-linked receipts",
            "receipts",
          ],
          [
            "folder",
            "Job Handoff Package",
            "Scope, warranties & care",
            "handoff",
          ],
        ]
          .map(
            ([i, n, s, k]) =>
              `<div class="document-item">${icon(i)}<b>${n}</b><small>${s}</small>${btn("View", "view-document:" + k, "small mint")}</div>`,
          )
          .join("")}</div>`,
      );
    if (view === "financials")
      body = moduleCard(
        "Job-Level Financial View",
        table(
          ["Job", "Contract Revenue", "Margin", "Status", ""],
          D.data.jobs.map((j) => [
            D.jobLink(j.id, j.name),
            money(j.amount),
            badge(j.margin + "%", j.margin < 20 ? "watch" : ""),
            D.status(j.status),
            `<button class="table-link" data-job="${j.id}">Review financials →</button>`,
          ]),
        ) +
          `<div class="form-actions">${link("Open Profit Guard", "profit-guard-labor-tracking", "primary", "shield")}</div>`,
      );
    if (view === "completion")
      body = `<div class="grid two-col">${card("Ready for a Confident Handoff", `<ul class="check-list"><li>Scope completed and inspection documented</li><li>37 material receipts reconciled to the job</li><li>112.5 labor hours linked to the job</li><li>$21,840 invoice paid in full</li><li>Warranty and care documents attached to the property</li><li>Follow-up and annual inspection ready</li></ul>${link("Explore the completed lifecycle", "job-lifecycle", "primary", "circlecheck")}`)}${card("One job becomes a lasting relationship", `<img src="assets/thompson-residence.webp" width="135" height="174" alt="Synthetic Thompson home" style="width:100%;height:190px;object-fit:cover;object-position:center 35%;border-radius:10px" /><p><b>Thompson Residence</b> — complete, paid, and connected to its Property Passport.</p>${link("Open Property Passport", "property-passport", "light", "home")}`)}</div>`;
    return (
      header(
        "Jobs & Projects",
        "One job. Every detail connected.",
        "Move from approved scope through crews, materials, profitability, and completion.",
        link(
          "One Job — Completed Lifecycle",
          "job-lifecycle",
          "outline",
          "arrow",
        ),
      ) +
      metrics([
        [
          "Tracked Demo Jobs",
          String(D.data.jobs.length),
          "Explore every connected record",
          "briefcase",
        ],
        [
          "In Progress",
          String(D.data.jobs.filter((j) => j.status === "In Progress").length),
          "Crews, costs & scope in view",
          "hardhat",
        ],
        ["Completed & Paid", "1", "Thompson Residence", "circlecheck"],
        [
          "Connected Job Value",
          money(D.data.jobs.reduce((s, j) => s + j.amount, 0)),
          "Illustrative contract values",
          "chart",
        ],
      ]) +
      nav +
      body
    );
  };
  D.renderers["scheduling-crews"] = () => {
    const view = D.activeTab("scheduling-crews", "week"),
      nav = tabs(
        "scheduling-crews",
        [
          ["week", "Week Schedule"],
          ["assignments", "Crew Assignments"],
          ["visits", "Upcoming Visits"],
        ],
        "week",
      );
    let body = "";
    if (view === "week") {
      const events = [
        ["Roof Crew A", "Harbor Roof Repair", "1043", "7:00 AM – 3:30 PM"],
        [
          "Interior Crew B",
          "Oak Ridge Remodel",
          "RM-1047",
          "8:00 AM – 4:30 PM",
        ],
        [
          "Exterior Crew C",
          "Anderson Deck & Fence",
          "3024",
          "7:30 AM – 4:00 PM",
        ],
      ];
      body = card(
        "Crew Schedule — March 3–7, 2025",
        `<div class="module-toolbar"><span class="filter-status">A synthetic week across three connected jobs</span>${btn("Assign Crew / Visit", "new-schedule", "primary", "plus")}</div><div class="calendar-scroll"><div class="calendar"><div class="cal-head">Crew</div>${["Mon 3", "Tue 4", "Wed 5", "Thu 6", "Fri 7"].map((d) => `<div class="cal-head">${d}</div>`).join("")}${events.map(([crew, job, id, time], r) => `<div class="cal-time"><b>${crew}</b></div>${[0, 1, 2, 3, 4].map((d) => `<div>${d === 4 && r === 2 ? '<small class="muted">Weather buffer / closeout</small>' : `<button class="calendar-event ${r === 1 ? "sub" : ""}" data-job="${id}"><b>${job}</b>${time}<br />Job #${id}</button>`}</div>`).join("")}`).join("")}</div></div><p class="module-note">Open a scheduled block to see the linked job, crew, status, and financial context.</p>`,
      );
    }
    if (view === "assignments")
      body = moduleCard(
        "The Right Crew, the Right Job",
        table(
          ["Crew", "Job", "Trade", "Team Size", "Start", "Status"],
          [
            [
              "Roof Crew A",
              D.jobLink("1043"),
              "Roofing",
              "4",
              "7:00 AM",
              badge("Confirmed"),
            ],
            [
              "Interior Crew B",
              D.jobLink("RM-1047"),
              "Carpentry / Remodel",
              "4",
              "8:00 AM",
              badge("Confirmed"),
            ],
            [
              "Exterior Crew C",
              D.jobLink("3024"),
              "Decks & Fences",
              "3",
              "7:30 AM",
              badge("Confirmed"),
            ],
            [
              "Elite Electric, LLC",
              D.jobLink("RM-1047"),
              "1099 Electrical",
              "2",
              "9:00 AM",
              badge("Confirmed"),
            ],
          ],
        ) +
          `<div class="form-actions">${btn("Add Assignment", "new-schedule", "primary", "calendar")}</div>`,
      );
    if (view === "visits")
      body = moduleCard(
        "Inspections, Check-Ins & Service Visits",
        table(
          ["Customer / Property", "Visit", "Scheduled", "Status", ""],
          D.data.services.map((s) => [
            esc(s.customer) + "<br /><small>" + esc(s.property) + "</small>",
            esc(s.service),
            esc(s.date),
            D.status(s.status),
            D.recordLink("service", s.id, "Open →"),
          ]),
        ),
      );
    const assignments = D.state.assignments || [];
    if (assignments.length)
      body += card(
        "Added Demo Assignments",
        table(
          ["Crew / Person", "Job", "Date", "Notes"],
          assignments.map((a) => [
            esc(a.crew),
            D.jobLink(a.job),
            esc(a.date),
            esc(a.notes),
          ]),
        ),
      );
    return (
      header(
        "Scheduling & Crews",
        "Keep the office and field on the same page.",
        "Plan the work, assign the right team, and keep job details with the schedule.",
        btn("Assign Crew / Visit", "new-schedule", "outline", "plus"),
      ) +
      metrics([
        ["Active Crews", "3", "Synthetic weekly schedule", "users"],
        ["Scheduled Job Blocks", "14", "Monday through Friday", "calendar"],
        [
          "Upcoming Visits",
          String(
            D.data.services.filter((s) => s.status !== "Completed").length,
          ),
          "Inspections & maintenance",
          "pin",
        ],
        [
          "Job-Linked Scheduling",
          "100%",
          "Every block opens its job",
          "briefcase",
        ],
      ]) +
      nav +
      body
    );
  };
  const materialRows = [
    ["Roofing Shingles (sq)", "$112.00", "$108.00", "$110.50", "+$4.00"],
    ["OSB Sheathing (4×8)", "$18.75", "$17.90", "$18.25", "+$0.85"],
    ["Gutter (10 ft)", "$27.50", "$27.50", "$29.00", "—"],
    ["2×4 Lumber (8 ft)", "$4.28", "$4.14", "$4.40", "+$0.14"],
    ["Exterior Screws (lb)", "$9.98", "$10.25", "$10.15", "−$0.27"],
  ];
  D.renderers["materials-purchasing"] = () => {
    const view = D.activeTab("materials-purchasing", "lists"),
      nav = tabs(
        "materials-purchasing",
        [
          ["lists", "Material Lists"],
          ["blanket", "Blanket Material Budgets"],
          ["suppliers", "Supplier Price Comparison"],
          ["purchases", "Purchase Tracking"],
          ["returns", "Returns & Credits"],
        ],
        "lists",
      );
    let body = "";
    if (view === "lists")
      body = `<div class="grid module-detail-grid">${moduleCard("Anderson Residence — Estimated Material List", table(["Material", "Quantity", "Estimated Cost"], [["Pressure-Treated 4×4 Post", "8", "$168.00"], ["Pressure-Treated 2×4", "16", "$224.00"], ["Decking 5/4×6", "120 LF", "$612.00"], ["Fence Pickets 1×6×6′", "160", "$352.00"], ["Concrete Mix (80 lb)", "6", "$42.00"], ["Galvanized Screws (box)", "2", "$59.00"], total(["This Purchase", "", " $1,457.00"])]) + `<div class="form-actions">${link("Compare against the receipt", "material-receipt-intelligence", "primary", "receipt")}</div>`)}${card("Job #3024 — Material Budget", `<div class="money-large">$10,860</div><p>Original full-job material budget. This list shows one planned purchase within that allowance.</p><div class="budget-meter"><div class="row spread"><span>Sample purchase planned</span><b>$1,457.00</b></div>${D.progress(13.4)}<div class="row spread"><span>Budget used by this purchase</span><b>13.4%</b></div></div><div class="alert-box">${icon("warning")}<div><b>$142.97 in unplanned extras</b><p>Receipt Intelligence caught materials outside this list.</p></div></div>${link("Review extra materials", "material-receipt-intelligence", "light", "shield")}`)}</div>`;
    if (view === "blanket")
      body = `<div class="grid two-col">${card(
        "Thompson Residence — Blanket Material Strategy",
        `<div class="row spread">${badge("APPLIED")}<span class="text-small">JOB #RV-10427</span></div><h3 style="font-size:24px;margin:18px 0">One agreed material package.<br />A clearer job budget.</h3><p>Roofing, underlayment, fasteners, gutters, and downspouts are covered under pre-negotiated supplier pricing.</p>${D.detailList(
          [
            ["Retail comparison quote", "$9,000.50"],
            ["Actual material spend", "$7,916.50"],
            ["Material savings", "$1,084.00"],
          ],
        )}<div class="form-actions">${link("Open completed job", "job-lifecycle", "primary", "briefcase")}</div>`,
      )}${card("What the Strategy Keeps Visible", `<ul class="check-list"><li>Approved supplier and package scope</li><li>Material quantities linked to the estimate</li><li>Purchases and returns against the allowance</li><li>Receipt exceptions before margin is lost</li><li>Actual material savings at completion</li></ul><div class="total-strip"><span>Realized Sample Savings</span><b>$1,084.00</b></div>`)}</div>`;
    if (view === "suppliers")
      body = moduleCard(
        "Supplier Price Comparison",
        toolbar(
          "Search roofing, lumber, gutters…",
          btn("Export Prices", "export-prices", "mint", "download"),
        ) +
          table(
            [
              "Material",
              "Builders Supply",
              "Ridgeway Supply",
              "Trade Depot",
              "vs. Prior Month",
            ],
            materialRows
              .filter((r) =>
                r
                  .join(" ")
                  .toLowerCase()
                  .includes((D.state.filters[D.route] || "").toLowerCase()),
              )
              .map((r) => [
                r[0],
                r[1],
                r[2],
                r[3],
                `<b class="${r[4].startsWith("+") ? "negative" : "positive"}">${r[4]}</b>`,
              ]),
          ) +
          '<p class="module-note">Synthetic supplier prices for comparison only. No supplier connection or live price feed is used.</p>',
      );
    if (view === "purchases")
      body = moduleCard(
        "Purchase Tracking",
        toolbar(
          "Search purchase, supplier, job…",
          btn("Add Purchase", "new-purchase", "primary", "plus"),
        ) +
          table(
            [
              "Purchase",
              "Supplier / Description",
              "Job",
              "Amount",
              "Status",
              "",
            ],
            D.filter(D.data.purchases, [
              "id",
              "supplier",
              "job",
              "description",
              "status",
            ]).map((p) => [
              D.recordLink("purchase", p.id, p.id),
              "<b>" +
                esc(p.supplier) +
                "</b><br /><small>" +
                esc(p.description) +
                "</small>",
              D.jobLink(p.job),
              money(p.amount),
              D.status(p.status),
              D.recordLink("purchase", p.id, "Review →"),
            ]),
          ),
      );
    if (view === "returns")
      body = moduleCard(
        "Returns & Supplier Credits",
        table(
          ["Credit", "Supplier", "Job", "Description", "Amount", "Status"],
          D.data.returns.map((r) => [
            esc(r.id),
            esc(r.supplier),
            D.jobLink(r.job),
            esc(r.description),
            money(r.amount),
            badge(r.status),
          ]),
        ) +
          `<div class="form-actions">${btn("Record Return / Credit", "new-return", "primary", "refresh")}</div><p class="module-note">Track unused material returns so credited costs do not disappear from the job’s financial picture.</p>`,
      );
    return (
      header(
        "Materials & Purchasing",
        "Know what you planned. Know what you bought.",
        "Connect material lists, supplier prices, purchase tracking, and receipt reconciliation.",
        btn("Add Purchase", "new-purchase", "outline", "plus"),
      ) +
      metrics([
        ["Material Budget", "$10,860", "Anderson Deck & Fence", "box"],
        [
          "Planned Sample Purchase",
          "$1,457",
          "Six estimated material lines",
          "clipboard",
        ],
        [
          "Detected Extras",
          "$142.97",
          "Three unplanned receipt items",
          "warning",
        ],
        ["Blanket Strategy Savings", "$1,084", "Thompson Residence", "shield"],
      ]) +
      nav +
      body
    );
  };
  D.renderers["labor-time-tracking"] = () => {
    const view = D.activeTab("labor-time-tracking", "employees"),
      nav = tabs(
        "labor-time-tracking",
        [
          ["employees", "Employee Hours"],
          ["subcontractors", "1099 / Subcontractor Hours"],
          ["entries", "Time Entries"],
        ],
        "employees",
      );
    const people =
      view === "subcontractors" ? D.data.subcontractors : D.data.employees;
    let body =
      view === "entries"
        ? moduleCard(
            "Hours Tied to a Specific Job",
            toolbar(
              "Search person, job, date, notes…",
              btn("Log Time", "new-time", "primary", "clock"),
            ) +
              table(
                ["Person / Type", "Job", "Date", "Hours", "Work Detail"],
                D.filter(D.data.timeEntries, [
                  "name",
                  "job",
                  "date",
                  "notes",
                  "type",
                ]).map((r) => [
                  "<b>" +
                    esc(r.name) +
                    "</b><br /><small>" +
                    esc(r.type) +
                    "</small>",
                  D.jobLink(r.job),
                  esc(r.date),
                  r.hours.toFixed(1),
                  esc(r.notes),
                ]),
              ),
          )
        : moduleCard(
            view === "subcontractors"
              ? "1099 / Subcontractor Hours — Job #RM-1047"
              : "Employee Labor Hours — Job #RM-1047",
            toolbar(
              "Search team member, trade, job…",
              btn("Log Time", "new-time", "primary", "clock"),
            ) +
              table(
                [
                  "Person / Trade",
                  "Job",
                  "Est. Hours",
                  "Actual Hours",
                  "Variance",
                  "Hourly Rate",
                ],
                D.filter(people, ["name", "role", "job"]).map((p) => [
                  D.person(p.name, p.role),
                  D.jobLink(p.job),
                  p.est.toFixed(1),
                  p.actual.toFixed(1),
                  `<b class="${p.actual > p.est ? "negative" : "positive"}">${p.actual > p.est ? "+" : ""}${(p.actual - p.est).toFixed(1)} hrs</b>`,
                  money(p.rate),
                ]),
              ) +
              `<p class="module-note">Job-assigned sample rates and recorded hours are visible together. Profit Guard uses the full forecast including remaining work, equipment, and allocated overhead.</p>`,
          );
    return (
      header(
        "Labor & Time Tracking",
        "Every hour belongs to a job.",
        "Track employee hours and 1099 / subcontractor hours separately, then see their effect on job profitability.",
        btn("Log Time", "new-time", "outline", "plus"),
      ) +
      metrics([
        [
          "Employee Hours",
          D.data.employees.reduce((s, p) => s + p.actual, 0).toFixed(1),
          "Job #RM-1047 · 420.0 estimated",
          "users",
        ],
        [
          "1099 / Subcontractor Hours",
          D.data.subcontractors.reduce((s, p) => s + p.actual, 0).toFixed(1),
          "Job #RM-1047 · 340.0 estimated",
          "hardhat",
        ],
        [
          "Employee Variance",
          "+" +
            D.data.employees
              .reduce((s, p) => s + p.actual - p.est, 0)
              .toFixed(1) +
            " hrs",
          "Review the great room scope",
          "warning",
        ],
        [
          "Projected Job Margin",
          "18.9%",
          "Employee & 1099 costs included",
          "shield",
        ],
      ]) +
      nav +
      body +
      `<div class="grid two-col" style="margin-top:14px">${card("Protect Job-Level Profitability", `<p>Separate employee and 1099 activity, keep both tied to the job, and catch labor overruns while there is time to act.</p>${link("See why the margin changed", "profit-guard-labor-tracking", "primary", "shield")}`)}${card(
        "Job #RM-1047 — Labor Review",
        D.detailList([
          ["Employee labor forecast", "$54,720"],
          ["1099 / subcontractor forecast", "$55,500"],
          ["Scope watch", "Built-ins & trim"],
          ["Next action", "Review pending change order"],
        ]),
      )}</div>`
    );
  };
  D.renderers["change-orders"] = () => {
    const view = D.activeTab("change-orders", "all"),
      nav = tabs(
        "change-orders",
        [
          ["all", "All Change Orders"],
          ["pending", "Pending Approval"],
          ["approved", "Approved Changes"],
        ],
        "all",
      );
    let rows = D.data.changes.filter(
      (c) =>
        view === "all" ||
        (view === "pending"
          ? c.status !== "Approved"
          : c.status === "Approved"),
    );
    rows = D.filter(rows, ["id", "job", "description", "status"]);
    return (
      header(
        "Change Orders",
        "Document the change. Protect the margin.",
        "Keep scope additions, material exceptions, approvals, and financial impact connected to the original job.",
        btn("New Change Order", "new-change", "outline", "plus"),
      ) +
      metrics([
        [
          "Change Orders",
          String(D.data.changes.length),
          "Connected to specific jobs",
          "arrows",
        ],
        [
          "Pending Value",
          money(
            D.data.changes
              .filter((c) => c.status !== "Approved")
              .reduce((s, c) => s + c.amount, 0),
          ),
          "Review before work proceeds",
          "file",
        ],
        [
          "Approved Value",
          money(
            D.data.changes
              .filter((c) => c.status === "Approved")
              .reduce((s, c) => s + c.amount, 0),
          ),
          "Documented scope changes",
          "check",
        ],
        [
          "Receipt Intelligence",
          "$142.97",
          "Unplanned material exception",
          "receipt",
        ],
      ]) +
      nav +
      moduleCard(
        "Job-Linked Change Orders",
        toolbar(
          "Search change, job, scope…",
          btn("New Change Order", "new-change", "primary", "plus"),
        ) +
          table(
            ["Change Order", "Job", "Scope / Reason", "Amount", "Status", ""],
            rows.map((c) => [
              D.recordLink("change", c.id, c.id),
              D.jobLink(c.job),
              esc(c.description),
              money(c.amount),
              D.status(c.status),
              D.recordLink("change", c.id, "Review →"),
            ]),
          ),
      ) +
      `<div class="grid two-col" style="margin-top:14px">${card("A Receipt Can Reveal a Scope Gap", `<p>Post caps, exterior stain, and a roller kit were detected outside the original Anderson material list. Review the receipt and decide whether the cost belongs in a change order.</p>${link("Review Material Receipt Intelligence", "material-receipt-intelligence", "primary", "receipt")}`)}${card(
        "Great Room Built-Ins & Trim",
        D.detailList([
          ["Job", "#RM-1047"],
          ["Employee labor impact", "+$6,720"],
          ["Approval", "Pending demo approval"],
          ["Profit visibility", "Included in Profit Guard review"],
        ]),
      )}</div>`
    );
  };
  D.renderers["invoicing-payments"] = () => {
    const view = D.activeTab("invoicing-payments", "invoices"),
      nav = tabs(
        "invoicing-payments",
        [
          ["invoices", "Invoices"],
          ["payments", "Payments"],
          ["receivables", "Accounts Receivable"],
        ],
        "invoices",
      );
    const due = D.data.invoices.reduce((s, i) => s + i.amount - i.paid, 0);
    let body = "";
    if (view === "invoices")
      body = moduleCard(
        "Invoices Connected to the Work",
        toolbar(
          "Search invoice, customer, job…",
          btn("Create Invoice", "new-invoice", "primary", "plus"),
        ) +
          table(
            ["Invoice", "Customer", "Job", "Amount", "Balance", "Status", ""],
            D.filter(D.data.invoices, ["id", "customer", "job", "status"]).map(
              (i) => [
                D.recordLink("invoice", i.id, i.id),
                esc(i.customer),
                D.jobLink(i.job),
                money(i.amount),
                money(i.amount - i.paid),
                D.status(i.status),
                D.recordLink("invoice", i.id, "Review →"),
              ],
            ),
          ),
      );
    if (view === "payments")
      body = moduleCard(
        "Recorded Demo Payments",
        table(
          ["Invoice", "Customer", "Job", "Paid", "Method", "Status"],
          D.data.invoices
            .filter((i) => i.paid > 0)
            .map((i) => [
              D.recordLink("invoice", i.id, i.id),
              esc(i.customer),
              D.jobLink(i.job),
              money(i.paid),
              i.id === "INV-5294" ? "ACH" : "Progress Payment",
              badge("Recorded"),
            ]),
        ) +
          `<p class="module-note">Synthetic payment records only. There is no payment processor or ability to charge a card in this demo.</p>`,
      );
    if (view === "receivables")
      body = moduleCard(
        "Outstanding Balances",
        table(
          ["Invoice", "Customer", "Due Date", "Amount", "Balance", ""],
          D.data.invoices
            .filter((i) => i.paid < i.amount)
            .map((i) => [
              D.recordLink("invoice", i.id, i.id),
              esc(i.customer),
              esc(i.due),
              money(i.amount),
              "<b>" + money(i.amount - i.paid) + "</b>",
              btn(
                "Record Demo Payment",
                "pay-invoice:" + i.id,
                "small mint",
                "card",
              ),
            ]),
        ) +
          `<div class="total-strip" style="margin-top:12px"><span>Outstanding Demo Balance</span><b>${money(due)}</b></div>`,
      );
    return (
      header(
        "Invoicing & Payments",
        "From completed work to confident cash flow.",
        "Carry the approved scope and job record into invoices, payments, and reporting.",
        btn("Create Invoice", "new-invoice", "outline", "plus"),
      ) +
      metrics([
        [
          "Invoice Total",
          money(D.data.invoices.reduce((s, i) => s + i.amount, 0)),
          "Across visible demo records",
          "file",
        ],
        [
          "Payments Recorded",
          money(D.data.invoices.reduce((s, i) => s + i.paid, 0)),
          "Synthetic payments only",
          "card",
        ],
        ["Outstanding", money(due), "Track each invoice balance", "clock"],
        ["Thompson Residence", "$0", "Completed & paid in full", "circlecheck"],
      ]) +
      nav +
      body
    );
  };
  D.renderers["property-passport"] = () => {
    const view = D.activeTab("property-passport", "overview"),
      nav = tabs(
        "property-passport",
        [
          ["overview", "Property Overview"],
          ["history", "Connected History"],
          ["documents", "Documents & Warranties"],
          ["care", "Service & Follow-Up"],
        ],
        "overview",
      );
    let body = "";
    if (view === "overview")
      body = `<div class="grid module-detail-grid">${card("Thompson Residence", `<div class="job-overview"><img src="assets/thompson-residence.webp" width="135" height="174" alt="Approved Thompson property photograph" style="height:225px;width:40%" /><div><span><b>PROPERTY</b>Thompson Residence</span><span><b>ADDRESS</b>1234 Ridgeview Dr<br />Oak Ridge, TN 37830</span><span><b>COMPLETED WORK</b>Roof Replacement + Gutter Upgrade</span><span><b>OWNER RECORD</b>Alex Thompson · Synthetic Contact</span><span>${badge("Completed & Paid")}</span></div></div>`)}${card(
        "The Property Keeps Its Story",
        D.detailList([
          ["Connected job", "#RV-10427"],
          ["Final invoice", "$21,840 — paid"],
          ["Receipts", "37 categorized"],
          ["Labor", "112.5 job-linked hours"],
          ["Documents", "12 connected records"],
          ["Next service", "Annual roof & gutter inspection"],
        ]) +
          `<div class="form-actions">${link("See the completed lifecycle", "job-lifecycle", "primary", "arrow")}</div>`,
      )}</div>`;
    if (view === "history")
      body = card(
        "A Permanent Record of the Work",
        listTimeline([
          [
            "Nov 5, 2024 — Website lead captured",
            "Contact, property, project, and source connected.",
          ],
          [
            "Nov 10, 2024 — Proposal approved",
            "Roof Replacement + Gutter Upgrade · $21,840.",
          ],
          [
            "Nov 15, 2024 — Gutter change documented",
            "Approved scope addition attached to the job.",
          ],
          [
            "Dec 19, 2024 — Job completed",
            "37 receipts, 112.5 labor hours, and final inspection recorded.",
          ],
          [
            "Dec 20, 2024 — Invoice paid in full",
            "Actual job profit: $4,954.50 · 22.7% margin.",
          ],
          [
            "Dec 20, 2025 — Annual inspection scheduled",
            "The next service starts with the complete property history.",
          ],
        ]),
      );
    if (view === "documents")
      body = card(
        "Documents & Warranties",
        `<div class="document-grid">${[
          [
            "shield",
            "Roof & Gutter Warranty",
            "Manufacturer & installation records",
            "warranty",
          ],
          ["file", "Final Invoice", "INV-5294 · Paid in full", "invoice"],
          [
            "clipboard",
            "Inspection Report",
            "Final inspection · Dec 19, 2024",
            "inspection",
          ],
          [
            "image",
            "Project Photos",
            "Before, progress, and completed work",
            "photos",
          ],
          [
            "box",
            "Material Specifications",
            "Shingles, underlayment & gutter finish",
            "materials",
          ],
          [
            "folder",
            "Owner Handoff",
            "Care instructions and service details",
            "handoff",
          ],
        ]
          .map(
            ([i, n, c, k]) =>
              `<div class="document-item">${icon(i)}<b>${n}</b><small>${c}</small>${btn("View Record", "view-document:" + k, "small mint")}</div>`,
          )
          .join("")}</div>`,
      );
    if (view === "care")
      body = `<div class="grid two-col">${card(
        "Stay Connected After Completion",
        D.detailList([
          ["30-day check-in", badge("Completed")],
          ["Warranty reminder", badge("Scheduled", "neutral")],
          ["Annual inspection", "Dec 20, 2025"],
          ["Connected service plan", "Roof & Gutter Care"],
        ]) +
          `<div class="form-actions">${btn("Schedule Follow-Up", "new-service", "primary", "calendar")}</div>`,
      )}${card("Better Service Starts with Context", `<p>The next crew can see what was installed, what changed, which materials were used, and which warranty documents belong to this property.</p>${link("Open Service & Maintenance", "service-maintenance", "primary", "wrench")}`)}</div>`;
    return (
      header(
        "Property Passport",
        "The job ends. The property story continues.",
        "Connect job history, materials, warranties, documents, and future service in one property record.",
        btn(
          "Export Property Summary",
          "export-passport",
          "outline",
          "download",
        ),
      ) +
      metrics([
        ["Completed Jobs", "1", "Thompson Residence", "briefcase"],
        ["Connected Receipts", "37", "Categorized and job-linked", "receipt"],
        ["Property Documents", "12", "Warranties, photos & records", "folder"],
        [
          "Next Inspection",
          "Dec 20",
          "2025 · Annual Roof & Gutter Care",
          "calendar",
        ],
      ]) +
      nav +
      body
    );
  };
  D.renderers["service-maintenance"] = () => {
    const view = D.activeTab("service-maintenance", "visits"),
      nav = tabs(
        "service-maintenance",
        [
          ["visits", "Service Visits"],
          ["plans", "Maintenance Plans"],
          ["follow-ups", "Follow-Up Automation"],
        ],
        "visits",
      );
    let body = "";
    if (view === "visits")
      body = moduleCard(
        "Connected Service Visits",
        toolbar(
          "Search customer, service, status…",
          btn("Schedule Service", "new-service", "primary", "plus"),
        ) +
          table(
            ["Visit", "Customer / Property", "Service", "Date", "Status", ""],
            D.filter(D.data.services, [
              "customer",
              "property",
              "service",
              "date",
              "status",
            ]).map((s) => [
              D.recordLink("service", s.id, s.id),
              "<b>" +
                esc(s.customer) +
                "</b><br /><small>" +
                esc(s.property) +
                "</small>",
              esc(s.service),
              esc(s.date),
              D.status(s.status),
              D.recordLink("service", s.id, "Open →"),
            ]),
          ),
      );
    if (view === "plans")
      body = card(
        "Long-Term Care Built Around the Property",
        `<div class="document-grid">${[
          [
            "roof",
            "Roof & Gutter Care",
            "Annual roof inspection, gutter condition review, and maintenance notes.",
          ],
          [
            "home",
            "Home Exterior Care",
            "Seasonal exterior checks, deck and fence care, and small repairs.",
          ],
          [
            "wrench",
            "Remodel Warranty Check",
            "Post-project check-in, finish review, and warranty follow-through.",
          ],
        ]
          .map(
            ([i, n, c]) =>
              `<div class="document-item">${icon(i)}<b>${n}</b><small>${c}</small>${btn("View Plan", "service-plan:" + n, "small mint")}</div>`,
          )
          .join("")}</div>`,
      );
    if (view === "follow-ups")
      body = `<div class="grid two-col">${card(
        "Thompson Residence — Follow-Up Sequence",
        listTimeline([
          [
            "30-Day Check-In — Completed",
            "Confirm the roof and gutter system are performing as expected.",
          ],
          [
            "Warranty Reminder — Scheduled",
            "Keep manufacturer and installation documents easy to find.",
          ],
          [
            "Annual Service Offer — Scheduled",
            "Invite the owner to a property-specific inspection.",
          ],
        ]) +
          `<div class="form-actions">${btn("Add Follow-Up Task", "new-task", "primary", "clipboard")}</div>`,
      )}${card("A Complete Relationship, Beyond One Job", `<p>Property history, installed materials, warranty details, and completed work give every follow-up context.</p><ul class="check-list"><li>Fewer missed details</li><li>Timely property care</li><li>Clearer conversations with customers</li><li>More repeat business and referrals</li></ul>${link("Explore Property Passport", "property-passport", "dark", "home")}`)}</div>`;
    return (
      header(
        "Service & Maintenance",
        "Turn one completed job into a lasting relationship.",
        "Keep inspections, maintenance, and follow-ups connected to the property and its history.",
        btn("Schedule Service", "new-service", "outline", "plus"),
      ) +
      metrics([
        [
          "Upcoming Visits",
          String(
            D.data.services.filter((s) => s.status !== "Completed").length,
          ),
          "Service, inspections & check-ins",
          "calendar",
        ],
        [
          "Property Care Plans",
          "3",
          "Specific to the work performed",
          "wrench",
        ],
        [
          "Follow-Up Sequence",
          "3 Steps",
          "Check-in, warranty, annual offer",
          "refresh",
        ],
        [
          "Connected Property",
          "Thompson",
          "Full job and warranty context",
          "home",
        ],
      ]) +
      nav +
      body
    );
  };
  D.renderers["team-subcontractors"] = () => {
    const view = D.activeTab("team-subcontractors", "employees"),
      nav = tabs(
        "team-subcontractors",
        [
          ["employees", "Employees"],
          ["subcontractors", "1099 / Subcontractors"],
          ["access", "Roles & Access"],
        ],
        "employees",
      );
    const people =
      view === "subcontractors" ? D.data.subcontractors : D.data.employees;
    const body =
      view === "access"
        ? card(
            "Clear Responsibilities Across the Business",
            table(
              ["Demo Role", "Typical Access", "Purpose"],
              [
                [
                  "Owner / Admin",
                  "All modules & financials",
                  "Business oversight, settings, and reporting",
                ],
                [
                  "Office Manager",
                  "CRM, estimates, schedules & invoices",
                  "Coordinate the customer and job workflow",
                ],
                [
                  "Crew Lead",
                  "Assigned jobs, crew hours & documents",
                  "Keep the field team aligned",
                ],
                [
                  "Subcontractor",
                  "Assigned work & own time entries",
                  "Keep 1099 activity tied to the job",
                ],
                [
                  "Bookkeeper / CPA",
                  "Financial reports & export packages",
                  "Review categorized financial records",
                ],
              ],
            ) +
              `<p class="module-note">Role examples describe the product story. This static demo does not authenticate users or grant real permissions.</p>`,
          )
        : moduleCard(
            view === "subcontractors"
              ? "Subcontractor Directory"
              : "Employee Directory",
            toolbar(
              "Search name, role, trade…",
              btn("Add Demo Team Member", "new-team", "primary", "plus"),
            ) +
              table(
                [
                  "Person / Company",
                  "Trade / Role",
                  "Job",
                  "Sample Rate",
                  "Hours",
                  "Status",
                ],
                D.filter(people, ["name", "role", "job"]).map((p) => [
                  D.person(
                    p.name,
                    view === "subcontractors"
                      ? "1099 / Subcontractor"
                      : "Employee",
                  ),
                  esc(p.role),
                  D.jobLink(p.job),
                  money(p.rate) + "/hr",
                  p.actual.toFixed(1),
                  badge("Active"),
                ]),
              ),
          );
    return (
      header(
        "Team & Subcontractors",
        "One team picture. Clear job assignments.",
        "Keep employees and 1099 / subcontractors visible, organized, and connected to the work.",
        btn("Add Demo Team Member", "new-team", "outline", "plus"),
      ) +
      metrics([
        [
          "Employees",
          String(D.data.employees.length),
          "Assigned demo team members",
          "users",
        ],
        [
          "1099 / Subcontractors",
          String(D.data.subcontractors.length),
          "Separate activity and job hours",
          "hardhat",
        ],
        [
          "Assigned Job",
          "#RM-1047",
          "Kitchen & Great Room Remodel",
          "briefcase",
        ],
        [
          "Job-Linked Hours",
          [...D.data.employees, ...D.data.subcontractors]
            .reduce((s, p) => s + p.actual, 0)
            .toFixed(1),
          "Employees + 1099 sample total",
          "clock",
        ],
      ]) +
      nav +
      body
    );
  };
  D.renderers.settings = () => {
    const view = D.activeTab("settings", "workspace"),
      nav = tabs(
        "settings",
        [
          ["workspace", "Workspace"],
          ["preferences", "Preferences"],
          ["demo", "About This Demo"],
        ],
        "workspace",
      );
    let body = "";
    if (view === "workspace")
      body = `<div class="grid settings-layout">${card("Demo Workspace", `<form id="workspace-form"><div class="form-grid"><label class="field full">Business Display Name<input name="business" value="${esc(D.state.businessName || "Saul 2 Paul Builders & Gutters")}" maxlength="80" required /></label><label class="field">Primary Trade<select name="trade">${["General Contractor", "Roofing & Gutters", "Remodeling", "Decks & Fences"].map((t) => `<option ${D.state.primaryTrade === t ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></label><label class="field">Reporting Period<input value="Illustrative 2024–2025" readonly /></label><label class="field full">Demo Contact<input value="demo@example.com" readonly /><small>Reserved example address. No messages are sent.</small></label></div><div class="form-actions"><button class="btn primary" type="submit">Save Demo Workspace</button></div></form>`)}${card("One Consistent Operating Picture", `<ul class="check-list"><li>One persistent sidebar across every module</li><li>Job-linked materials, receipts, and hours</li><li>Employee and 1099 activity separated</li><li>Profitability visible throughout the job</li><li>Organized reporting for a bookkeeper or CPA</li></ul>${link("See the connected business story", "connected-business-story", "dark", "layers")}`)}</div>`;
    if (view === "preferences")
      body = card(
        "Demo Notifications & Preferences",
        `<label class="toggle-row"><span><b>Profit Guard margin alerts</b><small>Make job-level cost changes visible.</small></span><input type="checkbox" data-setting="margin" ${D.state.settings.margin ? "checked" : ""}/></label><label class="toggle-row"><span><b>Receipt exception notifications</b><small>Highlight materials not in the estimate.</small></span><input type="checkbox" data-setting="notifications" ${D.state.settings.notifications ? "checked" : ""}/></label><label class="toggle-row"><span><b>Weekly business summary</b><small>Include revenue, job status, labor, and follow-ups.</small></span><input type="checkbox" data-setting="weekly" ${D.state.settings.weekly ? "checked" : ""}/></label>${demoNote}`,
      );
    if (view === "demo")
      body = card(
        "Explore the Complete Contractor Suite",
        `<p>This is an interactive synthetic showcase of the Propel Contractor Suite product vision. It is not a live contractor account.</p><p>All records are illustrative. Actions stay in memory, reset on reload, and never contact customers, process payments, or connect to a backend.</p><div class="document-grid">${D.anchors.map(([r, n]) => `<a class="document-item" href="#${r}">${icon("layers")}<b>${n}</b><small>Open signature experience →</small></a>`).join("")}</div><div class="form-actions">${btn("Reset Demo Data", "reset", "light", "refresh")}${link("Start at the dashboard", "dashboard", "primary", "home")}</div>`,
      );
    return (
      header(
        "Settings",
        "A workspace built around your business.",
        "Explore the demo profile, notification preferences, and connected product story.",
      ) +
      nav +
      body
    );
  };
  let serial = 6000;
  const id = (prefix) => prefix + "-" + ++serial;
  D.actions["new-lead"] = () =>
    D.form(
      "Add a Synthetic Lead",
      [
        { name: "name", label: "Contact name", value: "Jamie Parker" },
        { name: "property", label: "Property", value: "125 Sample Lane" },
        {
          name: "project",
          label: "Project",
          value: "Roof & Gutter Replacement",
        },
        {
          name: "value",
          label: "Potential contract value",
          type: "number",
          value: 18000,
        },
        {
          name: "source",
          label: "Lead source",
          options: [
            "Website",
            "Referral",
            "Google Business",
            "Social Campaign",
          ],
        },
      ],
      (f) => {
        D.data.leads.unshift({
          id: id("LD"),
          name: f.name,
          property: f.property,
          project: f.project,
          value: Number(f.value),
          source: f.source,
          stage: "New",
          email: "demo@example.com",
          priority: "Normal",
        });
        D.toast("Synthetic lead added to the inbox and pipeline.");
        return true;
      },
    );
  D.actions["new-task"] = () =>
    D.form(
      "Create a Demo Follow-Up",
      [
        {
          name: "text",
          label: "Follow-up task",
          value: "Check in about the project estimate",
          full: true,
        },
        {
          name: "due",
          label: "Due",
          options: ["Today", "Tomorrow", "This Week"],
        },
      ],
      (f) => {
        D.data.tasks.unshift({ text: f.text, due: f.due, done: false });
        D.toast("Follow-up task added to Leads & CRM.");
        return true;
      },
    );
  function newEstimate(template = "Roof Replacement") {
    D.form(
      "Create a Synthetic Estimate",
      [
        { name: "customer", label: "Customer", value: "Jamie Parker" },
        { name: "job", label: "Scope / Project", value: template },
        {
          name: "amount",
          label: "Proposed contract value",
          type: "number",
          value: 18000,
        },
        {
          name: "margin",
          label: "Target gross margin (%)",
          type: "number",
          value: 28,
        },
      ],
      (f) => {
        const margin = Number(f.margin);
        if (margin >= 100) {
          D.toast("Use a margin below 100%.");
          return false;
        }
        D.data.estimates.unshift({
          id: id("E"),
          customer: f.customer,
          job: f.job,
          amount: Number(f.amount),
          status: "Draft",
          margin: margin.toFixed(1) + "%",
        });
        D.toast("Draft demo estimate created with a target margin.");
        return true;
      },
    );
  }
  D.actions["new-estimate"] = () => newEstimate();
  D.actions["template-estimate"] = (name) => newEstimate(name);
  D.actions["export-estimate"] = () =>
    D.reportCSV("E-1084 Estimate", [
      ["Customer", "Scope", "Amount"],
      ["Sarah Mitchell", "Roof Replacement", 14560],
      ["Sarah Mitchell", "Gutters", 1920],
      ["", "Total", 16480],
    ]);
  D.actions["price-scenario"] = () =>
    D.form(
      "Try a Pricing Scenario",
      [
        {
          name: "cost",
          label: "Estimated full job cost",
          type: "number",
          value: 10995,
        },
        {
          name: "price",
          label: "Proposed contract price",
          type: "number",
          value: 16480,
        },
      ],
      (f) => {
        const cost = Number(f.cost),
          price = Number(f.price),
          profit = price - cost,
          margin = (profit / price) * 100;
        D.showDialog(
          "Your Synthetic Pricing Scenario",
          `<div class="dialog-detail">${D.detailList([
            ["Estimated cost", money(cost)],
            ["Proposed price", money(price)],
            ["Projected gross profit", money(profit)],
            ["Gross margin", margin.toFixed(1) + "%"],
          ])}<p class="dialog-note">Gross margin = (price − cost) ÷ price. This scenario does not change a saved estimate.</p><div class="form-actions">${btn("Try Another Scenario", "price-scenario", "light", "refresh")}${btn("Done", "close-dialog", "primary", "check")}</div></div>`,
        );
        return false;
      },
      "Calculate Margin",
    );
  D.actions["new-schedule"] = () =>
    D.form(
      "Assign a Demo Crew / Visit",
      [
        {
          name: "crew",
          label: "Crew / Person",
          options: [
            "Roof Crew A",
            "Interior Crew B",
            "Exterior Crew C",
            "Elite Electric, LLC",
          ],
        },
        { name: "job", label: "Linked job", options: D.jobOptions() },
        { name: "date", label: "Date", type: "date", value: "2025-03-06" },
        {
          name: "notes",
          label: "Work / visit details",
          value: "Site visit and progress review",
        },
      ],
      (f) => {
        (D.state.assignments ||= []).push(f);
        D.toast("Assignment added below the sample schedule.");
        return true;
      },
    );
  D.actions["new-purchase"] = () =>
    D.form(
      "Record a Synthetic Purchase",
      [
        { name: "supplier", label: "Supplier", value: "Builders Supply" },
        { name: "job", label: "Linked job", options: D.jobOptions() },
        {
          name: "description",
          label: "Material / purchase detail",
          value: "Job materials",
        },
        {
          name: "amount",
          label: "Purchase amount",
          type: "number",
          value: 1250,
        },
        {
          name: "status",
          label: "Status",
          options: ["Ordered", "In Transit", "Received"],
        },
      ],
      (f) => {
        D.data.purchases.unshift({
          id: id("PO"),
          supplier: f.supplier,
          job: f.job,
          description: f.description,
          amount: Number(f.amount),
          status: f.status,
        });
        D.state.tabs["materials-purchasing"] = "purchases";
        D.toast("Synthetic purchase added and linked to the job.");
        return true;
      },
    );
  D.actions["new-return"] = () =>
    D.form(
      "Record a Demo Return / Credit",
      [
        { name: "supplier", label: "Supplier", value: "Builders Supply" },
        { name: "job", label: "Linked job", options: D.jobOptions() },
        {
          name: "description",
          label: "Returned material",
          value: "Unused job materials",
        },
        { name: "amount", label: "Credit amount", type: "number", value: 59 },
      ],
      (f) => {
        D.data.returns.unshift({
          id: id("CR"),
          supplier: f.supplier,
          job: f.job,
          description: f.description,
          amount: Number(f.amount),
          status: "Credit Received",
        });
        D.toast("Return credit recorded against the selected demo job.");
        return true;
      },
    );
  D.actions["export-prices"] = () =>
    D.reportCSV("Supplier Price Comparison", [
      [
        "Material",
        "Builders Supply",
        "Ridgeway Supply",
        "Trade Depot",
        "Change",
      ],
      ...materialRows,
    ]);
  D.actions["classify-expense"] = () =>
    D.form(
      "Classify a Synthetic Expense",
      [
        {
          name: "description",
          label: "Expense description",
          value: "Jobsite equipment rental",
        },
        { name: "job", label: "Linked job", options: D.jobOptions() },
        {
          name: "category",
          label: "Category",
          options: [
            "Job Materials",
            "Equipment / Rentals",
            "Job Expenses",
            "Nonbillable Business Expense",
          ],
        },
        { name: "amount", label: "Amount", type: "number", value: 175 },
      ],
      (f) => {
        (D.state.expenses ||= []).unshift({ ...f, amount: Number(f.amount) });
        D.toast("Expense classified and linked to its demo job.");
        return true;
      },
    );
  D.actions["new-time"] = () =>
    D.form(
      "Log Time to a Specific Demo Job",
      [
        {
          name: "name",
          label: "Employee / Subcontractor",
          options: [...D.data.employees, ...D.data.subcontractors].map(
            (p) => p.name,
          ),
        },
        { name: "job", label: "Linked job", options: D.jobOptions() },
        { name: "hours", label: "Hours", type: "number", value: 8 },
        { name: "date", label: "Date", type: "date", value: "2025-03-04" },
        {
          name: "notes",
          label: "Work performed",
          value: "Jobsite work",
          full: true,
        },
      ],
      (f) => {
        const hours = Number(f.hours);
        if (hours > 24) {
          D.toast("Enter no more than 24 hours for one day.");
          return false;
        }
        const employee = D.data.employees.find((p) => p.name === f.name),
          person =
            employee || D.data.subcontractors.find((p) => p.name === f.name);
        D.data.timeEntries.unshift({
          ...f,
          hours,
          type: employee ? "Employee" : "1099 / Subcontractor",
        });
        if (person && person.job === f.job) person.actual += hours;
        D.state.tabs["labor-time-tracking"] = "entries";
        D.toast(hours + " hours linked to Job #" + f.job + ".");
        return true;
      },
    );
  D.actions["new-change"] = () =>
    D.form(
      "Create a Synthetic Change Order",
      [
        { name: "job", label: "Linked job", options: D.jobOptions() },
        {
          name: "description",
          label: "Scope addition / reason",
          value: "Additional customer-requested work",
          full: true,
        },
        {
          name: "amount",
          label: "Change order amount",
          type: "number",
          value: 1250,
        },
      ],
      (f) => {
        D.data.changes.unshift({
          id: id("CO"),
          job: f.job,
          description: f.description,
          amount: Number(f.amount),
          status: "Pending Approval",
        });
        D.toast("Demo change order created for review.");
        return true;
      },
    );
  D.actions["new-invoice"] = () =>
    D.form(
      "Create a Synthetic Invoice",
      [
        { name: "customer", label: "Customer", value: "Jamie Parker" },
        { name: "job", label: "Linked job", options: D.jobOptions() },
        {
          name: "amount",
          label: "Invoice amount",
          type: "number",
          value: 5000,
        },
        { name: "due", label: "Due date", type: "date", value: "2025-03-21" },
      ],
      (f) => {
        D.data.invoices.unshift({
          id: id("INV"),
          customer: f.customer,
          job: f.job,
          amount: Number(f.amount),
          paid: 0,
          status: "Draft",
          due: f.due,
        });
        D.toast("Draft invoice added. No invoice was sent.");
        return true;
      },
    );
  D.actions["new-service"] = () =>
    D.form(
      "Schedule a Synthetic Service Visit",
      [
        { name: "customer", label: "Customer", value: "Alex Thompson" },
        { name: "property", label: "Property", value: "Thompson Residence" },
        {
          name: "service",
          label: "Visit type",
          options: [
            "Annual Roof & Gutter Inspection",
            "30-Day Check-In",
            "Warranty Review",
            "Gutter Cleaning",
          ],
        },
        {
          name: "date",
          label: "Scheduled date",
          type: "date",
          value: "2025-12-20",
        },
      ],
      (f) => {
        D.data.services.unshift({ id: id("SV"), ...f, status: "Scheduled" });
        D.toast("Service visit added to the synthetic schedule.");
        return true;
      },
    );
  D.actions["service-plan"] = (name) =>
    D.showDialog(
      name,
      `<div class="dialog-detail"><p>A synthetic property-care plan connects completed work, installed materials, warranty details, and future visits.</p><ul class="check-list"><li>Annual property-specific inspection</li><li>Documented condition and maintenance notes</li><li>Warranty reminders with relevant records</li><li>Clear recommendations for the next visit</li></ul><div class="form-actions">${btn("Schedule a Demo Visit", "new-service", "primary", "calendar")}</div></div>`,
    );
  D.actions["new-team"] = () =>
    D.form(
      "Add a Synthetic Team Member",
      [
        { name: "name", label: "Person / Company", value: "Riley Morgan" },
        { name: "role", label: "Role / Trade", value: "Carpenter" },
        {
          name: "type",
          label: "Worker classification",
          options: ["Employee", "1099 / Subcontractor"],
        },
        { name: "job", label: "Assigned job", options: D.jobOptions() },
        {
          name: "rate",
          label: "Sample hourly rate",
          type: "number",
          value: 35,
        },
      ],
      (f) => {
        const arr =
          f.type === "Employee" ? D.data.employees : D.data.subcontractors;
        arr.push({
          name: f.name,
          role: f.role,
          job: f.job,
          rate: Number(f.rate),
          est: 0,
          actual: 0,
        });
        D.state.tabs["team-subcontractors"] =
          f.type === "Employee" ? "employees" : "subcontractors";
        D.toast("Synthetic team member added. No invitation was sent.");
        return true;
      },
    );
  const docs = {
    photos: [
      "Project Photos",
      "Approved source photograph for the sample completed job.",
    ],
    proposal: [
      "Approved Proposal",
      "Roof Replacement + Gutter Upgrade · Contract $21,840.00.",
    ],
    warranty: [
      "Roof & Gutter Warranty",
      "Manufacturer and installation warranty records are connected to the property.",
    ],
    inspection: [
      "Final Inspection",
      "Completed Dec 19, 2024. Scope, cleanup, and final condition documented.",
    ],
    receipts: [
      "Receipt Collection",
      "37 categorized receipts · Total material spend $7,916.50.",
    ],
    handoff: [
      "Owner Handoff Package",
      "Completed scope, care instructions, warranty records, and future service.",
    ],
    materials: [
      "Material Specifications",
      "Architectural shingles, approved underlayment, flashing, fasteners, gutters, and downspouts.",
    ],
    invoice: [
      "Final Invoice — INV-5294",
      "$21,840.00 · Paid in full Dec 20, 2024.",
    ],
  };
  D.actions["view-document"] = (key) => {
    const [title, copy] = docs[key] || docs.handoff;
    D.showDialog(
      title,
      `<div class="dialog-detail">${key === "photos" ? '<img src="assets/thompson-residence.webp" width="135" height="174" alt="Approved sample Thompson Residence property photo" style="height:300px;width:100%;object-fit:contain;border-radius:10px;background:#edf4f2" />' : ""}<h3>Thompson Residence — Job #RV-10427</h3><p>${copy}</p>${D.detailList(
        [
          ["Property", "1234 Ridgeview Dr · Oak Ridge, TN 37830"],
          ["Job status", "Completed & Paid"],
          ["Record type", "Synthetic demo preview"],
        ],
      )}<p class="dialog-note">This is a sample document record. No real customer files are stored in the demo.</p><div class="form-actions">${btn("Export Record Summary", "export-document:" + key, "primary", "download")}</div></div>`,
    );
  };
  D.actions["export-document"] = (key) => {
    const [title, copy] = docs[key] || docs.handoff;
    D.reportCSV(title, [
      ["Job", "Property", "Document", "Summary"],
      ["RV-10427", "Thompson Residence", title, copy],
    ]);
  };
  D.actions["export-passport"] = () =>
    D.reportCSV("Thompson Property Passport", [
      ["Record", "Value"],
      ["Property", "Thompson Residence"],
      ["Address", "1234 Ridgeview Dr, Oak Ridge, TN 37830"],
      ["Job", "RV-10427"],
      ["Scope", "Roof Replacement + Gutter Upgrade"],
      ["Status", "Completed & Paid"],
      ["Revenue", 21840],
      ["Materials", 7916.5],
      ["Labor Hours", 112.5],
      ["Labor Cost", 4860],
      ["Other Cost", 4109],
      ["Actual Profit", 4954.5],
      ["Receipts", 37],
      ["Documents", 12],
    ]);
  document.addEventListener("submit", (e) => {
    if (e.target.id === "workspace-form") {
      e.preventDefault();
      const f = new FormData(e.target);
      D.state.businessName = String(f.get("business"));
      D.state.primaryTrade = String(f.get("trade"));
      const label = document.querySelector(
        ".workspace-button>span:nth-child(2)",
      );
      label.innerHTML = esc(D.state.businessName) + " <small>DEMO</small>";
      D.toast("Workspace display name updated for this demo session.");
    }
  });
  // Show classified expenses in their module, rather than merely acknowledging a save.
  const receiptRenderer = D.renderers["material-receipt-intelligence"];
  D.renderers["material-receipt-intelligence"] = () =>
    receiptRenderer() +
    (D.activeTab("receipts", "matching") === "expenses" &&
    D.state.expenses?.length
      ? `<div style="margin-top:14px">${moduleCard(
          "Added Demo Expenses",
          table(
            ["Description", "Job", "Category", "Amount"],
            D.state.expenses.map((e) => [
              esc(e.description),
              D.jobLink(e.job),
              esc(e.category),
              money(e.amount),
            ]),
          ),
        )}</div>`
      : "");
})();

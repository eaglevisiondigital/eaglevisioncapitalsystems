/* Real website inquiries stay separate from the synthetic demo workspace. */
(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("walkthrough-dialog");
    const form = document.getElementById("walkthrough-form");
    const intro = document.getElementById("walkthrough-intro");
    const title = document.getElementById("walkthrough-title");
    const error = document.getElementById("walkthrough-error");
    const success = document.getElementById("walkthrough-success");
    const submit = form.querySelector('[type="submit"]');
    const firstName = form.elements.first_name;
    const storageKey = "pcs-demo-walkthrough-visit-v1";
    let visit = { views: [], offered: false, submitted: false };
    let timer;
    let submitting = false;
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved && typeof saved === "object") {
        visit = {
          views: Array.isArray(saved.views)
            ? saved.views.filter(
                (v) =>
                  typeof v === "string" &&
                  Object.hasOwn(window.PropelDemo.renderers, v),
              )
            : [],
          offered: saved.offered === true,
          submitted: saved.submitted === true,
        };
      }
    } catch {
      /* Storage restrictions must never prevent demo access. */
    }
    function saveVisit() {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(visit));
      } catch {
        /* Keep in-memory behavior when storage is unavailable. */
      }
    }
    function showSuccess() {
      form.hidden = true;
      success.hidden = false;
      title.textContent = "Your walkthrough request is in.";
      intro.textContent = "You can continue exploring Propel at your own pace.";
      document.querySelectorAll("[data-lead-launch]").forEach((button) => {
        button.textContent = "Walkthrough Requested";
      });
    }
    function openRequest() {
      // Avoid stacking real inquiry and synthetic record dialogs.
      if (document.querySelector("#demo-dialog[open]")) return;
      clearTimeout(timer);
      visit.offered = true;
      saveVisit();
      form.elements.demo_view.value = window.PropelDemo.route;
      if (visit.submitted) showSuccess();
      if (!dialog.open) dialog.showModal();
      if (visit.submitted) success.querySelector("button").focus();
    }
    function noteView(route) {
      if (!route || visit.submitted || visit.offered) return;
      if (!visit.views.includes(route)) {
        visit.views.push(route);
        saveVisit();
      }
      clearTimeout(timer);
      if (visit.views.length >= 3) {
        timer = setTimeout(() => {
          if (
            document.visibilityState === "visible" &&
            !document.querySelector("dialog[open]") &&
            !document.querySelector(".sidebar.open")
          )
            openRequest();
        }, 1800);
      }
    }
    document.addEventListener("propel:demo-view", (event) =>
      noteView(event.detail.route),
    );
    document.querySelectorAll("[data-lead-launch]").forEach((button) => {
      button.addEventListener("click", () => {
        // Close the mobile drawer before presenting the request dialog.
        if (document.querySelector(".sidebar.open"))
          document.querySelector(".sidebar-backdrop").click();
        openRequest();
      });
    });
    dialog
      .querySelectorAll("[data-lead-close]")
      .forEach((button) =>
        button.addEventListener("click", () => dialog.close()),
      );
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    });
    firstName.addEventListener("input", () => firstName.setCustomValidity(""));
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitting || visit.submitted) return;
      firstName.value = firstName.value.trim();
      firstName.setCustomValidity(
        firstName.value ? "" : "Enter your first name.",
      );
      if (!form.reportValidity()) return;
      form.elements.submitted_at.value = new Date().toISOString();
      form.elements.demo_view.value = window.PropelDemo.route;
      const body = new URLSearchParams(new FormData(form));
      error.hidden = true;
      submitting = true;
      submit.disabled = true;
      submit.textContent = "Sending…";
      form.setAttribute("aria-busy", "true");
      try {
        const response = await fetch("/propel-contractor-suite/demo/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
        if (!response.ok) throw new Error("Request was not accepted");
        visit.submitted = true;
        saveVisit();
        showSuccess();
        form.reset();
        if (dialog.open) success.querySelector("button").focus();
      } catch {
        error.textContent =
          "We couldn’t send your request. Please try again, or contact info@eaglevision.biz.";
        error.hidden = false;
        submit.disabled = false;
        submit.textContent = "Request a Personalized Walkthrough";
      } finally {
        submitting = false;
        form.removeAttribute("aria-busy");
      }
    });
    if (visit.submitted) showSuccess();
    noteView(window.PropelDemo.route);
  });
})();

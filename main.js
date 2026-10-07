/* ============================================================
   Habibi Group LLC — site behavior
   ============================================================ */

/* ------------------------------------------------------------
   SITE CONFIG — EDIT HERE
   COMMISSION_RATE: Habibi buyer-side commission as a decimal.
   Currently 0.0025 = 0.25%.
   *** PENDING FINAL BUSINESS DECISION: 0.25% vs 0.5% ***
   To switch to 0.5%, change this ONE line to: const COMMISSION_RATE = 0.005;
   Every rate label and calculator figure on the site updates automatically.
   ------------------------------------------------------------ */
const COMMISSION_RATE = 0.0025;

/* Traditional buyer-side commission used for comparison (2.5%). */
const TRADITIONAL_RATE = 0.025;

(function () {
  "use strict";

  var usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  function rateLabel() {
    // 0.0025 -> "0.25%", 0.005 -> "0.5%"
    return parseFloat((COMMISSION_RATE * 100).toFixed(4)) + "%";
  }

  /* ---- Fill every rate placeholder from the single constant ---- */
  document.querySelectorAll("[data-rate-display]").forEach(function (el) {
    el.textContent = rateLabel();
  });

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---- Savings calculator ---- */
  var slider = document.getElementById("priceRange");
  var priceOutput = document.getElementById("priceOutput");
  var tradResult = document.getElementById("tradResult");
  var habibiResult = document.getElementById("habibiResult");
  var keepResult = document.getElementById("keepResult");

  function updateCalculator() {
    var price = Number(slider.value);
    var traditional = price * TRADITIONAL_RATE;
    var habibi = price * COMMISSION_RATE;
    var keep = traditional - habibi;
    priceOutput.textContent = usd.format(price);
    tradResult.textContent = usd.format(traditional);
    habibiResult.textContent = usd.format(habibi);
    keepResult.textContent = usd.format(keep);
  }
  if (slider) {
    slider.addEventListener("input", updateCalculator);
    updateCalculator(); // sync with COMMISSION_RATE on load
  }

  /* ---- Waitlist form (front-end only) ----
     IDX INTEGRATION: when the IDX Broker / Showcase IDX embed goes live,
     it replaces the #waitlistForm block in index.html (see README.md). */
  var waitlistForm = document.getElementById("waitlistForm");
  var waitlistNote = document.getElementById("waitlistNote");
  if (waitlistForm) {
    waitlistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("waitlistEmail");
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        waitlistNote.textContent = "Please enter a valid email address.";
        waitlistNote.className = "form-note error";
        email.focus();
        return;
      }
      // TODO: POST email to waitlist endpoint / CRM (see README.md).
      waitlistNote.textContent = "You're on the list — we'll email you the moment MLS search goes live.";
      waitlistNote.className = "form-note success";
      waitlistForm.reset();
    });
  }

  /* ---- Contact form (front-end only) ----
     BACKEND WIRING: replace the simulated submit below with a real POST.
     Recommended: Formspree or Netlify Forms (zero backend), or POST JSON
     to your CRM endpoint. Example:
       fetch("https://formspree.io/f/YOUR_FORM_ID", {
         method: "POST",
         headers: { "Content-Type": "application/json", "Accept": "application/json" },
         body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
       });
     See README.md for full instructions. */
  var contactForm = document.getElementById("contactForm");
  var contactNote = document.getElementById("contactNote");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cfName");
      var email = document.getElementById("cfEmail");
      var ok = true;
      [name, email].forEach(function (field) {
        var valid = field.value.trim().length > 0 &&
          (field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
        field.setAttribute("aria-invalid", valid ? "false" : "true");
        if (!valid) ok = false;
      });
      if (!ok) {
        contactNote.textContent = "Please fill in your name and a valid email so we can reach you.";
        contactNote.className = "form-note error";
        return;
      }
      // Simulated submit — replace with real POST (see comment above).
      contactNote.textContent = "Thanks, " + name.value.trim().split(" ")[0] +
        " — your message is on its way. We'll be in touch shortly. Prefer to talk now? Call (630) 263-3619.";
      contactNote.className = "form-note success";
      contactForm.reset();
    });
  }

  /* ---- Reveal-on-scroll ---- */
  var revealEls = document.querySelectorAll(".step-card, .example, .calc-card, .checklist li, .team-card, .waitlist-card");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();

/* ─────────────────────────────────────────
   script.js  |  Portfolio interactive layer
   ───────────────────────────────────────── */

// ── 1. THEME TOGGLE (persisted via localStorage) ──────────────────────────
const toggleButton = document.querySelector("#theme-toggle");
const root = document.documentElement;

const updateToggleText = (theme) => {
  toggleButton.textContent = theme === "light" ? "Dark mode" : "Light mode";
};

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateToggleText(theme);
};

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

toggleButton.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});


// ── 2. SCROLL FADE-IN  (IntersectionObserver) ─────────────────────────────
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // reset so it replays next scroll
      }
    });
  },
  { threshold: 0.2 }
);
fadeEls.forEach((el) => observer.observe(el));


// ── 3. PROJECT FILTER TABS ────────────────────────────────────────────────
const filterBtns = document.querySelectorAll(".filter-btn");
const cards      = document.querySelectorAll("#project-grid .card");
const noProjects = document.getElementById("no-projects");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    let visible = 0;

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      if (match) {
        card.style.display = "";
        card.style.animation = "fadeUp 0.35s ease both";
        visible++;
      } else {
        card.style.display = "none";
      }
    });

    // Show / hide empty state
    noProjects.style.display = visible === 0 ? "block" : "none";
  });
});


// ── 4. CONTACT FORM  — inline validation + success banner ─────────────────
const form       = document.getElementById("contact-form");
const nameInput  = document.getElementById("input-name");
const emailInput = document.getElementById("input-email");
const msgInput   = document.getElementById("input-message");
const errName    = document.getElementById("error-name");
const errEmail   = document.getElementById("error-email");
const errMsg     = document.getElementById("error-message");
const successBox = document.getElementById("form-success");

// Email regex
const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, span, message) {
  span.textContent = message;
  input.classList.add("invalid");
}

function clearError(input, span) {
  span.textContent = "";
  input.classList.remove("invalid");
}

// Live clear on input
[nameInput, emailInput, msgInput].forEach((el, i) => {
  el.addEventListener("input", () => {
    const spans = [errName, errEmail, errMsg];
    clearError(el, spans[i]);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  if (!nameInput.value.trim()) {
    setError(nameInput, errName, "Name is required.");
    valid = false;
  } else {
    clearError(nameInput, errName);
  }

  if (!emailRE.test(emailInput.value.trim())) {
    setError(emailInput, errEmail, "Please enter a valid email address.");
    valid = false;
  } else {
    clearError(emailInput, errEmail);
  }

  if (msgInput.value.trim().length < 10) {
    setError(msgInput, errMsg, "Message must be at least 10 characters.");
    valid = false;
  } else {
    clearError(msgInput, errMsg);
  }

  if (!valid) return;

  // All good — show success banner
  successBox.hidden = false;
  form.reset();

  // Hide banner after 5 s
  setTimeout(() => { successBox.hidden = true; }, 5000);
});


// ── 5. CHAMPIONS LEAGUE WIDGET ────────────────────────────────────────────
// Sign up free at https://www.football-data.org/client/register to get a key
const CL_API_KEY = "8d45a0665cda4271a836a359d7e32b14";

const clLoading = document.getElementById("cl-loading");
const clMatches = document.getElementById("cl-matches");
const clError   = document.getElementById("cl-error");

// Stage label map (football-data.org codes → human-readable)
const STAGE_LABELS = {
  "ROUND_OF_16":   "Round of 16",
  "QUARTER_FINALS": "Quarter-finals",
  "SEMI_FINALS":   "Semi-finals",
  "FINAL":         "Final",
  "GROUP_STAGE":   "Group Stage",
  "PLAYOFFS":      "Play-offs",
};

function formatDate(utcStr) {
  const d = new Date(utcStr);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Riyadh",
  }) + " KSA";
}

function renderMatches(matches) {
  if (!matches.length) {
    clMatches.innerHTML = `<p style="color:var(--muted)">No upcoming fixtures found.</p>`;
    return;
  }

  clMatches.innerHTML = matches.map((m, i) => {
    const stage  = STAGE_LABELS[m.stage] || m.stage || "—";
    const home   = m.homeTeam.shortName || m.homeTeam.name;
    const away   = m.awayTeam.shortName || m.awayTeam.name;
    const date   = formatDate(m.utcDate);
    const status = m.status;

    let scoreHTML = "";
    if (status === "FINISHED" || status === "IN_PLAY" || status === "PAUSED") {
      const hs = m.score.fullTime.home ?? m.score.halfTime.home ?? "—";
      const as = m.score.fullTime.away ?? m.score.halfTime.away ?? "—";
      scoreHTML = `<div class="cl-score">${hs} – ${as}</div>`;
    }

    return `
      <div class="cl-match-card" style="animation-delay:${i * 60}ms">
        <span class="cl-stage">${stage}</span>
        <div class="cl-teams">
          <span>${home}</span>
          <span class="cl-vs">vs</span>
          <span>${away}</span>
        </div>
        ${scoreHTML}
        <span class="cl-date">${date}</span>
      </div>`;
  }).join("");
}

async function loadCLFixtures() {
  if (CL_API_KEY === "YOUR_API_KEY_HERE") {
    clLoading.hidden = true;
    clMatches.innerHTML = `
      <p style="color:var(--muted);padding:20px 0">
        🔑 Add your <strong>football-data.org</strong> API key in <code>js/script.js</code> to see live fixtures.
      </p>`;
    return;
  }

  try {
    // Fetch next 10 CL matches (scheduled + live + recent)
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/CL/matches?status=SCHEDULED,LIVE,IN_PLAY,PAUSED,FINISHED&limit=12",
      { headers: { "X-Auth-Token": CL_API_KEY } }
    );

    if (!res.ok) throw new Error(`API error ${res.status}`);

    const data = await res.json();
    // Show upcoming first, then recently finished
    const sorted = (data.matches || []).sort(
      (a, b) => new Date(a.utcDate) - new Date(b.utcDate)
    ).slice(0, 9);

    clLoading.hidden = true;
    renderMatches(sorted);
  } catch (err) {
    console.error("CL fetch error:", err);
    clLoading.hidden = true;
    clError.hidden = false;
  }
}

loadCLFixtures();

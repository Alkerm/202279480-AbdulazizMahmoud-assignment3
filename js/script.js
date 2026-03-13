const root = document.documentElement;

function initThemeToggle() {
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) {
    return;
  }

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
}

function initFadeIn() {
  const fadeElements = document.querySelectorAll(".fade-in");
  if (!fadeElements.length || typeof IntersectionObserver === "undefined") {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((element) => observer.observe(element));
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#project-grid .card");
  const emptyState = document.getElementById("no-projects");

  if (!filterButtons.length || !cards.length || !emptyState) {
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      let visibleCount = 0;

      cards.forEach((card) => {
        const isMatch = filter === "all" || card.dataset.category === filter;
        card.style.display = isMatch ? "" : "none";

        if (isMatch) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "fadeUp 0.35s ease both";
          visibleCount += 1;
        }
      });

      emptyState.style.display = visibleCount === 0 ? "block" : "none";
    });
  });
}

function ensureFieldError(input) {
  const label = input.closest("label");
  if (!label) {
    return null;
  }

  let errorNode = label.querySelector(".field-error");
  if (!errorNode) {
    errorNode = document.createElement("span");
    errorNode.className = "field-error";
    errorNode.setAttribute("aria-live", "polite");
    label.appendChild(errorNode);
  }

  return errorNode;
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) {
    return;
  }

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  if (!nameInput || !emailInput || !messageInput) {
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldMap = [
    { input: nameInput, validate: (value) => value.trim() ? "" : "Name is required." },
    {
      input: emailInput,
      validate: (value) => emailPattern.test(value.trim()) ? "" : "Please enter a valid email address.",
    },
    {
      input: messageInput,
      validate: (value) => value.trim().length >= 10 ? "" : "Message must be at least 10 characters.",
    },
  ];

  let successBox = form.querySelector(".form-success");
  if (!successBox) {
    successBox = document.createElement("div");
    successBox.className = "form-success";
    successBox.hidden = true;
    successBox.textContent = "Message sent successfully.";
    form.prepend(successBox);
  }

  const setFieldState = (input, message) => {
    const errorNode = ensureFieldError(input);
    input.classList.toggle("invalid", Boolean(message));
    if (errorNode) {
      errorNode.textContent = message;
    }
  };

  fieldMap.forEach(({ input, validate }) => {
    ensureFieldError(input);
    input.addEventListener("input", () => {
      setFieldState(input, validate(input.value));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    fieldMap.forEach(({ input, validate }) => {
      const message = validate(input.value);
      setFieldState(input, message);
      if (message) {
        isValid = false;
      }
    });

    if (!isValid) {
      successBox.hidden = true;
      return;
    }

    successBox.hidden = false;
    form.reset();
    fieldMap.forEach(({ input }) => setFieldState(input, ""));
    window.setTimeout(() => {
      successBox.hidden = true;
    }, 5000);
  });
}

function formatMatchDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Riyadh",
  });
}

function formatMatchTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Riyadh",
  }) + " KSA";
}

function getChampionsLeagueSeasonRange() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  const seasonStartYear = month >= 7 ? year : year - 1;
  const seasonEndYear = seasonStartYear + 1;

  return `${seasonStartYear}0901-${seasonEndYear}0630`;
}

function getAssignedTeams(event) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];
  const home = competitors.find((team) => team.homeAway === "home");
  const away = competitors.find((team) => team.homeAway === "away");
  const homeLogo = home?.team?.logos?.[0]?.href || home?.team?.logo || "";
  const awayLogo = away?.team?.logos?.[0]?.href || away?.team?.logo || "";

  if (!home?.team?.displayName || !away?.team?.displayName || !homeLogo || !awayLogo) {
    return null;
  }

  return { competition, home, away, homeLogo, awayLogo };
}

function renderChampionsLeagueMatches(container, events) {
  if (!events.length) {
    container.innerHTML = '<p style="color:var(--muted)">No fixtures available right now.</p>';
    return;
  }

  container.innerHTML = events
    .map((event, index) => {
      const teams = getAssignedTeams(event);
      if (!teams) {
        return "";
      }

      const { competition, home, away, homeLogo, awayLogo } = teams;
      const status = event.status?.type?.name || "";
      const matchDate = formatMatchDate(event.date);
      const matchTime = formatMatchTime(event.date);
      const venue = competition?.venue?.fullName || competition?.venue?.address?.city || "Venue to be confirmed";

      const homeName = home?.team?.shortDisplayName || home?.team?.displayName || "TBD";
      const awayName = away?.team?.shortDisplayName || away?.team?.displayName || "TBD";
      const homeTeamHtml = `
        <span class="cl-team">
          ${homeLogo ? `<img class="cl-team-logo" src="${homeLogo}" alt="${homeName} logo" loading="lazy" />` : ""}
          <span>${homeName}</span>
        </span>
      `;
      const awayTeamHtml = `
        <span class="cl-team cl-team--away">
          ${awayLogo ? `<img class="cl-team-logo" src="${awayLogo}" alt="${awayName} logo" loading="lazy" />` : ""}
          <span>${awayName}</span>
        </span>
      `;

      let scoreHtml = "";
      if (status === "STATUS_FINAL" || status === "STATUS_IN_PROGRESS" || status === "STATUS_HALFTIME") {
        const homeScore = home?.score ?? "-";
        const awayScore = away?.score ?? "-";
        scoreHtml = `<div class="cl-score">${homeScore} - ${awayScore}</div>`;
      }

      return `
        <div class="cl-match-card" style="animation-delay:${index * 60}ms">
          <div class="cl-teams">
            ${homeTeamHtml}
            <span class="cl-vs">vs</span>
            ${awayTeamHtml}
          </div>
          ${scoreHtml}
          <div class="cl-meta-row">
            <span class="cl-date">${matchDate}</span>
            <span class="cl-time">${matchTime}</span>
          </div>
          <span class="cl-venue">${venue}</span>
        </div>
      `;
    })
    .filter(Boolean)
    .join("");
}

async function initChampionsLeagueWidget() {
  const loadingNode = document.getElementById("cl-loading");
  const matchesNode = document.getElementById("cl-matches");
  const errorNode = document.getElementById("cl-error");

  if (!loadingNode || !matchesNode || !errorNode) {
    return;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  try {
    const seasonRange = getChampionsLeagueSeasonRange();
    const response = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard?dates=${seasonRange}&limit=200&lang=en&region=gb&league=uefa.champions`,
      { signal: controller.signal }
    );

    window.clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`ESPN API error ${response.status}`);
    }

    const data = await response.json();
    const events = Array.isArray(data.events) ? data.events : [];
    const now = Date.now();
    const upcomingEvents = events
      .filter((event) => {
        const eventTime = Date.parse(event.date);
        return Number.isFinite(eventTime) && eventTime >= now && Boolean(getAssignedTeams(event));
      })
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

    loadingNode.hidden = true;
    loadingNode.style.display = "none";
    errorNode.hidden = true;
    renderChampionsLeagueMatches(matchesNode, upcomingEvents);
  } catch (error) {
    window.clearTimeout(timeoutId);
    console.error("Champions League widget failed:", error);
    loadingNode.hidden = true;
    loadingNode.style.display = "none";
    errorNode.hidden = false;
  }
}

initThemeToggle();
initFadeIn();
initProjectFilters();
initContactForm();
initChampionsLeagueWidget();

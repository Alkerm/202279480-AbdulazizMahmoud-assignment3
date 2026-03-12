# Technical Documentation — Assignment 2

**Student:** Abdulaziz Ayman Elkarm (202279480)  
**Course:** Web Engineering — KFUPM

---

## Overview

This document describes the interactive features added in Assignment 2, building on the static portfolio from Assignment 1.

---

## 1. Theme Toggle (Assignment 1 — enhanced)

**File:** `js/script.js`

The theme toggle button switches between `data-theme="dark"` and `data-theme="light"` on the `<html>` element. The chosen theme is saved to `localStorage` and restored on every page load.

```js
const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateToggleText(theme);
};
```

---

## 2. Scroll Fade-In Animation

**Files:** `js/script.js`, `css/styles.css`

All elements with class `fade-in` start invisible (`opacity: 0`, `translateY(24px)`). An `IntersectionObserver` watches each element and adds the class `visible` when at least 15% of the element enters the viewport, triggering a CSS transition.

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
```

**Applies to:** Section headers, project cards, skill pills, contact form.

---

## 3. Project Filter Tabs

**Files:** `index.html`, `js/script.js`, `css/styles.css`

Each project `<article>` has a `data-category` attribute (`ai`, `web`, `ml`). Four filter buttons correspond to `data-filter` values (`all`, `ai`, `web`, `ml`).

When a filter button is clicked:
1. The `active` class is moved to the clicked button
2. Each card's `display` is toggled based on whether its category matches
3. An `empty-state` paragraph is shown if no cards match
4. Visible cards replay the `fadeUp` keyframe animation

---

## 4. Champions League Live Fixtures Widget

**Files:** `index.html`, `js/script.js`, `css/styles.css`  
**API:** [football-data.org](https://www.football-data.org/) (free tier)

The widget fetches UEFA Champions League matches using the `fetch()` Web API:

```js
const res = await fetch(
  "https://api.football-data.org/v4/competitions/CL/matches?status=SCHEDULED,LIVE,IN_PLAY,PAUSED,FINISHED&limit=12",
  { headers: { "X-Auth-Token": CL_API_KEY } }
);
```

**States handled:**
| State | Behaviour |
|---|---|
| Loading | Spinning CSS animation + "Loading fixtures…" text |
| Success | Renders match cards with team names, stage, date |
| Finished match | Shows full-time score |
| API error | Shows friendly error message |
| No key set | Shows a developer placeholder message |

Match cards are sorted by date ascending and display: stage label, home team vs away team, date in KSA timezone, and score (if the match is finished).

---

## 5. Contact Form — Inline Validation

**Files:** `index.html`, `js/script.js`, `css/styles.css`

The `<form>` has `novalidate` set so browser-native validation is disabled, and all validation is done with JavaScript for full UI control.

**Validation rules:**
| Field | Rule |
|---|---|
| Name | Must not be empty |
| Email | Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Message | Must be ≥ 10 characters |

On invalid fields: a red `.field-error` span is shown beneath the input and an `.invalid` CSS class adds a red border + glow.

On success: the form resets and a green `.form-success` banner slides in using a CSS `@keyframes slideDown` animation. It auto-hides after 5 seconds.

---

## 6. Card Hover Micro-animations

**File:** `css/styles.css`

Project cards have:
- `translateY(-6px)` lift on hover
- Cyan border glow (`rgba(103, 210, 255, 0.35)`)
- Zoomed card image (`scale(1.06)`) via a transition on the `<img>` inside

```css
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 50px rgba(103, 210, 255, 0.18);
  border-color: rgba(103, 210, 255, 0.35);
}
.card:hover .card-image img {
  transform: scale(1.06);
}
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, CSS custom properties |
| Vanilla JavaScript | All interactivity |
| `IntersectionObserver` API | Scroll-triggered animations |
| `fetch()` API | Async data fetching |
| `localStorage` | Theme preference persistence |
| football-data.org REST API | Champions League fixture data |
| Google Fonts | Typography (Space Grotesk, IBM Plex Serif) |

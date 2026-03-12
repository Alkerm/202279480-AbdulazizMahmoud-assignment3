# AI Usage Report — Assignment 2

**Student:** Abdulaziz Ayman Elkarm (202279480)  
**Course:** Web Engineering — KFUPM  
**Assignment:** Assignment 2 – Interactive Portfolio

---

## Tools Used

### 1. Antigravity (AI Coding Assistant — Google DeepMind)
**Role:** Primary development assistant

**How it was used:**
- Helped plan and break down the assignment requirements into a structured checklist (`PLAN.md`)
- Generated the complete updated `index.html` structure including:
  - Filter tab buttons with `data-filter` attributes
  - `data-category` tags on each project card
  - Champions League widget section with loading/error states
  - Redesigned contact form with per-field `id` and error `<span>` elements
- Rewrote `css/styles.css` to add:
  - Filter tab styles with active state
  - Card hover lift + glow + image zoom effects
  - Scroll fade-in animation system using `.fade-in` / `.visible` classes
  - Profile image pulse animation (`@keyframes profilePulse`)
  - CL match card grid layout and spinner
  - Inline form error and success banner styles
- Wrote `js/script.js` to add:
  - `IntersectionObserver` for scroll-triggered fade-in
  - Project filter logic with empty-state message
  - Full inline form validation (name, email regex, message length)
  - CL fixtures fetcher using `fetch()` with loading/error handling
- Helped update all documentation files

**What I learned / edited:**
- Reviewed all generated code to understand each feature
- Chose which CL API endpoint and response fields to use (`SCHEDULED`, `FINISHED`, `stage`, `score.fullTime`)
- Selected appropriate stage label mapping (`ROUND_OF_16` → "Round of 16" etc.)
- Registered for the `football-data.org` API and provided the key
- Decided on the overall order of sections in the page

---

### 2. football-data.org API
**Role:** External data source (not an AI tool, but an external service)

**How it was used:**
- Free-tier API to fetch UEFA Champions League fixtures
- Endpoint used: `GET /v4/competitions/CL/matches`
- Returns match data including teams, stage, date, and score

---

## Summary

AI was used to accelerate implementation of standard interactive web features (filtering, validation, animations, API calls). All generated code was reviewed and understood before use. The AI did not make design or content decisions independently — choices like which categories to use, which API to integrate, and the page layout were made by the student.

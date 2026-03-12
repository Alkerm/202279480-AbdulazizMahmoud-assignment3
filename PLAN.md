# Assignment 2 – Progress Plan
> Portfolio: Abdulaziz Elkarm | Due: Week 9 | Weight: 2%

---

## ✅ Already Done (from Assignment 1)
- [x] Project folder structure (`css/`, `js/`, `assets/`, `docs/`)
- [x] `index.html` with Hero, Projects, Skills, Contact sections
- [x] `css/styles.css` with dark/light theme tokens
- [x] Theme toggle (dark ↔ light) persisted via `localStorage`
- [x] Contact form with basic submit handler
- [x] GitHub repo linked and pushed
- [x] `.gitignore`, `README.md`, `docs/ai-usage-report.md`, `docs/technical-documentation.md`

---

## ✅ Section 2 — Dynamic Content (DONE)
- [x] Add category tags (`data-category`) to each project card in `index.html`
- [x] Add filter tab buttons (All / 🤖 AI / 🌐 Web / 📊 ML) above the project grid
- [x] Write JS to show/hide cards based on active filter with `fadeUp` animation
- [x] Highlight active tab button with accent color
- [x] "No projects found" empty state message

---

## ✅ Section 3 — Data Handling (DONE)
**Choice A — Form validation + inline feedback**
- [x] Remove `alert()` from contact form
- [x] Validate: name not empty, valid email format, message ≥ 10 chars
- [x] Per-field inline red error messages
- [x] Animated green success banner on valid submit

**Choice B — Champions League API widget**
- [x] CL section added to `index.html`
- [x] `loadCLFixtures()` fetches from `football-data.org` API
- [x] Loading spinner shown while fetching
- [x] Friendly error message if API fails
- [ ] **Paste your API key** into `js/script.js` line: `const CL_API_KEY = "YOUR_API_KEY_HERE";`

---

## ✅ Section 4 — Animations & Transitions (DONE)
- [x] Scroll-triggered fade-in for sections, cards, pills (`IntersectionObserver`)
- [x] Card hover: lift + cyan border glow + image zoom
- [x] `fadeUp` animation when filter tab switches cards
- [x] Animated success/error banner on form submit
- [x] Profile image pulse animation

---

## ✅ Section 5 — Error Handling & User Feedback (DONE)
- [x] Per-field inline form validation error messages
- [x] Loading spinner while CL API fetch runs
- [x] Friendly "Couldn't load fixtures" error if API call fails
- [x] "No projects found" empty state for filter
- [x] Placeholder message when API key is not yet set

---

## 🔲 Section 6 — AI Enhancement
- [ ] Update `docs/ai-usage-report.md` with tools used and how

---

## 🔲 Section 7 — Documentation
- [ ] Update `README.md` with new features, live link, AI summary
- [ ] Update `docs/technical-documentation.md` with new features

---

## 🔲 Deployment
- [ ] Enable GitHub Pages from `main` branch
- [ ] Paste live URL into `README.md`

---

## 🔲 Final Git Housekeeping
- [ ] Commit current work
- [ ] Push to `origin/main`

---

## 📋 Order of Work
1. ✅ Dynamic Content (filter tabs)
2. ✅ Animations (scroll fade-in + card hover)
3. ✅ Form validation + inline feedback
4. ✅ CL API widget (needs API key)
5. 🔲 Plug in API key
6. 🔲 Update docs
7. 🔲 Deploy to GitHub Pages

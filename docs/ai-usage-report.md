# AI Usage Report — Assignment 2

**Student:** Abdulaziz Ayman Elkarm (202279480)  
---

## Tools Used

### Claude & CODEX 

**How they were used:**
- Helped plan and break down the assignment requirements into a structured checklist (`PLAN.md`)
- Help in updating `index.html` structure including:
  - Filter tab buttons with `data-filter` attributes
  - `data-category` tags on each project card
  - Champions League widget section with loading/error states
  - Redesigned contact form with per-field `id` and error `<span>` elements
- Rewrote `css/styles.css` to add:
  - Filter tab styles with active state
  - Card hover lift + glow + image zoom effects
  - Scroll fade-in animation system using `.fade-in` / `.visible` classes
  - Profile image pulse animation 
- Help in `js/script.js` to add:
  - `IntersectionObserver` for scroll-triggered fade-in
  - Project filter logic with empty-state message
  - Full inline form validation (name, email regex, message length)
  - CL fixtures fetcher using `fetch()` with loading/error handling
- Helped update all documentation files


## Responsible use & modifications

All AI-generated code in this project was treated as a starting point, not a final product. Specifically:

- Every generated code block was **read and understood** before being accepted into the project
- The AI was given clear, specific instructions for each feature rather than open-ended requests
- Generated code was **manually reviewed** for correctness, accessibility, and alignment with the assignment requirements
- Where the AI's output did not match the intended design or behavior, it was **edited or rejected**
- No AI-generated text was submitted as personal reflection or academic writing without disclosure

---

## Learning outcomes

Through building this assignment with AI assistance, the following concepts were actively learned and applied:

- **`fetch()` and async/await** — how to make HTTP requests in the browser, handle promises, and manage loading/error states cleanly
- **Form validation with JavaScript** — why `novalidate` is used alongside custom JS validation, and how to give per-field feedback without browser-native alerts
- **CSS custom properties (variables)** — how a design token system enables seamless dark/light theming across the entire site
- **CSS `@keyframes` animations** — the difference between transitions (state changes) and keyframe animations (looping or one-shot effects)
- **DOM data attributes (`data-*`)** — how to store metadata on HTML elements and read it in JavaScript for filtering logic
- **REST API usage** — how to authenticate with an `X-Auth-Token` header and parse JSON responses from a public API

---

## Benefits & challenges

### Benefits
- **Speed** — AI significantly reduced the time needed to scaffold boilerplate code like form structure, CSS resets, and API fetch wrappers
- **Code quality** — suggestions followed modern best practices 
- **Accessibility** — AI proactively added `aria-live`, `role`, and `for`/`id` attribute pairs that may have been overlooked otherwise
- **Documentation** — AI helped structure technical documentation clearly and consistently

### Challenges
- **Trust and verification** — AI-generated code can look correct but contain subtle bugs; every feature required manual testing
- **Context limitations** — the AI did not always remember earlier decisions, requiring reminders about the existing file structure
- **Over-generation** — sometimes suggestions included more complexity than needed for the assignment scope, requiring trimming
- **CORS and API constraints** — the free tier of `football-data.org` has rate limits and some endpoints behave differently than documented; this required reading the API docs independently to select the right parameters

---

## Summary

AI was used to accelerate implementation of standard interactive web features (filtering, validation, animations, API calls). All generated code was reviewed and understood before use. The AI did not make design or content decisions independently.

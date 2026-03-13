# Technical Documentation - Assignment 2

## Overview

This document summarizes the main interactive features implemented in the portfolio and how they work in the final version of the project.

## 1. Theme Toggle

**Files:** `index.html`, `js/script.js`, `css/styles.css`

The theme toggle switches the page between dark and light themes by updating the `data-theme` attribute on the root `<html>` element. The selected value is saved in `localStorage` and restored on later visits.

Key points:
- Default theme is dark
- Clicking the toggle swaps between dark and light
- The button label updates to reflect the next available mode

## 2. Scroll Fade-In Animation

**Files:** `js/script.js`, `css/styles.css`

Elements with the `.fade-in` class are observed using `IntersectionObserver`. When they enter the viewport, the `.visible` class is toggled to trigger the CSS transition.

This is used for:
- section headers
- project cards
- skill items

## 3. Project Filter Tabs

**Files:** `index.html`, `js/script.js`, `css/styles.css`

Each project card has a `data-category` value. Filter buttons read that value and show only matching cards.

Behavior:
- the clicked filter becomes active
- non-matching cards are hidden
- matching cards replay their entrance animation
- an empty-state message appears if no cards match

## 4. Contact Form Validation

**Files:** `index.html`, `js/script.js`, `css/styles.css`

The contact form is validated on the client side with JavaScript.

Validation rules:
- name must not be empty
- email must match a basic email pattern
- message must be at least 10 characters

Behavior:
- invalid fields receive the `.invalid` class
- error messages are shown below the corresponding input
- a success message appears when submission passes validation

## 5. Champions League Fixtures Widget

**Files:** `index.html`, `js/script.js`, `css/styles.css`

The widget fetches UEFA Champions League data from ESPN's public soccer API using `fetch()`.

Current implementation details:
- requests a season date range instead of the default daily scoreboard
- filters the result to upcoming fixtures only
- excludes placeholder matchups unless both teams have assigned logos
- displays the two team names with logos
- displays match date, kickoff time in KSA, and venue when available
- hides the loading indicator once data is loaded or if an error occurs

Example request pattern:

```js
const response = await fetch(
  `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard?dates=${seasonRange}&limit=200&lang=en&region=gb&league=uefa.champions`
);
```

Handled states:
- loading
- successful data render
- no available fixtures after filtering
- API / network failure

## 6. Card Hover Effects

**File:** `css/styles.css`

Project cards use hover effects to make the UI feel more interactive.

Effects include:
- slight upward movement
- accent-colored shadow glow
- image zoom inside the card preview

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantics |
| CSS3 | Layout, theming, transitions, and responsive styling |
| Vanilla JavaScript | Interactivity and API integration |
| `IntersectionObserver` | Scroll-based reveal animations |
| `fetch()` | Loading external fixture data |
| `localStorage` | Persisting the selected theme |
| ESPN public API | Champions League fixture data |
| Google Fonts | Typography |

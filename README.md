# Abdulaziz Elkarm — Personal Portfolio (Assignment 2)

**Student ID:** 202279480  
**Course:** Web Engineering — KFUPM  
**Live Site:** *(GitHub Pages link will be added after deployment)*

---

## 📌 Project Description

A personal portfolio website for Abdulaziz Ayman Elkarm, a Software Engineering student at KFUPM. Built as a progression from Assignment 1, this version adds full interactivity, dynamic content, API integration, and polished animations.

### Key Features
- **Dark / Light theme toggle** — persisted across sessions via `localStorage`
- **Project filter tabs** — filter projects by category (All / AI / Web / ML) with animated transitions
- **Scroll fade-in animations** — sections and cards animate in as you scroll using `IntersectionObserver`
- **Card hover effects** — lift, glow, and image zoom on project cards
- **Inline form validation** — per-field error messages and an animated success banner (no browser alerts)
- **Champions League widget** — live UEFA CL fixtures fetched from `football-data.org` API, with loading spinner and error handling

---

## 🗂️ Folder Structure

```
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## 🚀 How to Run Locally

No build step required — this is a plain HTML/CSS/JS project.

1. Clone the repository:
   ```bash
   git clone https://github.com/Alkerm/202279480-AbdulazizMahmoud-assignment2.git
   ```
2. Open `index.html` in your browser directly, **or** use a local dev server:
   ```bash
   # Using VS Code Live Server extension (recommended)
   # Right-click index.html → "Open with Live Server"
   
   # Or using Python
   python -m http.server 8080
   ```
3. Navigate to `http://localhost:8080`

> **Note:** The Champions League widget requires an internet connection to fetch live data from the `football-data.org` API.

---

## 🤖 AI Tools Used

AI tools were used to assist with code generation, debugging, and documentation. See the full breakdown in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

---

## 🌐 Live Deployment

Deployed via GitHub Pages:  
*(Link to be added)*

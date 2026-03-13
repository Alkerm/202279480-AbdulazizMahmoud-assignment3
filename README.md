# Abdulaziz Elkarm Personal Portfolio

## Project Description

This project is a personal portfolio website for Abdulaziz Ayman Elkarm, a Software Engineering student at KFUPM. It is built with vanilla HTML, CSS, and JavaScript and presents academic background, selected projects, skills, and contact information in a responsive dark-first layout with a light mode toggle.
The site also includes an interactive UEFA Champions League widget that fetches upcoming confirmed matches from ESPN's public API.

## Features

- Dark / light theme toggle with `localStorage` persistence
- Scroll-triggered fade-in animations using `IntersectionObserver`
- Project filter buttons for quick category-based browsing
- Inline contact form validation with per-field feedback
- Live Champions League fixtures widget powered by ESPN's public API
- Responsive layout built with semantic HTML and accessible labels

## How to Run Locally

No build step is required.

1. Clone the repository:

```bash
git clone https://github.com/Alkerm/202279480-AbdulazizMahmoud-assignment2.git
cd 202279480-AbdulazizMahmoud-assignment2
```

2. Start a local server. Any simple static server works. For example:

```bash
python -m http.server 8080
```

3. Open the site in your browser:

```text
http://localhost:8080
```

You can also open `index.html` directly, but using a local server is the safer option for testing browser behavior consistently.

## AI Use Summary

AI assistance was used to help with implementation, debugging, and documentation. It supported the initial structure of interactive features such as filtering, validation, animations, and API integration, but the code was then reviewed, adjusted, and aligned with the final assignment requirements. A detailed breakdown is available in [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Live Deployment
GitHub Pages:
https://alkerm.github.io/202279480-AbdulazizMahmoud-assignment2/

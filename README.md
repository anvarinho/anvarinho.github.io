# Anvar Jumabaev — Portfolio

A responsive personal portfolio for web, iOS, and Android development. Built with HTML, CSS, and vanilla JavaScript; no build step or package installation is needed.

## Preview

Run `python3 -m http.server 8000` from this directory, then open http://localhost:8000.

## Files

- `index.html` — page content, project links, metadata, and contact form.
- `style.css` — responsive layout and visual styles, with reduced-motion support.
- `script.js` — animated mobile navigation, active section, email copying, email drafts, and interactive visual effects.
- `assets/anvar-cartoon.png` — generated cartoon portrait used in the hero and social previews.
- `assets/portrait-prompt.txt` — generation method and final image prompt.

The contact form opens the visitor’s email application with a draft; it does not send mail or store submissions. The clipboard button requires a secure context (HTTPS or localhost) and provides a fallback message when clipboard access is unavailable.

Fonts use Google Fonts with local sans-serif fallbacks. Icons and project illustrations are built into the page. The original `abouts.jpg` and `header.svg` remain available as source assets.

Visual effects include a canvas particle network, portrait scanning, ambient lighting, scroll reveals, and pointer-responsive cards. The Motion button pauses animations and remembers the choice locally. System reduced-motion preferences take priority; the canvas also pauses when the hero is offscreen or the tab is hidden. Mobile navigation fades and slides in and out, with closed links excluded from keyboard navigation.

## Publishing

Serve the repository root with GitHub Pages or another static host. No build output is required.

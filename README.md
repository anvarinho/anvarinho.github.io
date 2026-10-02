<div align="center">
  <img src="assets/anvar-cartoon.png" alt="Illustrated portrait of Anvar Jumabaev" width="180" />

  <h1>Anvar Jumabaev</h1>
  <p><strong>Ideas into code. Code into experiences.</strong></p>
  <p>Full stack &amp; mobile developer building connected products for the web, iOS, and Android.</p>

  <p>
    <a href="https://anvarinho.github.io/">View the portfolio</a>
    &nbsp;·&nbsp;
    <a href="mailto:anvarinho@gmail.com">Get in touch</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/WEB-Next.js%20%2F%20React-62e4ec?style=flat-square&labelColor=101923" alt="Web: Next.js and React" />
    <img src="https://img.shields.io/badge/iOS-SwiftUI-62e4ec?style=flat-square&labelColor=101923" alt="iOS: SwiftUI" />
    <img src="https://img.shields.io/badge/ANDROID-Kotlin-62e4ec?style=flat-square&labelColor=101923" alt="Android: Kotlin" />
    <img src="https://img.shields.io/badge/BACKEND-Django%20%2F%20Node.js-62e4ec?style=flat-square&labelColor=101923" alt="Backend: Django and Node.js" />
  </p>
</div>

---

## ✦ About this portfolio

A responsive personal portfolio showcasing web, iOS, and Android work. It is built with **HTML, CSS, and vanilla JavaScript**—no build step or package installation required.

> Thoughtful interfaces. Connected platforms. One experience across every screen.

## ⌘ Run locally

```bash
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000) in your browser.

## ◈ Inside the project

| File | What it does |
|:--|:--|
| [`index.html`](index.html) | Portfolio content, project links, metadata, and contact form |
| [`style.css`](style.css) | Responsive layout, visual styles, and reduced-motion support |
| [`script.js`](script.js) | Mobile navigation, active section, email actions, and interactive effects |
| [`assets/anvar-cartoon.png`](assets/anvar-cartoon.png) | Illustrated portrait used in the hero and social previews |
| [`assets/portrait-prompt.txt`](assets/portrait-prompt.txt) | Image generation method and final prompt |
| [`favicon.svg`](favicon.svg) | Site icon |

## ✧ Experience highlights

- **A connected portfolio** — work across web, iOS, and Android, with projects including GuideBook of Kyrgyzstan and WeCan.
- **Subtle motion** — a canvas particle network, portrait scan, ambient lighting, scroll reveals, and pointer-responsive cards.
- **Accessible controls** — keyboard-friendly mobile navigation and a motion toggle that remembers the visitor’s choice.
- **Motion-aware behavior** — system reduced-motion preferences take priority; the canvas pauses when the hero is offscreen or the tab is hidden.
- **Useful contact tools** — the form opens an email draft, while the copy button supports secure contexts and provides a fallback message.

## ↗ Contact behavior

The contact form **does not send or store submissions**. It opens the visitor’s email application with a prefilled draft, and the visitor chooses whether to send it. The clipboard button requires HTTPS or localhost for clipboard access and shows a fallback message when that access is unavailable.

Fonts load from Google Fonts with local sans-serif fallbacks. Icons and project illustrations are built into the page. The original `abouts.jpg` and `header.svg` remain available as source assets.

## 🚀 Publish

Serve the repository root with **GitHub Pages** or another static host. No build output is required.

<div align="center">
  <sub>© 2026 Anvar Jumabaev · Made with intent</sub>
</div>

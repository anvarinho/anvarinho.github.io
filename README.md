<div align="center">
  <img src="assets/portraits/anvar-480.webp" alt="Illustrated portrait of Anvar Jumabaev" width="180" />

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
| [`index.html`](index.html) | Single-page portfolio, complete project stories, metadata, and contact form |
| [`style.css`](style.css), [`story.css`](story.css) | Identity, responsive layout, native scroll choreography, and case-study styles |
| [`script.js`](script.js), [`site.js`](site.js), [`projects.js`](projects.js) | Homepage motion, native project popups, and shared progressive enhancements |
| [`projects/guidebook.html`](projects/guidebook.html), [`projects/wecan.html`](projects/wecan.html) | Compatibility redirects to project popups on the homepage |
| [`sitemap.xml`](sitemap.xml), [`robots.txt`](robots.txt), [`404.html`](404.html) | Discovery and missing-page navigation |
| [`assets/anvar-cartoon.png`](assets/anvar-cartoon.png) | Illustrated portrait used in the hero and social previews |
| [`assets/portrait-prompt.txt`](assets/portrait-prompt.txt) | Image generation method and final prompt |
| [`favicon.svg`](favicon.svg) | Site icon |

## ✧ Experience highlights

- **A connected portfolio** — work across web, iOS, and Android, with projects including GuideBook of Kyrgyzstan and WeCan.
- **Choreographed motion** — a quick, masked hero entrance, cyan portrait trace, section-specific arrivals, layered project artwork, and coordinated stack reveals.
- **Technology in motion** — locally hosted React, Next.js, Swift, Kotlin, Django, and Node.js marks in a seamless, pausable logo rail; a static layout respects reduced motion.
- **Precise interactions** — smooth pointer lighting and depth, magnetic button contents with stable hit areas, traveling focus highlights, and email-copy confirmation.
- **Accessible controls** — keyboard-friendly mobile navigation and a motion toggle that remembers the visitor’s choice.
- **Motion-aware behavior** — system reduced-motion preferences take priority; canvas, typing hints, and ambient CSS pause when offscreen or hidden. Touch devices skip pointer effects, and motion-off renders every section statically.
- **Useful contact tools** — the form opens an email draft, while the copy button supports secure contexts and provides a fallback message.

## ↗ Contact behavior

The contact form **does not send or store submissions**. It opens the visitor’s email application with a prefilled draft, and the visitor chooses whether to send it. The clipboard button requires HTTPS or localhost for clipboard access and shows a fallback message when that access is unavailable.

The existing Manrope and Space Grotesk variable fonts are served locally with preload hints and swap fallbacks; their OFL licenses are included. The hero uses responsive AVIF/WebP images derived from the original portrait. Icons and project illustrations are built into the page. Genuine GuideBook website captures are labeled as desktop and mobile web. The original portrait, `abouts.jpg`, and `header.svg` remain available as source assets.

The motion system uses native CSS, IntersectionObserver, and event-driven JavaScript, with no animation dependency. Shared easing and timing tokens live in `style.css`. The network briefly drifts during the opening, then wakes on pointer/scroll input at 15 fps with a capped pixel ratio; pointer updates batch geometry reads before writes. GuideBook and WeCan open in native dialogs with coordinated entrances, keyboard access, focus restoration, and Back/Forward navigation. Their complete stories are in the homepage HTML and remain readable without JavaScript. Project links use shareable fragments; old case-study URLs redirect to the matching popup. Native disclosures, popovers, overflow scrolling, and screenshot dialogs provide exploration without a widget framework.

See [UPGRADE_REVIEW.md](UPGRADE_REVIEW.md) for the latest verification, fresh CPU comparison, lab diagnostics, and owner follow-up. [MOTION_REVIEW.md](MOTION_REVIEW.md) preserves the earlier motion work; [PROJECT_EVIDENCE.md](PROJECT_EVIDENCE.md) records content provenance.

## 🚀 Publish

Serve the repository root with **GitHub Pages** or another static host. No build output is required.

<div align="center">
  <sub>© 2026 Anvar Jumabaev · Made with intent</sub>
</div>

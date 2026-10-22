# Portfolio upgrade review

Implemented locally on 22 October 2026. Existing uncommitted work was preserved and extended. No commit, publication, or deployment was performed. This remains raw HTML, CSS, and vanilla JavaScript, with no build requirement or runtime dependency.

## What changed

- A brief hero entrance is followed by a separate CSS depth wrapper as the hero leaves the viewport. Entrance, scroll, and pointer transforms have separate owners.
- A featured GuideBook presentation assembles authentic desktop/mobile-web captures and historical iOS/Android platform labels. On desktop at least 1024px wide and 850px tall, supported engines get a section sized to one viewport plus 560px, with a short sticky composition. Progress reverses directly with scrolling. Mobile, short screens, unsupported engines, disabled motion, and no-JavaScript contexts have a readable static presentation.
- Project artwork and titles use progressive cross-document View Transitions into linked static case studies. Navigation remains ordinary links, with normal Back/Forward behavior.
- Native details explain engineering notes and architecture. GuideBook has a native overflow/scroll-snap screenshot gallery with visible controls and optional dialog enlargement. WeCan has a disclosure-based architecture diagram and an optional native popover with a readable fallback.
- Mobile navigation stays visible without JavaScript. Menu, motion, copy, gallery, popover, and enlargement controls are shown only after initialization. Shared motion state, OS preference handling, navigation, and native enhancements live in `site.js`; the existing homepage motion remains in `script.js`.
- The contact action says **Open email draft**. Direct email, native validation, clipboard confirmation/fallback, and the existing draft behavior remain.
- Canonical, social-image, and JSON-LD metadata are consistent with the visible content. The sitemap contains the homepage and two actual HTML case studies, without section fragments or invented modification dates. Robots references the sitemap. The static 404 page uses root-relative working navigation.
- A dedicated 1200 × 630 JPEG social preview uses the original portrait and typography. Responsive AVIF/WebP portrait derivatives retain explicit dimensions and high fetch priority; product captures are lazy-loaded. The original portrait is retained as a source asset. The 1,675,521-byte original is replaced in the hero by AVIF options of 19,379 / 38,246 / 64,197 bytes (480 / 800 / 1200px), plus WebP fallbacks. The 800px AVIF is 97.7% smaller by byte count.
- The same Manrope and Space Grotesk families now load as local, preloaded variable WOFF2 files with included licenses. The Google Fonts CSS import is removed.

Native motion follows [MDN’s scroll-driven animation guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) and [cross-document View Transition guidance](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using). Sitemap URLs follow [Google Search Central’s canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Unsupported features do not gate essential content.

## Evidence and remaining owner tasks

[PROJECT_EVIDENCE.md](PROJECT_EVIDENCE.md) links the factual sources and records the regional link audit.

The real narrow GuideBook image is **mobile web**, not a fabricated native-app screen. No verified native iOS/Android captures, WeCan screenshots, or résumé exist in the inspected material. The signature moment therefore uses verified web captures and explicitly labeled historical platform cards. Authentic native captures are still needed to extend it into a three-platform screenshot assembly.

The early Swift snapshot loads bundled JSON; the Django-era API and current Next.js iteration are kept distinct. Project contribution statements are attributed to the existing portfolio record. Detailed team credits, exact released versions, and current backend/database relationships remain owner confirmation items.

Both GuideBook routes are current destinations. The four store identifiers remain historical references: checked US/Kyrgyzstan Apple variants and tested Play variants returned 404, and Apple lookups returned zero records in those regions. WeCan DNS failed here. No worldwide removal or permanent closure is claimed, and no guessed replacements were added. All 12 current external destinations returned 200.

Search Console property verification and sitemap submission require the owner after an authorized deployment. No Search Console action was performed. Published-page status, social cards, and hosting cache behavior should then be checked on the public origin.

## Validation

- **Chromium:** 64 checks passed, including desktop and 320/390/768px mobile layouts, touch, keyboard, skip link, native forward/reverse scroll progression, actual View Transition creation, direct case-study loads, Back/Forward, gallery controls, dialog/popover Escape and focus restoration, clipboard, encoded mailto drafts, reduced motion, motion persistence, and no-JavaScript navigation/content.
- **Gecko through installed Zen 1.22.3b:** all four pages loaded at 1440px without page errors, image failures, or overflow. Native dialog and popover actions passed. The 390px page was static and fit correctly. This engine reported no CSS scroll-timeline support, exercising the real static fallback. A stock Firefox installation was not available; this is explicitly Firefox-family Gecko coverage through Zen.
- **WebKitGTK 2.52.6:** all four pages loaded without script errors, failed initial images, or overflow at the window manager’s actual 632px CSS viewport. A real 200% web-view zoom produced a 316px viewport and remained usable without horizontal overflow. This is WebKit engine coverage, not a claim of testing the Safari application.
- Chromium additionally passed zoom-equivalent desktop reflow at 720 CSS pixels/DPR 2. Physical iOS/Android devices and Safari were unavailable. Hidden-tab lifecycle was simulated by overriding `document.hidden` and dispatching the lifecycle event; timers and ambient CSS paused. Offscreen cancellation was checked directly. Additional final checks confirmed that the network settles at rest and wakes on input, shared motion state remains functional, and short desktop screens use a vertical presentation.
- All four HTML documents pass the recommended HTML validator with stylistic rules adjusted for the existing source conventions. JavaScript syntax and Git whitespace checks pass. JSON-LD parses; titles, canonical URLs, social metadata, fixed image dimensions, and visible-heading structure were checked. This is not a claim of rich-result eligibility or full accessibility certification.
- Nineteen distinct local destinations returned 200. Sitemap has exactly three canonical pages; robots references it. The contact remains a local email draft and sends nothing itself. GitHub Pages custom 404 dispatch is hosting behavior; the local check exercised the actual `404.html` document and its root-relative links.

## Lighthouse lab diagnostics

Final local mobile Lighthouse run with storage reset: **Performance 99, Accessibility 100, Best Practices 100, SEO 100**. FCP 1.2s, LCP 2.1s, TBT 0ms, CLS 0. The browser checks also observed no initial image/font layout shift. The motion toggle’s accessible name was corrected to include its visible label.

These are local, simulated lab measurements, **not real-user Core Web Vitals** or a ranking guarantee. Lighthouse still identifies shared CSS unused in a single mobile viewport, readable unminified CSS/JavaScript, render-blocking styles, small-screen product-capture delivery opportunities, and the preview server’s absent cache headers. Source readability and buildless hosting are retained. Recheck caching/compression and cold-load performance on the actual host after an owner-authorized deployment.

## Fresh CPU comparison

The baseline was captured from the existing working tree at the start of this task, before further source changes. The earlier motion-review numbers were **not reused**. Original source snapshots, the pre-existing patch, and file hashes are retained under `/tmp/portfolio-upgrade-review/`.

Same isolated Chromium ARM64 process tree, 1440 × 1000 at DPR 1, desktop mouse/hover capability, motion enabled, same scripts and native input paths, no recording or other test browser running. Each scenario has three 8-second samples after 1.8 seconds at the hero. Fonts/assets were ready before timing; network caches were disabled. Only the originally saved source was substituted for the baseline, at the same local URL.

CPU is summed Chromium process CPU time (CDP SystemInfo.getProcessInfo) divided by measured wall time. **100% is one CPU core**; multithreaded rendering can exceed it. Results are specific to this headless renderer and machine.

| Scenario | Before | After | Relative change |
| --- | ---: | ---: | ---: |
| idle | 50.2% | 7.2% | -85.7% |
| scroll | 83.6% | 84.8% | +1.4% |
| pointer | 106.2% | 109.2% | +2.8% |

The idle scenario holds the hero at rest. Scrolling sends native wheel events every approximately 32ms, changing direction every 80 events. Pointer input follows the same sinusoidal path over the portrait for four seconds and the first project artwork for four seconds. The project target is located from the actual card, accounting for the added featured section.

Individual samples (before → after):

- idle: 52.1, 51.9, 46.8% → 3.7, 13.6, 4.2%.
- scroll: 97.7, 76.5, 76.7% → 89.4, 85.5, 79.4%.
- pointer: 106.0, 105.5, 107.1% → 108.1, 108.2, 111.1%.

Renderer main-thread TaskDuration averages: idle 4.63% → 0.11%; scroll 12.58% → 9.64%; pointer 21.11% → 21.09% of wall time.

The first finished-site pass regressed at idle; those samples are retained in `after-before-idle-fix.json`. A controlled CSS ablation did not resolve the cost. The final network briefly drifts on opening, then settles at rest; pointer/scroll input wakes it at a bounded 15fps, and offscreen/hidden states cancel the timer. This reduced measured idle CPU substantially. Active scrolling and pointer CPU increased slightly (about 1.4% and 2.8%) with the added presentation. Those costs are reported rather than claimed as improvements.

The source keeps its composited interface feedback and native scroll timelines; it does not continuously redraw a resting network. On this renderer, the occasional portrait scan contributes to variation between idle samples.


## Review artifacts

- [Desktop hero](/tmp/portfolio-upgrade-review/desktop-final.png), [featured composition](/tmp/portfolio-upgrade-review/featured-final.png), [case study](/tmp/portfolio-upgrade-review/case-final.png), [native image dialog](/tmp/portfolio-upgrade-review/dialog-final.png), [architecture](/tmp/portfolio-upgrade-review/architecture-final.png).
- [Mobile hero](/tmp/portfolio-upgrade-review/mobile-final.png), [full static mobile presentation](/tmp/portfolio-upgrade-review/mobile-full-final.png), [no-JavaScript mobile](/tmp/portfolio-upgrade-review/no-js-mobile.png).
- [Brief motion walkthrough](/tmp/portfolio-upgrade-review/portfolio-upgrade.mp4): hero entrance, forward/reverse native scroll assembly, project-to-case View Transition, image enlargement, native architecture controls, and motion toggle.
- [Fresh baseline CPU](/tmp/portfolio-upgrade-review/before-cpu.json), [final CPU](/tmp/portfolio-upgrade-review/after-cpu.json), [Lighthouse](/tmp/portfolio-upgrade-review/lighthouse.json), [Chromium checks](/tmp/portfolio-upgrade-review/qa.json), [Gecko checks](/tmp/portfolio-upgrade-review/gecko-results.json), [WebKit checks](/tmp/portfolio-upgrade-review/webkit-results.json), [local links and motion lifecycle](/tmp/portfolio-upgrade-review/static-check.json), [HTML validation](/tmp/portfolio-upgrade-review/html-validation.json).

These are local review artifacts under `/tmp/portfolio-upgrade-review/`, separate from the website. Run `python3 -m http.server 8000` from the repository to preview the source again. No build step is required.

## Single-page popups and technology-logo update

Implemented locally on 22 October 2026. No commit or deployment. Earlier measurements and page coverage above are historical; the project stories now live in the homepage.

- GuideBook and WeCan open as native dialogs with the same motion controller in projects.js. Their complete, evidence-linked stories are present in index.html, including the real screenshot gallery, native implementation disclosures, and WeCan architecture. Project-to-project links and chapter links stay within the page.
- Fragment URLs support direct entry and Back/Forward. Old case-study addresses redirect to the corresponding homepage popup (including historical chapter fragments). sitemap.xml lists the canonical homepage only; project structured data now uses homepage fragment URLs.
- Artwork buttons preserve the illustrations. The close bar remains visible during popup scrolling. Escape, deliberate backdrop clicks, focus restoration, background scroll locking, screenshot enlargement, and contact links work with native HTML controls. Both stories remain readable without JavaScript.
- React, Next.js, SwiftUI (using the Swift language mark), Kotlin, Django, and Node.js appear in the continuous technology rail. The locally hosted SVG sources and license are in assets/brands/. Relevant project tags reuse the same marks. Decorative repeats are hidden from assistive technology and inert.
- The rail pauses on hover, manual Pause, offscreen, while a project popup is open, and through the existing hidden-tab lifecycle. Motion off and system reduced motion provide a static grid with all six labels. The CSS loop updates at 30 fps, moves by transform, and uses fixed edge fades instead of a compositing mask. No animation library, build step, or frame-polling loop was added.

### Latest validation

48 Chromium checks cover the single-page project flow; 24 additional checks cover the logo rail, loop seam, pause/resume, 320px/390px touch layouts, motion settings, and no-JavaScript presentation. The hidden-tab check exercised the existing CSS lifecycle state; it did not physically switch browser tabs. Ten further checks each passed for the popup flow in WebKitGTK and the installed Zen browser (Firefox engine). The logo-specific checks were run in Chromium. All four HTML files validate, JavaScript syntax and Git whitespace checks pass, internal fragment targets resolve, and no application console errors were observed. Physical-device testing was not performed.

### Fresh CPU comparison for the logo rail

The baseline is the working tree immediately before the technology-logo addition, including the completed single-page popups. Earlier CPU baselines were not reused. Same isolated ARM64 Chromium headless setup, 1440 × 1000 at 1×, fine pointer and motion enabled; two 6-second repetitions per scenario, each after a fresh load, fonts ready, and 2.5 seconds of settling. The rail sits at y=110 in both versions. Idle holds it visible, scrolling uses identical alternating wheel events, and pointer input traverses the project cards below it.

CPU is summed Chromium-process CPU seconds divided by wall time; 100% represents one CPU core. Values are weighted across the two samples. These are headless lab measurements, not real-user Core Web Vitals.

| Scenario | Before logos | Final animated rail |
| --- | ---: | ---: |
| Idle, rail visible | 4.2% | 21.2% |
| Scrolling | 81.9% | 84.2% |
| Pointer interaction | 141.7% | 139.7% |

Continuous visible motion increases idle CPU relative to the static strip. Removing the compositing mask and limiting updates reduced the prototype’s visible-idle cost from 41.5% to 21.2%. Offscreen and manually paused states stop the rail animation. Interaction samples remain broadly similar; small differences should not be treated as general performance gains.

[Raw baseline](/tmp/technology-motion-review/before-cpu.json), [final samples](/tmp/technology-motion-review/after-cpu.json), [logo checks](/tmp/technology-motion-review/qa.json), [single-page checks](/tmp/single-page-review/qa.json). Screenshots and the walkthrough are in /tmp/technology-motion-review/. Owner-only Search Console verification/submission remains a follow-up; the homepage sitemap can be resubmitted after an owner-authorized deployment.

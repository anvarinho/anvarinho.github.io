# Portfolio motion review

Implemented locally on 2026-10-22. No deployment performed.

The navy/cyan palette, illustrated portrait, section order, content, product links, native scrolling, system cursor, and mailto form are preserved. No framework or dependency was added. The project previews use the existing CSS illustrations; no real product screenshot assets were present.

## Motion design

- Opening: navigation, three masked headline lines, portrait resolve, then supporting copy and buttons. The entrance finishes within 1.4 seconds, with no interaction gate. Keyboard focus skips it immediately.
- Portrait: a cyan SVG border trace, infrequent scan, restrained perspective, and layered artwork. The network has three particle depths and gentle pointer parallax.
- Work: masked artwork arrivals, subtle scale and scroll parallax, moving surface light, restrained tilt, and traveling borders on hover and keyboard focus. Body text remains on the card surface.
- About: masked headings and a short sequence through the copy and principles.
- Stack: coordinated card and tag arrivals, with no perpetual orbit or floating animations.
- Contact: a directional panel arrival, masked heading, focus glow, quieter typewriter hints, and clipboard confirmation with a checkmark and live status. The form still opens an email draft; it does not send anything.
- Buttons: attraction moves the contents while the clickable rectangle stays fixed. Press feedback and link arrows share the same easing family.

Motion timings and easing curves are CSS variables. Most animation uses transform and opacity. Clip paths and the portrait's brief 3px blur are limited to entrances; the small SVG border stroke animates only during its entrance or active interaction. Surface lighting moves a fixed radial-gradient layer rather than repainting a pointer-positioned background gradient.

## Verification

Thirty automated checks passed in local Chromium, with zero JavaScript exceptions. JavaScript syntax and Git whitespace checks also passed.

- Desktop at 1440 × 1000; touch emulation at 390 × 844, 320 × 740, and 768 × 1024. No horizontal overflow.
- Keyboard skip link, project focus outline/highlight, mobile menu opening, link traversal, Escape dismissal, and focus restoration.
- Pointer depth and smooth reset; primary button geometry unchanged during magnetic attraction.
- Contact arrival completes before field focus; visible focus glow; typing hints pause without changing user input.
- Clipboard text, checkmark, and live status; valid form submission produces the expected encoded mailto draft.
- Motion toggle, persistence after reload, OS reduced motion on initial load and during the session, and visible content without JavaScript.
- Offscreen canvas cancellation and paused portrait CSS. Hidden-tab lifecycle was **simulated** by dispatching a visibility change with `document.hidden` overridden; timers and CSS paused. Physical device and other browser-engine testing were not performed.

The browser was explicitly configured with desktop mouse/hover capabilities for desktop checks and CPU measurements. Touch emulation overrides those capabilities on mobile. Early measurements made without mouse/hover capability were discarded.

## CPU measurements

Measured with the same isolated Chromium headless process tree on ARM64, at 1440 × 1000 and 1× pixel ratio, motion enabled, mouse/hover enabled. Three 8-second samples per scenario, each preceded by 1.8 seconds at the top of the page. The saved original source was served to the same local URL for the baseline; the final run used the edited files. Caches were disabled for both; assets/fonts were ready before sampling. Recording was off throughout.

CPU is the change in summed process CPU seconds from CDP SystemInfo.getProcessInfo divided by elapsed wall time. **100% means one fully occupied CPU core**, so values above 100% are possible. The table uses total CPU time / total elapsed time across the three samples. These results are specific to this machine’s headless rendering environment; they are not predictions for physical mobile devices.

| Scenario | Before | After | CPU reduction |
| --- | ---: | ---: | ---: |
| idle | 121.7% | 61.9% | 49.2% |
| scroll | 128.9% | 92.0% | 28.6% |
| pointer | 155.7% | 108.2% | 30.5% |

Idle held the hero at rest. Scrolling delivered native wheel events every ~32ms, alternating direction after 80 events and traversing the page. Pointer interaction followed the same sinusoidal path over the portrait for four seconds and project artwork for four seconds.

Individual CPU samples (before → after):

- idle: 122.2, 123.1, 119.8% → 64.2, 69.5, 51.9%.
- scroll: 133.0, 127.7, 126.0% → 113.4, 87.4, 75.2%.
- pointer: 156.8, 155.7, 154.5% → 120.9, 101.7, 101.9%.

Renderer main-thread TaskDuration averages were idle: 26.2% → 6.0%; scroll: 31.2% → 13.4%; pointer: 30.3% → 22.7% of wall time. No measured scenario regressed.

The final rendering pass removed a full-canvas CSS mask and an almost-opaque header’s backdrop blur, dimmed network particles during drawing, and applied scroll parallax directly to the artwork layers. This kept the intended appearance while reducing compositing and style work.

## Review artifacts

- [Desktop screenshot](/tmp/portfolio-motion-review/desktop.png), [project interactions](/tmp/portfolio-motion-review/work.png), [contact](/tmp/portfolio-motion-review/contact.png).
- [Mobile screenshot](/tmp/portfolio-motion-review/mobile.png), [mobile contact](/tmp/portfolio-motion-review/mobile-contact.png).
- [Full desktop page](/tmp/portfolio-motion-review/desktop-full.png), [full mobile page](/tmp/portfolio-motion-review/mobile-full.png), captured in static mode so every section is visible.
- [Animation walkthrough](/tmp/portfolio-motion-review/portfolio-motion.mp4): about 19 seconds, showing the entrance, portrait and project depth, section arrivals, field focus, copy confirmation, and motion toggle.
- [Raw baseline measurements](/tmp/portfolio-motion-review/before-cpu.json), [raw final measurements](/tmp/portfolio-motion-review/after-cpu.json), [browser check results](/tmp/portfolio-motion-review/qa.json).

Artifacts and temporary browser verification scripts are under `/tmp/portfolio-motion-review/`; they are local review files and are not part of the website. The 320px header control spacing was also checked during capture. To preview the source again, run `python3 -m http.server 8000` from the repository and open `http://localhost:8000/`.

## Subsequent portfolio upgrade

The earlier implementation and measurements above are retained as historical notes. See [UPGRADE_REVIEW.md](UPGRADE_REVIEW.md) for the later case studies, native product storytelling, SEO work, cross-engine checks, and a **fresh baseline measured from this working tree**. The earlier CPU values were not reused as the new baseline.

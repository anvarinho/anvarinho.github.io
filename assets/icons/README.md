# Portfolio icons

The icon family follows the existing navy/cyan terminal mark in [`favicon.svg`](../../favicon.svg). The old purple PNG has been replaced with a matching 96px PNG. Every HTML page declares the same icons using root-relative paths, including the 404 page and compatibility redirects.

| Asset | Use |
| --- | --- |
| `/favicon.svg` | Scalable browser favicon; original design source |
| `/favicon.ico` | Browser fallback, containing 16px, 32px, and 48px frames |
| `/assets/icons/favicon-16.png`, `favicon-32.png` | Small PNG browser fallbacks |
| `/assets/icons/favicon-48.png` | ICO source frame |
| `/favicon.png` | 96 × 96 PNG favicon |
| `/apple-touch-icon.png` | Opaque 180 × 180 iPhone home-screen icon |
| `/assets/icons/apple-touch-icon-152.png`, `apple-touch-icon-167.png` | Opaque iPad home-screen variants |
| `/assets/icons/app-192.png`, `app-512.png` | Opaque general app icons for the web manifest |
| `/assets/icons/maskable-192.png`, `maskable-512.png` | Full-bleed icons with the mark inside the circular safe area for launcher cropping |
| `/assets/icons/maskable.svg` | Generated source for the maskable variants |
| `/safari-pinned-tab.svg` | Monochrome terminal mark for Safari pinned tabs |
| `/site.webmanifest` | App name, colors, scope, standalone launch preference, and Work/Contact shortcuts |

The manifest requests a standalone window when a visitor installs or adds the site to their home screen. Shortcut availability and installation UI depend on the browser. The launch URL is the homepage; there is no forced orientation, install popup, or service worker. **Offline support is not implemented.** The manifest alone does not make the portfolio available offline.

## Regenerate after changing the icon

The website has no build requirement. Generated assets are served directly; running the generator is optional. To regenerate them locally, install Rust, librsvg (`rsvg-convert`), and ImageMagick (`magick`), then run from the repository root:

```bash
rustc --edition=2021 tools/generate-icons.rs -o /tmp/portfolio-generate-icons
/tmp/portfolio-generate-icons
```

The generator uses `favicon.svg`, renders the PNG sizes directly from vector artwork, generates opaque Apple/app images, centers the maskable artwork with extra safe padding, and combines the small PNGs into the ICO. The Safari pinned-tab SVG is a separately drawn monochrome counterpart; update it manually if the mark changes.

Browser and home-screen icon caches can outlive normal page refreshes. Existing installed shortcuts may need to be removed and added again to show an updated icon. A real iPhone/iPad should be checked with Safari’s Add to Home Screen after deployment; desktop emulation cannot verify the operating system’s icon presentation.

References: [MDN app icons](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Define_app_icons), [Apple touch icons](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html), [Apple pinned-tab icons](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html), [MDN manifest shortcuts](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/shortcuts).

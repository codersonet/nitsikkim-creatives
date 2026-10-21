# Site guide

## Pages

| File | Purpose |
| --- | --- |
| [`index.html`](../index.html) | Landing page and overview |
| [`pages/clubs.html`](../pages/clubs.html) | Clubs and dynamically rendered project cards |
| [`pages/alumni.html`](../pages/alumni.html) | Alumni directory |
| [`pages/companies.html`](../pages/companies.html) | Recruitment partners |
| [`pages/events.html`](../pages/events.html) | Fests, events, and event filters |
| [`pages/metrics.html`](../pages/metrics.html) | Campus metrics |
| [`pages/contact.html`](../pages/contact.html) | Contact interface and skill selection |

## Shared implementation

- [`styles.css`](../styles.css) defines design tokens, typography, layout, navigation, reusable components, footer, and shared accessibility behavior.
- [`stylesheets/`](../stylesheets) contains one stylesheet per page: [`index.css`](../stylesheets/index.css), [`clubs.css`](../stylesheets/clubs.css), [`alumni.css`](../stylesheets/alumni.css), [`companies.css`](../stylesheets/companies.css), [`events.css`](../stylesheets/events.css), [`metrics.css`](../stylesheets/metrics.css), and [`contact.css`](../stylesheets/contact.css). Page-specific layouts and responsive rules belong in their matching file; load each after `styles.css`.
- [`script.js`](../script.js) initializes the shared canvas background, active navigation, card interactions, project filtering/rendering, counters, modal, footer, and marquee.
- [`favicon.svg`](../favicon.svg) and [`social-preview.svg`](../social-preview.svg) are editable vector assets; [`udgam2k26.png`](../udgam2k26.png) is a binary image. Asset intent belongs in documentation rather than embedded code comments.
- [`.github/workflows/static.yml`](../.github/workflows/static.yml) publishes the static site.
- [`examples/CreativeParkPreview.jsx`](../examples/CreativeParkPreview.jsx) is an optional React component example, not part of the static site's runtime.

## Updating content

- Update page text and page-specific metadata in its HTML file.
- Project card data and the shared page footer are maintained in `script.js`; update those data/helpers rather than duplicating shared markup across pages.
- Event content and filter categories live in `events.html`. Keep each card's `data-category` aligned with the filter buttons' `data-filter`.
- Global colors, spacing, typography, and responsive breakpoints belong in `styles.css`.
- All secondary pages live in `pages/` and declare `<base href="../">` so shared assets and site links resolve from the repository root. When adding a new page, follow that convention and link between secondary pages with the `pages/` prefix.
- Each HTML document should keep a meaningful title, description, canonical URL, and page-specific Open Graph/Twitter title, description, and URL.

## Contact interface

The form currently prevents the browser's normal submission and shows a local success animation. It does not send or store the entered information. See [Support](support.md) before directing visitors to use it.

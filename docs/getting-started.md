# Getting started

## Requirements

- A modern browser.
- Python 3 for the suggested local server, or another static-file HTTP server.
- GitHub access if you plan to publish changes.

The production website is plain HTML, CSS, and JavaScript. No Node.js packages, build tools, or dependency installation are required.

## Preview locally

From the repository root, run:

```bash
python3 -m http.server 5501
```

Visit <http://localhost:5501> and use the site navigation to check the other pages. Stop the server with `Ctrl+C`.

## Publish

The workflow at [`.github/workflows/static.yml`](../.github/workflows/static.yml) deploys the repository root to GitHub Pages on pushes to `main`. It can also be started manually from the repository's Actions tab. Check the workflow run and Pages environment if a deployment fails.

The public site URL and canonical metadata currently use `https://codersonet.github.io/nitsikkim-creatives/`. Update the canonical and social metadata in the HTML pages if the hosting domain or repository path changes. Secondary pages are stored in `pages/`; their `<base href="../">` keeps shared files and navigation working at the project subpath.

## External resources

Google Fonts and Font Awesome are loaded from external CDNs. The site still has system-font fallbacks, but those hosted font and icon assets require a network connection.

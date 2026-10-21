# Contributing

Contributions that improve content accuracy, accessibility, responsiveness, or maintainability are welcome.

## Before changing files

1. Open the relevant page and shared styles/scripts to understand existing patterns.
2. Keep changes focused, preserve the static-site workflow, and avoid introducing a build dependency unless the project is intentionally migrated.
3. For page content, verify facts and links with the appropriate content owners before publishing.

## Validate your change

Run the local server from the repository root:

```bash
python3 -m http.server 5501
```

Check the affected page at desktop and narrow mobile widths. Verify navigation, interactive controls, keyboard focus, image loading, and browser console output. For metadata edits, confirm canonical/social URLs match the page and deployment path.

There is no automated test or build command configured at this time. Do not report a build or test as passing unless one has been added and run.

## Pull requests

- Explain the user-visible change and list the pages or assets affected.
- Include before/after screenshots for visual changes when practical.
- Note manual checks performed and any known limitations.
- Do not include secrets, private personal information, or unverified claims.

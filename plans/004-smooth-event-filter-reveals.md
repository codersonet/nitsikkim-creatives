# 004 — Smooth event-filter card reveals

- **Status**: TODO
- **Commit**: f4f9018
- **Severity**: LOW
- **Category**: Transition continuity
- **Estimated scope**: 2 files, approximately 12 lines

## Problem

`pages/events.html:606-617` changes matching event cards from opacity `0` to
`1` after a timeout:

```js
if (shouldShow) {
  card.style.display = 'flex';
  card.style.opacity = '0';
  card.style.transform = 'translateY(12px)';
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 35 * index);
}
```

The shared `.glass-card` transition in `styles.css:166-171` includes
`transform`, border, background, and shadow, but not `opacity`. The event card's
opacity therefore changes instantly while its transform moves.

## Target

Add an event-page-specific transition in `stylesheets/events.css`:

```css
.page-events .event-card {
  transition:
    transform 180ms var(--ease-out),
    opacity 160ms ease-out;
}
```

Limit the event-filter stagger to `20ms` per card, capped at `80ms` total.
When reduced motion is enabled, use the direct final-state path from Plan 001
and schedule no reveal timers.

## Repo conventions to follow

- Event card styles belong in `stylesheets/events.css`; do not move them to the
  global sheet.
- The existing page scope is `.page-events`.
- The shared `--ease-out` token is defined in `styles.css` as
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- The filtering handler is inline in `pages/events.html`; it already owns the
  display, opacity, and transform state changes.

## Steps

1. Add the event-card transition to `stylesheets/events.css`; ensure its
   selector is more specific than the shared `.glass-card` transition.
2. Change the reveal timeout in `pages/events.html` to `Math.min(index * 20,
   80)` so the total delay is capped.
3. Retain the current display filtering and transform endpoints.
4. Ensure the reduced-motion branch from Plan 001 sets matching cards to
   `display: flex`, opacity `1`, and no transform without scheduling timers.

## Boundaries

- Do not change event categories, button behavior, card content, or grid layout.
- Do not move event styles into `styles.css`.
- Do not add animation libraries or dependencies.
- If the referenced code has drifted since commit `f4f9018`, stop and report
  the mismatch rather than improvising.

## Verification

- **Mechanical**: confirm event cards transition both transform and opacity;
  confirm the stagger delay cannot exceed `80ms`.
- **Feel check**: switch between event categories. Matching cards should reveal
  as a single coherent movement/fade, with no instant opacity snap or long
  delay for later cards.
- **Accessibility check**: with reduced motion enabled, confirm the results
  appear immediately and do not receive transform, opacity, or timer-based
  staging.
- **Done when**: event filtering preserves its current matching behavior while
  presenting a coherent, brief reveal and respecting reduced motion.

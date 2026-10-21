# 003 — Tune project-card filter motion

- **Status**: TODO
- **Commit**: f4f9018
- **Severity**: LOW
- **Category**: Timing and responsiveness
- **Estimated scope**: 1 file, approximately 15 lines

## Problem

`script.js:330-377` uses one project-rendering path for both the initial Clubs
page load and every filter action. Each card uses a `360ms` transform and
`300ms` opacity transition, with a `40ms` delay per card:

```js
card.style.opacity = "0";
card.style.transform = "translateY(16px)";
card.style.transition = "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out";
...
setTimeout(() => {
  card.style.opacity = "1";
  card.style.transform = "translateY(0)";
}, 40 * index);
```

The same stagger runs after every filter click, so successive list changes take
longer than the individual transition and cards appear progressively late.

## Target

- Make filtered project results appear without a stagger; filtering is a
  repeated control action and should respond directly.
- Preserve a restrained one-time entrance on the initial list only.
- For that initial entrance, use `transform 180ms var(--ease-out)` and
  `opacity 180ms var(--ease-out)`.
- Cap the one-time stagger at `80ms` total so the last card is never held back
  by a long per-item queue.
- Use the shared `prefers-reduced-motion` query established by Plan 001 to
  render final styles immediately when motion is reduced.

## Repo conventions to follow

- Project data and rendering/filter logic live in `script.js`.
- Use the existing shared `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` token in
  `styles.css`; do not hard-code another curve.
- The initial render is `renderProjects(clubProjects)` in the
  `DOMContentLoaded` handler. Filter changes call `renderProjects` from
  `initFilters`.

## Steps

1. Add an explicit render option distinguishing the initial list entrance from
   filter results. Keep the initial call animated and pass the non-animated
   option from each filter action.
2. For the initial entrance only, set opacity to `0` and transform to
   `translateY(8px)`, then transition to the final state with
   `transform 180ms var(--ease-out), opacity 180ms var(--ease-out)`.
3. Limit the initial stagger to at most `80ms` total; do not schedule timers for
   filter results or when reduced motion is enabled.
4. On the non-animated path, do not set a hidden intermediate state. Render
   cards directly at opacity `1` and transform `none`.

## Boundaries

- Do not change project data, card layout, filtering behavior, or progress-bar
  styling.
- Do not modify the event-page filter; that is Plan 004.
- Do not add a dependency or an animation abstraction used by other pages.
- If the referenced code has drifted since commit `f4f9018`, stop and report
  the mismatch rather than improvising.

## Verification

- **Mechanical**: confirm the animated project-card transition is no longer
  `360ms`; confirm filter-triggered rendering schedules no stagger timers.
- **Feel check**: load the Clubs page and verify the initial entrance is subtle
  and completes promptly. Switch categories repeatedly; each result set should
  appear immediately without waiting for a card-by-card sequence.
- **Accessibility check**: enable reduced motion and verify initial and
  filtered cards appear in their final state without transform or delay.
- **Done when**: initial entrance remains restrained, repeated filtering is
  direct, and no reduced-motion visitor receives the entrance animation.

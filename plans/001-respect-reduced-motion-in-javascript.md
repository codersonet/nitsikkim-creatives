# 001 — Respect reduced motion in JavaScript effects

- **Status**: TODO
- **Commit**: f4f9018
- **Severity**: MEDIUM
- **Category**: Accessibility and performance
- **Estimated scope**: 2 files, approximately 40 lines

## Problem

The reduced-motion media query in the global stylesheet hides the ambient
canvas, but the JavaScript animation loop continues drawing to it. Other
JavaScript motion also ignores the preference: pointer-driven card tilt,
project-card entry, animated statistics, and the event-filter reveal.

`script.js:118` initializes the canvas without checking the preference:

```js
function initMountainCanvas() {
  const canvas = document.getElementById("mountain-canvas");
  if (!canvas) return;
```

`script.js:273` schedules the next canvas frame unconditionally:

```js
offset += 1;
requestAnimationFrame(draw);
```

`script.js:343-377` applies motion and per-card timers on each project render:

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

`script.js:420-439` animates counters for 1400ms using `requestAnimationFrame`.
`script.js:282-315` applies pointer-driven card transforms. In
`pages/events.html:606-617`, the filter handler sets cards invisible and
schedules delayed reveal callbacks. None of these paths checks
`prefers-reduced-motion`.

## Target

Use the current `matchMedia("(prefers-reduced-motion: reduce)")` value for every
JavaScript-driven visual effect:

- Do not start or continue the canvas `requestAnimationFrame` loop when reduced
  motion is enabled. Stop a scheduled frame when the preference changes to
  reduce; restart it only when motion is allowed and the page is visible.
- Do not apply pointer-driven card tilt when reduced motion is enabled.
- Render project cards directly in their final state, without entrance
  transforms or delayed timers, when reduced motion is enabled.
- Set statistics directly to their final formatted values rather than running
  the counter loop when reduced motion is enabled.
- Show event-filter results directly, without opacity/transform staging or
  stagger timers, when reduced motion is enabled.
- Handle preference changes while the page is open; do not only sample the
  preference once at startup.

Keep existing behavior unchanged for visitors who have not requested reduced
motion. Avoid adding a dependency.

## Repo conventions to follow

- Shared page behavior lives in `script.js`; page-only event filtering lives in
  `pages/events.html`.
- The global reduced-motion CSS query is in `styles.css:638`.
- The site already uses `window.matchMedia` for fine-pointer behavior in
  `script.js:286`.
- Avoid broad catches or silently ignoring browser errors.

## Steps

1. Add a shared motion-preference query in `script.js` and use its live
   `.matches` value in every JavaScript motion path listed above.
2. Refactor `initMountainCanvas` so only one animation frame is pending at a
   time. Cancel it when the document is hidden or reduced motion becomes active;
   resume only when both conditions permit animation.
3. Guard card tilt and project-card staging. Under reduced motion, set the
   project cards to their final opacity and transform without creating timers.
4. In `initStatsCounter`, format each target value directly and unobserve it
   when reduced motion is active; otherwise retain the existing counter.
5. Update `filterEvents` to show matching cards directly when reduced motion is
   active. Ensure delayed callbacks from an earlier filter cannot leave a card
   in a stale intermediate state.

## Boundaries

- Do not change copy, page layout, colors, or the default motion behavior.
- Do not change CSS reduced-motion rules in `styles.css`; that is Plan 002.
- Do not change project-list timing for visitors who allow motion; that is Plan
  003.
- Do not add animation libraries or dependencies.
- If the referenced code has drifted since commit `f4f9018`, stop and report
  the mismatch rather than improvising.

## Verification

- **Mechanical**: inspect every `requestAnimationFrame` and `setTimeout` used
  for visual effects in `script.js` and `pages/events.html`; each must be
  gated, cancellable, or bypassed for reduced motion.
- **Feel check**: enable `prefers-reduced-motion: reduce` in browser DevTools.
  Confirm the canvas is not painted, project cards and event results appear
  immediately, counters show final values, and pointer movement does not tilt
  cards.
- **Dynamic preference check**: toggle the preference while the page is open;
  confirm animation stops promptly when reduced motion is enabled and resumes
  only when it is disabled and the document is visible.
- **Done when**: no JavaScript-driven visual animation continues or queues
  delayed visual changes for a reduced-motion visitor.

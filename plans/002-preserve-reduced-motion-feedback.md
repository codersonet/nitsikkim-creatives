# 002 — Preserve useful reduced-motion feedback

- **Status**: TODO
- **Commit**: f4f9018
- **Severity**: MEDIUM
- **Category**: Accessibility and feedback
- **Estimated scope**: 1 file, approximately 20 lines

## Problem

`styles.css:638-644` applies nearly instant timing to every CSS animation and
transition under reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
```

This suppresses movement, but also removes useful color and opacity feedback
from buttons, navigation, and other controls. The same rule also sets
`.glass-card:hover` to `transform: none` and hides `#mountain-canvas` later in
the block.

## Target

Refine only the existing reduced-motion media query:

- Stop continuous and decorative CSS animations under reduced motion.
- Keep short transitions for `color`, `background-color`, `border-color`,
  `fill`, and `opacity`, using `120ms`.
- Do not animate spatial properties such as `transform` in this mode. Retain
  the current explicit suppression of glass-card hover movement and the hidden
  mountain canvas.
- Keep `scroll-behavior: auto`.

Example of the intended feedback transition:

```css
transition-property: color, background-color, border-color, fill, opacity !important;
transition-duration: 120ms !important;
```

The 120ms duration is within the 100–160ms button-feedback range in the local
animation audit guidance. Do not add a second reduced-motion query.

## Repo conventions to follow

- Shared accessibility rules belong in the existing `@media
  (prefers-reduced-motion: reduce)` block in `styles.css`.
- The shared easing tokens, including `--ease-out`, are defined at the top of
  `styles.css`; do not create a parallel token set.
- `stylesheets/companies.css` already disables the marquee animation for
  reduced motion. Preserve that behavior.

## Steps

1. Replace the blanket `0.01ms` transition rule in `styles.css` with a
   120ms transition limited to color, background, border, SVG fill, and opacity
   feedback.
2. Disable CSS animations in this media query so continuously moving decoration
   such as the status pulse and radar sweeps do not run.
3. Confirm existing movement suppression remains in effect for glass-card
   hover and the mountain canvas. Do not add broad transform resets that would
   remove static decorative transforms.

## Boundaries

- Do not change default-motion styles or add new animations.
- Do not remove color, border, fill, or opacity feedback from controls.
- Do not modify JavaScript behavior; that is Plan 001.
- Do not change page markup or stylesheet ownership.
- If the referenced code has drifted since commit `f4f9018`, stop and report
  the mismatch rather than improvising.

## Verification

- **Mechanical**: inspect the reduced-motion rule and confirm its transition
  properties are limited to the stated feedback properties, its duration is
  `120ms`, and CSS animations are disabled.
- **Feel check**: with reduced motion enabled, hover and press controls. Confirm
  that buttons do not move, while text, border, background, SVG, and opacity
  feedback remain perceptible but brief.
- **Feel check**: confirm the status pulse, radar sweeps, marquee, and canvas
  do not move; static decorative geometry remains intact.
- **Done when**: reduced motion removes nonessential movement without making
  controls feel unresponsive or erasing their state feedback.

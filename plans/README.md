# Motion implementation plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](./001-respect-reduced-motion-in-javascript.md) | Respect reduced motion in JavaScript effects | MEDIUM | DONE |
| [002](./002-preserve-reduced-motion-feedback.md) | Preserve useful reduced-motion feedback | MEDIUM | DONE |
| [003](./003-tune-project-card-filter-motion.md) | Tune project-card filter motion | LOW | DONE |
| [004](./004-smooth-event-filter-reveals.md) | Smooth event-filter card reveals | LOW | DONE |

## Recommended execution order

1. Plan 001, so JavaScript-driven motion respects the current motion preference.
2. Plan 002, to refine the CSS reduced-motion behavior while preserving feedback.
3. Plan 003, to make the clubs list respond directly to repeated filtering.
4. Plan 004, to make the event-filter reveal coherent with its transform.

Plans 003 and 004 depended on Plan 001's reduced-motion behavior; all four
plans are now implemented in the shared and page-specific motion behavior.

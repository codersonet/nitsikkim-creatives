# React preview

[`examples/CreativeParkPreview.jsx`](../examples/CreativeParkPreview.jsx) is a small, optional React component showing project cards in the visual language of the static site. It is a reusable example, not a replacement for the published pages.

## Use it in an existing React app

1. Use a React host that supports JSX and CSS imports.
2. Copy the example into the host application's source tree.
3. Import the shared website stylesheet and the clubs page stylesheet; the component uses the shared `.grid-container`, `.glass-card`, and typography classes plus `.projects-grid` from the clubs stylesheet.
4. Render `<CreativeParkPreview />` inside a page that loads `styles.css`.

The component includes a small local preview dataset. Replace it with verified data or pass a `projects` array with `id`, `title`, `club`, `status`, `description`, `progress`, and `stack` fields. No React runtime or build setup has been added to this repository.

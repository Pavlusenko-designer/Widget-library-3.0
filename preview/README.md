# Widget Preview UI

## What this contains

- Rebuilt versions of 3 source widgets using `design-system/html-first` primitives
- Token-driven styling using `design-system/html-first/tokens/theme.css`
- Browser UI controls to:
  - switch active widget (one visible at a time)
  - switch preview width (`Full`, `320`, `768`, `1280`, `1920`)
  - tweak key tokens live (`--color-primary`, `--radius-lg`, `--space-2xl`, `--container-lg`)
- Video popup demo for the video widget via native `dialog`

## Open in browser

From repository root:

```powershell
python -m http.server 4173
```

Then open:

`http://localhost:4173/preview/`

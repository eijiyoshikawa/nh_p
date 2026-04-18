# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Key breaking points in Next.js 16:
- `params` and `searchParams` in page/layout are `Promise` — must `await` or `use(params)`.
- Use `PageProps<'/route'>` / `LayoutProps<'/route'>` helpers for typing.
- Server Components are default; annotate `"use client"` only when needed.

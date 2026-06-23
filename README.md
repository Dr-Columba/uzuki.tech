# uzuki.tech

卯月科技个人博客前端。

## Stack

- Vite
- TypeScript
- HTML / CSS / DOM APIs
- Static-first frontend
- Backend API: Bun + Hono via `/api/*`

## Features

- Blog home page
- Article detail page
- Placeholder category pages
- Hidden admin page at `/admin`
- Article ledger and Markdown editor
- Media library and image preview fallback
- Admin stats panel and system info view
- Lightweight visual effects

## Structure

```text
public/         Static assets
src/main.ts     Page rendering and browser interactions
src/styles.css  Application styles
dist/           Production build output
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

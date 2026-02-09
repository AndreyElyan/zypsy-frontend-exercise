# Zypsy Frontend Exercise

A posts list feature with category filtering, built as a production-grade React application.

**Live Demo:** [Frontend (Vercel)](https://zypsy-frontend-exercise-fw3y19x71-andrey-elyans-projects.vercel.app/?category=fa572550-ee37-4c33-9b91-8a69f902175c) | [Backend (Render)](https://zypsy-frontend-exercise.onrender.com/)

> **Note:** The backend is hosted on Render's free tier and may take ~30s to cold start. The app displays a friendly error screen with a retry button during this time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| UI | React 19 + React Compiler |
| Styling | Tailwind CSS v4 (`@theme inline`) |
| Unit Tests | Vitest + React Testing Library |
| E2E Tests | Playwright |
| Backend | Fastify + LowDB (provided) |

---

## Architecture

### Atomic Design

Components follow the Atomic Design methodology for clear separation of concerns:

```
src/
├── components/
│   ├── atoms/          # Badge, Divider, ErrorState, StarIcon, TabButton
│   ├── molecules/      # CategoryButton, CategoryTag, FilterTabs
│   ├── organisms/      # CategorySidebar, PostCard, PostList
│   └── templates/      # PostsPageTemplate
├── hooks/              # useCategories, usePosts, useSelectedCategory, useCategoryFilter
├── lib/                # api.ts (HTTP client), utils.ts (cn, formatPostDate)
├── app/                # Next.js routes (page, layout, error, not-found)
└── types/              # Shared TypeScript interfaces
```

### Custom Hooks

All data fetching and state management is encapsulated in hooks:

- **`useCategories`** — Fetches categories, exposes `toggleFavorite` with optimistic updates and rollback
- **`usePosts`** — Fetches posts by category with AbortController for race condition prevention
- **`useSelectedCategory`** — URL-based state via `useSearchParams` (persists across page reloads)
- **`useCategoryFilter`** — Manages "All" / "Favorites" filter state

### Design Tokens

Custom tokens are defined in `globals.css` using Tailwind v4's `@theme inline` directive, mapping directly from the Figma design:

```css
--color-primary: #1A2E05;
--color-primary-fg: #E3E3E3;
--color-surface: #FFFFFF;
--color-foreground: #252525;
--color-accent: #E5E7EB;
--color-star-gold: #D4AA3C;
```

---

## Key Technical Decisions

### Optimistic Updates with Rollback

The `useCategories` hook implements optimistic UI for favorite toggling — the star icon updates instantly, and if the API call fails, state is rolled back using a `useRef` snapshot. This provides a snappy user experience even on slow connections.

### URL-Based State

Category selection is stored in the URL query string (`?category=<id>`), so users can share links and the selected category persists on page reload. This was a requirement from the spec.

### Race Condition Handling

The `usePosts` hook uses `AbortController` to cancel in-flight requests when the user switches categories quickly, preventing stale data from overwriting fresh results.

### Error Handling Strategy

Three layers of error handling:

1. **Backend down** — Full-screen `ErrorState` component with retry button (reloads the page)
2. **Posts fetch failure** — Inline error message in the post list area (sidebar remains functional)
3. **Uncaught errors** — Next.js Error Boundary (`error.tsx`) catches unexpected runtime errors

### Accessibility

- Filter tabs use `role="radiogroup"` / `role="radio"` with `aria-checked` for screen reader support
- Star icons are keyboard-accessible (`tabIndex`, Enter/Space key handlers) with `role="button"` and `aria-label`
- Semantic HTML: `<main>` landmark, `<article>` for posts, `<time datetime="...">` for dates, `<aside>` for sidebar
- Singular/plural grammar handled dynamically ("1 post" vs "2 posts")

---

## Testing

### Unit Tests — 140 tests, 100% coverage

```bash
cd frontend
npm test                # Run all tests
npm run test:coverage   # Run with coverage report
```

Every component, hook, and utility function is tested. Coverage thresholds are enforced at **100%** for statements, branches, functions, and lines in `vitest.config.ts`.

### E2E Tests — 16 tests across 4 specs

```bash
npm run test:e2e
```

| Spec | Coverage |
|---|---|
| `categories.spec.ts` | Category list rendering and selection |
| `favorites.spec.ts` | Favorite toggling and filtering |
| `posts.spec.ts` | Post display and category tags |
| `responsive.spec.ts` | Mobile and desktop layout behavior |

### Type Safety

```bash
npx tsc --noEmit       # Zero errors
```

---

## Running Locally

### Prerequisites

- Node.js >= 22

### Backend

```bash
cd backend
npm install
npm run start           # Runs on http://localhost:9000
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # Runs on http://localhost:3000
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:9000` | Backend API base URL |

---

## Deployment

- **Frontend:** Vercel (set `NEXT_PUBLIC_API_URL` environment variable, root directory: `frontend`)
- **Backend:** Render (root directory: `backend`, uses `process.env.PORT` and `host: '0.0.0.0'`)

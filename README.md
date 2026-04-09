# Lendsqr Admin Dashboard

**Live App:** https://isaac-onazi-lendsqr-fe-test.vercel.app/
**Video Walkthrough:** [\[Loom URL\]](https://www.loom.com/share/2a46a4a18882486ea908e9050ac1842c)
**Documentation:** [\[Notion Url\]](https://yummy-pigment-ce5.notion.site/Submission-Document-193fc1b5dcd747c293f28525e087b972?source=copy_link)

A pixel-faithful implementation of the Lendsqr Admin Console built for the Lendsqr Frontend Engineering Assessment.

---

## Pages Built

- **Login** — Two-column layout with form validation, password visibility toggle, loading state, and error handling
- **Users List** — 500-record paginated and filterable users table with four summary stat cards
- **User Details** — Profile card with tier stars, account balance, and tabbed content section
- **Dashboard Layout** — Persistent shell with fixed Header and collapsible Sidebar across all authenticated routes

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite | UI framework; Vite for fast HMR and zero-config TypeScript |
| TypeScript | Strictly typed — zero `any` usage across the codebase |
| SCSS + BEM | Required styling; paired with BEM for structured, collision-free class names |
| React Router v7 | Client-side routing with protected route guards |
| Vitest + React Testing Library | Vite-native test runner with Jest-compatible API |
| @faker-js/faker | Generating 500 realistic Nigerian-locale mock user records |
| IndexedDB + localStorage | Client-side caching for user detail records |

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/I-Onazi/lendsqr-fe-test
cd lendsqr-fe-test

# 2. Install dependencies
npm install

# 3. Generate the 500 mock user records
npm run build-mock

# 4. Start the development server
npm run dev

# 5. Run the test suite
npm test
```

---

## Key Architectural Decisions

### 1. Static JSON Mock API
Generated 500 user records locally via `scripts/generate-mock-users.mjs` using `@faker-js/faker` with Nigerian locale constraints — 11-digit phone numbers, NUBAN account numbers, ₦-formatted balances. Served as a static file at `/mock-api/users.json`. Chosen over external services like mocky.io to avoid external dependencies during assessment review.

### 2. IndexedDB with localStorage Fallback
User detail records are cached in IndexedDB on first visit and retrieved locally on subsequent visits — no repeat network requests. localStorage fallback ensures the app works in environments where IndexedDB is restricted. Implemented in `src/utils/storage.ts`.

### 3. Custom Hook for Data Logic
All fetching, filtering, and pagination logic lives in `src/hooks/useUsers.ts`. The Dashboard component is clean and declarative; it receives data and handlers via the hook without knowing anything about how they work.

### 4. SCSS Token System
All design tokens (colours, spacing, typography, breakpoints) extracted from Figma into `src/styles/_variables.scss` before any CSS was written. Every value in the codebase traces back to a named variable — no magic numbers.

---

## Testing

9 test files covering 176 assertions across positive and negative scenarios:

- `Login.test.tsx` — form validation, empty submission error, successful navigation
- `Badge.test.tsx` — correct class and text for all four status values
- `Button.test.tsx` — variants, loading state, disabled behaviour
- `Input.test.tsx` — rendering, password visibility toggle
- `Pagination.test.tsx` — page controls, handler calls, boundary states
- `useUsers.test.ts` — data loading, filtering, pagination math
- `useLocalStorage.test.ts` — get, set, remove, JSON error handling
- `userService.test.ts` — filter logic, stats derivation, negative cases
- `formatters.test.ts` — date formatting with valid, invalid, and null inputs

---

## Project Structure

```
src/
├── components/
│   ├── common/       # Badge, Button, Input, Card, Loader, Pagination, Table
│   ├── layout/       # Header, Sidebar, DashboardLayout
│   └── users/        # UserStatsCards, UserTable, UserFilters, UserDetailsTabs
├── hooks/            # useUsers, useLocalStorage
├── pages/            # Login, Dashboard, UserDetails
├── services/         # userService, api
├── styles/           # _variables, _mixins, _reset, main.scss
├── types/            # user.ts, index.ts
└── utils/            # formatters, storage, index.ts
```

---

## Author

**Isaac Onazi**
Submitted for the Lendsqr Frontend Engineering Assessment.
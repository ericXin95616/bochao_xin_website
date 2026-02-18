# Copilot Instructions

## Build & Run Commands

```bash
npm run dev          # Dev server on port 3000 (proxies /api to localhost:8000)
npm run build        # TypeScript check + Vite production build → dist/
npm run lint         # ESLint
npm run preview      # Preview production build locally
```

**Backend (FastAPI):**
```bash
cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Docker (full stack):**
```bash
docker compose up -d                        # Start frontend (port 80) + backend (port 8000)
docker compose up -d --build frontend       # Rebuild frontend container
```

After changing `nginx.conf` without rebuilding the Docker image:
```bash
docker cp nginx.conf <container>:/etc/nginx/conf.d/default.conf
docker exec <container> nginx -s reload
```

## Architecture

- **Frontend**: Single-page React 19 + TypeScript app built with Vite. All UI lives in `src/App.tsx` as a single component using tab-based navigation via `activeTab` state (not a router).
- **Backend**: FastAPI (Python 3.11) with in-memory data. Serves REST endpoints under `/api/`. The frontend works without the backend (static data is hardcoded in `App.tsx`).
- **Contact form**: Uses `@emailjs/browser` to send emails directly from the browser. No backend needed for this. Credentials come from `VITE_EMAILJS_*` env vars.

### Deployment

- **GitHub Pages**: GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the frontend and deploys to Pages. Set `VITE_BASE_PATH=/bochao_xin_website/` for correct asset paths.
- **Docker**: Nginx serves the built frontend and proxies `/api/` to the FastAPI backend container. The `dist/` folder is volume-mounted into the nginx container.
- The Dockerfile runs its own `npm run build` internally — the volume-mounted `dist/` from `docker-compose.yml` overrides this.

### Nginx

`nginx.conf` handles: static asset caching (1yr), gzip, `/api/` proxy to `backend:8000`, React SPA fallback (`try_files $uri /index.html`), and security headers.

## Key Conventions

### Environment Variables

All frontend env vars must use the `VITE_` prefix to be exposed via `import.meta.env`:

| Variable | Purpose | Where set |
|---|---|---|
| `VITE_BASE_PATH` | Base URL path for assets (`/` locally, `/bochao_xin_website/` on Pages) | `vite.config.ts`, GitHub Actions |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | `.env` (local), GitHub Secrets (CI) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | `.env` (local), GitHub Secrets (CI) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | `.env` (local), GitHub Secrets (CI) |

### CSS

- `src/index.css`: Vite/global resets and base element styles.
- `src/App.css`: All component styles. Uses BEM-like flat class names (`.nav-circle`, `.resume-item`, `.contact-form`). Responsive breakpoints: mobile (<480px), tablet default, desktop (≥768px), large desktop (≥1200px).
- Desktop layout uses CSS Grid with a left sidebar (profile) + right content area (nav + main). Mobile uses a single column.

### Frontend Patterns

- Static data (projects, experiences, blog posts) is defined as TypeScript arrays with interfaces at the top of `App.tsx`.
- Tab switching is state-driven (`useState`), not route-driven. There is no React Router.
- The profile sidebar is clickable to return to the home tab.

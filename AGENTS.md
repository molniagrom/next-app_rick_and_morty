# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router project.

- `app/`: route pages, API route handlers (`app/api/rickandmorty/*`), hooks, store, shared types.
- `components/`: reusable UI blocks (`NavBar`, `CharacterCard`, `HeadMeta`).
- `public/`: static assets (SVG/icons).
- `app/**/*.module.scss`: route/component-scoped styles.
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `package.json`.

Prefer keeping feature logic near routes (e.g., `app/episodes/*`) and shared logic in `app/hooks`, `app/store`, and `app/types`.

## Build, Test, and Development Commands
Use `pnpm` (lockfile is `pnpm-lock.yaml`).

- `pnpm dev`: start local dev server.
- `pnpm build`: production build.
- `pnpm start`: run the built app.
- `pnpm lint`: run ESLint checks.
- `pnpm exec tsc --noEmit`: type-check without emitting files.

Example workflow:
```bash
pnpm lint && pnpm exec tsc --noEmit && pnpm build
```

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 4 spaces; keep imports grouped and sorted logically.
- Components: `PascalCase` file/folder names (`CharacterCard.tsx`).
- Hooks: `camelCase` with `use` prefix (`useEpisodeCharacters.ts`).
- SCSS modules: `*.module.scss`; reference via `s.className`/`styles.className`.
- Use explicit, typed state models from `app/types/types.ts`.
- Run `pnpm lint` before committing.

## Testing Guidelines
There is currently no dedicated test framework configured. For now:
- Treat `lint` + `tsc` as mandatory quality gates.
- Manually verify key routes: `/`, `/characters`, `/episodes`, `/characters/[id]`, `/episodes/[id]`.
- If adding tests, co-locate as `*.test.ts(x)` and prefer React Testing Library + Vitest/Jest.

## Commit & Pull Request Guidelines
Recent history uses short imperative messages (e.g., `create episodes and search for episodes`, `Fix Vercel data loading...`). Keep commits focused and descriptive.

PRs should include:
- What changed and why.
- Affected routes/files.
- Screenshots/GIFs for UI updates.
- Verification steps (`pnpm lint`, `pnpm exec tsc --noEmit`, manual route checks).

## Security & Configuration Tips
- Do not commit secrets.
- Use Vercel environment variables for production.
- External API access is proxied via `app/api/rickandmorty/*`; prefer internal `/api/...` calls from client code.

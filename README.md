# NicePatrol prototype

Three independently runnable Vite applications backed by shared workspace packages.

## Applications

- `apps/dashboard` - desktop operations console for admins and supervisors
- `apps/field` - mobile patrol, attendance, QR checkpoint, and incident workflows
- `apps/visitor` - reception registration, active visitor, and visit-history workflows

## Shared packages

- `packages/theme` - brand tokens, Kumo theme bridge, surfaces, motion, and grid treatments
- `packages/ui` - shared Kumo wrappers and NicePatrol presentation components
- `packages/domain` - Zod schemas, TypeScript models, and prototype seed data
- `packages/mock-api` - asynchronous local service boundary and browser persistence

## Run locally

```bash
pnpm install
pnpm dev:dashboard # http://127.0.0.1:4173
pnpm dev:field     # http://127.0.0.1:4174
pnpm dev:visitor   # http://127.0.0.1:4175
```

Run each development command in a separate terminal.

## Verification

```bash
pnpm typecheck
pnpm build
```

## Deploy to Cloudflare Pages

Each app is deployed independently as a Cloudflare Pages project. Git-connected projects
build from the workspace root with these settings:

| Project | Build command | Output directory |
| --- | --- | --- |
| `nicepatrol-dashboard` | `pnpm --filter @nicepatrol/dashboard build` | `apps/dashboard/dist` |
| `nicepatrol-field` | `pnpm --filter @nicepatrol/field build` | `apps/field/dist` |
| `nicepatrol-visitor` | `pnpm --filter @nicepatrol/visitor build` | `apps/visitor/dist` |

For a manual deployment with Wrangler:

```bash
wrangler login
pnpm deploy:dashboard
pnpm deploy:field
pnpm deploy:visitor
```

To build and deploy all three apps sequentially, run `pnpm deploy`.

## Structure

Each application uses the same boundaries:

```text
src/
  app/          router composition and app-scoped providers
  components/   reusable app-specific UI and layouts
  pages/        route-level feature screens
  main.tsx      runtime provider entry point
  styles.css    Tailwind, Kumo, and shared theme imports
```

Cross-application code belongs in `packages/*`; application-specific code stays inside its owning app. Kumo is used for management surfaces, while live operational experiences use the shared NicePatrol mission-control tokens and components.

## Prototype data and visualizations

The service boundary in `packages/mock-api` supplies prototype data and can later be replaced by backend requests without changing route-level UI composition. Dashboard visualizations are real production components:

- Recharts powers patrol coverage, operational score, module performance, and trend charts.
- React Leaflet and Leaflet power the interactive live-patrol map with OpenStreetMap tiles.

Only the current datasets, coordinates, and service responses are mocked; charts and maps are not CSS or SVG stand-ins.

## NetflixGpt - Monorepo

This project contains a TypeScript/Express API server and two React clients (Vite).

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL (or the database configured in `server/prisma/schema.prisma`)

### Quick Start

```bash
# 1) Install deps
npm --prefix server ci
npm --prefix client ci
npm --prefix clienttwo ci

# 2) Configure environment
cp server/.env.example server/.env
# then edit server/.env (see variables below)

# 3) Initialize DB (Prisma)
cd server && npx prisma migrate deploy && npx prisma generate && cd -

# 4) Start dev servers
npm --prefix server run dev
npm --prefix client run dev
# optional second client
npm --prefix clienttwo run dev

# 5) Production build
npm --prefix server run build
npm --prefix client run build
npm --prefix clienttwo run build
```

### Server (Express + TypeScript)

- Path: `server`
- Scripts:
  - `npm run dev`: compile TS in watch and run `nodemon` on `dist/server.js`
  - `npm run build`: compile TS and copy `src/generated` to `dist/`
  - `npm start`: run compiled server from `dist/`

#### Required env vars (`server/.env`)

- `PORT`=3000
- `NODE_ENV`=development
- `JWT_SECRET`=your-strong-secret
- `TMDB_API_KEY`=your-tmdb-key
- `FRONTEND_URL`=http://localhost:5173
- `GMAIL_USER`=you@example.com
- `GMAIL_PASS`=your-app-password
- Database variables per your Prisma provider (e.g. `DATABASE_URL`)

#### Prisma

```bash
cd server
npx prisma db push   # or: npx prisma migrate dev
npx prisma generate
```

### Client (Vite React)

- Path: `client`
- Scripts: `npm run dev | build | preview`

### Client Two (Vite React + TS)

- Path: `clienttwo`
- Scripts: `npm run dev | build | preview`

### Notes

- The API sets an HTTP-only cookie `netflix_id` for auth.
- Ensure `FRONTEND_URL` matches the client dev URL for password reset links.

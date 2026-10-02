# HostelDesk AI Backend

Production-oriented REST API for the existing HostelDesk AI frontend. The complaint classifier is a deterministic local rule-based NLP engine; no AI provider API key is required.

## Stack
- Node.js + Express
- PostgreSQL + Prisma
- JWT + bcrypt
- Zod validation
- Helmet + CORS + rate limiting

## Setup
1. Install Node.js 18.18+ and PostgreSQL.
2. Create a PostgreSQL database named `hosteldesk`.
3. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET` (32+ characters), and `CLIENT_URL`.
4. Run `npm install`.
5. Run `npx prisma generate`.
6. Run `npx prisma migrate dev --name init`.
7. Run `npm run db:seed`.
8. Run `npm run dev`.

## Demo accounts
Development seed accounts all use the password `HostelDesk@2026!`:
- Student: `student@hosteldesk.demo`
- Warden: `warden@hosteldesk.demo`
- Admin: `admin@hosteldesk.demo`
Do not use these credentials in production.

## API
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/complaints`
- `GET /api/complaints/my`
- `GET /api/complaints`
- `GET /api/complaints/:id`
- `PATCH /api/complaints/:id`
- `POST /api/complaints/:id/assign`
- `PATCH /api/complaints/:id/status`
- `GET /api/complaints/:id/history`
- `POST /api/complaints/:id/comments`
- `GET /api/dashboard/overview`
- `GET /api/analytics/overview`
- `GET /api/analytics/categories`
- `GET /api/analytics/priorities`
- `GET /api/analytics/blocks`
- `GET /api/analytics/trends`
- `GET /api/analytics/insights`

All protected endpoints use `Authorization: Bearer <JWT>`.

## Classification
The classifier directly ports the frontend's `RU` rules and `cls()` behavior. It detects the same categories, priority levels, responsible teams, confidence, recommended action, response ETA, reasoning, affected-student count, and block. If 10+ students are detected and the base priority is Medium, it escalates to High.

## Deployment
Deploy the backend to Render/Railway/Fly.io/etc. with a managed PostgreSQL provider such as Neon/Supabase/Railway. Set `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, and the exact frontend `CLIENT_URL`. Run `npx prisma migrate deploy` during deployment.

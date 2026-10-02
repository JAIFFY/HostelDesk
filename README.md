# HostelDesk AI

Smart hostel management and complaint classification system with a Student Portal and Warden Portal.

## What changed
The supplied single-file frontend is preserved visually, but its in-memory complaint store has been replaced by a real REST API backed by PostgreSQL. The frontend's deterministic `RU`/`cls()` classifier is implemented on the backend as a local rule-based NLP engine, so no OpenAI/Gemini/Hugging Face/Anthropic key is required.

The original UI already contains Student Portal, Warden Portal, priority queue, insights, analytics, complaint detail drawer, assignment and status flows. fileciteturn1file1L110-L134

## Architecture
Frontend (static HTML/CSS/JS) → Express REST API → Prisma → PostgreSQL

## Local setup
### Backend
```bash
cd backend
cp .env.example .env
# edit DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

### Frontend
Serve `frontend/` with any static server:
```bash
cd frontend
python -m http.server 8080
```
Then open `http://localhost:8080`.
For deployment, set `window.API_BASE_URL` to your public API URL or replace the default before publishing.

## Demo credentials
Development seed accounts use `HostelDesk@2026!`:
- Student: `student@hosteldesk.demo`
- Warden: `warden@hosteldesk.demo`
- Admin: `admin@hosteldesk.demo`

Never use these credentials in production.

## Acceptance flow
1. Student logs in.
2. Student submits `The ceiling fan in room 204 is not working.`
3. Backend classifies it as Electrical / Medium / Electrical Team using the local classifier.
4. Complaint is persisted in PostgreSQL.
5. Warden sees it in the priority queue.
6. Warden assigns it and moves it through Assigned → In Progress → Resolved.
7. Student sees the persisted status and history.

## Tests
The repository includes deterministic classifier and API-contract tests. Full database/end-to-end verification requires a running PostgreSQL instance and successful dependency installation.

## Deployment
Recommended:
- Frontend: Vercel/Netlify
- Backend: Render/Railway
- PostgreSQL: Neon/Supabase/Railway

Set production `DATABASE_URL`, a long random `JWT_SECRET`, exact frontend `CLIENT_URL`, and `NODE_ENV=production`. Run `npx prisma migrate deploy` on the backend deployment.

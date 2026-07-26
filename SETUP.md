# Contact Us Management System — Setup

## 1. Database
Create the MySQL database (name matches `Backend/config/config.json`):
```sql
CREATE DATABASE contact_us_db;
```

## 2. Backend
```bash
cd Backend
npm install
npx sequelize-cli db:migrate    # creates the Contacts table
npm run dev                     # or: nodemon app.js / node app.js
```
Runs on http://localhost:3001 — check `Backend/package.json` for the exact start script name (nodemon is a devDependency).

## 3. Frontend
```bash
cd Frontend
npm install                     # installs react-router-dom too, added to package.json
npm run dev
```
Runs on http://localhost:5173 (Vite default).

## What changed from the old Attendance/Employee project
- Backend: `User` model/routes → `Contact` model/routes (`name`, `email`, `message` + timestamps). New `/api/contacts` endpoints support `search`, `date`, `sortBy`, `order`, `page`, `limit` query params.
- Frontend: fully restructured into `pages/`, `components/`, `components/ui/`, `services/`, `hooks/`, `types/` per the assessment's expected component tree. Routing added via `react-router-dom` (Home / Contact / Queries pages).
- Old unused `EmployeeForm`, `EmployeeTable`, orphaned `SearchBar` files removed — `Register.tsx` (which had all logic inlined) replaced by properly separated pages + hook + service layer.

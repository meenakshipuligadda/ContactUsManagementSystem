# Contact Us Management System

A full stack **Contact Us Management System** built with **React, TypeScript, Node.js, Express.js, MySQL, and Sequelize**. Visitors can submit enquiries through a validated contact form, and submitted queries can be searched, filtered, sorted, edited, and deleted through a responsive management interface.

---

## Features

- Responsive landing page with clean navigation
- Contact form with client-side validation (required fields + email format)
- Create, read, update, and delete contact submissions
- Same form reused for both create and edit
- Search by name and email
- Filter by submission date
- Sort by name and created date
- Pagination (5 records per page)
- Confirmation dialog before delete
- Loading, success, error, and empty states
- Enter key submits the form
- Mobile responsive layout (table collapses into cards below 640px)
- REST API with server-side search, sort, and pagination
- Service layer abstraction for all API calls

---

## Tech Stack

**Frontend:** React, TypeScript, Vite, React Router, Axios, CSS3
**Backend:** Node.js, Express.js, Sequelize ORM, MySQL, CORS
**Tools:** VS Code, MySQL Workbench, Postman, Git, GitHub

---

## Project Structure

```
ContactUsManagementSystem
│
├── Frontend
│   ├── public
│   └── src
│       ├── components
│       │   ├── ui              # Reusable primitives: Button, Input, Modal, Alert, Spinner, EmptyState
│       │   ├── layout          # Navbar
│       │   ├── ContactForm.tsx
│       │   ├── ContactTable.tsx
│       │   ├── SearchBar.tsx
│       │   ├── FilterSection.tsx
│       │   └── Pagination.tsx
│       ├── pages               # Home, ContactPage, QueriesPage
│       ├── services            # api.ts (axios instance), contactService.ts
│       ├── hooks               # useContacts.ts
│       ├── types               # contact.ts
│       ├── App.tsx
│       └── main.tsx
│
└── Backend
    ├── config                  # Sequelize database config
    ├── models                  # Contact model
    ├── routes                  # contactRoutes.js
    ├── migrations              # Contacts table migration
    └── app.js
```

---

## Setup

### 1. Database

```sql
CREATE DATABASE contact_us_db;
```

Update credentials in `Backend/config/config.json` if yours differ.

### 2. Backend

```bash
cd Backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

Runs at `http://localhost:3001`

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contacts | Create a contact |
| GET | /api/contacts | Get all contacts (supports search, filter, sort, pagination) |
| GET | /api/contacts/:id | Get a single contact by ID |
| PUT | /api/contacts/:id | Update a contact |
| DELETE | /api/contacts/:id | Delete a contact |

### Query parameters on `GET /api/contacts`

| Parameter | Values | Description |
|-----------|--------|-------------|
| `search` | any text | Matches against name or email |
| `date` | `YYYY-MM-DD` | Returns contacts created on that day |
| `sortBy` | `name`, `createdAt` | Field to sort by |
| `order` | `ASC`, `DESC` | Sort direction |
| `page` | number | Page number (default 1) |
| `limit` | number | Records per page (default 5) |

Example: `GET /api/contacts?search=meena&sortBy=name&order=ASC&page=1&limit=5`

Response shape:

```json
{
  "data": [ ... ],
  "total": 12,
  "page": 1,
  "totalPages": 3
}
```

---

## Database Design

**Table:** `Contacts`

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| name | STRING | Required |
| email | STRING | Required |
| message | TEXT | Required, `TEXT` rather than `VARCHAR` to allow long messages |
| createdAt | DATE | Managed automatically by Sequelize |
| updatedAt | DATE | Managed automatically by Sequelize |

`createdAt` powers both the date filter and the created-date sort, so timestamps are functional here rather than just audit metadata.

**Scalability considerations:** adding an index on `createdAt` and `email` would keep filtering and searching fast as the table grows. Search currently uses `LIKE`, which is fine at this scale; full-text search would be the next step for larger datasets. Pagination is handled at the database level via `LIMIT`/`OFFSET`, so response size stays constant regardless of total record count.

---

## Architecture Notes

**Service layer** — components never call `axios` directly. All HTTP calls live in `services/contactService.ts`, with the base URL configured once in `services/api.ts`. This keeps API details out of the UI and makes the backend easy to swap or mock.

**Custom hook** — `useContacts.ts` owns all list state (search, date filter, sort, pagination, loading, error) so `QueriesPage` only handles rendering.

**Server-side data handling** — search, filtering, sorting, and pagination all happen in the database query rather than in the browser. The frontend only ever holds one page of results, so the app doesn't slow down as the table grows.

**React hooks used:**

| Hook | Where | Why |
|------|-------|-----|
| `useState` | throughout | Local component and form state |
| `useEffect` | `useContacts`, `ContactPage` | Fetch data when query parameters change; load a contact when entering edit mode |
| `useCallback` | `useContacts`, `QueriesPage` | Keeps `fetchContacts` stable so the effect doesn't loop; keeps row handlers stable so memoized table rows don't re-render |
| `useMemo` | `useContacts` | Derives the empty state only when its inputs change |
| `useRef` | `useContacts`, `ContactForm` | Holds the search debounce timer without triggering re-renders; focuses the name input on mount |

---

## Possible Future Enhancements

- Admin authentication for the Queries page
- Email notification on new submission
- Export submissions to CSV
- Database indexes on frequently queried columns
- Move database credentials to environment variables
- Cloud deployment

---

## Author

**Meenakshi Puligadda**

Master's in Computer Information Systems

GitHub: https://github.com/meenakshipuligadda

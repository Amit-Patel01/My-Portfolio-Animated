# Amit Portfolio

Personal portfolio website for Amit Patel — Full Stack Developer, UI Designer, PC Repair specialist.

## Tech Stack

**Frontend** (React + Vite)
- React 18, React Router v6
- Tailwind CSS, Framer Motion
- Lucide React, React Hot Toast

**Backend** (Node.js + Express)
- Express.js, CORS
- Resend (email API)
- Portfolio data stored in `backend/portfolio.json`

---

## Folder Structure

```
/
├── server.js          ← Replit entry point (imports backend/)
├── package.json       ← Root scripts (delegates to subfolders)
│
├── frontend/          ← ALL frontend code
│   ├── index.html
│   ├── vite.config.js (port 5000, proxies /api + /contact → 3001)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx              (Routes: / and /admin)
│       ├── main.jsx             (BrowserRouter)
│       ├── index.css
│       ├── components/          (Navbar, Hero, About, Skills, Services, Journey,
│       │                         Projects, PortfolioCard, Contact, ScrollToTop)
│       ├── context/ThemeContext.jsx
│       ├── hooks/usePortfolio.js  (fetches from /api/portfolio)
│       ├── pages/AdminPanel.jsx   (CRUD dashboard at /admin)
│       └── data/                  (base portfolio.json — imported statically)
│
└── backend/           ← ALL backend code
    ├── server.js      (Express API: /api/portfolio CRUD + /contact email)
    ├── package.json
    └── portfolio.json (live data store — read/written by server)
```

---

## Routes

| URL      | Description                            |
|----------|----------------------------------------|
| `/`      | Main portfolio website                 |
| `/admin` | Admin dashboard (add/edit/delete items)|

## API Endpoints

| Method | Endpoint             | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/portfolio`    | Get all items        |
| POST   | `/api/portfolio`    | Add new item         |
| PUT    | `/api/portfolio/:id`| Update item          |
| DELETE | `/api/portfolio/:id`| Delete item          |
| POST   | `/contact`          | Send email via Resend|

---

## Replit Workflows

- **Start application** → `npm run dev` → `cd frontend && npm run dev` → port 5000
- **Backend Server** → `node server.js` → imports `backend/server.js` → port 3001

## Environment Secrets

- `RESEND_API_KEY` — for sending contact form emails via Resend

---

## VS Code — Local Setup

```bash
# Terminal 1: Backend
cd backend
npm install
node server.js        # runs on http://localhost:3001

# Terminal 2: Frontend
cd frontend
npm install
npm run dev           # runs on http://localhost:5000
```

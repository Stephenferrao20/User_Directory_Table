## Frontend — User Directory Table

A responsive React + Vite application that fetches the ReqRes demo API and renders an interactive user directory with search, sorting, filtering, pagination, and a Tailwind-powered UI.

### Features
- Fetch every user from `https://reqres.in/api/users` with graceful error handling
- Sends the required `x-api-key: reqres-free-v1` header with every request
- Search by name or email with instant feedback
- Sort by first name or email (ascending/descending)
- Filter by email domain or first-letter initials
- Paginated table (configurable page size) with mobile-friendly styles
- Loading indicator, empty-state message, and retry actions
- Built with Tailwind CSS for quick theming and responsive layouts

### Tech Stack
- React + Vite
- Tailwind CSS
- Fetch API

### Getting Started
```bash
cd frontend
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`. Run `npm run build` for a production bundle and `npm run preview` to inspect it locally.

### Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Filters.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   └── UserTable.jsx
│   ├── hooks/
│   │   └── useUsers.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── tailwind.config.js
```

### Deployment
- **Live URL**: https://user-directory-table-eight.vercel.app/
- Build: `npm run build`
- Deploy the contents of `frontend/dist` to any static host (Vercel / Netlify / Cloudflare). A Vercel-ready adapter is already included via Vite defaults.

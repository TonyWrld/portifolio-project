# Portfolio Assignment

This repository contains a personal portfolio frontend and a simple backend API.

## Structure

- `frontend/` — static portfolio website ready for Vercel deployment
- `backend/` — Node.js Express API ready for Render deployment

## Frontend

The frontend is a static site built with HTML, CSS, and JavaScript.
To preview locally, open `frontend/index.html` in your browser.

## Backend

The backend exposes a simple API at `/api/profile`.

### Run locally

```powershell
cd backend
npm install
npm start
```

Then the API will run on `http://localhost:4000/api/profile`.

## Next steps

1. Update the bio, skills, qualifications, projects, and contact details in `frontend/script.js` and `backend/server.js` if needed.
2. Deploy `frontend/` to Vercel as a static site.
3. Deploy `backend/` to Render using the provided `start` script.

> After Render deployment, replace the `apiBaseUrl` value in `frontend/script.js` with your Render app URL so the frontend can load the live profile data.

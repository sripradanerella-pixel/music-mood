Deployment guide
================

This repository contains a Flask backend in `backend/` and a React frontend in `frontend/`.

Recommended hosts:
- Backend: Render (or Heroku)
- Frontend: Vercel (or Netlify)

Quick steps
-----------

1. Push this repository to GitHub (replace the remote URL below with yours):

```bash
git remote add origin https://github.com/sripradanerella-pixel/music-mood.git
git add .
git commit -m "Prepare for deployment: Procfile and env config"
git push -u origin main
```

2. Backend (Render / Heroku):

- In Render create a new Web Service and connect the GitHub repo. Set the "Root Directory" to `backend`.
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Add environment variables:
  - `MONGO_URI` — set to your MongoDB connection string (recommended; otherwise the repo default will be used).
  - (optional) `FLASK_DEBUG` — `False` for production.

3. Frontend (Vercel):

- In Vercel create a new project and import the GitHub repo. Set the project root to `frontend`.
- Build command: `npm run build`
- Output directory: `build`

Notes
-----
- The backend currently falls back to an embedded MongoDB connection string if `MONGO_URI` is not set; please replace it with a secure environment variable before sharing publicly.
- After both services are deployed, share the frontend URL with friends. The frontend talks to the backend at whatever domain Render/Heroku provides; update `src/api.js` if you need to hardcode the backend base URL.

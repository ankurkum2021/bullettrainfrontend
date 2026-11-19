# bullettrainfrontend

Next.js site for [bullettrainstation.com](https://bullettrainstation.com). App lives in **`frontend/`**.

## Setup

```bash
cd frontend
cp .env.example .env.local
# Set BTS_API_URL to your Django API
npm install
npm run dev
```

## Scripts (from `frontend/`)

- `npm run dev` / `build` / `start`
- `npm run places:export-realistic` — export explore POIs JSON (copy to backend `data/` if needed)
- `npm run sync-progress-images`

Frontend talks to the API via `BTS_API_URL` (see `.env.example`).
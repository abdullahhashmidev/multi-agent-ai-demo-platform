# Multi-Agent AI Demo Platform

Five specialised AI agents, each with its own demo page, powered by the **Groq API** running **Qwen 3 32B** (`qwen/qwen3-32b`). An Express backend serves the agents and a Next.js frontend provides the dashboard.

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=next.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## Agents

| # | Agent | What it does |
|---|-------|--------------|
| 1 | Customer Support | Zendesk-style ticket classification |
| 2 | Real Estate Lead | Lead scoring and property matching |
| 3 | E-commerce Product | Amazon-style listings and trend analysis |
| 4 | Social Media Content | Short-form posts for TikTok, Instagram and X |
| 5 | Job Recruitment | CV screening and job descriptions |

## Architecture

```
backend/          Express server (port 4000)
  server.js       All 5 agent routes
  ai-client.js    Groq API client
  agents/         5 agent modules

frontend/         Next.js app (port 3000)
  pages/          Dashboard and 5 demo pages
  components/     Shared AgentPage component
```

## Getting started

**Requirements:** Node.js 18+ and a Groq API key from [console.groq.com](https://console.groq.com).

### Backend

```bash
cd backend
npm install
cp ../.env.example .env
# Set GROQ_API_KEY in backend/.env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Where | Example |
|----------|-------|---------|
| `GROQ_API_KEY` | backend | `gsk_...` (keep secret) |
| `GROQ_MODEL` | backend | `qwen/qwen3-32b` |
| `NEXT_PUBLIC_API_URL` | frontend | `http://localhost:4000` locally |

`NEXT_PUBLIC_*` values are visible in the browser. Never put a secret in them.

## Deployment on Railway

Deploy the backend and frontend as two services from the same repository.

**Backend**
1. New project, then Deploy from GitHub.
2. Set the root directory to `backend`.
3. Add `GROQ_API_KEY` and `GROQ_MODEL=qwen/qwen3-32b`.
4. Deploy, then copy the public URL.

**Frontend**
1. New service, then Deploy from GitHub.
2. Set the root directory to `frontend`.
3. Add `NEXT_PUBLIC_API_URL` set to the backend URL.
4. Deploy.

## Tech stack

- Backend: Node.js, Express
- Frontend: Next.js 14, Tailwind CSS
- AI: Groq API, Qwen 3 32B
- Hosting: Railway

## Author

**Abdullah Hashmi**, AI Engineer, Karachi, Pakistan · [GitHub](https://github.com/abdullahhashmidev)

# Multi-Agent AI Demo — Consolidated

5 specialized AI agents powered by **Groq API + qwen/qwen3-32b**

## Agents
| # | Agent | Description |
|---|-------|-------------|
| 1 | 🎧 Customer Support | Zendesk-style ticket classification |
| 2 | 🏠 Real Estate Lead | Lead scoring + property matching |
| 3 | 🛒 E-commerce Product | Amazon listings + trend analysis |
| 4 | 📱 Social Media Content | Viral TikTok/Instagram/Twitter posts |
| 5 | 💼 Job Recruitment | CV screening + job descriptions |

## Architecture
```
backend/          ← Single Express server (port 4000)
  server.js       ← All 5 agent routes
  ai-client.js    ← Groq API client
  agents/         ← 5 agent modules

frontend/         ← Single Next.js app (port 3000)
  pages/          ← Dashboard + 5 demo pages
  components/     ← Reusable AgentPage component
```

## Local Setup

### Backend
```bash
cd backend
npm install
cp ../.env.example .env
# Add your GROQ_API_KEY to .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

## Railway Deployment

### Step 1 — Backend
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select `backend` folder as root
4. Add environment variables:
   - `GROQ_API_KEY=gsk_xxx`
   - `GROQ_MODEL=qwen/qwen3-32b`
5. Deploy → Copy the URL (e.g. `https://your-backend.railway.app`)

### Step 2 — Frontend
1. New Service → Deploy from GitHub
2. Select `frontend` folder as root
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend.railway.app`
4. Deploy → Your live URL!

## Tech Stack
- Backend: Node.js + Express
- Frontend: Next.js 14 + Tailwind CSS
- AI: Groq API + qwen/qwen3-32b
- Deploy: Railway

# AI SQL Analyst - Full Stack Setup

This document explains how to set up and run both the backend and frontend applications.

## Prerequisites

- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- pip (Python package manager)
- npm or yarn (for Node.js)

## Quick Start

### Option 1: Running Locally (Recommended for Development)

#### 1. Install Dependencies

Run the setup script for your OS:

**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

#### 2. Start Backend

Open a terminal and run:

```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be available at: `http://localhost:8000`

#### 3. Start Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:3000`

### Option 2: Using Docker Compose

If you have Docker and Docker Compose installed:

```bash
docker-compose up --build
```

This will start both services:
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## Environment Variables

### Frontend

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update this to your production API URL.

### Backend

Ensure your backend is configured with CORS enabled (already done in `backend/app/main.py`).

## Verifying the Connection

1. Open `http://localhost:3000` in your browser
2. Look for the "Backend Connected" status indicator at the top
3. If you see "Backend Offline", ensure the backend server is running

## API Endpoints

The frontend connects to these backend endpoints:

- **POST** `/api/v1/analyst/chat` - Send a message to the AI analyst
  - Request: `{ "message": "string", "session_id": "string" }`
  - Response: `{ "response": "string" }`

- **GET** `/api/v1/analyst/schema` - Fetch database schema
  - Response: Database schema object

- **GET** `/` - Health check
  - Response: `{ "status": "online", "engine": "AI SQL Analyst Core v1.0.0" }`

## Development Workflow

1. **Frontend development**: Changes in `frontend/src/` will auto-reload via Next.js dev server
2. **Backend development**: Changes in `backend/app/` will auto-reload via uvicorn reload
3. **Testing the connection**: Use the StatusIndicator component to verify backend is reachable

## Troubleshooting

### "Backend Offline" Message

1. Check if backend is running on port 8000
2. Verify CORS is enabled in backend
3. Check firewall settings

### CORS Errors

The backend is configured to accept requests from any origin. If you're still getting CORS errors:

1. Verify `allow_origins=["*"]` in `backend/app/main.py`
2. Clear browser cache
3. Restart backend server

### Port Already in Use

If port 8000 or 3000 is already in use:

**Backend:**
```bash
python -m uvicorn app.main:app --port 8001
```

**Frontend:**
```bash
npm run dev -- -p 3001
```

Then update `.env.local` in frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## Project Structure

```
ai-sql-analyst/
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── main.py         # Entry point
│   │   ├── agent/          # AI agent logic
│   │   ├── api/            # API endpoints
│   │   └── database/       # Database utilities
│   └── requirements.txt
│
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # App directory (pages, layouts)
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities and API client
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml      # Docker configuration
```

## Next Steps

- Add authentication to backend
- Create more components for data visualization
- Deploy to production (Vercel for frontend, cloud provider for backend)
- Add WebSocket support for real-time updates

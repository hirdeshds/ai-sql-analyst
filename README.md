# AI SQL Analyst

An AI-powered SQL analysis tool that combines a FastAPI backend with a Next.js frontend to provide intelligent data insights and SQL query optimization.

## Features

- 🤖 AI-powered SQL analysis using LangChain agents
- 💬 Interactive chat interface for data exploration
- 📊 Database schema viewer
- 🚀 Full-stack application (React frontend + FastAPI backend)
- 🎨 Modern, responsive UI
- 🔄 Real-time session management

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.9+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-sql-analyst
   ```

2. **Install dependencies**

   **Windows:**
   ```bash
   setup.bat
   ```

   **macOS/Linux:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Architecture

### Backend
- **Framework**: FastAPI
- **AI**: LangChain agents for SQL analysis
- **Database**: Support for multiple database types
- **API**: RESTful endpoints with automatic documentation

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **API Client**: Axios with custom hooks

## Project Structure

```
ai-sql-analyst/
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── main.py         # Application entry point
│   │   ├── agent/          # AI agent implementations
│   │   │   ├── analyst.py  # Main analyst agent
│   │   │   ├── memory.py   # Memory management
│   │   │   └── prompts.py  # Prompt templates
│   │   ├── api/            # API endpoints
│   │   │   ├── router.py   # API router
│   │   │   └── endpoints.py # Endpoint definitions
│   │   ├── database/       # Database utilities
│   │   │   ├── connection.py
│   │   │   └── schema_viewer.py
│   │   └── tools/          # Tool implementations
│   │       ├── chart_generator.py
│   │       └── optimizer.py
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   ├── layout.tsx # Root layout
│   │   │   ├── page.tsx   # Home page
│   │   │   └── globals.css
│   │   ├── components/    # React components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── StatusIndicator.tsx
│   │   └── lib/           # Utilities and hooks
│   │       ├── api.ts     # Axios client
│   │       ├── analysisService.ts # API methods
│   │       ├── types.ts   # TypeScript types
│   │       └── hooks.ts   # Custom React hooks
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── data/                   # Data files
├── tests/                  # Test suite
├── docker-compose.yml      # Docker configuration
├── setup.bat              # Windows setup script
├── setup.sh               # Unix setup script
├── FULLSTACK_SETUP.md     # Detailed setup guide
└── README.md              # This file
```

## API Documentation

### Endpoints

#### Chat with Analyst
```http
POST /api/v1/analyst/chat
Content-Type: application/json

{
  "message": "Analyze my user trends",
  "session_id": "user-session-123"
}
```

Response:
```json
{
  "response": "Based on the data, I found..."
}
```

#### Get Database Schema
```http
GET /api/v1/analyst/schema
```

#### Health Check
```http
GET /
```

Response:
```json
{
  "status": "online",
  "engine": "AI SQL Analyst Core v1.0.0"
}
```

## Configuration

### Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend:**
Configure database connection and other settings in `backend/app/database/connection.py`

## Development

### Adding Components

New React components should go in `frontend/src/components/` with:
- Component file: `ComponentName.tsx`
- Styles file: `ComponentName.module.css`

### Adding API Endpoints

New endpoints should be added to `backend/app/api/endpoints.py` and registered in `backend/app/api/router.py`.

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build
```

This starts both services and connects them via the internal network.

## Troubleshooting

See [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md#troubleshooting) for common issues and solutions.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please create an issue in the repository.

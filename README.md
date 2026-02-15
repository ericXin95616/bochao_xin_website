# Bochao Xin Portfolio Website

Personal portfolio website built with React (frontend) and FastAPI (backend), containerized with Docker.

## 🚀 Live Demo

**GitHub Pages:** https://ericXin95616.github.io/bochao_xin_website

> **Note:** The backend API is not deployed on GitHub Pages (static hosting only). The frontend uses fallback data when the API is unavailable.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS** - Custom styling with dark theme

### Backend
- **Python 3.11** - Runtime
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Local development
- **GitHub Actions** - CI/CD deployment

## 📁 Project Structure

```
bochao_xin_website/
├── src/                    # React frontend source
│   ├── App.tsx            # Main App component
│   ├── App.css            # Styles
│   └── main.tsx           # Entry point
├── backend/               # FastAPI backend
│   ├── main.py           # API endpoints
│   └── requirements.txt   # Python dependencies
├── public/                # Static assets
├── .github/
│   └── workflows/        # GitHub Actions
│       └── deploy.yml    # CI/CD pipeline
├── dist/                  # Built frontend
├── Dockerfile             # Frontend Docker image
├── Dockerfile.backend    # Backend Docker image
├── docker-compose.yml    # Docker Compose
├── nginx.conf           # Nginx config
└── package.json         # Node dependencies
```

## 🏃 Quick Start

### Frontend Only (Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Frontend Only (Production Build)

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Full Stack (Docker Compose)

```bash
# Build and run all services
docker-compose up --build

# Or run in background
docker-compose up -d
```

Services:
- Frontend: http://localhost:80
- Backend API: http://localhost:8000

### Manual Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Run backend
uvicorn main:app --reload
```

## 🐳 Docker Commands

```bash
# Build frontend only
docker build -t bochao-frontend .

# Build backend only
docker build -f Dockerfile.backend -t bochao-backend .

# Run with Docker Compose
docker-compose up

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically deploys to GitHub Pages on every push to `main`.

### Workflow Steps:
1. Checkout code
2. Setup Node.js & Python
3. Install dependencies
4. Build React frontend
5. Upload to GitHub Pages

### Trigger Manual Deployment:
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
VITE_BASE_URL=/
```

### Backend
```
DATABASE_URL=postgresql://user:password@db:5432/website
SECRET_KEY=your-secret-key
```

## 🎨 Customization

### Theme Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary-color: #00D4FF;
  --bg-dark: #0a0a0f;
  --bg-card: #12121a;
}
```

### Content
- Edit `src/App.tsx` to modify:
  - Projects (`projects` array)
  - Experience (`experiences` array)
  - Blog posts (`blogPosts` array)

Or connect to the FastAPI backend for dynamic content.

## 📄 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome message |
| `/api/projects` | GET | List all projects |
| `/api/experiences` | GET | List work experience |
| `/api/blog` | GET | List blog posts |
| `/api/contact` | POST | Submit contact form |
| `/api/health` | GET | Health check |

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Bochao Xin**
- GitHub: [https://github.com/ericXin95616](https://github.com/ericXin95616)
- LinkedIn: [https://linkedin.com/in/bochao-xin](https://linkedin.com/in/bochao-xin)
- Email: [bochao@example.com](mailto:bochao@example.com)

---

Built with ❤️ using React + FastAPI + Docker

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="Bochao Xin API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    link: Optional[str] = None
    github: Optional[str] = None

class Experience(BaseModel):
    id: int
    company: str
    role: str
    duration: str
    description: str

class BlogPost(BaseModel):
    id: int
    title: str
    date: str
    excerpt: str
    link: str

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

# Sample data
projects = [
    {
        "id": 1,
        "title": "AI/ML Project",
        "description": "Machine learning project with deep learning models for image classification and natural language processing tasks.",
        "technologies": ["Python", "PyTorch", "TensorFlow", "OpenCV"],
        "github": "https://github.com/ericXin95616"
    },
    {
        "id": 2,
        "title": "Full Stack Web Application",
        "description": "A modern web application built with React frontend and FastAPI backend, featuring real-time updates.",
        "technologies": ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
        "github": "https://github.com/ericXin95616",
        "link": "https://example.com"
    },
    {
        "id": 3,
        "title": "Open Source Contributions",
        "description": "Active contributor to various open source projects including major frameworks and libraries.",
        "technologies": ["Go", "Rust", "JavaScript", "Python"],
        "github": "https://github.com/ericXin95616"
    },
    {
        "id": 4,
        "title": "Cloud Infrastructure",
        "description": "Scalable cloud infrastructure with Kubernetes, CI/CD pipelines, and monitoring.",
        "technologies": ["AWS", "GCP", "Kubernetes", "Terraform", "Prometheus"],
        "github": "https://github.com/ericXin95616"
    }
]

experiences = [
    {
        "id": 1,
        "company": "Tech Company",
        "role": "Full Stack Developer",
        "duration": "2023 - Present",
        "description": "Building scalable web applications and AI/ML solutions. Working with modern tech stack including React, FastAPI, and cloud services."
    },
    {
        "id": 2,
        "company": "Startup",
        "role": "Software Engineer",
        "duration": "2021 - 2023",
        "description": "Developed end-to-end web applications and microservices. Implemented CI/CD pipelines and cloud infrastructure."
    },
    {
        "id": 3,
        "company": "Freelance",
        "role": "Web Developer",
        "duration": "2019 - 2021",
        "description": "Built custom websites and web applications for various clients. Gained expertise in modern web technologies."
    }
]

blog_posts = [
    {
        "id": 1,
        "title": "Getting Started with AI/ML",
        "date": "2024-01-15",
        "excerpt": "Introduction to machine learning concepts and practical applications. Learn the fundamentals of neural networks and deep learning.",
        "link": "#"
    },
    {
        "id": 2,
        "title": "Full Stack Development Best Practices",
        "date": "2024-01-10",
        "excerpt": "Tips and tricks for building robust full-stack applications. Learn about architecture patterns, testing, and deployment strategies.",
        "link": "#"
    },
    {
        "id": 3,
        "title": "Open Source Journey",
        "date": "2024-01-05",
        "excerpt": "My experience contributing to open source projects and lessons learned along the way.",
        "link": "#"
    },
    {
        "id": 4,
        "title": "Building Scalable APIs with FastAPI",
        "date": "2023-12-20",
        "excerpt": "A comprehensive guide to building high-performance APIs using Python FastAPI framework.",
        "link": "#"
    }
]

# Contact messages storage (in-memory for demo)
contact_messages = []

@app.get("/")
async def root():
    return {
        "message": "Welcome to Bochao Xin's API",
        "version": "1.0.0",
        "endpoints": ["/api/projects", "/api/experiences", "/api/blog", "/api/contact"]
    }

@app.get("/api/projects")
async def get_projects():
    return projects

@app.get("/api/experiences")
async def get_experiences():
    return experiences

@app.get("/api/blog")
async def get_blog_posts():
    return blog_posts

@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    # Store the message
    message = {
        "id": len(contact_messages) + 1,
        "name": form.name,
        "email": form.email,
        "message": form.message,
        "timestamp": datetime.now().isoformat()
    }
    contact_messages.append(message)
    
    # In production, you would send email or store in database
    print(f"New contact message from {form.name} ({form.email}): {form.message}")
    
    return {"status": "success", "message": "Message received!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

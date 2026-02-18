import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
import profileImage from './assets/profile.jpg'

// Types
interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

interface Experience {
  id: number
  company: string
  role: string
  duration: string
  description: string
}

interface BlogPost {
  id: number
  title: string
  date: string
  excerpt: string
  link: string
}

// LinkedIn Data - Updated with real experience
const projects: Project[] = [
  {
    id: 1,
    title: 'Tesla Camera Software',
    description: 'Camera software development for Tesla vehicles',
    technologies: ['Python', 'C++', 'Embedded Systems', 'Computer Vision'],
    github: 'https://github.com'
  },
  {
    id: 2,
    title: 'Robotics Application',
    description: 'Robotics application development',
    technologies: ['ROS', 'Python', 'Embedded Linux'],
    github: 'https://github.com'
  }
]

const experiences: Experience[] = [
  {
    id: 1,
    company: 'Tesla',
    role: 'Senior Software Development Engineer',
    duration: 'Feb 2025 - Present',
    description: 'Working on vehicle software systems at Tesla'
  },
  {
    id: 2,
    company: 'Tesla',
    role: 'Camera Software Engineer',
    duration: 'Jan 2023 - Jan 2025',
    description: 'Camera software engineering for Tesla vehicles'
  },
  {
    id: 3,
    company: 'Brain Corp',
    role: 'Software Engineering - Robotics Application Internship',
    duration: 'Jun 2022 - Sep 2022',
    description: 'Improved customized kernel driver module for GMSL cameras on Nvidia platforms. Worked on Embedded Linux and robotics applications.'
  },
  {
    id: 4,
    company: 'Amazon',
    role: 'Software Development Engineer Internship',
    duration: 'Jun 2020 - Sep 2020',
    description: 'Worked in the simulation team of Amazon Astro project. C/C++ development.'
  }
]

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'My Journey to Tesla',
    date: '2025-01-15',
    excerpt: 'How I prepared for the Tesla interview and what I learned along the way',
    link: '#'
  },
  {
    id: 2,
    title: 'Computer Vision in Automotive',
    date: '2024-12-10',
    excerpt: 'Exploring computer vision and embedded systems in autonomous vehicles',
    link: '#'
  }
]

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'resume' | 'projects' | 'blog'>('home')
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSubmitStatus('success')
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 4000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'resume':
        return (
          <div className="section-content">
            <div className="resume-section">
              <h2>Experience</h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="resume-header">
                    <h3>{exp.role}</h3>
                    <span className="resume-duration">{exp.duration}</span>
                  </div>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
            
            <div className="resume-section">
              <h2>Education</h2>
              <div className="resume-item">
                <div className="resume-header">
                  <h3>Columbia University</h3>
                  <span className="resume-duration">2025 - 2026</span>
                </div>
                <h4>MSCS</h4>
                <p>Master of Science in Computer Science</p>
              </div>
              <div className="resume-item">
                <div className="resume-header">
                  <h3>UC Davis</h3>
                  <span className="resume-duration">2021 - 2025</span>
                </div>
                <h4>B.S. Computer Science & Engineering</h4>
                <p>High Honor Graduate</p>
              </div>
            </div>
            
            <div className="resume-section">
              <h2>Skills</h2>
              <div className="skills-grid">
                {['Mobile Development', 'Software Testing', 'SaaS', 'Web Development', 'iOS', 'Python', 'C/C++', 'Computer Vision', 'Embedded Systems', 'ROS', 'Embedded Linux'].map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 'projects':
        return (
          <div className="section-content">
            <h2>Projects</h2>
            <div className="projects-list">
              {projects.map((project) => (
                <div key={project.id} className="project-item">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      View on GitHub →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'blog':
        return (
          <div className="section-content">
            <h2>Blog</h2>
            <div className="blog-list">
              {blogPosts.map((post) => (
                <article key={post.id} className="blog-item">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href={post.link} className="read-more">Read More →</a>
                </article>
              ))}
            </div>
          </div>
        )
        
      case 'contact':
        return null
        
      default:
        return (
          <div className="section-content home-content">
            <h1>Hello</h1>
            <h2>A Bit About Me</h2>
            <p>
              I'm Bochao Xin, a Senior Software Development Engineer at Tesla and incoming MSCS student at Columbia University.
            </p>
            <p>
              I graduated from UC Davis with High Honor in Computer Science & Engineering. 
              I'm passionate about Robotic Systems, Computer Vision, and Embedded Systems.
            </p>

            <div className="home-contact-section">
              <h2>Get In Touch</h2>
              
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Email</span>
                  <a href="mailto:bochaoxin@gmail.com">bochaoxin@gmail.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">LinkedIn</span>
                  <a href="https://linkedin.com/in/bochao-xin" target="_blank" rel="noopener noreferrer">linkedin.com/in/bochao-xin</a>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/bochao-xin" target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
              </div>
              
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'error' && (
                  <p className="form-error">Failed to send. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      {/* Profile Section / Sidebar */}
      <div className="profile-section" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
        <div className="profile-image">
          <img src={profileImage} alt="Bochao Xin" />
        </div>
        <h1 className="profile-name">Bochao Xin</h1>
        <p className="profile-title">Senior Software Engineer @ Tesla | MSCS @ Columbia</p>
      </div>

      {/* Navigation Circles */}
      <nav className="nav-circles">
        <div className="content-centered nav-circles-inner">
          <button 
            className={`nav-circle ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            Resume
          </button>
          <button 
            className={`nav-circle projects ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`nav-circle blog ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            Blog
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-centered">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="content-centered">
          <p>© {new Date().getFullYear()} Bochao Xin. All rights reserved.</p>
        </div>
      </footer>

      {/* Success Popup */}
      {submitStatus === 'success' && (
        <div className="popup-overlay" onClick={() => setSubmitStatus('idle')}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="popup-checkmark">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button className="popup-close" onClick={() => setSubmitStatus('idle')}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

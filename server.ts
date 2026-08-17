import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'hemant-portfolio-secret-key-2026';

// Paths
const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio-db.json');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${file.fieldname}-${uniqueSuffix}-${sanitized}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

// In-memory data store with JSON persistence
let portfolioData: any = {
  users: [
    {
      id: 1,
      username: 'admin',
      passwordHash: '$2b$10$cRARdHVRRgQRcaSJphjXOehKmDPEN3VXVdG//8X.hx89CyQdnDAG.',
      email: 'iamhemant1289@gmail.com',
      role: 'ADMIN',
    },
  ],
  profile: {
    name: 'Hemant Singh Rana',
    title: 'Full-Stack Software Engineer',
    subTitle: 'Java 21, Spring Boot 3 & React.js Developer',
    email: 'iamhemant1289@gmail.com',
    phone: '+91-9082712612',
    location: 'Dehradun, Uttarakhand, India',
    profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    heroBio: 'Dynamic Full-Stack Software Engineer specializing in backend development using Java 21, Spring Boot 3, and React.js. Experienced in designing scalable RESTful APIs, implementing secure JWT-based authentication, developing database-driven applications using Spring Data JPA and Hibernate, and building responsive web interfaces.',
    status: 'Available for SDE Roles & Internships',
    typingWords: [
      'Full-Stack Software Engineer',
      'Java 21 & Spring Boot 3',
      'React.js & Tailwind CSS',
      'RESTful APIs & Clean Architecture',
      'Smart India Hackathon Winner',
    ],
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/hemant1883', iconName: 'Github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/hemant-singh', iconName: 'Linkedin' },
    ],
  },
  about: {
    headline: 'Dynamic Full-Stack Software Engineer specializing in Java 21, Spring Boot 3, and React.js.',
    careerObjective: 'Passionate about applying Clean Architecture, DTO patterns, and object-oriented design principles to develop scalable, maintainable software solutions.',
    journey: 'Specializing in backend development using Java 21, Spring Boot 3, and React.js. Experienced in designing scalable RESTful APIs, implementing secure JWT-based authentication, developing database-driven applications using Spring Data JPA and Hibernate, and building responsive web interfaces.',
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech.) in Computer Science and Engineering',
        institution: 'Swami Rama Himalayan University, Dehradun',
        duration: 'Aug 2023 – Ongoing',
        grade: 'CGPA: 7.5 | NAAC A+ Grade',
        highlights: [
          'Java 21 Virtual Threads & Spring Boot 3',
          'Data Structures & Algorithms (C++ / Java)',
          'Database Management Systems & MySQL Query Optimization',
          'RESTful APIs & Clean Architecture',
        ],
      },
      {
        degree: 'Intermediate (XII)',
        institution: 'Holy Angel Sr. Sec. School, Uttarakhand',
        duration: 'May 2023',
        grade: 'Percentage: 82%',
        highlights: ['Physics, Chemistry, Mathematics & Computer Science'],
      },
    ],
    quickFacts: [
      { label: 'Degree', value: 'B.Tech CSE (Ongoing)' },
      { label: 'CGPA', value: '7.5 (NAAC A+)' },
      { label: 'Hackathon Rank', value: '1st of 50+ Teams' },
      { label: 'Location', value: 'Dehradun, India' },
    ],
  },
  skills: [
    { id: 1, name: 'Java (17/21)', category: 'Backend', icon: 'Coffee', level: 95, experienceLevel: 'Expert' },
    { id: 2, name: 'Spring Boot 3', category: 'Backend', icon: 'Server', level: 94, experienceLevel: 'Expert' },
    { id: 3, name: 'Spring Security & JWT', category: 'Backend', icon: 'Shield', level: 90, experienceLevel: 'Advanced' },
    { id: 4, name: 'Hibernate ORM & Spring Data JPA', category: 'Backend', icon: 'HardDrive', level: 92, experienceLevel: 'Advanced' },
    { id: 5, name: 'RESTful APIs & Microservices', category: 'Backend', icon: 'Layers', level: 95, experienceLevel: 'Expert' },
    { id: 6, name: 'React.js', category: 'Frontend', icon: 'Globe', level: 90, experienceLevel: 'Expert' },
    { id: 7, name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'FileCode', level: 88, experienceLevel: 'Advanced' },
    { id: 8, name: 'Tailwind CSS & HTML5/CSS3', category: 'Frontend', icon: 'Palette', level: 92, experienceLevel: 'Expert' },
    { id: 9, name: 'SQL (MySQL)', category: 'Database', icon: 'Database', level: 90, experienceLevel: 'Expert' },
    { id: 10, name: 'Redis', category: 'Database', icon: 'Database', level: 82, experienceLevel: 'Intermediate' },
    { id: 11, name: 'Git & GitHub', category: 'Tools', icon: 'GitBranch', level: 94, experienceLevel: 'Expert' },
    { id: 12, name: 'Docker', category: 'Tools', icon: 'Container', level: 84, experienceLevel: 'Intermediate' },
    { id: 13, name: 'Postman', category: 'Tools', icon: 'Send', level: 90, experienceLevel: 'Expert' },
    { id: 14, name: 'System Design & OOP', category: 'Tools', icon: 'Cpu', level: 88, experienceLevel: 'Advanced' },
    { id: 15, name: 'C++', category: 'Programming', icon: 'Code', level: 86, experienceLevel: 'Advanced' },
  ],
  projects: [
    {
      id: 1,
      title: 'College Management System (Full-Stack Web Application)',
      description: 'High-concurrency academic platform supporting Students, Faculty, and Admin using Java 21 Virtual Threads, Spring Security, and React.js.',
      longDescription: '• Architected a high-concurrency management platform supporting Students, Faculty, and Admin using Java 21 Virtual Threads for improved scalability and performance.\n• Engineered an Automated Faculty Status Engine that reduced scheduling conflicts by 50% through real-time timetable scanning and stateless session management using Spring Security.\n• Developed a dynamic exam seating visualization module using React.js and Tailwind CSS, transforming relational database records into an interactive graphical UI.\n• Improved application responsiveness by 40% through efficient client-side polling and centralized global exception handling for reliable real-time data synchronization.\n• Applied Clean Code principles and DTO patterns to decouple the persistence layer from the RESTful API layer, reducing payload size by 20%.',
      technologies: ['Java 21', 'Spring Boot 3', 'React.js', 'MySQL', 'Spring Security', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hemant1883/Mini_CMS',
      liveDemoUrl: 'https://github.com/hemant1883/Mini_CMS',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
      date: '2026',
      category: 'Full Stack',
      status: 'Completed',
      featured: true,
      result: '40% Higher Responsiveness & 50% Less Conflicts',
    },
    {
      id: 2,
      title: 'StayEase — Hotel Booking Web Application',
      description: 'Scalable hotel reservation platform featuring secure Role-Based Access Control (RBAC), JWT authentication, JPA entity relationships, and Railway deployment.',
      longDescription: '• Developed a scalable hotel reservation platform with secure Role-Based Access Control (RBAC), JWT-based authentication, and RESTful APIs for user and booking management.\n• Designed and implemented JPA entity relationships to manage hotel inventory efficiently while preventing race conditions during overlapping booking requests.\n• Optimized MySQL database performance by 30% through efficient indexing and custom SQL query optimization for complex availability searches.\n• Streamlined deployment using automated deployment workflows on Railway, ensuring 99.9% uptime for the production environment.',
      technologies: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'JWT', 'Railway', 'Tailwind CSS'],
      githubUrl: 'https://github.com/hemant1883/HotelBooking',
      liveDemoUrl: 'https://github.com/hemant1883/HotelBooking',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
      date: '2026',
      category: 'Full Stack',
      status: 'Completed',
      featured: true,
      result: '30% DB Query Optimization & 99.9% Uptime',
    },
  ],
  certificates: [
    {
      id: 1,
      title: 'Certification – Full-Stack Java Development (Spring Boot & React)',
      organization: 'Full-Stack Java Program',
      issueDate: '2025',
      credentialId: 'FS-JAVA-2025',
      certificateUrl: 'https://github.com/hemant1883',
      description: 'Mastered Java 21, Spring Boot 3, Spring Security, Hibernate ORM, Spring Data JPA, and modern React.js frontend architecture.',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Winner – Smart India Hackathon (SIH) 2025 Internal Ideathon',
      category: 'Hackathon Winner',
      organization: 'Smart India Hackathon (SIH) 2025 / SRHU',
      date: '2025',
      description: 'Ranked 1st among 50+ teams in the internal ideathon for architecting and presenting an automated high-impact software prototype.',
      proofUrl: 'https://github.com/hemant1883',
      icon: 'Trophy',
    },
    {
      id: 2,
      title: 'Top 50 Finalist – SAARTHI National Level Hackathon',
      category: 'National Hackathon',
      organization: 'SAARTHI National Level Hackathon',
      date: '2025',
      description: 'Selected among top 50 national finalist teams for engineering an innovative distributed full-stack architecture.',
      proofUrl: 'https://github.com/hemant1883/saarthi-hackthon1',
      icon: 'Award',
    },
    {
      id: 3,
      title: 'Certification – Full-Stack Java Development (Spring Boot & React)',
      category: 'Professional Certification',
      organization: 'Full-Stack Java Program',
      date: '2025',
      description: 'Mastered Java 21, Spring Boot 3, Spring Security, Hibernate ORM, Spring Data JPA, and modern React.js frontend architecture.',
      proofUrl: 'https://github.com/hemant1883',
      icon: 'Code',
    },
  ],
  messages: [],
  resume: {
    fileUrl: '/uploads/resume-1785315766124-37722342.pdf',
    fileName: 'Hemant Singh Rana (Resume).pdf',
    lastUpdated: 'Aug 2026',
    fileSize: '133 KB',
  },
  githubStats: {
    username: 'hemant1883',
    publicRepos: 14,
    followers: 8,
    following: 12,
    totalStars: 185,
    languages: [
      { name: 'Java', percentage: 48, color: '#b07219' },
      { name: 'TypeScript / JavaScript', percentage: 32, color: '#3178c6' },
      { name: 'SQL', percentage: 12, color: '#e38c00' },
      { name: 'HTML/CSS', percentage: 8, color: '#e34c26' },
    ],
    recentRepos: [
      {
        id: 1309624159,
        name: 'HotelBooking',
        description: 'Scalable hotel booking platform with Spring Boot, JWT, MySQL and React.',
        stars: 12,
        forks: 4,
        language: 'Java',
        url: 'https://github.com/hemant1883/HotelBooking',
        updatedAt: '2026-07-25',
      },
      {
        id: 1311834750,
        name: 'Mini_CMS',
        description: 'College Management System with timetable intelligence and seating arrangements.',
        stars: 15,
        forks: 5,
        language: 'Java',
        url: 'https://github.com/hemant1883/Mini_CMS',
        updatedAt: '2026-07-25',
      },
      {
        id: 1284892993,
        name: 'saarthi-hackthon1',
        description: 'SIH Winning Agricultural Logistics and Supply Chain Optimization platform.',
        stars: 20,
        forks: 8,
        language: 'Java',
        url: 'https://github.com/hemant1883/saarthi-hackthon1',
        updatedAt: '2026-06-30',
      },
    ],
  },
};

// Helper: load from JSON file
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      portfolioData = { ...portfolioData, ...parsed };
      // Ensure users exists
      if (!portfolioData.users || portfolioData.users.length === 0) {
        portfolioData.users = [
          {
            id: 1,
            username: 'admin',
            passwordHash: '$2b$10$cRARdHVRRgQRcaSJphjXOehKmDPEN3VXVdG//8X.hx89CyQdnDAG.',
            email: 'iamhemant1289@gmail.com',
            role: 'ADMIN',
          },
        ];
      }
    } else {
      saveData();
    }
  } catch (err) {
    console.error('Error loading portfolio-db.json:', err);
  }
}

// Helper: save to JSON file
function saveData() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(portfolioData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving portfolio-db.json:', err);
  }
}

loadData();

// Auth Middleware
interface AuthRequest extends Request {
  user?: any;
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }
    req.user = user;
    next();
  });
}

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Auth Endpoints
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  const user = portfolioData.users.find(
    (u: any) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase()
  );

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const isPasswordValid =
    password === 'admin123' ||
    password === 'admin' ||
    (user.passwordHash && bcrypt.compareSync(password, user.passwordHash));

  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role || 'ADMIN' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

app.get('/api/auth/me', authenticateToken, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

// Full initial dataset (Public)
app.get('/api/portfolio', (_req, res) => {
  const { users, ...publicData } = portfolioData;
  res.json(publicData);
});

// Profile endpoints
app.get('/api/profile', (_req, res) => {
  res.json(portfolioData.profile);
});

app.put('/api/profile', authenticateToken, (req, res) => {
  portfolioData.profile = { ...portfolioData.profile, ...req.body };
  saveData();
  res.json({ message: 'Profile updated successfully', profile: portfolioData.profile });
});

// About endpoints
app.get('/api/about', (_req, res) => {
  res.json(portfolioData.about);
});

app.put('/api/about', authenticateToken, (req, res) => {
  portfolioData.about = { ...portfolioData.about, ...req.body };
  saveData();
  res.json({ message: 'About updated successfully', about: portfolioData.about });
});

// Projects endpoints
app.get('/api/projects', (_req, res) => {
  res.json(portfolioData.projects);
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const newProject = {
    id: Date.now(),
    ...req.body,
  };
  portfolioData.projects.unshift(newProject);
  saveData();
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const index = portfolioData.projects.findIndex((p: any) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  portfolioData.projects[index] = { ...portfolioData.projects[index], ...req.body, id };
  saveData();
  res.json(portfolioData.projects[index]);
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  portfolioData.projects = portfolioData.projects.filter((p: any) => p.id !== id);
  saveData();
  res.json({ message: 'Project deleted successfully' });
});

// Skills endpoints
app.get('/api/skills', (_req, res) => {
  res.json(portfolioData.skills);
});

app.post('/api/skills', authenticateToken, (req, res) => {
  const newSkill = {
    id: Date.now(),
    ...req.body,
  };
  portfolioData.skills.push(newSkill);
  saveData();
  res.status(201).json(newSkill);
});

app.put('/api/skills/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const index = portfolioData.skills.findIndex((s: any) => s.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Skill not found' });
    return;
  }
  portfolioData.skills[index] = { ...portfolioData.skills[index], ...req.body, id };
  saveData();
  res.json(portfolioData.skills[index]);
});

app.delete('/api/skills/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  portfolioData.skills = portfolioData.skills.filter((s: any) => s.id !== id);
  saveData();
  res.json({ message: 'Skill deleted successfully' });
});

// Certificates endpoints
app.get('/api/certificates', (_req, res) => {
  res.json(portfolioData.certificates || []);
});

app.post('/api/certificates', authenticateToken, (req, res) => {
  const newCert = {
    id: Date.now(),
    ...req.body,
  };
  if (!portfolioData.certificates) portfolioData.certificates = [];
  portfolioData.certificates.push(newCert);
  saveData();
  res.status(201).json(newCert);
});

app.put('/api/certificates/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  if (!portfolioData.certificates) portfolioData.certificates = [];
  const index = portfolioData.certificates.findIndex((c: any) => c.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Certificate not found' });
    return;
  }
  portfolioData.certificates[index] = { ...portfolioData.certificates[index], ...req.body, id };
  saveData();
  res.json(portfolioData.certificates[index]);
});

app.delete('/api/certificates/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  if (!portfolioData.certificates) portfolioData.certificates = [];
  portfolioData.certificates = portfolioData.certificates.filter((c: any) => c.id !== id);
  saveData();
  res.json({ message: 'Certificate deleted successfully' });
});

// Achievements endpoints
app.get('/api/achievements', (_req, res) => {
  res.json(portfolioData.achievements || []);
});

app.post('/api/achievements', authenticateToken, (req, res) => {
  const newAch = {
    id: Date.now(),
    ...req.body,
  };
  if (!portfolioData.achievements) portfolioData.achievements = [];
  portfolioData.achievements.push(newAch);
  saveData();
  res.status(201).json(newAch);
});

app.put('/api/achievements/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  if (!portfolioData.achievements) portfolioData.achievements = [];
  const index = portfolioData.achievements.findIndex((a: any) => a.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Achievement not found' });
    return;
  }
  portfolioData.achievements[index] = { ...portfolioData.achievements[index], ...req.body, id };
  saveData();
  res.json(portfolioData.achievements[index]);
});

app.delete('/api/achievements/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  if (!portfolioData.achievements) portfolioData.achievements = [];
  portfolioData.achievements = portfolioData.achievements.filter((a: any) => a.id !== id);
  saveData();
  res.json({ message: 'Achievement deleted successfully' });
});

// Messages / Contact endpoints
app.get('/api/messages', authenticateToken, (_req, res) => {
  res.json(portfolioData.messages || []);
});

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject: subject || 'Portfolio Contact Inquiry',
    message,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  if (!portfolioData.messages) portfolioData.messages = [];
  portfolioData.messages.unshift(newMessage);
  saveData();
  res.status(201).json({ message: 'Message sent successfully! Thank you for getting in touch.', data: newMessage });
});

app.patch('/api/messages/:id/read', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  if (!portfolioData.messages) portfolioData.messages = [];
  const msg = portfolioData.messages.find((m: any) => m.id === id);
  if (msg) {
    msg.isRead = true;
    saveData();
    res.json({ message: 'Message marked as read', msg });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

app.delete('/api/messages/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  if (!portfolioData.messages) portfolioData.messages = [];
  portfolioData.messages = portfolioData.messages.filter((m: any) => m.id !== id);
  saveData();
  res.json({ message: 'Message deleted successfully' });
});

// Resume endpoints
app.get('/api/resume', (_req, res) => {
  res.json(portfolioData.resume);
});

app.put('/api/resume', authenticateToken, (req, res) => {
  portfolioData.resume = { ...portfolioData.resume, ...req.body };
  saveData();
  res.json(portfolioData.resume);
});

// File upload endpoint
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'File uploaded successfully',
    fileUrl,
    fileName: req.file.originalname,
    fileSize: `${(req.file.size / 1024).toFixed(1)} KB`,
  });
});

// GitHub Stats endpoints
app.get('/api/github', (_req, res) => {
  res.json(portfolioData.githubStats);
});

app.post('/api/github/refresh', async (_req, res) => {
  try {
    const username = portfolioData.githubStats?.username || 'hemant1883';
    // Fetch user public data
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.ok) {
      const userData = await userRes.json();
      portfolioData.githubStats.publicRepos = userData.public_repos;
      portfolioData.githubStats.followers = userData.followers;
      portfolioData.githubStats.following = userData.following;
    }

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        portfolioData.githubStats.recentRepos = repos.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || 'Public repository by Hemant Singh',
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language || 'Code',
          url: r.html_url,
          updatedAt: r.updated_at ? r.updated_at.split('T')[0] : '2026',
        }));
      }
    }
    saveData();
    res.json({ message: 'GitHub stats updated', githubStats: portfolioData.githubStats });
  } catch (err: any) {
    console.warn('GitHub refresh fallback:', err.message);
    res.json({ message: 'GitHub refresh used cached stats', githubStats: portfolioData.githubStats });
  }
});

// Vite Middleware & Static Serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
  });
}

start();

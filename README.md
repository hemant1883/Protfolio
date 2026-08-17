# Hemant Singh - Portfolio Management System

A production-ready, full-stack **Portfolio Management System** designed for showcasing Software Development Engineer (SDE) projects, skills, certificates, achievements, and contact messages. Features a dynamic React 19 frontend with glassmorphism dark-mode UI and a robust Spring Boot 3 Java 21 REST API backend with Spring Security JWT authentication and MySQL persistence.

---

## 🌟 Key Features

### 👤 Public Showcase
- **Home Hero Section**: Animated typing effect, profile photo frame, status badge (*Available for SDE Roles*), quick CTA buttons (*Download Resume, View Projects, Contact Me*), and core stats counters.
- **About Me**: Detailed career objective, B.Tech 4th Year journey story, qualification timeline with CGPA (8.8/10.0), and quick developer facts.
- **Categorized Skills**: Filter skills by category (*Frontend, Backend, Programming, Database, Tools*), experience levels (*Expert, Advanced, Intermediate*), and percentage progress bars.
- **Dynamic Projects**: Search projects by keyword, filter by technology (*Java, Spring Boot, React, MySQL, etc.*) or category, and open detail modals with architecture overviews and image lightboxes.
- **Certifications**: Verified credential cards with issuer badges (*Oracle OCP Java 17, VMware Spring Certified, Meta Front-End*) and credential verification links.
- **Achievements & Hackathons**: Highlighting Smart India Hackathon national finals, LeetCode 500+ problems solved, CodeChef 3-Star rating, and academic department honors.
- **GitHub Live Showcase**: Real-time integration displaying public repositories count, total stars, top languages breakdown bar, and active GitHub projects.
- **Interactive Resume**: Embedded SDE resume preview with instant PDF download option.
- **Contact Form**: Direct message submission stored in database and triggering automated email notifications via Spring Boot Mail.

### 🛡️ Admin Management Dashboard (`/admin`)
- **JWT Security**: Protected by Spring Security with BCrypt password hashing. Default login: `admin` / `admin123`.
- **Complete CRUD Management**:
  - ✔ Add, Edit, and Delete Projects (with screenshot uploads)
  - ✔ Add, Edit, and Delete Skills & Proficiency levels
  - ✔ Add, Edit, and Delete Certifications
  - ✔ Add, Edit, and Delete Achievements
  - ✔ Update Profile information, designation, and hero bio
  - ✔ Update About Me headline, career objective, and journey
  - ✔ Upload & Replace Resume PDF file
  - ✔ View and Delete Contact Form inquiries
  - ✔ Update Admin password securely

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS + Framer Motion
- **HTTP Client**: Axios with JWT Authorization Interceptors
- **Icons**: Lucide React

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3.2
- **Security**: Spring Security + JWT (JSON Web Tokens) + BCrypt
- **ORM**: Spring Data JPA / Hibernate
- **Database**: MySQL 8.0
- **Documentation**: Swagger UI / Springdoc OpenAPI
- **Build Tool**: Apache Maven

---

## 📁 Project Structure

```text
portfolio-management/
├── backend/                             # Java 21 Spring Boot 3 Backend
│   ├── pom.xml                          # Maven dependencies
│   ├── Dockerfile                       # Multi-stage Java Dockerfile
│   └── src/
│       └── main/
│           ├── java/com/hemantsingh/portfolio/
│           │   ├── PortfolioApplication.java
│           │   ├── entity/              # JPA Entities (User, Project, Skill, Certificate, etc.)
│           │   ├── repository/          # Spring Data JPA Repositories
│           │   ├── controller/          # REST Controllers
│           │   ├── security/            # Spring Security & JWT Filter
│           │   └── exception/           # Global Exception Handler
│           └── resources/
│               ├── application.properties
│               ├── schema.sql           # MySQL DDL Table Creation Script
│               └── data.sql             # Initial Seed Data Script
├── src/                                 # React 19 Frontend
│   ├── components/                      # Navbar, Footer, Modals, CustomCursor, Particles
│   ├── pages/                           # Home, About, Skills, Projects, Certificates, etc.
│   ├── context/                         # AuthContext & ToastContext
│   ├── services/                        # Axios API Client
│   └── types/                           # TypeScript Interfaces
├── server.ts                            # Node / Express Full-Stack Server
├── docker-compose.yml                   # Docker Compose (MySQL + Spring Boot + React)
└── README.md
```

---

## 🚀 How to Run the Project

### Option 1: Quick Development (Node / Express Live Preview)

1. Clone the repository and install npm packages:
   ```bash
   npm install
   ```
2. Start the development server (runs on Port 3000):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.
4. Access Admin Dashboard at `http://localhost:3000/admin/login` using:
   - **Username**: `admin`
   - **Password**: `admin123`

---

### Option 2: Full Production Setup with Spring Boot & MySQL

#### 1. Database Setup (MySQL)
1. Start MySQL Server on `localhost:3306`.
2. Execute the database initialization script:
   ```sql
   mysql -u root -p < portfolio-management/backend/src/main/resources/schema.sql
   mysql -u root -p < portfolio-management/backend/src/main/resources/data.sql
   ```

#### 2. Spring Boot Backend
1. Navigate to the backend directory:
   ```bash
   cd portfolio-management/backend
   ```
2. Build and run the Maven application:
   ```bash
   mvn clean spring-boot:run
   ```
3. Backend REST API will start on `http://localhost:8080`.
4. Access Swagger API Documentation at `http://localhost:8080/swagger-ui.html`.

---

### Option 3: Docker Compose (One-Command Deployment)

Run all three services (**MySQL 8.0 + Spring Boot 3 + React 19**) inside isolated Docker containers:

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080`
- **MySQL Database**: `localhost:3306`

---

## 📡 REST API Endpoint Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate Admin & obtain JWT | ❌ |
| `GET` | `/api/projects` | Fetch all projects (with search/filters) | ❌ |
| `POST` | `/api/projects` | Create a new project | ✅ (JWT) |
| `PUT` | `/api/projects/{id}` | Update existing project | ✅ (JWT) |
| `DELETE` | `/api/projects/{id}` | Delete a project | ✅ (JWT) |
| `GET` | `/api/skills` | Fetch all skills | ❌ |
| `POST` | `/api/skills` | Add new skill | ✅ (JWT) |
| `GET` | `/api/certificates` | Fetch certifications | ❌ |
| `GET` | `/api/achievements` | Fetch achievements & hackathons | ❌ |
| `POST` | `/api/messages` | Submit contact form inquiry | ❌ |
| `GET` | `/api/messages` | View all messages | ✅ (JWT) |
| `GET` | `/api/github/stats` | Retrieve GitHub open source stats | ❌ |

---

## 📄 Author

**Hemant Singh**
- **Education**: B.Tech 4th Year, Computer Science Engineering
- **Email**: iamhemant1289@gmail.com
- **GitHub**: [github.com/iamhemant1289](https://github.com/iamhemant1289)
- **LinkedIn**: [linkedin.com/in/hemant-singh](https://linkedin.com/in/hemant-singh)

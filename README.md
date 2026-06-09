# 🚀 JobHunt Fullstack

JobHunt Fullstack is a full-stack web application designed to connect job seekers with recruiters through an easy-to-use online job portal. The platform allows recruiters to post and manage job vacancies while enabling job seekers to browse available opportunities and submit applications.

Built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js), the application implements JWT authentication and role-based access control to provide a secure and scalable recruitment platform.

## ✨ Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Role-based access control

### Job Seeker
- Browse available jobs
- View job details
- Apply for jobs
- Track application history
- Manage profile information

### Recruiter
- Create job postings
- View recruiter-owned jobs
- Update job information
- Delete job postings
- Manage applicants

### Dashboard
- Recruiter dashboard
- Job management
- Application management
- Basic recruitment workflow

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- BcryptJS
- CORS
- Dotenv

## 📁 Project Structure

```bash
jobhunt_fullstack/
│
├── backend/
│   ├── src/
│   |    ├── config/
│   |    ├── controllers/
│   |    ├── middleware/
│   |    ├── models/
│   |    ├── routes/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
|   |       ├── layouts/
|   |       ├── modals/
│   │   ├── hooks/
│   │   ├── modules/
│   │   └── routes/
│   │   ├── services/
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/glriadomenica-debug/jobhunt_fullstack.git
cd jobhunt_fullstack
```

### Backend Setup

```bash
cd backend
npm install
```

Run the backend server:

```bash
npm run dev
```

Backend URL:

```bash
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

### Jobs

| Method | Endpoint |
|----------|----------|
| GET | /api/jobs |
| GET | /api/jobs/:id |
| POST | /api/jobs |
| PUT | /api/jobs/:id |
| DELETE | /api/jobs/:id |
| GET | /api/jobs/mine |

### Applications

| Method | Endpoint |
|----------|----------|
| POST | /api/applications |
| GET | /api/applications/mine |


## 👨‍💻 Author

**Gloria Domenica Ferreira Da Costa E Silva**

GitHub: https://github.com/glriadomenica-debug

## 📄 License

This project is licensed under the MIT License.

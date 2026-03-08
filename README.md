# TriStack – DevOps Practice Todo Application

TriStack is a simple full-stack Todo application built for **DevOps practice and experimentation**.  
It follows a clean separation between frontend and backend services and is containerized for deployment workflows.

This project is intentionally structured in a production-style layout to practice:

- Dockerization
- Multi-container architecture
- CI/CD pipelines
- Infrastructure automation
- Deployment strategies

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Docker

### Database
- MongoDB

### Frontend
- React (Vite)
- Nginx (for serving production build)
- Docker
---

## Project Structure

```text
TriStack/
│
├── app/
│   ├── backend/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── model/
│   │   ├── .dockerignore
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   └── frontend/
│   |   ├── public/
│   |   ├── src/
│   |   │   ├── api/
│   |   │   ├── assets/
│   |   │   ├── components/
│   |   │   ├── App.jsx
│   |   │   ├── index.css
│   |   │   └── main.jsx
│   |   │
│   |   ├── .dockerignore
│   |   ├── Dockerfile
│   |   ├── eslint.config.js
│   |   ├── nginx.config.js
│   |   ├── vite.config.js
│   |   ├── package.json
│   |   ├── package-lock.json
│   |   └── index.html
|   └── .gitignore
|   └── docker-compose.yml
|   └── jenkins_CI_architecture.png
|   └── Jenkins_CI_docs.md
|   └── JenkinsFile
|
```

---

## Application Architecture

Frontend (React)  
⬇  
Nginx  
⬇  
Backend API (Node.js + Express)  
⬇  
MongoDB  

---

## Dockerization

Both frontend and backend are containerized independently.

### Backend Container
- Uses Node.js base image
- Installs dependencies
- Exposes API port
- Connects to MongoDB via environment variables

### Frontend Container
- Multi-stage build (Vite build → Nginx serve)
- Serves static files via Nginx
- Optimized production build

---

## Environment Variables

Backend `.env`:

```
PORT=8500
MONGO_URI=replace-with-your-mongodb-cloud-url
```

---

## Running Locally (Without Docker)

### Backend

```
cd app/backend
npm install
npm dev
```

### Frontend

```
cd app/frontend
npm install
npm run dev
```

---

## Running With Docker

Make sure Docker and Docker Compose are installed on your system.

```bash
docker compose up --build
```

This will:

- Build frontend and backend images
- Create a shared Docker network
- Expose required ports

To run in detached mode:

```bash
docker compose up -d
```

To stop containers:

```bash
docker compose down
```

---

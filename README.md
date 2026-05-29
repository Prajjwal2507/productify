# Productify

A full-stack product management application built with React, Express, PostgreSQL, Drizzle ORM, and Clerk Authentication.

## 🚀 Live Demo

* Frontend: https://productify-eta.vercel.app
* Backend API: https://productify-f0oj.onrender.com

---

## 📌 Features

* User authentication with Clerk
* Create, view, update, and delete products
* Secure backend API
* PostgreSQL database with Drizzle ORM
* Responsive user interface
* Protected routes
* Modern React frontend
* TypeScript backend

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Clerk Authentication
* TanStack Query
* Axios
* Tailwind CSS

### Backend

* Express.js
* TypeScript
* Drizzle ORM
* PostgreSQL
* Clerk Express SDK

### Database

* PostgreSQL (Neon)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Neon

---

## 📂 Project Structure

```text
PRODUCTIFY/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── drizzle/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://productify-f0oj.onrender.com/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend (.env)

```env
DATABASE_URL=your_neon_database_url

CLERK_SECRET_KEY=your_clerk_secret_key

FRONTEND_URL=https://productify-eta.vercel.app

PORT=5000
```

---

## 🏃‍♂️ Running Locally

### Clone Repository

```bash
git clone <repository-url>
cd PRODUCTIFY
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:3002
```

---

## 🗄️ Database Setup

Push schema to PostgreSQL:

```bash
npm run db:push
```

---

## 📦 Build for Production

### Frontend

```bash
npm run build
```

### Backend

```bash
npm run build
npm start
```

---

## 🔒 Authentication

Authentication is handled using Clerk.

Users can:

* Sign up
* Sign in
* Access protected routes
* Manage products securely

---

## 🚀 Deployment

### Frontend

Deployed on Vercel.

### Backend

Deployed on Render.

### Database

Hosted on Neon PostgreSQL.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Prajjwal Rajput

Computer Science Student | Full Stack Developer

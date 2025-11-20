# This is a MERN Template

This template provides a ready-to-use MERN stack starter with JWT-based authentication (signup, login, protected route, current user fetch) and a minimal React front-end using Vite.

## Features

- Express + Mongoose backend
- User model (name, email, password hash, role)
- Auth routes: `POST /api/v1/auth/signup`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`
- JWT issuance (7 day expiry) & verification middleware
- React client with Login / Signup pages and protected Dashboard
- AuthContext for token & user management (stored in `localStorage`)
- ProtectedRoute component using React Router

## Installation

From project root run:

```bash
cd "server" && npm install
cd "../client" && npm install
```

## Running

Server:

```bash
cd "server"
npm start
```

Client:

```bash
cd "client"
npm run dev
```

Client dev server will proxy API calls directly to the specified `VITE_API_URL`.

## Project Structure Additions

```text
server/
  middleware/auth.js
  models/User.js
  routes/auth.js
client/
  src/context/AuthContext.jsx
  src/components/ProtectedRoute.jsx
  src/pages/Login.jsx
  src/pages/Signup.jsx
```

Thank you for visiting and checking it out!

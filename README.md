# DevSync ⚡️

**Live Production Build:** [Insert Your Vercel Link Here]

DevSync is a premium, multi-tenant SaaS project management platform designed for high-performance engineering teams. It features a fully interactive Kanban board, secure workspaces, and a modern, glassmorphic UI driven by Tailwind v4.

---

## 🏗 Architecture & Tech Stack

This application is built on a decoupled, production-ready MERN architecture.

**Frontend (Presentation Layer)**
* **Core:** React 18, Vite, TypeScript
* **Styling:** Tailwind CSS v4 (Pure CSS Engine)
* **Routing:** React Router DOM v6
* **State & Fetching:** Axios (with dynamic environment routing)
* **Hosting:** Vercel (Global Edge CDN)

**Backend (Logic & Data Layer)**
* **Core:** Node.js, Express.js, TypeScript
* **Database:** MongoDB Atlas, Mongoose ODM
* **Authentication:** JWT (JSON Web Tokens), bcryptjs
* **Hosting:** Render (Web Service) + UptimeRobot (Health Checks)

---

## ✨ Key Features

* **Secure Authentication:** Encrypted user registration and login flows with JWT-based session management.
* **Premium UI/UX:** Built entirely from scratch using Tailwind v4, featuring hover states, dynamic priority badges, and an overarching layout shell.
* **Dynamic Kanban Board:** Real-time state updates moving tasks between Todo, In Progress, and Done with visual cues.
* **Multi-Tenant Routing:** Protected routes that ensure users only see their authorized workspaces and projects.
* **Production-Grade Deployment:** Environment-aware Axios configuration and strictly compiled TypeScript backends to prevent memory leaks on free-tier servers.

---

## 🚀 Local Development Setup

Want to run this project locally? Follow these steps:

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/devsync.git
cd devsync
\`\`\`

### 2. Configure Environment Variables
You will need to create two `.env` files.

**Backend (`server/.env`):**
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
\`\`\`

**Frontend (`client/.env`):**
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 3. Install Dependencies & Run
Open two separate terminal windows.

**Terminal 1 (Backend):**
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

The application will now be running on `https://dev-sync-ashen.vercel.app`.

---

## 🔒 Security & Performance Notes
* **TypeScript Compilation:** The backend relies on a strictly compiled build step (`tsc`) before deployment to optimize memory usage on cloud instances.
* **CORS Loopback:** Cross-Origin Resource Sharing is strictly tied to specific frontend domains via environment variables to prevent unauthorized API requests.
# SkillSwap AI 🚀
### AI-Powered Peer-to-Peer Skill Exchange & Mentorship SaaS Platform

SkillSwap AI is a full-stack marketplace for students and tech enthusiasts to teach and learn skills using a credit-based economic model. Features AI mentor matching, automated learning roadmap generation, session summaries, mock interview practice, Razorpay credit top-ups, downloadable verified certificates, real-time session chat, and an admin dashboard.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion + Lucide Icons + Axios
- **Backend**: Spring Boot 3 (Java 17) + Spring Security (JWT) + Spring Data JPA
- **Database**: MySQL 8.0 / H2 Database (Dev Mode)
- **AI Engine**: OpenAI GPT API Integration (with intelligent local fallback simulation engine)
- **Payment Gateway**: Razorpay REST API & Signature Verification
- **Documentation**: Swagger OpenAPI 3 UI (`/swagger-ui.html`)

---

## 📂 Project Structure

```text
skillswap-ai/
├── README.md
├── .env.example
├── db/
│   ├── schema.sql
│   └── data.sql
├── skillswap-backend/          # Spring Boot 3 Java Service
│   ├── pom.xml
│   └── src/
└── skillswap-frontend/         # Vite + React + Tailwind CSS Web Application
    ├── package.json
    └── src/
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- **Java 17+**
- **Node.js 18+** & `npm`
- **Maven 3.8+**
- **MySQL 8.0+** *(Optional: App defaults to in-memory H2 database for zero-config testing if MySQL is not running)*

---

### 1️⃣ Database Setup (MySQL)
Run the SQL scripts located in `db/`:
```bash
mysql -u root -p < db/schema.sql
mysql -u root -p < db/data.sql
```

---

### 2️⃣ Backend Setup (`skillswap-backend`)
Navigate to `skillswap-backend/`:
```bash
# Run Spring Boot application
mvn spring-boot:run
```
- **Backend API URL**: `http://localhost:8080/api`
- **Swagger Documentation**: `http://localhost:8080/swagger-ui.html`

---

### 3️⃣ Frontend Setup (`skillswap-frontend`)
Navigate to `skillswap-frontend/`:
```bash
# Install dependencies
npm install

# Start Vite Dev Server
npm run dev
```
- **Frontend App URL**: `http://localhost:5173`

---

## 🔑 Environment Variables (`.env.example`)

Copy `.env.example` to your environment or configure in `application.yml` / Vite `.env`:

```env
# Spring Boot Configuration
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/skillswap_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root

# Security JWT
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
JWT_EXPIRATION_MS=86400000

# OpenAI API Key
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# Razorpay API Credentials
RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere
RAZORPAY_KEY_SECRET=YourKeySecretHere
```

---

## 🌐 Production Deployment Guide

### Backend → Render.com
1. Connect your GitHub repository to Render.
2. Select **Web Service** with runtime **Java**.
3. Build Command: `./mvnw clean package -DskipTests`
4. Start Command: `java -jar target/skillswap-backend-1.0.0.jar`
5. Add Environment Variables from `.env.example`.

### Frontend → Vercel
1. Connect repository to Vercel.
2. Root Directory: `skillswap-frontend`
3. Framework Preset: **Vite**
4. Environment Variable: `VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api`

---

## 👤 Sample Demo Accounts

| Role | Email | Password | Initial Credits |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@skillswap.ai` | `Password123!` | 500 |
| **Student / Mentor** | `alex.chen@stanford.edu` | `Password123!` | 120 |
| **AI Specialist** | `priya.sharma@mit.edu` | `Password123!` | 190 |

---

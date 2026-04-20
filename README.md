# Inventory Tracker - Secured Full-Stack Application

[![Security Scan](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml)
[![ZAP Security](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/zap.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/zap.yml)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=Fatimah1403_InventoryTracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Fatimah1403_InventoryTracker)

## Live Demo

- **Frontend**: [https://inventory-tracker-frontend-ten.vercel.app](https://inventory-tracker-frontend-ten.vercel.app)
- **Backend API**: [https://inventory-tracker-kuou.onrender.com](https://inventory-tracker-kuou.onrender.com)

## Project Overview

A secure full-stack inventory management system built with React, Node.js, Express, MongoDB, and Redis. The platform enables product tracking, role-based access control, and automated security validation using a DevSecOps pipeline.


## Features
- Inventory CRUD operations
- Dashboard analytics and tracking
- JWT authentication with refresh tokens
- Role-based access control (Admin, Manager, Viewer)
- Bcrypt password hashing
- Redis session management
- Protected API endpoints
- Rate limiting and account lockout
- Secure password reset flow
- Email notifications via Nodemailer

## Security & DevSecOps
- CodeQL (static analysis)
- SonarCloud (code quality & security)
- Trivy (container scanning)
- OWASP ZAP (dynamic testing)
- Dependency scanning (npm audit)
## Technology Stack

### Backend

- Node.js 18 LTS, Express.js 4.x, MongoDB Atlas
- JWT (jsonwebtoken ^9.0.2), Bcrypt (^5.1.1)
- Redis Session Management, Nodemailer

### Frontend

- React 18 with Vite, Material-UI v5
- Protected Routes, JWT Token Management
- Responsive Design

### Security
- JWT, Bcrypt, ZAP, CodeQL

## Installation

### Prerequisites

- Node.js v18+, MongoDB Atlas account, Redis server

### Quick Start

```bash
# Clone repository
git clone https://github.com/Fatimah1403/InventoryTracker.git
cd InventoryTracker

# Backend setup
cd server
npm install
# Create .env with required variables (see .env.example)
npm start

# Frontend setup
cd ../client
npm install
npm run dev
```

### Test Credentials

- **Admin**: admin@example.com / Admin123!
- **Manager**: manager@example.com / Manager123!
- **Viewer**: viewer@example.com / Viewer123!


##  Project Structure

```
InventoryTracker/
├── .github/
│   └── workflows/                      # CI/CD & Security g
|
├── server/                             # Express.js Backend 
│
├── client/                             # React Frontend (Vite)
│   
├── .zap/                              # ZAP Configuration
│   └── rules.tsv                      # ZAP scan rules
│
├── docker/                            # Docker configurations
│   ├── nginx/
│   │   └── nginx.conf                 # Nginx reverse proxy config
│   └── redis/
│       └── redis.conf                 # Redis configuration
│
├── .dockerignore                      # Docker ignore file
├── .env.example                       # Root environment template
├── .gitignore                         # Git ignore file
├── README.md                          # Project documentation
```

##  API Security

### Protected Endpoints

All API endpoints require JWT authentication except login/register.

| Method | Endpoint          | Auth Required | Role     |
| ------ | ----------------- | ------------- | -------- |
| POST   | /api/auth/login   | No            | -        |
| GET    | /api/products     | Yes           | Viewer+  |
| POST   | /api/products     | Yes           | Manager+ |
| DELETE | /api/products/:id | Yes           | Admin    |


## Contact

**Fatimah Hassan** 
GitHub: https://github.com/Fatimah1403
Project: https://github.com/Fatimah1403/InventoryTracker
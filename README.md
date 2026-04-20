# Inventory Tracker - Secured Full-Stack Application

[![Security Scan](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml)
[![ZAP Security](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/zap.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/zap.yml)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=Fatimah1403_InventoryTracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Fatimah1403_InventoryTracker)

## Live Demo

- **Frontend**: [https://inventory-tracker-frontend-ten.vercel.app](https://inventory-tracker-frontend-ten.vercel.app)
- **Backend API**: [https://inventory-tracker-kuou.onrender.com](https://inventory-tracker-kuou.onrender.com)

## Project Overview

A comprehensive inventory management system developed for CS763 Secure Software Development, demonstrating the transformation from a vulnerable application to a fully secured system with enterprise-grade security features.

## 🔒 Security Implementation Summary

### Authentication & Authorization ✅

- **JWT Authentication**: Dual-token system (15min access, 7-day refresh)
- **Password Security**: Bcrypt hashing with 12 salt rounds
- **Role-Based Access Control**: Admin, Manager, Viewer roles
- **Session Management**: Redis-backed secure token storage
- **Account Security**: Lockout after 5 failed attempts (30min)

### Security Testing & Validation ✅

- **SAST**: CodeQL, SonarCloud (0 vulnerabilities, 0 bugs)
- **DAST**: OWASP ZAP automated scanning via GitHub Actions
- **Container Security**: Trivy scanning for Docker images
- **Dependency Scanning**: npm audit, OWASP Dependency Check

### DevSecOps Pipeline ✅

- **Automated Security Scanning**: GitHub Actions workflows
- **Continuous Monitoring**: Every push triggers security scans
- **Security Reports**: Automated artifact generation

## Technology Stack

### Backend

- Node.js 18 LTS, Express.js 4.x, MongoDB Atlas
- JWT (jsonwebtoken ^9.0.2), Bcrypt (^5.1.1)
- Redis Session Management, Nodemailer

### Frontend

- React 18 with Vite, Material-UI v5
- Protected Routes, JWT Token Management
- Responsive Design

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

## 📊 Security Test Results

### SAST (SonarCloud)

- **Vulnerabilities**: 0
- **Security Hotspots**: 19 (reviewed)
- **Code Coverage**: A rating

### DAST (OWASP ZAP)

- **High Risk**: 0
- **Medium Risk**: 3 (configuration issues)
- **Low Risk**: 4 (headers)
- **Authentication**: Successfully tested JWT implementation

## 📁 Project Structure

```
InventoryTracker/
├── .github/
│   └── workflows/                      # CI/CD & Security Automation
│       ├── codeql-analysis.yml        # Static code analysis for vulnerabilities
│       ├── dependency-check.yml       # OWASP dependency vulnerability scanning
│       ├── trivy-security.yml         # Container security scanning
│       ├── sonarcloud.yml             # Code quality and security analysis
│       └── zap.yml                    # OWASP ZAP DAST scanning
│
├── server/                             # Express.js Backend (Node.js)
│   ├── controllers/
│   │   ├── AuthController.js          # JWT login, register, logout, refresh
│   │   ├── ResetController.js         # Password reset with email tokens
│   │   ├── ProductController.js       # CRUD operations for products
│   │   ├── NotificationController.js  # Email and in-app notifications
│   │   └── UserController.js          # User profile management
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT token verification
│   │   ├── rateLimit.js               # Rate limiting (Redis-based)
│   │   ├── roleMiddleware.js          # RBAC authorization
│   │   └── errorHandler.js            # Global error handling
│   ├── models/
│   │   ├── UserModel.js               # User schema (bcrypt passwords)
│   │   ├── ProductModel.js            # Product inventory schema
│   │   ├── NotificationModel.js       # Notification tracking
│   │   └── TokenModel.js              # Reset token storage
│   ├── routes/
│   │   ├── authRoutes.js              # /api/auth/* endpoints
│   │   ├── productRoutes.js           # /api/products/* endpoints
│   │   ├── notificationRoutes.js      # /api/notifications/* endpoints
│   │   ├── resetRoutes.js             # /api/password/* endpoints
│   │   └── userRoutes.js              # /api/users/* endpoints
│   ├── config/
│   │   ├── db.js                      # MongoDB connection setup
│   │   ├── redisClient.js             # Redis client configuration
│   │   └── config.js                  # Environment variables
│   ├── utils/
│   │   ├── sendEmail.js               # Nodemailer SMTP configuration
│   │   ├── tokenGenerator.js          # JWT & crypto token generation
│   │   ├── validator.js               # Input validation utilities
│   │   └── logger.js                  # Winston logging setup
│   ├── tests/                         # Backend tests
│   │   ├── auth.test.js               # Authentication tests
│   │   ├── product.test.js            # Product API tests
│   │   └── security.test.js           # Security-specific tests
│   ├── .env.example                   # Environment template
│   ├── Dockerfile                     # Docker container config
│   ├── package.json                   # Dependencies
│   ├── package-lock.json              # Locked dependencies
│   └── server.js                      # Express server entry point
│
├── client/                             # React Frontend (Vite)
│   ├── public/
│   │   ├── favicon.ico
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/                    # Static assets
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── ProtectedRoute.jsx # JWT route protection
│   │   │   │   ├── RoleBasedAccess.jsx # RBAC component wrapper
│   │   │   │   └── AuthGuard.jsx      # Authentication wrapper
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx         # Navigation with auth status
│   │   │   │   ├── Sidebar.jsx        # Role-based menu
│   │   │   │   └── Footer.jsx
│   │   │   ├── Products/
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   └── ProductDetails.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── Charts.jsx
│   │   │   │   └── RecentActivity.jsx
│   │   │   └── Common/
│   │   │       ├── Loading.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── ConfirmDialog.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # JWT token management
│   │   │   ├── ProductContext.jsx     # Product state management
│   │   │   └── NotificationContext.jsx # Alert management
│   │   ├── hooks/
│   │   │   ├── useAuth.js             # Authentication hook
│   │   │   ├── useProducts.js         # Product CRUD hook
│   │   │   └── useNotifications.js    # Notification hook
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx          # JWT login form
│   │   │   │   ├── Register.jsx       # User registration
│   │   │   │   ├── ForgotPassword.jsx # Password reset request
│   │   │   │   ├── ResetPassword.jsx  # Token-based reset
│   │   │   │   └── Profile.jsx        # User profile
│   │   │   ├── products/
│   │   │   │   ├── Products.jsx       # Product listing
│   │   │   │   ├── AddProduct.jsx     # Create product
│   │   │   │   └── EditProduct.jsx    # Update product
│   │   │   ├── Dashboard.jsx          # Analytics dashboard
│   │   │   ├── Reports.jsx            # Inventory reports
│   │   │   ├── Settings.jsx           # App settings
│   │   │   └── NotFound.jsx           # 404 page
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance with interceptors
│   │   │   ├── authService.js         # Authentication API calls
│   │   │   ├── productService.js      # Product API calls
│   │   │   └── tokenService.js        # JWT token management
│   │   ├── utils/
│   │   │   ├── constants.js           # App constants
│   │   │   ├── validators.js          # Form validation
│   │   │   └── formatters.js          # Data formatting
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── .env.example                   # Frontend environment template
│   ├── Dockerfile                     # Docker container config
│   ├── index.html                     # HTML template
│   ├── package.json                   # Dependencies
│   ├── package-lock.json              # Locked dependencies
│   ├── vite.config.js                 # Vite configuration
│   └── vercel.json                    # Vercel deployment config
│
├── SEC_DOCS/                          # Security Documentation
│   ├── reports/
│   │   ├── Assignment1_Report.pdf     # Initial setup & analysis
│   │   ├── Assignment2_Report.pdf     # Threat modeling
│   │   ├── Assignment3_Report.pdf     # Security implementation
│   │   └── Assignment4_Report.pdf     # Security testing
│   ├── screenshots/
│   │   ├── sonarcloud/                # SAST results
│   │   ├── zap/                       # DAST results
│   │   ├── github-actions/            # CI/CD pipelines
│   │   └── app/                       # Application screenshots
│   ├── test-results/
│   │   ├── sast-report.html           # SonarCloud report
│   │   ├── dast-report.html           # OWASP ZAP report
│   │   └── dependency-report.html     # OWASP dependency check
│   └── architecture/
│       ├── DFD.png                    # Data flow diagram
│       ├── threat-model.png           # STRIDE analysis
│       └── attack-trees.png           # Attack tree diagrams
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
├── scripts/                           # Utility scripts
│   ├── seed-db.js                     # Database seeding
│   ├── create-admin.js                # Admin user creation
│   └── security-test.js               # Manual security tests
│
├── .dockerignore                      # Docker ignore file
├── .env.example                       # Root environment template
├── .gitignore                         # Git ignore file
├── docker-compose.yml                 # Multi-container orchestration
├── docker-compose.prod.yml            # Production compose file
├── LICENSE                            # MIT License
├── package.json                       # Root package (if monorepo)
├── README.md                          # Project documentation
└── sonar-project.properties          # SonarCloud configuration
```

## 🔐 API Security

### Protected Endpoints

All API endpoints require JWT authentication except login/register.

| Method | Endpoint          | Auth Required | Role     |
| ------ | ----------------- | ------------- | -------- |
| POST   | /api/auth/login   | No            | -        |
| GET    | /api/products     | Yes           | Viewer+  |
| POST   | /api/products     | Yes           | Manager+ |
| DELETE | /api/products/:id | Yes           | Admin    |

## 📈 Security Improvements

### Before

- No authentication
- All APIs exposed
- No password hashing
- No rate limiting

### After

- ✅ JWT authentication with refresh tokens
- ✅ Bcrypt password hashing
- ✅ Rate limiting on sensitive endpoints
- ✅ Automated security scanning
- ✅ 0 critical vulnerabilities

## 🤝 Contributors

**Fatimah Hassan** - Boston University Metropolitan College

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

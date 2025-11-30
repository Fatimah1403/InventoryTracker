# Inventory Tracker - Secure Development Project

A full-stack inventory management system with comprehensive security implementation for CS763 Secure Software Development.

[![Security Scan](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml)
[![Container Security](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/trivy-security.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/trivy-security.yml)
[![Dependency Check](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/dependency-check.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/dependency-check.yml)

## 🚀 Live Demo

- **Frontend**: [https://inventory-tracker-frontend-ten.vercel.app](https://inventory-tracker-frontend-ten.vercel.app)
- **Backend API**: [https://inventory-tracker-kuou.onrender.com](https://inventory-tracker-kuou.onrender.com)

## 📋 Project Overview

This inventory management system demonstrates the evolution from a feature-complete but security-vulnerable application to a properly secured system with comprehensive authentication, encryption, and security controls.

### Current Security Status 
- ✅ **JWT Authentication** with refresh tokens (15min access, 7-day refresh)
- ✅ **Bcrypt Password Hashing** with 12 salt rounds
- ✅ **Redis Session Management** for secure token storage
- ✅ **Role-Based Access Control** (Admin, Manager, Viewer)
- ✅ **Rate Limiting** on sensitive endpoints
- ✅ **Account Lockout** after 5 failed attempts
- ✅ **Secure Password Reset** with time-limited tokens
- ✅ **HttpOnly Cookies** for refresh token storage
- ✅ **Protected API Endpoints** with auth middleware
- ✅ **Email Notifications** via Nodemailer
- ✅ **Containerized Deployment** with Docker
- ✅ **Automated Security Scanning** with GitHub Actions

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **UI Library**: Material-UI v5
- **State Management**: React Context API
- **Routing**: React Router v6
- **Charts**: Recharts
- **Notifications**: React Hot Toast, Notistack

### Backend
- **Runtime**: Node.js v18 LTS
- **Framework**: Express.js 4.x
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose 7.x
- **Authentication**: JWT + Refresh Tokens
- **Password Hashing**: Bcrypt (12 rounds)
- **Session Store**: Redis
- **Email Service**: Nodemailer with Gmail SMTP
- **Environment**: dotenv

### Security Stack
- **Authentication**: JWT (jsonwebtoken ^9.0.2)
- **Encryption**: Bcrypt (^5.1.1)
- **Session Management**: Redis (^4.6.0)
- **Rate Limiting**: Custom Redis-based middleware
- **CORS**: Configured for secure cross-origin requests
- **Security Scanning**: CodeQL, Trivy, npm audit
- **Deployment Security**: HTTPS (Vercel/Render)

## 🔧 Installation

### Prerequisites
- Node.js v16+ (v18 recommended)
- Redis Server (for session management)
- Docker Desktop (for containerized deployment)
- Git
- MongoDB Atlas account (or local MongoDB)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Fatimah1403/InventoryTracker.git
cd InventoryTracker
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file:
PORT=5001
MONGO_URI=mongodb+srv://your-connection-string
NODE_ENV=development
JWT_SECRET=your-64-char-hex-secret
JWT_REFRESH_SECRET=your-64-char-hex-refresh-secret
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
REDIS_URL=redis://localhost:6379
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@example.com

# Start Redis
redis-server

# Start backend
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file:
VITE_API_URL=http://localhost:5001

# Start frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

### Test Accounts
```javascript
// Admin
Email: admin@example.com
Password: Admin123!

// Manager
Email: manager@example.com
Password: Manager123!

// Viewer (Read-only)
Email: viewer@example.com
Password: Viewer123!
```

## 🐳 Docker Deployment

### Build and run with Docker Compose:
```bash
# From project root
docker-compose up --build

# Access at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

## 🔒 Security Features Implementation

### Phase 1: Security Analysis ✅
- Vulnerability identification
- Threat modeling with STRIDE
- Attack tree analysis
- Security automation setup

### Phase 2: Authentication System ✅
- **JWT Token System**
  - Short-lived access tokens (15 minutes)
  - Long-lived refresh tokens (7 days)
  - Secure token rotation
  - httpOnly cookie storage
- **Password Security**
  - Bcrypt hashing with 12 rounds
  - Minimum 8 character requirement
  - Password strength validation
  - Secure reset mechanism
- **Session Management**
  - Redis-based token storage
  - Automatic token refresh
  - Secure logout with token invalidation

### Phase 3: Access Control ✅
- **Role-Based Access Control (RBAC)**
  - Admin: Full system access
  - Manager: Inventory management
  - Viewer: Read-only access
- **Protected Routes**
  - All API endpoints require authentication
  - Role-specific endpoint access
  - Frontend route protection
- **Rate Limiting**
  - Login: 5 attempts per 30 minutes
  - Password reset: 3 requests per 15 minutes
  - API endpoints: 100 requests per hour

### Phase 4: Security Hardening ✅
- **Account Security**
  - Account lockout after failed attempts
  - Time-based lockout (30 minutes)
  - Login attempt tracking
- **Request Security**
  - CORS properly configured
  - Input validation
  - SQL injection prevention
- **Data Protection**
  - Sensitive data never in URLs
  - Passwords never returned in responses
  - Secure error messages

## 📁 Project Structure

```
InventoryTracker/
├── server/                    # Express.js backend
│   ├── controllers/           
│   │   ├── AuthController.js      # JWT authentication
│   │   ├── ResetController.js     # Password reset
│   │   ├── ProductController.js   # Product CRUD
│   │   └── NotificationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── rateLimit.js          # Rate limiting
│   ├── models/
│   │   ├── UserModel.js          # User schema with bcrypt
│   │   └── ProductModel.js       # Product schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── productRoutes.js      # Protected product routes
│   │   └── resetRoutes.js        # Password reset
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── redisClient.js        # Redis connection
│   ├── utils/
│   │   └── sendEmail.js          # Nodemailer config
│   └── server.js                  # Express server
│
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Auth/
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── RoleBasedComponent.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Products.jsx
│   │   └── services/
│   │       └── api.js             # Axios configuration
│   └── Dockerfile
│
├── .github/
│   └── workflows/              # Security automation
│       ├── codeql-analysis.yml
│       ├── trivy-security.yml
│       └── dependency-check.yml
├── docker-compose.yml          # Multi-container setup
└── README.md                   # This file
```

## 🔐 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth | Rate Limit |
|--------|----------|-------------|------|------------|
| POST | `/api/auth/register` | Register new user | No | - |
| POST | `/api/auth/login` | Login user | No | 5/30min |
| POST | `/api/auth/refresh` | Refresh access token | Cookie | - |
| POST | `/api/auth/logout` | Logout user | Yes | - |
| GET | `/api/auth/verify` | Verify token | Yes | - |
| PUT | `/api/auth/profile` | Update profile | Yes | - |
| POST | `/api/password/request` | Request password reset | No | 3/15min |
| POST | `/api/password/confirm` | Confirm password reset | No | - |

### Product Endpoints (Protected)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | Viewer+ |
| GET | `/api/products/:id` | Get single product | Viewer+ |
| POST | `/api/products` | Create product | Manager+ |
| PUT | `/api/products/:id` | Update product | Manager+ |
| PATCH | `/api/products/:id/quantity` | Update quantity | Manager+ |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Example Requests

```javascript
// Login
const response = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'Admin123!'
  })
});

const { accessToken, user } = await response.json();

// Protected Request
const products = await fetch('http://localhost:5001/api/products', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

## 🧪 Security Testing

### Automated Security Scans
```bash
# Dependency audit
npm audit

# Container security
docker run --rm -v $(pwd):/src \
  aquasecurity/trivy fs /src

# Static code analysis (via GitHub Actions)
# Runs automatically on push
```

### Manual Security Testing
```bash
# Test rate limiting
for i in {1..10}; do
  curl -X POST http://localhost:5001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
# Should get "Too many requests" after 5 attempts

# Test JWT expiry
# Access token expires after 15 minutes
# Refresh token automatically renews it
```

## 📊 Security Metrics

### Performance Impact
| Feature | Overhead | Notes |
|---------|----------|-------|
| Bcrypt (12 rounds) | 250-300ms | Intentionally slow |
| JWT Signing | < 1ms | Negligible |
| JWT Verification | < 1ms | Negligible |
| Redis Operations | < 5ms | In-memory |
| Rate Limiting Check | < 2ms | Redis-based |

### Security Coverage
- **Authentication**: 100% of endpoints protected
- **Password Security**: Bcrypt with 12 rounds
- **Session Security**: Redis + httpOnly cookies
- **Rate Limiting**: All sensitive endpoints
- **Input Validation**: All user inputs validated

## 🚀 Features

### Core Functionality
- ✅ **Product Management**: Complete CRUD operations
- ✅ **Real-time Tracking**: Live inventory updates
- ✅ **Smart Notifications**: Low stock and out-of-stock alerts
- ✅ **Email Alerts**: Automated notifications via Nodemailer
- ✅ **Search & Filter**: Find products by name/category
- ✅ **Bulk Operations**: Quick restock functionality
- ✅ **Data Export**: CSV export for reports
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Dashboard Analytics**: Visual charts and statistics

### Security Features
- 🔐 **JWT Authentication**: Secure token-based auth
- 🔑 **Password Hashing**: Bcrypt encryption
- 🛡️ **Protected Routes**: Role-based access
- 📝 **Session Management**: Redis-based sessions
- 🚦 **Rate Limiting**: Brute force protection
- 🔒 **Secure Headers**: CORS configuration
- ✅ **Input Validation**: Server-side validation
- 📊 **Audit Trail**: Authentication logging

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/Enhancement`)
3. Commit changes (`git commit -m 'Add Enhancement'`)
4. Push to branch (`git push origin feature/Enhancement`)
5. Open Pull Request

## 📈 Development Roadmap

### Completed ✅
- Security vulnerability analysis
- JWT authentication implementation
- Password security with bcrypt
- Redis session management
- Rate limiting implementation
- Role-based access control
- Secure password reset

### Future Enhancements
- [ ] Two-Factor Authentication (2FA)
- [ ] Field-level encryption for sensitive data
- [ ] Advanced security headers (Helmet.js)
- [ ] CSRF protection
- [ ] API key management
- [ ] Audit logging system
- [ ] Security dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) - React component library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Redis](https://redis.io/) - In-memory data store
- [JWT.io](https://jwt.io/) - JWT debugging
- [OWASP](https://owasp.org/) - Security best practices
- [GitHub Security](https://github.com/features/security) - Security tools
- Prof. Yuting Zhang - Boston University Metropolitan College

## 📞 Contact

**Name**: Fatimah Hassan  
**Project Link**: [https://github.com/Fatimah1403/InventoryTracker](https://github.com/Fatimah1403/InventoryTracker)

---

*This project demonstrates the implementation of comprehensive security features using industry-standard cryptographic APIs and best practices for web application security.*
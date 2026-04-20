# Inventory Tracker 

[![Security Scan](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/codeql-analysis.yml)
[![Container Security](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/trivy-security.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/trivy-security.yml)
[![Dependency Check](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/dependency-check.yml/badge.svg)](https://github.com/Fatimah1403/InventoryTracker/actions/workflows/dependency-check.yml)

##  Live Demo

- **Frontend**: [https://inventory-tracker-frontend-ten.vercel.app](https://inventory-tracker-frontend-ten.vercel.app)
- **Backend API**: [https://inventory-tracker-kuou.onrender.com](https://inventory-tracker-kuou.onrender.com)
- **Documentation**: [CS763 Security Analysis](./CS763_DOCS/)

##  Project Overview

A secure full-stack inventory management system built with React, Node.js, Express, MongoDB, and Redis. The platform enables product tracking, role-based access control, and automated security validation using a DevSecOps pipeline.

### Current Status
- Full CRUD functionality for inventory management
- Real-time stock tracking and notifications
- Containerized with Docker
- Automated security scanning with GitHub Actions
- Authentication system pending (Assignment 3)
-  Security vulnerabilities identified for analysis

##  Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **UI Library**: Material-UI v5
- **State Management**: React Context API
- **Routing**: React Router v6
- **Charts**: Recharts
- **Notifications**: React Hot Toast, EmailJS

### Backend
- **Runtime**: Node.js v18 LTS
- **Framework**: Express.js 4.x
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose 7.x
- **Environment**: dotenv

### DevOps & Security
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Security Scanning**: CodeQL, Trivy, npm audit
- **Deployment**: Vercel (Frontend), Render (Backend)

##  Installation

### Prerequisites
- Node.js v16+ (v18 recommended)
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
cd server
npm install

# Create .env file with:
PORT=5001
MONGO_URI=mongodb+srv://your-connection-string
NODE_ENV=development

# Start backend
npm run dev
```

3. **Frontend Setup**
```bash
cd ../client
npm install

# Create .env file with:
VITE_API_URL=http://localhost:5001

# Start frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

##  Docker Deployment

### Build and run with Docker Compose:
```bash
# From project root
docker-compose up --build

# Access at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

### Docker Configuration:
- Frontend served with Nginx
- Backend runs on Node.js Alpine
- MongoDB Atlas for database (external)
- Environment variables managed via .env files

##  Security Features & Analysis

### Current Security Status

#### Implemented
- Environment variable management
- HTTPS in production (Vercel/Render)
- Basic input validation (client-side)
- Automated security scanning
- Container security scanning
- Dependency vulnerability monitoring

####  Identified Vulnerabilities 
- **No Authentication System** - All endpoints publicly accessible
- **Missing Authorization** - No role-based access control
- **Unprotected API Endpoints** - CRUD operations without auth
- **No Rate Limiting** - Vulnerable to brute force attacks
- **Missing Security Headers** - No CSP, X-Frame-Options, etc.
- **Client-side Sensitive Data** - EmailJS config in localStorage
- **No Input Sanitization** - Server-side validation missing

### Security Automation

Three GitHub Actions workflows provide continuous security monitoring:

1. **CodeQL Analysis** (`codeql-analysis.yml`)
   - Static code analysis for security vulnerabilities
   - Detects SQL injection, XSS, path traversal risks
   - Runs on every push and weekly

2. **Trivy Container Security** (`trivy-security.yml`)
   - Scans Docker images for vulnerabilities
   - Checks base images and dependencies
   - Reports to GitHub Security tab

3. **Dependency Security** (`dependency-check.yml`)
   - npm audit for known vulnerabilities
   - Secret scanning in codebase
   - License compliance checking

##  Project Structure

```
inventory_tracker/
├── .github/
│   └── workflows/           # GitHub Actions security workflows
│       ├── codeql-analysis.yml
│       ├── trivy-security.yml
│       └── dependency-check.yml
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── context/        # State management
│   ├── Dockerfile          # Frontend container config
│   └── .env               # Environment variables (gitignored)
├── server/                 # Express backend
│   ├── controllers/        # Business logic
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── config/            # Configuration
│   ├── Dockerfile         # Backend container config
│   └── .env              # Environment variables (gitignored)
├── CS763_DOCS/            # Course documentation
│   ├── screenshots/       # Application screenshots
│   └── reports/          # Assignment reports
├── docker-compose.yml     # Multi-container setup
└── README.md             # This file
```

##  Features

### Core Functionality
-  **Product Management**: Complete CRUD operations
-  **Real-time Tracking**: Live inventory updates
-  **Smart Notifications**: Low stock and out-of-stock alerts
-  **Email Alerts**: Automated notifications via EmailJS
-  **Search & Filter**: Find products by name/category
-  **Bulk Operations**: Quick restock functionality
-  **Data Export**: CSV export for reports
-  **Responsive Design**: Mobile-friendly interface
-  **Dashboard Analytics**: Visual charts and statistics

### Planned Security Enhancements
-  JWT Authentication system
-  User registration and login
-  Password hashing with bcrypt
-  Protected API routes
-  Role-based access control (RBAC)
-  Rate limiting
-  Security headers (Helmet.js)
-  Input validation and sanitization
-  Audit logging

##  Testing

### Manual Testing
```bash
# Backend API testing
curl http://localhost:5001/api/products

# Frontend testing
npm run test  # Coming soon
```

### Security Testing
```bash
# Run dependency audit
npm audit

# Check for secrets
git secrets --scan

# Container scanning (local)
docker run --rm -v $(pwd):/src \
  aquasecurity/trivy fs /src
```

##  API Documentation

### Base URL
- Development: `http://localhost:5001`
- Production: `https://inventory-tracker-kuou.onrender.com`

### Endpoints (Currently Unprotected)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|---------|
| GET | `/api/products` | Get all products | 🔓 Public |
| GET | `/api/products/:id` | Get single product | 🔓 Public |
| POST | `/api/products` | Create product | 🔓 Public |
| PUT | `/api/products/:id` | Update product | 🔓 Public |
| DELETE | `/api/products/:id` | Delete product | 🔓 Public |

### Example Request
```javascript
// Get all products
fetch('http://localhost:5001/api/products')
  .then(res => res.json())
  .then(data => console.log(data));

// Create product
fetch('http://localhost:5001/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Laptop',
    category: 'Electronics',
    quantity: 10,
    price: 999.99
  })
});
```

##  Known Issues & Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify Atlas connection string in `.env`
   - Check IP whitelist in Atlas dashboard
   - Ensure internet connectivity

2. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :5001
   # Kill process
   kill -9 [PID]
   ```

3. **Docker Build Fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   # Rebuild
   docker-compose up --build
   ```

4. **CORS Errors**
   - Verify frontend URL in backend CORS config
   - Check `VITE_API_URL` in frontend `.env`

##  Acknowledgments

- [Material-UI](https://mui.com/) - React component library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [OWASP](https://owasp.org/) - Security best practices
- [GitHub Security](https://github.com/features/security) - Security tools- Prof. Yuting Zhang - Boston University

##  Contact

**Name**: Fatimah Hassan  
**GitHub**: [@Fatimah1403](https://github.com/Fatimah1403)  
**Project Link**: [https://github.com/Fatimah1403/InventoryTracker](https://github.com/Fatimah1403/InventoryTracker)

---


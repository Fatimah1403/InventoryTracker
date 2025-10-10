# Inventory Management System

A modern, responsive inventory management application built with React and Node.js.

## Features

### Core Functionality

- ✅ **Product Management**: Add, edit, delete, and track products
- ✅ **Real-time Inventory Tracking**: Monitor stock levels with visual indicators
- ✅ **Smart Notifications**: Get alerts for low stock and out-of-stock items
- ✅ **Email Alerts**: Automatic email notifications when products go out of stock
- ✅ **Search & Filter**: Quickly find products by name or category
- ✅ **Bulk Operations**: Quick restock with +10 button
- ✅ **Data Export**: Export inventory data to CSV format

### User Interface

- 📊 **Interactive Dashboard**: Real-time statistics and charts
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔔 **Notification Center**: Track all system activities
- 💱 **Currency Exchange Rates**: Live rates for international pricing
- 🎨 **Material-UI Design**: Clean, modern interfaces

## Tech Stack

### Frontend

- React.js (Vite)
- Material-UI
- React Router v6
- Recharts (Data visualization)
- React Hot Toast
- EmailJS

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

#### Clone the repository

```bash
git clone https://github.com/yourusername/inventory-management.git
cd inventory-management

cd server
npm install

cd ../client
npm install

PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


VITE_API_URL=http://localhost:5001


cd server
npm run dev

POST /api/products
{
  "name": "Laptop",
  "category": "Electronics",
  "quantity": 10,
  "price": 999.99
}

{
  "success": true,
  "data": {
    "_id": "abc123",
    "name": "Laptop",
    "category": "Electronics",
    "quantity": 10,
    "price": 999.99,
    "inStock": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
}


## Project Structure
inventory-management/
├── client/                  # React frontend
│   ├── public/image            # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Dashboard/  # Dashboard components
│   │   │   └── Layout/     # Layout components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   ├── services/       # API services
│   │   │   ├── api.js
│   │   │   └── emailService.js
│   │   ├── theme/          # Material-UI theme
│   │   ├── utils/          # Utility functions
│   │   │   └── toast.js
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
│
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   │   └── db.js         # Database connection
│   ├── controllers/       # Route handlers
│   │   └── ProductController.js
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   │   └── ProductModel.js
│   ├── routes/           # API routes
│   │   └── ProductRoutes.js
│   ├── .env             # Environment variables
│   ├── server.js        # Entry point
│   └── package.json     # Dependencies
│
├── .gitignore           # Git ignore file
└── README.md           # Documentation

### Manual Testing Checklist
- [ ] Add new product
- [ ] Edit product details
- [ ] Delete product
- [ ] Search functionality
- [ ] Quantity adjustments
- [ ] Low stock warnings
- [ ] Out of stock emails
- [ ] Export to CSV
- [ ] Mobile responsiveness

## 🌐 Live Demo
Frontend: https://inventory-tracker-frontend-ten.vercel.app
Backend API: https://inventory-tracker-kuou.onrender.com


## ⚙️ Deployment
- Frontend deployed with **Vercel**
- Backend deployed with **Render**
- CORS enabled between both environments
- EmailJS integrated for automated alerts

## Future Enhancements

### Phase 1 - User Management
- [ ] User authentication (JWT)
- [ ] Role-based access control
- [ ] User profiles
- [ ] Activity logs

### Phase 2 - Advanced Inventory
- [ ] Barcode/QR code scanning
- [ ] Product images upload
- [ ] Batch import from Excel
- [ ] Category management
- [ ] Product variants (size, color)

### Phase 3 - Business Intelligence
- [ ] Advanced analytics dashboard
- [ ] Sales forecasting
- [ ] Inventory history tracking
- [ ] Price history charts
- [ ] Profit margin analysis

### Phase 4 - Supply Chain
- [ ] Supplier management
- [ ] Purchase order system
- [ ] Automated reordering
- [ ] Multi-warehouse support
- [ ] Shipment tracking

### Phase 5 - Additional Features
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Backup and restore
- [ ] Integration with accounting software
- [ ] Customer management
- [ ] Invoice generation
- [ ] Reports generation (PDF)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string in `.env`
   - Verify MongoDB service is running
   - Check network connectivity

2. **Port Already in Use**
   - Change port in `.env` file
   - Kill process using the port

3. **Email Not Sending**
   - Verify EmailJS credentials
   - Check spam folder
   - Enable less secure app access (Gmail)

4. **CORS Error**
   - Verify frontend URL in server CORS settings
   - Check API URL in frontend `.env`

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/inventory-management](https://github.com/yourusername/inventory-management)

## Acknowledgments

- [Material-UI](https://mui.com/) - React component library
- [Recharts](https://recharts.org/) - Data visualization
- [EmailJS](https://www.emailjs.com/) - Email service
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Vite](https://vitejs.dev/) - Build tool
```

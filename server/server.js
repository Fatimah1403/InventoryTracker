
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Import routes
import productRoutes from "./routes/ProductRoutes.js";

dotenv.config();
const app = express();

// CORS configuration - MORE DETAILED
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5000'], 
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions)); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev"));

// Logging middleware (helps debug)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/products", productRoutes)
// Basic route for testing
app.get("/", (req, res) => {
  res.send({ message: "Inventory Management API is running!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
      success: false,
      message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err.message
  });
});

// Start Server
const PORT = process.env.PORT || 5001;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
    });
  } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
  }
};
startServer();
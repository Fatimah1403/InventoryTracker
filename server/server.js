
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";


// Import routes
import productRoutes from "./routes/ProductRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import resetRoutes from "./routes/ResetRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5001',
      'https://inventory-tracker-frontend-ten.vercel.app'
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', "Authorization"],
  exposedHeaders: ['set-cookie'],

};
// app.use(cors({
//   origin: "http://localhost:5173",   
//   credentials: true                 
// }));

// Middleware
app.use(cookieParser());
app.disable('x-powered-by');
// app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("dev"));
app.use(helmet());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/password", resetRoutes);
app.use("/api/notifications", notificationRoutes);



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

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err.message
  });
});


const PORT = process.env.PORT || 5001;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server started on port ${PORT}`);
      console.log(` API available at http://localhost:${PORT}`);
    });
  } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
  }
};
startServer();
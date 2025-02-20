import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(cors({
    origin: [
        "https://fobis-auth.netlify.app",
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

// Base API Route
app.get("/api", (req, res) => {
    res.json({ 
        message: "API is working!",
        status: "success",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server Started on PORT: ${port}`);
    console.log(`API URL: ${process.env.NODE_ENV === 'production' ? 'https://fobis-auth.onrender.com' : 'http://localhost:' + port}`);
});
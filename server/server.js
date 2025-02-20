import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Waxaan u wacayaa connectionka MongoDB functionka Name-ka ah ee connectDB
connectDB();

app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Api Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


// Inuu Request diremaayo ayaan hubineynaa
// app.get('/', (req, res) => res.send("API Working"))

app.listen(port, () => console.log(`Server Started on PORT: ${port}`));
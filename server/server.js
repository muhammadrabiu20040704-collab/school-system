import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.js";
import testRoutes from "./routes/test.js";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
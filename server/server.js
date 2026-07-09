import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/test.js";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import lecturerRoutes from "./routes/lecturerRoutes.js";
import lecturerDashboardRoutes from "./routes/lecturerDashboardRoutes.js"
import studentDashboardRoutes from "./routes/studentDashboardRoutes.js";
import lecturerStudentRoutes from "./routes/lecturerStudentRoutes.js";

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
app.use("/api/departments", departmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/student-profiles", studentProfileRoutes); 
app.use("/api/lecturers",lecturerRoutes);
app.use("/api/lecturer-dashboard", lecturerDashboardRoutes);
app.use("/api/student-dashboard",studentDashboardRoutes);
app.use("/api/lecturer-students", lecturerStudentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
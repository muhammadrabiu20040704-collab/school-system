import express from "express";
import { createCourse, getCourses } from "../controllers/courseController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  assignLecturer,
  enrollStudent
} from "../controllers/courseController.js";

const router = express.Router();

// Admin only
router.post("/", protect, adminOnly, createCourse);

// Everyone can see
router.get("/", protect, getCourses);

// ASSIGN LECTURER
router.put("/:id/assign-lecturer", protect, adminOnly, assignLecturer);

// ENROLL STUDENT
router.put("/:id/enroll", protect, adminOnly, enrollStudent);


export default router;
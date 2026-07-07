import express from "express";
import { 
  createCourse,
   getCourses,
  updateCourse,
  deleteCourse,
  removeLecturer
   } from "../controllers/courseController.js";
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

// UPDATE COURSE
router.put(
  "/:id",
  protect,
  adminOnly,
  updateCourse
);

// DELETE COURSE
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCourse
);

router.put(
"/remove-lecturer/:id",
protect,
adminOnly,
removeLecturer
);


export default router;
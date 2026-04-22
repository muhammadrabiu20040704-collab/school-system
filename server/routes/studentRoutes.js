import express from "express";
import {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL STUDENTS
router.get("/", protect, adminOnly, getStudents);

// GET SINGLE STUDENT
router.get("/:id", getStudentById);

// UPDATE STUDENT
router.put("/:id", protect, adminOnly, updateStudent);

// DELETE STUDENT
router.delete("/:id", protect, adminOnly, deleteStudent);

export default router;
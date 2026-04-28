import express from "express";
import { enrollCourse } from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// student enroll course
router.post("/", protect, enrollCourse);

export default router;
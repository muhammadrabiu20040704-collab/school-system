import express from "express";

import { getCourseStudents } from "../controllers/lecturerStudentController.js";

import { protect, lecturerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/course/:courseId/students",
    protect,
    lecturerOnly,
    getCourseStudents
);

export default router;
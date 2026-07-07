import express from "express";
import { getAvailableCourses, getMyCourses  } from "../controllers/enrollmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get(
    "/available",
    protect,
    authorizeRoles("student"),
    getAvailableCourses
);

router.get(
    "/my",
    protect,
    authorizeRoles("student"),
    getMyCourses
);

export default router;
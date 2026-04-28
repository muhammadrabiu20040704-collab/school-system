import express from "express";
import {
  createAssignment,
  getAssignments
} from "../controllers/assignmentController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("lecturer"), createAssignment);
router.get("/", protect, authorizeRoles("student"), getAssignments);

export default router;
import express from "express";
import {
  createAssignment,
  getAssignments,
  updateAssignment,
  getMyAssignments
} from "../controllers/assignmentController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("lecturer"),
  createAssignment
);

router.get(
  "/",
  protect,
  authorizeRoles("lecturer", "admin"),
  getAssignments
);

router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMyAssignments
);

router.put(
  "/:id",
  protect,
  authorizeRoles("lecturer"),
  updateAssignment
);

export default router;
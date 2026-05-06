import express from "express";
import { Router } from "express";
import {
  createSubmissions,
  getSubmissions,
  gradeSubmission,
  getAllSubmissions,
  getSubmissionByAssignment,
  getSingleSubmission

} from "../controllers/submissionControllers.js";

import { protect, authorizeRoles} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSubmissions);
router.get("/", protect, getSubmissions);
router.put("/:id/grade", protect, gradeSubmission);
router.get("/all", protect, authorizeRoles("lecturer", "admin"), getAllSubmissions);
router.get("/assignment/:assignmentId", protect,authorizeRoles("lecturer", "admin"), getSubmissionByAssignment);
router.get( "/:id", protect, authorizeRoles("lecturer", "admin"), getSingleSubmission);

export default router;
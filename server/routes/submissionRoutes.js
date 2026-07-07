import express from "express";

import {
  createSubmission,
  getSubmissions,
  gradeSubmission,
  getAllSubmissions,
  getSubmissionByAssignment,
  getSingleSubmission,
  getSubmissionForLecturer,
  getResults
} from "../controllers/submissionControllers.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// STUDENT ROUTES
// ===============================

// submit assignment
router.post(
  "/",
  protect,
  authorizeRoles("student"),
  createSubmission
);

// get my submissions
router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getSubmissions
);

// get my result
router.get(
  "/results",
  protect,
  authorizeRoles("student"),
  getResults
);

// get my submission by assignment
router.get(
  "/assignment/:assignmentId",
  protect,
  authorizeRoles("student"),
  getSubmissionByAssignment
);


// ===============================
// LECTURER ROUTES
// ===============================

// lecturer view submissions for assignment
router.get(
  "/lecturer/:assignmentId",
  protect,
  authorizeRoles("lecturer"),
  getSubmissionForLecturer
);

// lecturer grade submission
router.put(
  "/:id/grade",
  protect,
  authorizeRoles("lecturer"),
  gradeSubmission
);

// lecturer/admin get single submission
router.get(
  "/:id",
  protect,
  authorizeRoles("lecturer", "admin"),
  getSingleSubmission
);


// ===============================
// ADMIN ROUTES
// ===============================

// admin get all submissions
router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllSubmissions
);


export default router;
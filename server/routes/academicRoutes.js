import express from "express";

import {
  createAcademicSession,
  getAcademicSessions,
  updateAcademicSession,
  activateAcademicSession,
  archiveAcademicSession
} from "../controllers/academicController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  createAcademicSession
);

router.get(
  "/",
  protect,
  adminOnly,
  getAcademicSessions
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateAcademicSession
);

router.put(
  "/:id/activate",
  protect,
  adminOnly,
  activateAcademicSession
);

router.put(
  "/:id/archive",
  protect,
  adminOnly,
  archiveAcademicSession
);

export default router;
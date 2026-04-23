import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createDepartment);
router.get("/", protect, getDepartments);
router.get("/:id", protect, getDepartment);
router.delete("/:id", protect, adminOnly, deleteDepartment);

export default router;
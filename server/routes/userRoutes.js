import express from "express";
import {
  getAllUsers,
  makeAdmin,
  removeAdmin
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL USERS
router.get("/", protect, adminOnly, getAllUsers);

// MAKE ADMIN
router.put("/:id/make-admin", protect, adminOnly, makeAdmin);

// REMOVE ADMIN
router.put("/:id/remove-admin", protect, adminOnly, removeAdmin);

export default router;
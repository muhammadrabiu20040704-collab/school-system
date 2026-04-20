import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Admin only
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// 🔒 Student only
router.get("/student", protect, authorizeRoles("student"), (req, res) => {
  res.json({ message: "Welcome Student" });
});

export default router;
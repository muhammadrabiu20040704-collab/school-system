import express from "express";

import {
getLecturerDashboard
} from "../controllers/lecturerDashboardController.js";

import {
protect,
authorizeRoles
} from "../middleware/authMiddleware.js";


const router = express.Router();



router.get(
  "/",
  protect,
  authorizeRoles("lecturer"),
  getLecturerDashboard
);



export default router;
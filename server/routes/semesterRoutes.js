import express from "express";

import {
    createSemester,
    getSemesters,
    updateSemester,
    activateSemester,
    archiveSemester
} from "../controllers/semesterController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    adminOnly,
    createSemester
);

router.get(
    "/",
    protect,
    adminOnly,
    getSemesters
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateSemester
);

router.put(
    "/:id/activate",
    protect,
    adminOnly,
    activateSemester
);

router.put(
    "/:id/archive",
    protect,
    adminOnly,
    archiveSemester
);

export default router;
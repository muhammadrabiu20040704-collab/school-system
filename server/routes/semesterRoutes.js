import express from "express";

import {
    createSemester,
    getSemesters,
    updateSemester,
    activateSemester,
    archiveSemester
} from "../controllers/semesterController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    adminOnly,
    createSemester
);

router.get(
    "/",
    verifyToken,
    adminOnly,
    getSemesters
);

router.put(
    "/:id",
    verifyToken,
    adminOnly,
    updateSemester
);

router.put(
    "/:id/activate",
    verifyToken,
    adminOnly,
    activateSemester
);

router.put(
    "/:id/archive",
    verifyToken,
    adminOnly,
    archiveSemester
);

export default router;
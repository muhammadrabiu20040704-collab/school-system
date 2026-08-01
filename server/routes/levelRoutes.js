import express from "express";

import {
    createLevel,
    getLevels,
    updateLevel,
    archiveLevel
} from "../controllers/levelController.js";

import {
    protect,
    adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    adminOnly,
    createLevel
);

router.get(
    "/",
    protect,
    adminOnly,
    getLevels
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateLevel
);

router.put(
    "/:id/archive",
    protect,
    adminOnly,
    archiveLevel
);

export default router;
import express from "express";

import {
    takeAttendance,
    getAttendanceHistory,
    getAttendanceByDate,
    updateAttendance
} from "../controllers/AttendanceController.js";

import {
    protect,
    lecturerOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ==============================
// TAKE ATTENDANCE
// ==============================

router.post(
    "/",
    protect,
    lecturerOnly,
    takeAttendance
);


// ==============================
// ATTENDANCE HISTORY
// ==============================

router.get(
    "/course/:courseId",
    protect,
    lecturerOnly,
    getAttendanceHistory
);


// ==============================
// ATTENDANCE BY DATE
// ==============================

router.get(
    "/course/:courseId/date/:date",
    protect,
    lecturerOnly,
    getAttendanceByDate
);


// ==============================
// UPDATE ATTENDANCE
// ==============================

router.put(
    "/:id",
    protect,
    lecturerOnly,
    updateAttendance
);

export default router;
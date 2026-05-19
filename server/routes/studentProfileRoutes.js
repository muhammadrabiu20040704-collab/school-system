import express from 'express';
import { 
    createStudentProfile, 
    getStudentProfiles,
    getStudentProfile, 
    updateStudentProfile,
    deleteStudentProfile,
    getStudents
} from '../controllers/StudentProfileController.js';

import {
     protect,
     authorizeRoles
    } from '../middleware/authMiddleware.js';

    const router = express.Router();

    //create
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createStudentProfile
);


// GET ALL
router.get(
  "/",
  protect,
  getStudentProfiles
);


// GET ONE
router.get(
  "/:id",
  protect,
  getStudentProfile
);


// UPDATE
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateStudentProfile
);


// DELETE
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudentProfile
);

export default router;
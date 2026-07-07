import express from 'express';
import { 
    createStudentProfile, 
    getStudentProfiles,
    getMyProfile, 
    updateStudentProfile,
    deleteStudentProfile,
    getAvailableStudents
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
  authorizeRoles("admin"),
  getStudentProfiles
);


// GET ONE
router.get(
  "/my-profile",
  protect,
  authorizeRoles("student"),
  getMyProfile
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

router.get(
"/available-users",
protect,
authorizeRoles("admin"),
getAvailableStudents
);

export default router;
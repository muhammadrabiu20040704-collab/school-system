import {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    archiveAnnouncement
} from '../controllers/announcementController.js';
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('admin'), createAnnouncement);
router.get('/', protect, authorizeRoles('admin'), getAnnouncements);
router.put('/:id', protect, authorizeRoles('admin'), updateAnnouncement);
router.put('/:id/archive', protect, authorizeRoles('admin'), archiveAnnouncement);

export default router;

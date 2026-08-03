import announcement from "../models/announcement.js";

export const createAnnouncement = async (req, res) => {
    try {

        const {
            title,
            message,
            targetType,
            department,
            level,
            year
        } = req.body;

        const existingDepartment = await Department.findById(department);

        if (!title || !message) {
            return res.status(400).json({
                message: "Title and message are required"
            });
        }

        // Validation
        if (targetType === "department" && !department) {
            return res.status(400).json({
                message: "Department is required"
            });
        }

        if (targetType === "level" && !level) {
            return res.status(400).json({
                message: "Level is required"
            });
        }

        if (targetType === "year" && !year) {
            return res.status(400).json({
                message: "Year is required"
            });
        }

        const announcement = await Announcement.create({
            title,
            message,
            targetType,
            department: department || null,
            level: level || null,
            year: year || null,
            createdBy: req.user._id
        });

        res.status(201).json({
            message: "Announcement created successfully",
            announcement
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//get all announcements
export const getAnnouncements = async (req, res) => {
    try {

        const announcements = await Announcement.find({
            isArchived: false
        })
        .populate("department", "name")
        .populate("level", "name")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });

        res.json(announcements);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//update announcement
export const updateAnnouncement = async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        }

        const {
            title,
            message,
            targetType,
            department,
            level,
            year
        } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                message: "Title and message are required"
            });
        }

        if (targetType === "department" && !department) {
            return res.status(400).json({
                message: "Department is required"
            });
        }

        if (targetType === "level" && !level) {
            return res.status(400).json({
                message: "Level is required"
            });
        }

        if (targetType === "year" && !year) {
            return res.status(400).json({
                message: "Year is required"
            });
        }

        announcement.title = title;
        announcement.message = message;
        announcement.targetType = targetType;

        announcement.department =
            targetType === "department"
                ? department
                : null;

        announcement.level =
            targetType === "level"
                ? level
                : null;

        announcement.year =
            targetType === "year"
                ? year
                : null;

        await announcement.save();

        res.json({
            message: "Announcement updated successfully",
            announcement
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//archive announcement
export const archiveAnnouncement = async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        }

        if (announcement.isArchived) {
            return res.status(400).json({
                message: "Announcement is already archived"
            });
        }

        announcement.isArchived = true;

        await announcement.save();

        res.json({
            message: "Announcement archived successfully",
            announcement
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
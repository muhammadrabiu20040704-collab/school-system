import Level from "../models/Level.js";

export const createLevel = async (req, res) => {
    try {

        const { name, order } = req.body;

        if (!name || !order) {
            return res.status(400).json({
                message: "Name and order are required"
            });
        }

        const existingLevel = await Level.findOne({
            $or: [
                { name },
                { order }
            ]
        });

        if (existingLevel) {
            return res.status(400).json({
                message: "Level already exists"
            });
        }

        const level = await Level.create({
            name,
            order
        });

        res.status(201).json({
            message: "Level created successfully",
            level
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//get all levels
export const getLevels = async (req, res) => {

    try {

        const levels = await Level.find()

            .sort({
                order: 1
            });

        res.json(levels);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

//update level
export const updateLevel = async (req, res) => {

    try {

        const level = await Level.findById(req.params.id);

        if (!level) {
            return res.status(404).json({
                message: "Level not found"
            });
        }

        const { name, order } = req.body;

        if (!name || !order) {
            return res.status(400).json({
                message: "Name and order are required"
            });
        }

        const existingLevel = await Level.findOne({
            $or: [
                { name },
                { order }
            ],
            _id: { $ne: req.params.id }
        });

        if (existingLevel) {
            return res.status(400).json({
                message: "Level already exists"
            });
        }

        level.name = name;
        level.order = order;

        await level.save();

        res.json({
            message: "Level updated successfully",
            level
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

//archive
export const archiveLevel = async (req, res) => {

    try {

        const level = await Level.findById(req.params.id);

        if (!level) {
            return res.status(404).json({
                message: "Level not found"
            });
        }

        if (level.isArchived) {
            return res.status(400).json({
                message: "Level is already archived"
            });
        }

        level.isArchived = true;
        level.isActive = false;

        await level.save();

        res.json({
            message: "Level archived successfully",
            level
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
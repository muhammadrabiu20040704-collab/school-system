import Semester from "../models/Semester";
import AcademicSession from "../models/AcademicSession.js";

// Create Semester (Admin only)
export const createSemester = async (req, res) => {
  try {
    const { name, academicSession } = req.body;

    const session = await AcademicSession.findById(academicSession);

if (!session) {
    return res.status(404).json({
        message: "Academic Session not found"
    });
}

    const existingSemester = await Semester.findOne({ name, academicSession });

    if (existingSemester) {
      return res.status(400).json({ message: "Semester already exists" });
    }

    const semester = new Semester({ name, academicSession });
    await semester.save();

    res.status(201).json({ message: "Semester created successfully", semester });
  } catch (error) {
    res.status(500).json({
    message: error.message
});
  }
};

//get all semesters
export const getSemesters = async (req, res) => {

    try {

        const semesters = await Semester.find()

            .populate(
                "academicSession",
                "session"
            )

            .sort({
                createdAt: -1
            });

        res.json(semesters);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// activate semester
export const activateSemester = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id);
        if (!semester) {
            return res.status(404).json({
                message: "Semester not found"
            });
        }
        if (semester.isArchived) {
    return res.status(400).json({
        message: "Archived semester cannot be activated"
    });
}
        await Semester.updateMany({academicSession: semester.academicSession}, { isActive: false });
        semester.isActive = true;
        await semester.save();
        res.json({ message: "Semester activated successfully", semester });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//semester update
export const updateSemester = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id);
        if (!semester) {
            return res.status(404).json({
                message: "Semester not found"
            });
        }
        const { name, academicSession } = req.body;

if (!name) {
    return res.status(400).json({
        message: "Name is required"
    });
}

if (academicSession) {
    const session = await AcademicSession.findById(academicSession);

    if (!session) {
        return res.status(404).json({
            message: "Academic Session not found"
        });
    }
}

     const existingSemester = await Semester.findOne({
    name,
    academicSession: academicSession || semester.academicSession,
    _id: { $ne: req.params.id }
});

if (existingSemester) {
    return res.status(400).json({
        message: "Semester already exists"
    });
}
   semester.name = name;

if (academicSession) {
    semester.academicSession = academicSession;
}

await semester.save();
        
       
        res.json({ message: "Semester updated successfully", semester });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//archive semester
export const archiveSemester = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id);

        if (!semester) {
            return res.status(404).json({
                message: "Semester not found"
            });
        }
       //already archived
        if (semester.isArchived) {
            return res.status(400).json({
                message: "Semester is already archived"
            });
        }
        //yes, archive
        semester.isArchived = true;
        semester.isActive = false;
        await semester.save();
        res.json({ message: "Semester archived successfully", semester });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

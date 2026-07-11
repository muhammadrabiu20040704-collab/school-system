import Course from "../models/Course.js";
import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";

export const getCourseStudents = async (req, res) => {

    try {

        const { courseId } = req.params;

        // Check if course belongs to lecturer
        const course = await Course.findOne({
            _id: courseId,
            lecturer: req.user.id
        }).populate(
            "department",
            "name code"
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Get all students in this department
        const profiles = await StudentProfile.find({
            department: course.department._id
        })
        .populate(
            "department",
            "name code"
        )
        .populate(
            "user",
            "name role"
        );

        const students = profiles.filter(profile => profile.user && profile.user.role === "student")
        
        .map(profile => ({

            student: profile.user,

           profile: {
    _id: profile._id,
    admissionNumber: profile.admissionNumber,
    level: profile.level,
    semester: profile.semester,
    department: profile.department
}

        }));

        res.json(students);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};
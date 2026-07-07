import StudentProfile from "../models/StudentProfile.js";
import Course from "../models/Course.js";

// GET LECTURER COURSES
export const getMyCourses = async(req, res) => {

    try {
        
        // courses assign to lecturer
        const courses = await Course.find({
            lecturer: req.user.id

        })
        .populate("department", "name code")
        .sort({ createdAt: -1 });

        const data = [];

        for (const course of courses) {
           const totalStudents = await StudentProfile.countDocuments({
  department: course.department._id
});

console.log("Department:", course.department.name);
console.log("Department ID:", course.department._id);
console.log("Total Students:", totalStudents);
            data.push({
             _id: course._id,
             title: course.title,
             code: course.code,
             department: course.department,
              totalStudents
        
            });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:error.message
        });
    }
};
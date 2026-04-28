import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// ENROLL STUDENT IN COURSE
export const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    // check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
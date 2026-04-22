import Course from "../models/Course.js";

// Create Course (Admin only)
export const createCourse = async (req, res) => {
  try {
    const { title, code, instructor } = req.body;

    const course = new Course({ title, code,});
    await course.save();

    res.json({
      message: "Course created",
      course
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COURSES
export const getCourses = async (req, res) => {
  const courses = await Course.find().populate("lecturer students");
  res.json(courses);
};

// ASSIGN LECTURER
export const assignLecturer = async (req, res) => {
  const { lecturerId } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  course.lecturer = lecturerId;
  await course.save();

  res.json({ message: "Lecturer assigned", course });
};

// ENROLL STUDENT
export const enrollStudent = async (req, res) => {
  const { studentId } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  course.students.push(studentId);
  await course.save();

  res.json({ message: "Student enrolled", course });
};
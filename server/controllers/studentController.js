import User from "../models/User.js";

// ✅ GET ALL STUDENTS (Admin only)
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE STUDENT
export const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;

    await student.save();

    res.json({
      message: "Student updated",
      student
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();

    res.json({ message: "Student deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Assignment from "../models/Assignment.js";

//create new assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, deadline } = req.body;

    if(!title || !description || !courseId) {
      return res.status(400).json({ message: "Title, description and courseId are required" });
    }

    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      lecturer: req.user.id,
      deadline
    });

    await assignment.save();

    res.json({
      message: "Assignment created",
      assignment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all assignments
export const getAssignments = async (req, res) => {
  try {
     const assignments = await Assignment.find()
    .populate("course lecturer");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};
//get assignments for the logged in student
export const getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({course: {$in: req.user.courses} })
    .populate("course");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
}
import Assignment from "../models/Assignment.js";
import StudentProfile from "../models/StudentProfile.js";

//create new assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, deadline, department, level, semester } = req.body;

    if(!title || !description || !courseId || !department || !level || !semester) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      lecturer: req.user.id,
      department,
      level,
      semester,
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


const assignments = await Assignment.find({

lecturer:req.user.id

})


.populate(
"course",
"title code"
)

.populate(
"department",
"name code"
);


res.json(assignments);



}catch(error){


res.status(500).json({

message:error.message

});


}

};

//get assignments for the logged in student
export const getMyAssignments = async (req, res) => {
  try {

    // get student profile
    const profile = await StudentProfile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    // find matching assignments
    const assignments = await Assignment.find({
      department: profile.department,
      level: profile.level,
      semester: profile.semester
    })
    .populate("course", "title code")
    .populate("lecturer", "name");

    res.json(assignments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE ASSIGNMENT
export const updateAssignment = async (req, res) => {
  try {

    // find assignment
    const assignment = await Assignment.findById(req.params.id);

   if(
assignment.lecturer.toString()
!== req.user.id
){

return res.status(403).json({

message:"Not your assignment"

});

}

    // update fields
    assignment.title =
      req.body.title || assignment.title;

    assignment.description =
      req.body.description || assignment.description;

    assignment.deadline =
      req.body.deadline || assignment.deadline;

    assignment.course =
      req.body.course || assignment.course;

      assignment.department =
      req.body.department || assignment.department;

      assignment.level =
      req.body.level || assignment.level;

      assignment.semester =
      req.body.semester || assignment.semester;

    // save
    await assignment.save();

    res.json({
      message: "Assignment updated successfully",
      assignment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
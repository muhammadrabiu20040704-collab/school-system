import Course from "../models/Course.js";

// Create Course (Admin only)
export const createCourse = async (req, res) => {
  try {
    const { title, code, department } = req.body;

    const existingCourse = await Course.findOne({ code });

    if (existingCourse) {
      return res.status(400).json({
        message: "Course already exists"
      });
    }

    const course = new Course({
      title,
      code,
      department
    });
    await course.save();

    res.json({
      message: "Course created successfully",
      course
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COURSES
export const getCourses = async (req, res) => {
  const courses = await Course.find()
  .populate("department", "name code")
  .populate("lecturer", "name email")
  .populate("students", "name email");
  res.json(courses);
};

// ASSIGN LECTURER
export const assignLecturer = async(req,res)=>{


try{


const {
lecturerId
}=req.body;



const course =
await Course.findById(req.params.id);



if(!course){

return res.status(404).json({

message:"Course not found"

});

}



course.lecturer = lecturerId;

await course.save();


const updatedCourse =
await Course.findById(course._id)
.populate(
"lecturer",
"name email"
);


res.json({

message:"Lecturer assigned",

course: updatedCourse

})

}catch(error){


res.status(500).json({

message:error.message

});


}


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

//update course (admin only)
export const updateCourse = async (req, res) => {
  try {

    const { title, code, department } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    course.title = title;
    course.code = code;
    course.department = department;

    await course.save();

    res.json({
      message: "Course updated successfully",
      course
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//delete course (admin only)
export const deleteCourse = async (req, res) => {

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found"
    });
  }

  await course.deleteOne();

  res.status(201).json({
    message: "Course deleted"
  });
};

// REMOVE LECTURER FROM COURSE

export const removeLecturer = async(req,res)=>{


try{


const course = await Course.findById(req.params.id);


if(!course){

return res.status(404).json({

message:"Course not found"

});

}



course.lecturer = null;


await course.save();



res.json({

message:"Lecturer removed",

course

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};
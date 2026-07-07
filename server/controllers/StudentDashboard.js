import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";



export const getStudentDashboard = async(req,res)=>{


try{


const student = await User.findById(req.user.id)
.select("-password");

const profile = await StudentProfile.findOne({

user:req.user.id

}).populate(

"department",

"name code"

);

if(!profile){

return res.status(404).json({

message:"Student profile not found"

});

}

const department = profile.department;

const totalStudents = await StudentProfile.countDocuments({

department: department._id

});

const courses = await Course.find({

department: department._id

})

.populate("lecturer","name email")

.populate("department","name code");

const assignments = await Assignment.find({

department: department._id,

level: profile.level,

semester: profile.semester

})

.populate("course","title code")

.populate("lecturer","name")

.sort({

createdAt:-1

});


const lecturers = courses.map(course=>({

lecturer:course.lecturer,

department:course.department,

course:{

_id:course._id,

title:course.title,

code:course.code

}

}));


// duk code ɗinka

const stats = {

totalStudents,

totalCourses: courses.length,

totalAssignments: assignments.length

};

res.json({

student,

profile,

department,

stats,

lecturers,

recentAssignments: assignments.slice(0,5)

});

}catch(error){

res.status(500).json({

message:error.message

});

}
};

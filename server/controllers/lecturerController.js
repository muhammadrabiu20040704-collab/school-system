import User from "../models/User.js";
import LecturerProfile from "../models/LecturerProfile.js";
import Course from "../models/Course.js";


// =====================================
// GET ALL LECTURERS WITH PROFILE
// =====================================

export const getLecturers = async (req, res) => {

try {

const lecturers = await User.find({
role: "lecturer"
})
.select("-password");


const data = await Promise.all(

lecturers.map(async (lecturer) => {

const profile = await LecturerProfile.findOne({

user: lecturer._id

})

.populate(
"departments",
"name code"
);


const courses = await Course.find({

lecturer: lecturer._id

})

.populate(
"department",
"name code"
)

.populate(
"students",
"name email"
);


return {

_id: lecturer._id,

name: lecturer.name,

email: lecturer.email,

role: lecturer.role,

profile,

courses

};

})

);

res.json(data);

} catch (error) {

res.status(500).json({

message: error.message

});

}

};


// =====================================
// CREATE PROFILE
// =====================================

export const createLecturerProfile = async (req, res) => {

try {

const {

userId,

departments,

staffId

} = req.body;


const user = await User.findById(userId);

if (!user || user.role !== "lecturer") {

return res.status(400).json({

message: "User is not lecturer"

});

}


const exist = await LecturerProfile.findOne({

$or: [

{ user: userId },

{ staffId }

]

});

if (exist) {

return res.status(400).json({

message: "Profile already exists"

});

}


const profile = new LecturerProfile({

user: userId,

departments,

staffId

});

await profile.save();

res.status(201).json({

message: "Lecturer profile created",

profile

});

} catch (error) {

res.status(500).json({

message: error.message

});

}

};


// =====================================
// GET PROFILE
// =====================================

export const getLecturerProfileById = async (req, res) => {

try {

const profile = await LecturerProfile.findOne({

user: req.params.id

})

.populate(

"user",

"name email"

)

.populate(

"departments",

"name code"

);

if (!profile) {

return res.status(404).json({

message: "Profile not found"

});

}

res.json(profile);

} catch (error) {

res.status(500).json({

message: error.message

});

}

};


// =====================================
// UPDATE USER
// =====================================

export const updateLecturer = async (req, res) => {

try {

const lecturer = await User.findById(req.params.id);

if (!lecturer || lecturer.role !== "lecturer") {

return res.status(404).json({

message: "Lecturer not found"

});

}

lecturer.name =
req.body.name || lecturer.name;

lecturer.email =
req.body.email || lecturer.email;

await lecturer.save();

res.json({

message: "Lecturer updated successfully",

lecturer: {

_id: lecturer._id,

name: lecturer.name,

email: lecturer.email,

role: lecturer.role

}

});

} catch (error) {

res.status(500).json({

message: error.message

});

}

};


// =====================================
// UPDATE PROFILE
// =====================================

export const updateLecturerProfile = async (req, res) => {

try {

const profile = await LecturerProfile.findById(req.params.id);

if (!profile) {

return res.status(404).json({

message: "Profile not found"

});

}

profile.departments =
req.body.departments || profile.departments;

profile.staffId =
req.body.staffId || profile.staffId;

await profile.save();

const updated = await LecturerProfile.findById(profile._id)

.populate(

"departments",

"name code"

);

res.json({

message: "Profile updated",

profile: updated

});

} catch (error) {

res.status(500).json({

message: error.message

});

}

};


// =====================================
// DELETE
// =====================================

export const deleteLecturer = async (req, res) => {

try {

const lecturer = await User.findById(req.params.id);

if (!lecturer || lecturer.role !== "lecturer") {

return res.status(404).json({

message: "Lecturer not found"

});

}

await LecturerProfile.deleteOne({

user: lecturer._id

});

await lecturer.deleteOne();

res.json({

message: "Lecturer deleted successfully"

});

} catch (error) {

res.status(500).json({

message: error.message

});

}

};


// =====================================
// DETAILS
// =====================================

export const getLecturerDetails = async (req, res) => {

try {

const lecturer = await User.findById(req.params.id)

.select("-password");

if (!lecturer) {

return res.status(404).json({

message: "Lecturer not found"

});

}

const profile = await LecturerProfile.findOne({

user: req.params.id

})

.populate(

"departments",

"name code"

);

const courses = await Course.find({

lecturer: req.params.id

})

.populate(

"department",

"name code"

)

.populate(

"students",

"name email"

);

res.json({

lecturer,

profile,

courses

});

} catch (error) {

console.log(error);

res.status(500).json({

message: error.message

});

}

};
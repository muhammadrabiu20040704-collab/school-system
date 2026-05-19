import StudentProfile from "../models/StudentProfile.js";

// create profile for student
export const createStudentProfile = async (req, res) => {
  try {
    const { admissionNumber, department, level, semester } = req.body;

    //user id from auth middleware
    const existingProfile = await StudentProfile.findOne({
      $or: [{ user: req.user._id }, { admissionNumber }]
    });
//check exicting profile
   if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists"
      });
    }
    //create profile
    const profile = new StudentProfile({
        user: req.user._id,
        admissionNumber,
        department,
        level,
        semester
    });
    //save profile
    await profile.save();
    res.status(201).json({
      message: "Profile created successfully",
      profile
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating profile",
      error: error.message
    });
  }
};

//get all student profiles
export const getStudentProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.find()
    .populate("user", "name email")
    .populate("department", "name code");

    res.json(profiles);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching student profiles",
      error: error.message
    });
  }
};

//update student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne(req.params.id);
    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });

    }
    profile.admissionNumber = 
    req.body.admissionNumber || profile.admissionNumber;

    profile.department =
    req.body.department || profile.department;

    profile.level =
    req.body.level || profile.level;

    profile.semester =
    req.body.semester || profile.semester;

    await profile.save();

    res.json({
        message: "Profile updated successfully",
        profile
    });
   } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//delete student profile
export const deleteStudentProfile = async (req, res) => {
  try {   
     const profile = await StudentProfile.findById(req.params.id);
    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }
        await profile.remove();
        res.json({ message: "Profile deleted successfully" });

    } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//get single student profile
export const getStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findById(req.params.id)
    .populate("user", "name email")
    .populate("department", "name code");

    //check if profile exists
    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
    } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ✅ GET ALL STUDENTS WITH PROFILE
export const getStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find()
      .populate("user", "name email role")
      .populate("department", "name code");

    res.json(students);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
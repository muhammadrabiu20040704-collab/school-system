import User from "../models/User.js";

// GET ALL USERS (ADMIN ONLY)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// MAKE ADMIN
export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({

message:"User is now admin",

user:{
 _id:user._id,
 name:user.name,
 email:user.email,
 role:user.role
}

});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// REMOVE ADMIN (BACK TO STUDENT)
export const removeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id === user._id.toString()) {
  return res.status(400).json({
    message: "You cannot remove yourself as admin"
  });
}

    user.role = "student";
    await user.save();

    res.json({ message: "Admin removed", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL LECTURERS
export const getLecturers = async (req,res)=>{
  try {

    const lecturers = await User.find({
      role:"lecturer"
    }).select("-password");


    res.json(lecturers);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};



// MAKE LECTURER

export const makeLecturer = async(req,res)=>{

 try {


  const user = await User.findById(req.params.id);


  if(!user){

    return res.status(404).json({
      message:"User not found"
    });

  }


  user.role="lecturer";

  await user.save();


  res.json({

message:"User is now lecturer",

user:{
 _id:user._id,
 name:user.name,
 email:user.email,
 role:user.role
}

});


 }catch(error){

  res.status(500).json({
    message:error.message
  });

 }


};




// REMOVE LECTURER

export const removeLecturer = async(req,res)=>{


try{


const user = await User.findById(req.params.id);


if(!user){

 return res.status(404).json({
  message:"User not found"
 });

}


user.role="student";


await user.save();



res.json({

message:"Lecturer removed",
user

});


}catch(error){


res.status(500).json({
 message:error.message
});


}



};

// creste students
export const createStudent = async(req, res)=>{
  try{
    const {
      name, email, password
    }=req.body;

    const existingUser =await User.findOne({email});

    if(existingUser) {
      return res.ststus(400).json({
        message:"User already exists"
      });
    }

    const student = new User({
      name,
      email,
      password,
      role:"student"
    });

    await student.save();

    res.status(201).json({
      message:"Student created successfully",
     
      student:{
        _id:student._id,
        name:student.name,
        eamil:student.email,
        role:student.role
      }
    });
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};

// GET USERS FOR ROLE MANAGEMENT

export const getRoleUsers = async(req,res)=>{

try{

const users = await User.find()
.select("-password");


res.json(users);


}catch(error){

res.status(500).json({
message:error.message
});

}

};
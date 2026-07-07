import Department from "../models/Department.js";
import Course from "../models/Course.js";

// CREATE
// CREATE
export const createDepartment = async (req, res) => {
  try {

    const { name, code } = req.body;


    if (!name || !code) {
      return res.status(400).json({
        message:"Name and code are required"
      });
    }


    const existingDepartment =
      await Department.findOne({
        $or:[
          {name},
          {code}
        ]
      });


    if(existingDepartment){

      return res.status(400).json({
        message:"Department already exists"
      });

    }


    const dept = new Department({
      name,
      code
    });


    await dept.save();


    res.status(201).json({

      message:"Department created",
      dept

    });



  } catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }
};

// GET ALL
export const getDepartments = async (req, res) => {
  const depts = await Department.find();
  res.json(depts);
};

// GET ONE
export const getDepartment = async (req, res) => {
  const dept = await Department.findById(req.params.id);

  if (!dept) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(dept);
};

// DELETE
export const deleteDepartment = async (req, res) => {
  const dept = await Department.findById(req.params.id);

  if (!dept) {
    return res.status(404).json({ message: "Not found" });
  }

  await dept.deleteOne();

  res.json({ message: "Deleted" });
};

//update
export const updateDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;
    const dept = await Department.findById(req.params.id);

    if (!dept) {
      return res.status(404).json({ message: "Not found" });
    }

    dept.name = name;
    dept.code = code;

    await dept.save();

    res.json({ message: "Updated", dept });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// view all couses
export const getDepartmentCourses = async (req, res) => {
  try {
    
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    } 
    const courses = await Course.find({ department: req.params.id });
    res.json({
      department,
      courses
  });

  } catch (error) {
     res.status(500).json({
      message: error.message
    });
  }
}
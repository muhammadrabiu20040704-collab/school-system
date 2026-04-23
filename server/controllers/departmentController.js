import Department from "../models/Department.js";

// CREATE
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const dept = new Department({ name });
    await dept.save();

    res.json({ message: "Department created", dept });

  } catch (error) {
    res.status(500).json({ message: error.message });
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
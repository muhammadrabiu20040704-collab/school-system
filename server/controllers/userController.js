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

    res.json({ message: "User is now admin", user });

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
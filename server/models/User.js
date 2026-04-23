import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  department: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Department"
},
  role: {
    type: String,
    enum: ["admin", "lecturer", "student"],
    default: "student"
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
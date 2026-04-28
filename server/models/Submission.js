import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    answer: String,

    score: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
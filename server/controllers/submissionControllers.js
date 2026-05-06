import { populate } from "dotenv";
import Submission from "../models/Submission.js";

export const createSubmissions = async (req, res) => {
  try { 
//check if user is authenticated and has the student role
     if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      })
     }
     //check if user has the student role
     if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit assignments" });
    }
    const { assignmentId, answer } = req.body;

    //prevent duplicate submission
    const existingSubmission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id
    });
    if (existingSubmission) {
      return res.status(400).json({
        message: "You have already submitted this assignment"
      });
    }

    //create new submission
    const submission = new Submission({
      assignment: assignmentId,
      student: req.user.id,
      answer
    });

    await submission.save();

    res.status(201).json({
        message:"submission successful",submission});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id }).populate("assignment");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};
//get single submission by id
export const gradeSubmission = async (req, res) => {
  try {
    // check lecturer
    if (req.user.role !== "lecturer") {
      return res.status(403).json({
        message: "Only lecturers can grade"
      });
    }

    const { id } = req.params;
    const { score, feedback } = req.body;

    const submission = await Submission.findById(id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    submission.score = score;
    submission.feedback = feedback;

    await submission.save();

    res.json({
      message: "Graded successfully",
      submission
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all submissions for admin
export const  getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
    .populate("student", "name email")
    .populate("assignment", "title");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get submission for a specific assignment for the logged in student
export const getSubmissionByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submission = await Submission.findOne({
       assignment: assignmentId, student: req.user.id })
       .populate("student" , "name email")
       .populate("assignment" , "title");

       res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get single submission by id
export const getSingleSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id)
    .populate("student", "name email")
    .populate("assignment", "title");
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get submission for lecturer to view all submissions for a specific assignment
export const getSubmissionForLecterer = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await Submission.find({ assignment: assignmentId })
    .populate("student", "name addmissionNumber ")
    .populate("assignment", "title")
     .populate({
      path: "assignment",
      match: { lecturer: req.user.id }
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get results
export const getResults = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id })
    .populate("student", "name addmissionNumber")
    .populate("assignment", "title score feedback")
    .sort({ score: -1 });
    const results = submissions.map(submission => ({
      student: submission.student.name,
      admissionNumber: submission.student.admissionNumber,
      assignment: submission.assignment.title,
      score: submission.assignment.score,
      feedback: submission.assignment.feedback
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

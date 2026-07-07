import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import StudentProfile from "../models/StudentProfile.js";


// ===============================
// CREATE SUBMISSION
// ===============================
export const createSubmission = async (req, res) => {
  try {

    // check authentication
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    // only students can submit
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can submit assignments"
      });
    }

    const { assignmentId, answer } = req.body;

    // check required fields
    if (!assignmentId || !answer) {
      return res.status(400).json({
        message: "Assignment ID and answer are required"
      });
    }

    // check assignment exists
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    // check deadline
    if (new Date() > assignment.deadline) {
      return res.status(400).json({
        message: "Deadline has passed"
      });
    }

    // get student profile
    const profile = await StudentProfile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    // check assignment belongs to student's class
    if (
      profile.department.toString() !==
      assignment.department.toString() ||

      profile.level !== assignment.level ||

      profile.semester !== assignment.semester
    ) {
      return res.status(403).json({
        message: "This assignment is not for your class"
      });
    }

    // prevent duplicate submission
    const existingSubmission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id
    });

    if (existingSubmission) {
      return res.status(400).json({
        message: "You have already submitted this assignment"
      });
    }

    // create submission
    const submission = new Submission({
      assignment: assignmentId,
      student: req.user.id,
      answer
    });

    await submission.save();

    res.status(201).json({
      message: "Submission successful",
      submission
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GET MY SUBMISSIONS
// ===============================
export const getSubmissions = async (req, res) => {
  try {

    const submissions = await Submission.find({
      student: req.user.id
    })
      .populate("assignment", "title deadline")
      .sort({ createdAt: -1 });

    res.json(submissions);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GET SINGLE SUBMISSION
// ===============================
export const getSingleSubmission = async (req, res) => {
  try {

    const submission = await Submission.findById(req.params.id)
      .populate("student", "name email")
      .populate("assignment", "title description");

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    res.json(submission);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GET SUBMISSION BY ASSIGNMENT
// ===============================
export const getSubmissionByAssignment = async (req, res) => {
  try {

    const { assignmentId } = req.params;

    const submission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id
    })
      .populate("student", "name email")
      .populate("assignment", "title");

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    res.json(submission);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GRADE SUBMISSION
// ===============================
export const gradeSubmission = async (req, res) => {
  try {

    // only lecturer
    if (req.user.role !== "lecturer") {
      return res.status(403).json({
        message: "Only lecturers can grade submissions"
      });
    }

    const { score, feedback } = req.body;

    // validate score
    if (score < 0 || score > 100) {
      return res.status(400).json({
        message: "Score must be between 0 and 100"
      });
    }

    // find submission
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    // check assignment
    const assignment = await Assignment.findById(
      submission.assignment
    );

    // security check
    if (
      assignment.lecturer.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized to grade this submission"
      });
    }

    // update grade
    submission.score = score;
    submission.feedback = feedback;

    await submission.save();

    res.json({
      message: "Submission graded successfully",
      submission
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GET ALL SUBMISSIONS (ADMIN)
// ===============================
export const getAllSubmissions = async (req, res) => {
  try {

    const submissions = await Submission.find()
      .populate("student", "name email")
      .populate("assignment", "title")
      .sort({ createdAt: -1 });

    res.json(submissions);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GET SUBMISSIONS FOR LECTURER
// ===============================
export const getSubmissionForLecturer = async (req, res) => {
  try {

    const { assignmentId } = req.params;

    const submissions = await Submission.find({
      assignment: assignmentId
    })
      .populate("student", "name email")
      .populate({
        path: "assignment",
        match: {
          lecturer: req.user.id
        },
        select: "title"
      });

    // remove unauthorized submissions
    const filtered = submissions.filter(
      submission => submission.assignment !== null
    );

    res.json(filtered);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ===============================
// GET STUDENT RESULTS
// ===============================
export const getResults = async (req, res) => {
  try {

    const submissions = await Submission.find({
      student: req.user.id
    })
      .populate("student", "name email")
      .populate("assignment", "title")
      .sort({ score: -1 });

    const results = submissions.map(submission => ({
      student: submission.student.name,

      assignment: submission.assignment.title,

      score: submission.score,

      feedback: submission.feedback
    }));

    res.json(results);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
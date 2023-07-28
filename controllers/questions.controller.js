const Questions = require("../models/question.model");
const Job = require("../models/job.model");
const Candidate = require("../models/candidate.model");

// get all questions given job ID
exports.getAllQuestions = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    let job = await Job.findOne({ _id: jobId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }

    let questions = await Questions.find({ jobId: jobId });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {}
};

// add a single question
exports.singleQuestion = async (req, res, next) => {
  try {
    const questionData = req.body;
    const newQuestion = await Questions.create(questionData);

    // Validate the question data
    const validationError = newQuestion.validateSync();
    if (validationError) {
      const validationErrors = Object.values(validationError.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ errors: validationErrors });
    }

    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      success: true,
      savedQuestion,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all questions given jobID
exports.allQuestions = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const questions = await Questions.find({ jobId: jobId });
    if (!questions) {
      return res.status(404).send("No Question Found");
    } else {
      console.log("All the questions are", questions);
      //returning response with status code and message
      return res.status(200).json({ success: true, data: questions });
    }
  } catch (error) {
    console.error("Error retrieving questions: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// remove question from job given jobID and question ID
exports.deleteQuestions = async (req, res, next) => {
  try {
    const jobId = req.params.JobId;
    const questionId = req.params.questionId;

    const question = await Questions.findOne({ _id: questionId, jobId: jobId });

    if (!question) {
      return res.status(404).json({
        error: "Question not found for the given job",
      });
    }

    await question.remove();

    res.status(200).json({
      success: true,
      message: "Question removed successfully",
    });
  } catch (error) {
    console.error("Error deleting a question", error);
    res.status(500).json({
      error: "Failed to delete question.",
    });
  }
};

// update a single question
exports.updateQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;

    let updateQuestionData = req.body;

    // Find the question with the given questionId
    let question = await Questions.findOne({ _id: questionId });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question = await Questions.findOneAndUpdate(
      { _id: questionId },
      { $set: updateQuestionData },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all candidates given job ID
exports.jobIDCandidates = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    let job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found!",
      });
    }

    const candidate = await Candidate.find({ jobId: jobId });

    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    console.error("Error retrieving candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

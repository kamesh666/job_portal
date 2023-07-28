const Questions = require("../models/question.model");

exports.singleQuestion = async (req, res, next) => {
  try {
    const data = req.body;
    const question = await Questions.create({
      title: data.title,
      subtitle: data.subtitle,
      isMandatory: data.isMandatory,
      answer: data.answer,
      dropdown: data.dropdown,
      maxLength: data.maxLength,
      minlength: data.minlength,
      jobId: data.jobId,
    });
    res.status(201).json({
      success: true,
      question,
    });
  } catch (error) {
    next(error.message);
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

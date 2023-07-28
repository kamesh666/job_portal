const Candidate = require("../models/candidate.model");
const Job = require("../models/job.model");
const ErrorResponse = require("../utils/errorResponse");

// get all jobs
exports.getAllJobs = async (req, res, next) => {
  try {
    const job = await Job.find();
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "no job found",
      });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error retrieving jobs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a single job
exports.addSingleJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    const saveJob = await job.save();
    res.status(201).json({
      success: true,
      saveJob,
    });
  } catch (error) {
    next(error.message);
  }
};

// update job by ID
exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    let job = await Job.findOne({ _id: jobId });
    console.log(job);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    job = await Job.findOneAndUpdate(
      { _id: jobId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error.message);
  }
};

// get single job by ID
exports.getSingleJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    let job = await Job.findOne({ _id: jobId });
    console.log(job);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// delete single job by ID
exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    let job = await Job.findOne(jobId);
    console.log(job);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    job = await Job.findOneAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error.message);
  }
};

// get all candidates given job ID
exports.candidatesID = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    let job = await Job.findOne({ _id: jobId });

    if (!job) {
      return res.status(404).json({
        error: "job not found",
      });
    }

    const candidates = await Candidate.find({ jobId: jobId });

    // Get an array of candidate IDs from the applications
    const candidateIds = candidates.map((app) => app.candidateID);

    // Find all candidates with the extracted candidate IDs
    const candidate = await Candidate.find({ _id: { $in: candidateIds } });

    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    console.error("Error retrieving candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Candidate = require("../models/candidate.model");
const Job = require("../models/job.model");

exports.allCandidates = async (req, res, next) => {
  try {
    const candidate = await Candidate.find();

    res.status(200).json({
      success: true,
      count: candidate.length,
      candidate,
    });
  } catch (error) {
    console.error("can't get all candidates", error.message);
  }
};

// Add a single candidate
exports.addCandidate = async (req, res) => {
  try {
    const candidateData = req.body;
    const newCandidate = await Candidate.create(candidateData);
    // Save the new candidate to the database
    const savedCandidate = await newCandidate.save();
    res.status(201).json({
      success: true,
      savedCandidate,
    });
  } catch (error) {
    console.error("Error adding candidate:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update candidate by ID
exports.updateCandidate = async (req, res, next) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findOne({ _id: candidateId });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "candidate not found",
      });
    }
    candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    next(error.message);
  }
};

// get single candidate by ID
exports.getSingleCandidate = async (req, res, next) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findOne({ _id: candidateId });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "candidate not found",
      });
    }

    res.status(201).json({
      success: true,
      candidateId,
    });
  } catch (error) {
    next(error);
  }
};

// delete candidate by id
exports.deleteCandidate = async (req, res, next) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findOne({ _id: candidateId });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "candidate not found",
      });
    }
    candidate = await Candidate.findByIdAndDelete(candidateId);
    res.status(200).json({
      success: true,
      candidate,
      message: `${req.params.id} successfully deleted`,
    });
  } catch (error) {
    console.error("Error deleting candidate:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all candidates given job id
exports.jobCandidates = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    // find the job with the given jobID
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res.status(404).json({
        error: "job not found",
      });
    }

    const candidate = await Candidate.find({ jobId: jobId });
    console.log("candidates", candidate);

    // Get an array of candidate IDs from the candidate

    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (err) {
    console.error("Error retrieving candidates:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

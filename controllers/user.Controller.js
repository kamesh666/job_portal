const User = require("../models/auth.models");
const ErrorResponse = require("../utils/errorResponse");
const JobModel = require("../models/job.model");

// view my jobs
exports.myJobs = async (req, res, next) => {
  const adminId = req.params.adminId;
  const adminJob = await User.findOne({ _id: adminId });

  if (!adminJob) {
    return res.status(404).json({
      message: false,
      error: "job not found",
    });
  }

  const jobs = await JobModel.find({ addedBy: adminId });

  res.status(200).json({
    success: true,
    jobs,
  });
};

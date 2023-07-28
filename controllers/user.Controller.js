const User = require("../models/auth.models");
const ErrorResponse = require("../utils/errorResponse");
const JobModel = require("../models/job.model");

// get all users
exports.allUsers = async (req, res, next) => {
  // enable pagination
  const pageSize = 10;
  const page = Number(req.query.PageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

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

const User = require("../models/auth.models");
const ErrorResponse = require("../utils/errorResponse");
const Job = require("../models/job.model");

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
  console.log(req.user.id);
  const myJobs = await Job.find({ user: req.user.id });

  if (!myJobs) {
    return next(`job not found with thid ID ${req.user.id}`);
  }

  res.status(200).json({
    success: true,
    myJobs,
  });
};

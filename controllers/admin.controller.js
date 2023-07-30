const Admin = require("../models/admin.models");
const Job = require("../models/job.model");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await Admin.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("Email already registed", 400));
  }

  try {
    const user = await Admin.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error.message);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next(new ErrorResponse("please add an email", 403));
    }

    if (!password) {
      return next(new ErrorResponse("please add an password", 403));
    }

    // check user email
    const user = await Admin.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    // check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, token, user });
};

// logout
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

// user profile
exports.UserProfile = async (req, res, next) => {
  const user = await Admin.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
};

exports.getAllJobsByAdmin = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const jobs = await Job.find({ addedBy: adminId });

    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs added or jobs not found",
      });
    }

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error ${error.message}`,
    });
  }
};

// Add a new job
exports.addNewJob = async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      dateOfCreation,
      isActive,
      lastDate,
      totalCandidates,
    } = req.body;

    const newJob = new Job({
      title,
      subtitle,
      dateOfCreation,
      isActive,
      lastDate,
      totalCandidates,
      addedBy: req.user.id, // Assuming you have the adminId from authentication
    });
    const saveJob = await newJob.save();
    res.status(201).json({
      success: true,
      message: "New job listing added successfully",
      job: saveJob,
    });
  } catch (error) {
    next(error.message);
  }
};

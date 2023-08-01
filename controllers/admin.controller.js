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

    let saveUser = await user.save();

    res.status(201).json({
      success: true,
      saveUser,
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
    const adminId = await Admin.findById(req.adminId);
    console.log(adminId);
    const jobs = await Job.find({ addedBy: adminId });

    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs added or jobs not found",
      });
    }

    // const jobData = jobs.map((job) => {
    //   return {
    //     jobId: job.jobId,
    //     dateOfCreation: job.dateOfCreation,
    //     isActive: job.isActive,
    //     questions: job.questions,
    //     lastDate: job.lastDate,
    //     totalCandidates: job.totalCandidates,
    //   };
    // });

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
    const { dateOfCreation, isActive, questions, lastDate, totalCandidates } =
      req.body;

    const currentUser = await Admin.findById(req.adminId);

    const newJob = new Job({
      dateOfCreation,
      isActive,
      questions,
      lastDate,
      totalCandidates,
      addedBy: currentUser, // Assuming you have the adminId from authentication
    });

    console.log({ newJob: newJob });

    let saveJob = await newJob.save();
    console.log({ saveJob: saveJob });

    res.status(201).json({
      success: true,
      message: "New job listing added successfully",
      job: saveJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding job" + error.message,
    });
  }
};

// Update an existing job by id
exports.updateExistingJobById = async (req, res, next) => {
  const jobId = req.params.jobId;
  const { dateOfCreation, isActive, questions, lastDate, totalCandidates } =
    req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send("No such job exists");
    } else {
      Object.assign(job, {
        dateOfCreation: dateOfCreation || job.dateOfCreation,
        isActive: isActive || job.isActive,
        questions: questions || job.questions,
        lastDate: lastDate || job.lastDate,
        totalCandidates: totalCandidates || job.totalCandidates,
      });
      let updated_job = await job.save();
      return res.status(200).json({
        success: true,
        data: { updated_job },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

// DELETE /api/admin/jobs/:jobId
exports.deleteJobById = async (req, res, next) => {
  const jobId = req.params.jobId;
  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "job not found" });
    }
    // delete the job from database
    await Job.findByIdAndDelete(jobId);

    console.log("deleted");
    return res
      .status(200)
      .json({ success: true, data: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};

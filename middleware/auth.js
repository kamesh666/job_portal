const jwt = require("jsonwebtoken");
const User = require("../models/auth.models");
const ErrorResponse = require("../utils/errorResponse");

// check is user authenticated

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Please login to use this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Please login to use this route", 401));
  }
};

// admin middleware
// exports.isAdmin = (req, res, next) => {
//   if (req.user.role === "Candidate") {
//     return next(new ErrorResponse("Access denied, you must an admin", 401));
//   }
//   next();
// };

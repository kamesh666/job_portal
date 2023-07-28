const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  signup,
  signin,
  logout,
  UserProfile,
} = require("../controllers/auth.controller");
const { myJobs } = require("../controllers/user.Controller");

// auth routes
// api/auth/signup
router.post("/signup", signup);
// api/auth/signin
router.post("/signin", signin);
// api/auth/logout
router.get("/logout", logout);
// api/auth/profile
router.get("/profile", isAuthenticated, UserProfile);
router.get("/myjob", isAuthenticated, myJobs);
module.exports = router;

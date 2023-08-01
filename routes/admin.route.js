const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  signup,
  signin,
  logout,
  UserProfile,
  getAllJobsByAdmin,
  addNewJob,
  updateExistingJobById,
  deleteJobById,
} = require("../controllers/admin.controller");

// auth routes
// api/auth/signup
router.post("/signup", signup);
// api/auth/signin
router.post("/signin", signin);
// api/auth/logout
router.get("/logout", logout);
// api/auth/profile
router.get("/profile", isAuthenticated, UserProfile);
// api/admin/jobs
router.post("/jobs/new", isAuthenticated, addNewJob);
router.get("/jobs", isAuthenticated, getAllJobsByAdmin);
router.put("/jobs/:jobId", isAuthenticated, updateExistingJobById);
router.delete("/jobs/:jobId", isAuthenticated, deleteJobById);
module.exports = router;

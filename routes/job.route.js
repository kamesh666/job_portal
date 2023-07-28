const router = require("express").Router();
const {
  getAllJobs,
  addSingleJob,
  updateJob,
  getSingleJob,
  candidatesID,
  deleteJob,
} = require("../controllers/job.controller");
const { isAuthenticated } = require("../middleware/auth");

router.get("/all", isAuthenticated, getAllJobs);
router.post("/new", isAuthenticated, addSingleJob);
router.put("/:jobId", isAuthenticated, updateJob);
router.get("/:jobId", isAuthenticated, getSingleJob);
router.get("/candidate/:jobId", isAuthenticated, candidatesID);
router.delete("/:jobId", isAuthenticated, deleteJob);

module.exports = router;

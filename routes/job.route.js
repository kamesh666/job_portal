const router = require("express").Router();
const {
  getAllJobs,
  addSingleJob,
  updateJob,
  getSingleJob,
  candidatesID,
} = require("../controllers/job.controller");
const { isAuthenticated } = require("../middleware/auth");

router.get("/all", isAuthenticated, getAllJobs);
router.post("/new", isAuthenticated, addSingleJob);
router.put("/:jobId", isAuthenticated, updateJob);
router.get("/:id", isAuthenticated, getSingleJob);
router.get("/candidate/:jobId", isAuthenticated, candidatesID);

module.exports = router;

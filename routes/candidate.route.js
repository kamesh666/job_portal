const router = require("express").Router();
const {
  allCandidates,
  updateCandidate,
  addCandidate,
  getSingleCandidate,
  deleteCandidate,
  jobCandidates,
} = require("../controllers/candidate.controller");
const { isAuthenticated } = require("../middleware/auth");

router.get("/all", isAuthenticated, allCandidates);
router.put("/update/:id", isAuthenticated, updateCandidate);
router.post("/add", isAuthenticated, addCandidate);
router.get("/:id", isAuthenticated, getSingleCandidate);
router.delete("/:id", isAuthenticated, deleteCandidate);
router.get("/jobId", jobCandidates);

module.exports = router;

const router = require("express").Router();
const {
  singleQuestion,
  allQuestions,
  deleteQuestions,
  updateQuestion,
  jobIDCandidates,
} = require("../controllers/questions.controller");
const { isAuthenticated } = require("../middleware/auth");

router.get("/:jobId", isAuthenticated, allQuestions);
router.post("/add", isAuthenticated, singleQuestion);
router.delete("/:jobId/:questionId", deleteQuestions);
router.put("/update/:questionId", isAuthenticated, updateQuestion);
router.get("/jobId/:jobId", isAuthenticated, jobIDCandidates);

module.exports = router;

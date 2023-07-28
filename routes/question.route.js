const router = require("express").Router();
const {
  singleQuestion,
  allQuestions,
  deleteQuestions,
} = require("../controllers/questions.controller");
const { isAuthenticated } = require("../middleware/auth");

router.post("/add", isAuthenticated, singleQuestion);
router.get("/:jobId", allQuestions);
router.delete("/:jobId/:questionId", deleteQuestions);

module.exports = router;

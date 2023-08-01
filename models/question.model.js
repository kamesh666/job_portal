const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionTitle: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  isMandatory: {
    type: Boolean,
    required: true,
  },
  answerType: {
    type: String,
    enum: ["text", "textarea", "radio", "checkbox", "file"],
    required: true,
  },
  dropdownOptions: {
    type: [String],
  },
  max: Number,
  min: Number,
  validation: { type: String, required: false },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    auto: true,
  },
});

module.exports = mongoose.model("Questions", questionSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
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
  max: {
    type: Number,
  },
  min: {
    type: Number,
  },
  validation: { type: String, required: false },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
});

module.exports = mongoose.model("Questions", questionSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  isMandatory: {
    type: Boolean,
    default: false,
  },
  answerType: {
    type: String,
    enum: ["text", "textarea", "radio", "checkbox", "file"],
    required: true,
  },
  dropdown: {
    type: [String],
  },
  maxLength: {
    type: Number,
    default: 50,
  },
  minLength: {
    type: Number,
    default: 20,
  },
  validation: { type: String, required: false },
  jobId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Job",
    required: true,
  },
});

module.exports = mongoose.model("Questions", questionSchema);

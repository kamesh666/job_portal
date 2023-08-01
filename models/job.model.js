const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  dateOfCreation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  questions: [
    {
      questionTitle: {
        type: String,
        required: true,
      },
      subtitle: String,
      answerType: {
        type: String,
        required: true,
      },
      isMandatory: {
        type: Boolean,
        required: true,
      },
      dropdownOptions: [String],
      max: Number,
      min: Number,
      validation: String,
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
      },
    },
  ],
  lastDate: {
    type: Date,
    required: true,
  },
  totalCandidates: {
    type: Number,
    required: true,
    default: 0,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);

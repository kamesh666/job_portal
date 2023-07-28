const mongoose = require("mongoose");
const jobModel = require("../models/job.model");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
    maxlength: 30,
  },
  age: {
    type: Number,
    required: [true, "Please enter the age"],
    maxlength: 2,
  },
  jobId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Job",
  },
  answers: {
    type: Map,
    of: String,
  },
  isShortlisted: {
    type: Boolean,
    default: false,
  },
  dateOfSubmission: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);

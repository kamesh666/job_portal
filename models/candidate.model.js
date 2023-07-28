const mongoose = require("mongoose");
const jobModel = require("../models/job.model");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfSubmission: {
    type: Date,
    required: true,
    default: Date.now,
  },
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
    required: true,
  },
  answers: {
    type: Map,
    of: String,
  },
  shortlisted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);

const mongoose = require("mongoose");
const Candidate = require("../models/candidate.model");
const Questions = require("../models/question.model");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfCreation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  questions: {
    type: mongoose.SchemaType.ObjectId,
    ref: "Questions",
  },
  lastDate: {
    type: Date,
    required: true,
  },
  totalCandidates: {
    type: Number,
    default: 0,
  },
  addedBy: {
    type: mongoose.SchemaType.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);

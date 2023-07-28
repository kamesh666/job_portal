// const candidate = require("../data/candidate.json");
// const Candidate = require("../models/candidate.model");
require("dotenv").config();
const { mongoDB } = require("../mongodb");
const question = require("../data/question.json");
const Questions = require("../models/question.model");

const seeder = async () => {
  try {
    mongoDB();
    await Questions.deleteMany();
    console.log(`candidate deleted successfully`);
    await Questions.insertMany(question);
    console.log("candidate added successfully");
  } catch (error) {
    console.log(error.message);
  }
};

seeder();

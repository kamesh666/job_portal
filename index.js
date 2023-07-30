const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { mongoDB } = require("./mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// import routes
const authRoutes = require("./routes/auth.route");
const candidateRoutes = require("./routes/candidate.route");
const jobRoutes = require("./routes/job.route");
const questionRoutes = require("./routes/question.route");

const app = express();

// mongodb connection
mongoDB();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use("/auth", authRoutes);
app.use("/candidate", candidateRoutes);
app.use("/job", jobRoutes);
app.use("/question", questionRoutes);

// error Middleware
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("This is job portal backend application server");
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

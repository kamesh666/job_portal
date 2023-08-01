const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { mongoDB } = require("./mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// import routes
const adminRoutes = require("./routes/admin.route");
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
app.use("/api/admin", adminRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/questions", questionRoutes);

// error Middleware
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("This is job portal backend application server");
  res.send(
    "View the code please check https://github.com/kamesh666/job_portal"
  );
});
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

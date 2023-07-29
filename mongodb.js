const mongoose = require("mongoose");

function mongoDB() {
  const mongouri =
    "mongodb+srv://kamesh:kamesh@cluster0.xelm3mq.mongodb.net/?retryWrites=true&w=majority";
  mongoose
    .connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.error(`mongodb error : ${err}`);
    });
}

module.exports = { mongoDB };

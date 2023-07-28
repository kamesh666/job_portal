const mongoose = require("mongoose");

function mongoDB() {
  const mongouri = process.env.MONGO_URI;
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

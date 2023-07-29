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

  mongoose.connection.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // You can add any custom error handling or logging here.
  });
}

module.exports = { mongoDB };

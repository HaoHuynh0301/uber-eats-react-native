const mongoose = require("mongoose");

const connectMongoose = (url) => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  }
  mongoose.connect(url, mongooseOptions);
};

module.exports = { connectMongoose };
const mongoose = require("mongoose");

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB has connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;

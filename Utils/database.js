//connect to mongodb database
const mongoose = require("mongoose");
const colors = require("colors");
/*Mongodb url */
const URL = "mongodb://127.0.0.1:27017/client";

const connectDb = async () => {
  try {
    await mongoose.connect(
      URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error)
          throw error;
        console.log("Mongo DB connected".yellow.inverse);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;

//connect to mongodb database
const mongoose = require("mongoose");
const colors = require("colors");
/*Mongodb url */
const URL = process.env.MONGODB_URL;

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
        console.log("Mongo DB connected".yellow.inverse);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;

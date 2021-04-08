const express = require("express");
require("colors");
require("dotenv").config();
const connectDb = require("./Utils/database");

const app = express();
connectDb(); //Connect to local database
const mysql = require("./Utils/Database2").pool;

/*Middleware function to use request.body */
app.use(express.json());

//Routes
const admin = require("./Routes/Admin");
const Group = require("./Routes/Group");
const Module = require("./Routes/Module");
const company = require("./Routes/Company");
const field = require("./Routes/Field");


//Connect to the routes
app.use("/api/v1/", admin);
app.use("/api/v1/", Group);
app.use("/api/v1/", Module);
app.use("/api/v1/", company);
app.use("/api/v1/", field);

//Listen to port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at post ${process.env.PORT}`.green.inverse);
});

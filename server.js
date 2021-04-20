const express = require("express");
require("colors");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./Utils/database");

const app = express();
connectDb(); //Connect to local database
const mysql = require("./Utils/Database2").pool;

/*Middleware function to use request.body */
app.use(express.json());
app.use(cors());
//Routes
const admin = require("./Routes/Admin");
const Group = require("./Routes/Group");
const Module = require("./Routes/Module");
const company = require("./Routes/Company");
const field = require("./Routes/Field");
const person = require("./Routes/Person");
const query = require("./Routes/Query");

//Connect to the routes
app.use("/api/v1/", admin);
app.use("/api/v1/", Group);
app.use("/api/v1/", Module);
app.use("/api/v1/", company);
app.use("/api/v1/", field);
app.use("/api/v1/", person);
app.use("/api/v1/", query);

//Listen to port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at post ${process.env.PORT}`.green.inverse);
});

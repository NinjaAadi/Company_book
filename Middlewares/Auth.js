const Admin = require("../Models/Admin");
const { matchpass } = require("../Helper/Encrypter");

//Function to validate while the user is registering
exports.auth = async (req, res, next) => {
  try {
    console.log("Authorization function running...");
    const { name, email, password, adminpass } = req.body;
    console.log(adminpass);
    const error = [];

    //Validate the credentials
    if (name === null || name.length == 0) {
      error.push("Please add a valid name");
    }
    if (
      email != null &&
      !email.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
      )
    ) {
      error.push("Please add a valid email address");
    }
    if (password.length < 6) {
      error.push("Please enter a valid password");
    }
    if (adminpass != "123") {
      error.push("Invalid admin password");
    }

    if (error.length > 0) {
      return res.status(400).json({
        error,
      });
    }
    next();
  } catch (error) { }
};

//Function to validate while the user is performing a login
exports.loginauth = async (req, res, next) => {
  try {
    console.log("Login authorization running...");
    const { email, password } = req.body;
    const error = [];
    if (
      email != null &&
      !email.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
      )
    ) {
      error.push("Invalid email");
      return res.status(400).json({
        error,
      });
    }
    //Check if user exist or not
    const user = await Admin.findOne({ email });
    if (!user) {
      error.push("Can't Find User");
      return res.status(400).json({
        error,
      });
    }
    if (!(await matchpass(password, user.password))) {
      console.log(password);
      console.log(user.password);
      error.push("Password Did Not Matched");
      return res.status(400).json({
        error,
      });
    }
    req.user = {
      name: user.name,
      email,
    };
    next();
  } catch (error) {
    console.log("error in login auth", error);
  }
};

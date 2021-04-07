//middleware to check if the person hitting the route is valid or not
const Admin = require("../Models/Admin");
const { matchpass } = require("../Helper/Encrypter");

//function to check if the user details are valid or not
const check = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    const errors = [];
    if (!user) {
      errors.push("User not fount");
      return res.status(400).json({
        errors,
      });
    }
    if ((await matchpass(password, user.password)) == false) {
      errors.push("User not fount");
      return res.status(400).json({
        errors,
      });
    }
    next();
  } catch (error) {
    if (error) {
      console.log("error detected in validator middleware", error);
    }
  }
};

module.exports = check;

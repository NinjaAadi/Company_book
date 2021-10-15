const Admin = require("../Models/Admin"); // Admin model
const { hash } = require("../Helper/Encrypter");
var mongooseDynamic = require("mongoose-dynamic-schemas");

/*
@desc : Register a user
@route : user/createuser
@access : private
*/
exports.createuser = async (req, res, next) => {
  try {
    console.log("Createuser function running...".green);

    //Hash the password
    req.body.password = await hash(req.body.password);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      others: req.body.others,
    };

    //Create the user
    await Admin.create(user);
    console.log("User created successfully...");
    return res.status(200).json({
      message: "User registered successfully!",
      user: user,
    });
  } catch (error) {
    console.log("Error in createuser function : ");
    console.log(error);
    next();
  }
};
/*
@desc : Login a user
@route : /users/login
@access : private
*/
exports.loginuser = async (req, res, next) => {
  try {
    console.log("Login process running...".green);
    res.status(200).json({
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.log("Error in loginuser function ", error);
    res.status(400).json({});
  }
};
/*
@desc : Delete a user
@route : /users/delete
@access : private
*/
exports.deleteuser = async (req, res, next) => {
  try {
    console.log("Delete user function running...".red);
    const { userid, adminpass } = req.body;
    if (adminpass != "123") {
      return res.status(400).json({
        message: "Not authorized to delete a user",
      });
    }
    try {
      await Admin.findOneAndDelete({ _id: userid });
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log("Error in deleting user", error);
      return res.status(400).json({
        message: "User not found or error in deleting the user",
      });
    }
  } catch (error) { }
};
/*
@desc : Get all users
@route : /users/getallusers
@access : public
*/
exports.getallusers = async (req, res, next) => {
  try {
    console.log("Fetching all admins list from the database".green);
    const admins = await Admin.find();
    return res.status(200).json({
      admins,
    });
  } catch (error) {
    return res.status(400);
  }
};

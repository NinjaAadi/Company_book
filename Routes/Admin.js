const {
  createuser,
  loginuser,
  deleteuser,
  getallusers,
} = require("../Controllers/Admin");
const { auth, loginauth } = require("../Middlewares/Auth.js");
const express = require("express");

/*Use Routes */
const router = express.Router();

router.route("/users/register").post(auth, createuser);
router.route("/users/login").get(loginauth, loginuser);
router.route("/users/delete").delete(deleteuser);
router.route("/users/getallusers").get(getallusers);

module.exports = router;

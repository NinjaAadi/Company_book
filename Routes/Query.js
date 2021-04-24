const express = require("express");
const validator = require("../Middlewares/Validuser");

const router = express.Router();
const {
  getgroupedcompanies,
  getfirstname,
  getallnames,
} = require("../Controllers/Query");
router.route("/query/groups").post(validator, getgroupedcompanies);
router.route("/query/getcompanybasedonfirstname").post(validator, getfirstname);
router.route("/query/getcompanybasedonname").post(validator, getallnames);

module.exports = router;

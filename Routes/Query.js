const express = require("express");
const validator = require("../Middlewares/Validuser");

const router = express.Router();
const {
  getgroupedcompanies,
  getfirstname,
  getallnames,
} = require("../Controllers/Query");
router.route("/query/groups").get(validator, getgroupedcompanies);
router.route("/query/getcompanybasedonfirstname").get(validator, getfirstname);
router.route("/query/getcompanybasedonname").get(validator, getallnames);

module.exports = router;

const express = require("express");
const validator = require("../Middlewares/Validuser");
const router = express.Router();
const {
  createcompany,
  deletecompany,
  getallcompanies,
} = require("../Controllers/Company");


router.route("/company/createcompany").post(validator, createcompany);
router.route("/company/deletecompany").delete(validator, deletecompany);
router.route("/company/getallcompanies").get(validator, getallcompanies);

module.exports = router;

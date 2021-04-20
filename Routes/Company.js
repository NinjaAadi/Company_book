const express = require("express");
const validator = require("../Middlewares/Validuser");
const router = express.Router();
const {
  createcompany,
  deletecompany,
  getallcompanies,
  editcompany,
} = require("../Controllers/Company");

router.route("/company/createcompany").post(validator, createcompany);
router.route("/company/editcompany").post(validator, editcompany);
router.route("/company/deletecompany").delete(validator, deletecompany);
router.route("/company/getallcompanies").post(validator, getallcompanies);

module.exports = router;

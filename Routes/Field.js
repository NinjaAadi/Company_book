const express = require("express");
const validator = require("../Middlewares/Validuser");
const {
  createfield,
  editfields,
  getallfields,
  deletefield,
} = require("../Controllers/Field");
const router = express.Router();

router.route("/field/createfield").post(validator, createfield);
router.route("/field/deletefield").post(validator, deletefield);
router.route("/field/editfield").post(validator, editfields);
router.route("/field/getallfields").post(validator, getallfields);

module.exports = router;

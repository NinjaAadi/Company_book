const express = require("express");
const validator = require("../Middlewares/Validuser");
const {
  createperson,
  deleteperson,
  editperson,
  getallperson,
} = require("../Controllers/Person");
const router = express.Router();

router.route("/person/createperson").post(validator, createperson);
router.route("/person/deleteperson").post(validator, deleteperson);
router.route("/person/editperson").post(validator, editperson);
router.route("/person/getallperson").post(validator, getallperson);

module.exports = router;

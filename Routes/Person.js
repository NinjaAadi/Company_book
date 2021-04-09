const express = require("express");
const validator = require("../Middlewares/Validuser");
const {
  createperson,
  deleteperson,
  editperson,
} = require("../Controllers/Person");
const router = express.Router();

router.route("/person/createperson").post(validator, createperson);
router.route("/person/deleteperson").delete(validator, deleteperson);
router.route("/person/editperson").post(validator, editperson);



module.exports = router;

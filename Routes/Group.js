const express = require("express");
const router = express.Router();
const validator = require("../Middlewares/Validuser");
const {
  creategroup,
  deletegroup,
  editgroup,
  getallgroup,
} = require("../Controllers/Group");

router.route("/groups/creategroup").post(validator, creategroup);
router.route("/groups/editgroup").post(validator, editgroup);
router.route("/groups/deletegroup").post(validator, deletegroup);
router.route("/groups/getallgroups").post(validator, getallgroup);

module.exports = router;

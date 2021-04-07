const express = require("express");
const validator = require("../Middlewares/Validuser");
const router = express.Router();
const {
  createmodule,
  deletemodule,
  editmodule,
  getallmodule,
} = require("../Controllers/Module");

router.route("/module/createmodule").post(validator, createmodule);
router.route("/module/deletemodule").delete(validator, deletemodule);
router.route("/module/editmodule").post(validator, editmodule);
router.route("/module/getallmodules").get(validator, getallmodule);

module.exports = router;

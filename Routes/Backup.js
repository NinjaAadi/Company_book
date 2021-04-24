const express = require("express");
const validator = require("../Middlewares/Validuser");
const router = express.Router();
const { backup, restore } = require("../Controllers/Backup.js");

router.route("/backup").post(backup);
router.route("/restore").post(restore);

module.exports = router;

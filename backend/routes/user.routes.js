const express = require("express");
const { updateVoicePreference } = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.put("/voice", protect, updateVoicePreference);

module.exports = router;

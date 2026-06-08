const express = require("express");
const { getBookmarks, toggleBookmark } = require("../controllers/bookmarks.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", protect, getBookmarks);
router.post("/toggle", protect, toggleBookmark);

module.exports = router;

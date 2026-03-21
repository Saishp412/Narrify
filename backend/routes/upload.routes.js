const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadPDF } = require("../controllers/upload.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    // Save with timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/upload/pdf
router.post("/pdf", protect, upload.single("pdf"), uploadPDF);

module.exports = router;

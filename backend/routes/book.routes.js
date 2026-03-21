const express = require("express")
const router = express.Router()
const multer = require("multer")
const { uploadPDF } = require("../controllers/upload.controller")
const authMiddleware = require("../middlewares/auth.middleware")

// Multer config (temporary local upload)
const upload = multer({ dest: "uploads/" })

// 📌 Upload PDF → Convert to Audiobook
router.post(
  "/upload-pdf",
  authMiddleware,
  upload.single("pdf"),
  uploadPDF
)

module.exports = router

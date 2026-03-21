const express = require("express");
const router = express.Router();
const Audio = require("../models/Audio.model");
const { textToSpeech } = require("../services/tts.service");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { audioId } = req.body;

    if (!audioId) {
      return res.status(400).json({ message: "audioId required" });
    }

    const audio = await Audio.findOne({
      _id: audioId,
      user: req.user._id,
    });

    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }

    const audioUrl = await textToSpeech(
      audio.pdfName,
      audio.user.toString(),
      audio.voiceId
    );

    audio.audioUrl = audioUrl;
    await audio.save();

    res.json({
      success: true,
      audioUrl,
    });
  } catch (error) {
    console.error("TTS error:", error.message);
    res.status(500).json({
      message: "Audio generation failed",
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const Audio = require("../models/Audio.model");
const {testToSpeech} = require("../services/tts.service");

/**
 * @route   GET /api/audio/my-library
 * @desc    Fetch all audiobooks of the logged-in user
 * @access  Private
 */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { text, title, pdfName, voiceId } = req.body;

    if (!text || !title || !pdfName) {
      return res.status(400).json({ message: "text, title, pdfName are required" });
    }

    // Generate audio using TTS
    const audioUrl = await textToSpeech(text, req.user._id, voiceId);

    // Save audiobook in DB
    const audio = await Audio.create({
      user: req.user._id,
      title,
      pdfName,
      audioUrl,
      voiceId: voiceId || "default",
      voiceMeta: { name: "Custom", accent: "US", tone: "Neutral" },
    });

    return res.json({ success: true, audio });
  } catch (error) {
    console.error("Generate audio error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to generate audio" });
  }
});

router.get("/my-library", authMiddleware, async (req, res) => {
  try {
    const audios = await Audio.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(audios); // playbackSpeed is included automatically from model
  } catch (error) {
    console.error("Fetch my-library error:", error);
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/audio/:id/progress
 * @desc    Save user's listening progress for an audiobook
 * @access  Private
 */
router.patch("/:id/progress", authMiddleware, async (req, res) => {
  try {
    const { progress } = req.body;

    // Validate progress
    if (typeof progress !== "number" || progress < 0) {
      return res.status(400).json({ message: "Invalid progress value" });
    }

    const audio = await Audio.findOne({ _id: req.params.id, user: req.user._id });
    if (!audio) return res.status(404).json({ message: "Audio not found" });

    audio.progress = progress;
    await audio.save();

    return res.json({ message: "Progress saved successfully", progress: audio.progress });
  } catch (error) {
    console.error("Save progress error:", error);
    return res.status(500).json({ message: "Failed to save progress" });
  }
});

/**
 * @route   PATCH /api/audio/:id/speed
 * @desc    Save playback speed preference
 * @access  Private
 */
router.patch("/:id/speed", authMiddleware, async (req, res) => {
  try {
    const { playbackSpeed } = req.body;

    if (typeof playbackSpeed !== "number" || playbackSpeed <= 0) {
      return res.status(400).json({ message: "Invalid playback speed" });
    }

    const audio = await Audio.findOne({ _id: req.params.id, user: req.user._id });
    if (!audio) return res.status(404).json({ message: "Audio not found" });

    audio.playbackSpeed = playbackSpeed;
    await audio.save();

    return res.json({ message: "Playback speed saved", playbackSpeed: audio.playbackSpeed });
  } catch (error) {
    console.error("Save playback speed error:", error);
    return res.status(500).json({ message: "Failed to save playback speed" });
  }
});

/**
 * @route   GET /api/audio/continue
 * @desc    Get the last audiobook in progress for the user
 * @access  Private
 */
router.get("/continue", authMiddleware, async (req, res) => {
  try {
    const audio = await Audio.findOne({
      user: req.user._id,
      progress: { $gt: 0 },
    })
      .sort({ updatedAt: -1 })
      .select("_id title progress audioUrl playbackSpeed");

    return res.json(audio || null);
  } catch (error) {
    console.error("Continue listening error:", error);
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/audio/:id
 * @desc    Fetch a single audiobook by ID
 * @access  Private
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const audio = await Audio.findOne({ _id: req.params.id, user: req.user._id });
    if (!audio) return res.status(404).json({ message: "Audio not found" });

    return res.json(audio);
  } catch (error) {
    console.error("Fetch single audio error:", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const Audio = require("../models/Audio.model");

/**
 * @route   GET /api/audio/my-library
 * @desc    Get all audiobooks of the logged-in user
 * @access  Private
 */
router.get("/my-library", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    const audios = await Audio.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, audios });
  } catch (error) {
    console.error("Error fetching user audiobooks:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch audiobooks" });
  }
});

/**
 * @route   PATCH /api/audio/:id/progress
 * @desc    Save listening progress
 * @access  Private
 */
router.patch("/:id/progress", authMiddleware, async (req, res) => {
  try {
    const { progress } = req.body;

    if (typeof progress !== "number" || progress < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid progress value" });
    }

    const audio = await Audio.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!audio)
      return res
        .status(404)
        .json({ success: false, message: "Audio not found" });

    audio.progress = progress;
    await audio.save();

    return res.json({
      success: true,
      message: "Progress saved successfully",
      progress: audio.progress,
    });
  } catch (error) {
    console.error("Save progress error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save progress" });
  }
});

/**
 * @route   PATCH /api/audio/:id/speed
 * @desc    Save playback speed
 * @access  Private
 */
router.patch("/:id/speed", authMiddleware, async (req, res) => {
  try {
    const { playbackSpeed } = req.body;

    if (typeof playbackSpeed !== "number" || playbackSpeed <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid playback speed" });
    }

    const audio = await Audio.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!audio)
      return res
        .status(404)
        .json({ success: false, message: "Audio not found" });

    audio.playbackSpeed = playbackSpeed;
    await audio.save();

    return res.json({
      success: true,
      message: "Playback speed saved",
      playbackSpeed: audio.playbackSpeed,
    });
  } catch (error) {
    console.error("Save playback speed error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save playback speed" });
  }
});

/**
 * @route   GET /api/audio/continue
 * @desc    Continue listening (last played audiobook)
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

    return res.json({ success: true, audio: audio || null });
  } catch (error) {
    console.error("Continue listening error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch last played audio" });
  }
});

/**
 * @route   GET /api/audio/:id
 * @desc    Get single audiobook by ID
 * @access  Private
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const audio = await Audio.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!audio)
      return res
        .status(404)
        .json({ success: false, message: "Audio not found" });

    return res.json({ success: true, audio });
  } catch (error) {
    console.error("Fetch single audio error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch audio" });
  }
});

module.exports = router;

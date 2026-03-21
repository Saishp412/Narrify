// backend/routes/playlist.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const Playlist = require("../models/Playlist.model");

// Create a new playlist
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    const playlist = await Playlist.create({ user: req.user._id, title });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add audio to playlist
router.patch("/:id/add", authMiddleware, async (req, res) => {
  try {
    const { audioId } = req.body;
    const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    playlist.audios.push(audioId);
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove audio from playlist
router.patch("/:id/remove", authMiddleware, async (req, res) => {
  try {
    const { audioId } = req.body;
    const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    playlist.audios = playlist.audios.filter(a => a.toString() !== audioId);
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all playlists of user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).populate("audios");
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

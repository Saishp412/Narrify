// backend/models/Playlist.model.js
const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  audios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Audio" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);

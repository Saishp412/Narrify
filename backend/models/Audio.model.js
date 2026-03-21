const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    pdfName: {
      type: String,
      required: true,
    },

    audioUrl: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0, // seconds
    },

    progress: {
      type: Number,
      default: 0, // seconds listened
    },

    playbackSpeed: {
      type: Number,
      default: 1,
    },

    voice: {
      voiceId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      style: {
        type: String,
        default: "neutral",
        enum: ["neutral", "narration", "storytelling", "dramatic", "calm", "news", "conversational"]
      },
      accent: {
        type: String,
        default: "US",
        enum: ["US", "UK", "AU", "CA", "IN", "IE", "ZA", "other"]
      },
      gender: {
        type: String,
        enum: ["male", "female", "neutral"],
        default: "neutral"
      },
      age: {
        type: String,
        enum: ["young", "adult", "mature"],
        default: "adult"
      },
      preview_url: {
        type: String,
        default: null
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audio", audioSchema);

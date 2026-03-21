const Audio = require("../models/Audio.model");
const { textToSpeech } = require("../services/tts.service");

/**
 * Generate audio from text using ElevenLabs and save audiobook to DB
 * @route POST /api/audio/create
 * @access Private
 */
console.log("REQ BODY:", req.body);

const generateAudio = async (req, res) => {
  try {
    const { text, voiceId, title, pdfName, voiceMeta } = req.body;

    // Validate required fields
    if (!text || !title || !pdfName) {
      return res.status(400).json({
        success: false,
        message: "text, title, and pdfName are required",
      });
    }

    // Use default voiceId if not provided
    const finalVoiceId = voiceId || process.env.ELEVEN_DEFAULT_VOICE || "EXAVITQu4vr4xnSDxMaL";

    // Optional voiceMeta fallback
    const finalVoiceMeta = voiceMeta || { name: "Custom", accent: "US", tone: "Neutral" };

    // Generate TTS audio
    const audioUrl = await textToSpeech(text, `${req.user._id}-${Date.now()}`, finalVoiceId);

    // Save audiobook to database
    const audio = await Audio.create({
      user: req.user._id,
      title,
      pdfName,
      audioUrl,
      voiceId: finalVoiceId,
      voiceMeta: finalVoiceMeta,
    });

    return res.status(201).json({ success: true, audio });
  
  } catch (error) {
    console.error("Generate audio full error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate audio",
    });
  }

};

module.exports = { generateAudio };

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { fetchElevenLabsVoices, getVoicePreview, filterVoices } = require("../config/voices");

/**
 * @route   GET /api/voices
 * @desc    Get all available voices with metadata
 * @access  Private
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const voices = await fetchElevenLabsVoices();
    res.json({ 
      success: true, 
      voices,
      total: voices.length
    });
  } catch (error) {
    console.error("Fetch voices error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch voices",
    });
  }
});

/**
 * @route   GET /api/voices/filter
 * @desc    Filter voices by criteria (gender, style, accent, age)
 * @access  Private
 */
router.get("/filter", authMiddleware, async (req, res) => {
  try {
    const { gender, style, accent, age, search } = req.query;
    
    const voices = await fetchElevenLabsVoices();
    const filteredVoices = filterVoices(voices, {
      gender,
      style,
      accent,
      age,
      search
    });
    
    res.json({ 
      success: true, 
      voices: filteredVoices,
      total: filteredVoices.length,
      filters: { gender, style, accent, age, search }
    });
  } catch (error) {
    console.error("Filter voices error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to filter voices",
    });
  }
});

/**
 * @route   GET /api/voices/:voiceId/preview
 * @desc    Get preview URL for a specific voice
 * @access  Private
 */
router.get("/:voiceId/preview", authMiddleware, async (req, res) => {
  try {
    const { voiceId } = req.params;
    const previewUrl = await getVoicePreview(voiceId);
    
    res.json({ 
      success: true, 
      previewUrl,
      voiceId
    });
  } catch (error) {
    console.error("Get voice preview error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get voice preview",
    });
  }
});

module.exports = router;

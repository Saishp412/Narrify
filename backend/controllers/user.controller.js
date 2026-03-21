exports.updateVoicePreference = async (req, res) => {
  try {
    const { voiceId } = req.body;

    if (!voiceId) {
      return res.status(400).json({ message: "Voice ID required" });
    }

    // Update user's preferred voice
    req.user.preferredVoice = voiceId;
    await req.user.save();

    res.json({
      success: true,
      preferredVoice: voiceId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update voice preference" });
  }
};

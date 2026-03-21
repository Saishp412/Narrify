const googleTTS = require("@/googleTTS");

exports.generateAudio = async (text, voiceConfig) => {
  switch (voiceConfig.provider) {
    case "google":
      return googleTTS(text, voiceConfig);
    default:
      throw new Error("Unsupported TTS provider");
  }
};

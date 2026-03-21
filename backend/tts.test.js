require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

(async () => {
  const voiceId = process.env.ELEVEN_DEFAULT_VOICE || "21m00Tcm4TlvDq8ikWAM";

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: "Hello! This is a free account test",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    fs.writeFileSync("test.mp3", response.data);
    console.log("✅ TTS generated successfully — 'test.mp3' created!");
  } catch (err) {
    if (err.response?.data) {
      try {
        const json = JSON.parse(Buffer.from(err.response.data).toString("utf8"));
        console.error("ElevenLabs API Error:", json);
      } catch {
        console.error("ElevenLabs API Error (raw):", err.response.data);
      }
    } else {
      console.error("Error:", err.message);
    }
  }
})();

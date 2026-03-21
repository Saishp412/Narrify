const fs = require("fs")
const pdfParse = require("pdf-parse")
const { textToSpeech } = require("../services/tts.service")
const Audio = require("../models/Audio.model")
const { DEFAULT_VOICES } = require("../config/voices")
const { uploadAudio } = require("../services/cloudinaryService")

exports.uploadPDF = async (req, res) => {
  try {
    // 1️⃣ Validate PDF
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" })
    }

    // 2️⃣ Read PDF
    const dataBuffer = await fs.promises.readFile(req.file.path)

    // 3️⃣ Parse PDF text
    const data = await pdfParse(dataBuffer)
    const text = data.text

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "PDF contains no readable text" })
    }

    // 3.5️⃣ Resolve selected voice configuration
    const { voiceId, style, stability, similarity_boost } = req.body
    
    let selectedVoice;
    
    // Find voice in defaults or create basic config
    if (voiceId) {
      selectedVoice = DEFAULT_VOICES.find(v => v.voiceId === voiceId);
      if (!selectedVoice) {
        // If voiceId is provided but not in defaults, create basic config
        selectedVoice = {
          voiceId,
          name: "Custom Voice",
          style: style || "neutral",
          accent: "US",
          gender: "neutral",
          age: "adult"
        };
      }
    } else {
      selectedVoice = DEFAULT_VOICES[0]; // Use first default voice
    }
    
    // Enhance voice config with request parameters
    const voiceConfig = {
      ...selectedVoice,
      style: style || selectedVoice.style,
      stability: stability ? parseFloat(stability) : 0.5,
      similarity_boost: similarity_boost ? parseFloat(similarity_boost) : 0.5,
      use_speaker_boost: true
    };
    
    console.log("Using voice configuration:", {
      voiceId: voiceConfig.voiceId,
      name: voiceConfig.name,
      style: voiceConfig.style,
      stability: voiceConfig.stability,
      similarity_boost: voiceConfig.similarity_boost
    });

    // 4️⃣ Convert text → audio (returns temporary file path)
    const tempAudioPath = await textToSpeech(
      text,
      req.user._id,
      voiceConfig
    );

    console.log(`Audio generated temporarily at: ${tempAudioPath}`);

    // 5️⃣ Upload to Cloudinary
    const cloudinaryPublicId = `narrify_${req.user._id}_${Date.now()}`;
    const cloudinaryUrl = await uploadAudio(tempAudioPath, cloudinaryPublicId);

    console.log(`Audio uploaded to Cloudinary: ${cloudinaryUrl}`);

    // 6️⃣ SAVE AUDIOBOOK IN DB with Cloudinary URL
    const audio = await Audio.create({
      user: req.user._id,
      title: req.file.originalname.replace(".pdf", ""),
      pdfName: req.file.originalname,
      audioUrl: cloudinaryUrl, // Store Cloudinary URL directly
      voice: {
        voiceId: voiceConfig.voiceId,
        name: voiceConfig.name,
        style: voiceConfig.style,
        accent: voiceConfig.accent,
        gender: voiceConfig.gender,
        age: voiceConfig.age,
        preview_url: voiceConfig.preview_url
      }
    })

    // 7️⃣ Send response
    res.status(201).json({
      message: "Audiobook created successfully",
      audio: {
        _id: audio._id,
        title: audio.title,
        audioUrl: audio.audioUrl, // Cloudinary URL (already full URL)
        voice: audio.voice,
        duration: audio.duration,
        createdAt: audio.createdAt
      }
    })
  } catch (error) {
    console.error("Upload PDF error:", error)
    res.status(500).json({ message: error.message })
  } finally {
    // 8️⃣ Cleanup uploaded PDF (with delay to avoid file lock)
    if (req.file && fs.existsSync(req.file.path)) {
      setTimeout(() => {
        try {
          fs.unlinkSync(req.file.path)
        } catch (error) {
          console.error("Failed to delete uploaded PDF:", error.message)
        }
      }, 1000) // 1 second delay
    }
  }
}

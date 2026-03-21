const axios = require("axios");

const ELEVEN_API_KEY = process.env.ELEVEN_LABS_API_KEY;

// Enhanced static fallback voices with detailed metadata
const DEFAULT_VOICES = [
  {
    voiceId: "CwhRBWXzGAHq8TQ4Fs17",
    name: "Adam",
    style: "neutral",
    accent: "US",
    gender: "male",
    age: "adult",
    preview_url: null,
    description: "Professional male voice, great for narration"
  },
  {
    voiceId: "ErXwobaYiN019PkySvjV",
    name: "Bella",
    style: "friendly",
    accent: "US",
    gender: "female",
    age: "adult",
    preview_url: null,
    description: "Warm female voice, perfect for storytelling"
  },
  {
    voiceId: "EXAVITQu4vr4xnSDxMaL",
    name: "Drew",
    style: "professional",
    accent: "US",
    gender: "male",
    age: "adult",
    preview_url: null,
    description: "Clear male voice, ideal for educational content"
  },
  {
    voiceId: "pNInz6obpgDQGZN5ZUlk",
    name: "Domi",
    style: "calm",
    accent: "US",
    gender: "female",
    age: "young",
    preview_url: null,
    description: "Gentle female voice, soothing and relaxing"
  },
  {
    voiceId: "AZnzlk1XvdvUeBnXmlld",
    name: "Josh",
    style: "conversational",
    accent: "US",
    gender: "male",
    age: "adult",
    preview_url: null,
    description: "Natural male voice, friendly and engaging"
  },
  {
    voiceId: "pF7F5VgqZJgWQZJQZJQZ",
    name: "Raj",
    style: "professional",
    accent: "IN",
    gender: "male",
    age: "adult",
    preview_url: null,
    description: "Indian male voice with clear pronunciation, ideal for educational content"
  },
  {
    voiceId: "qF7F5VgqZJgWQZJQZJQZ",
    name: "Priya",
    style: "warm",
    accent: "IN",
    gender: "female",
    age: "adult",
    preview_url: null,
    description: "Indian female voice with friendly tone, perfect for storytelling"
  }
];

/**
 * Extract voice metadata from ElevenLabs labels
 */
const extractVoiceMetadata = (voice) => {
  const labels = voice.labels || {};
  
  // Determine gender from labels
  let gender = "neutral";
  if (labels.gender) {
    gender = labels.gender.toLowerCase();
  } else if (voice.name.toLowerCase().includes('adam') || voice.name.toLowerCase().includes('josh') || voice.name.toLowerCase().includes('raj')) {
    gender = "male";
  } else if (voice.name.toLowerCase().includes('bella') || voice.name.toLowerCase().includes('domi') || voice.name.toLowerCase().includes('priya')) {
    gender = "female";
  }
  
  // Determine age from labels or name
  let age = "adult";
  if (labels.age) {
    age = labels.age.toLowerCase();
  }
  
  // Determine style from use case or description
  let style = "neutral";
  if (labels.use_case) {
    const useCase = labels.use_case.toLowerCase();
    if (useCase.includes("narration")) style = "narration";
    else if (useCase.includes("storytelling")) style = "storytelling";
    else if (useCase.includes("news")) style = "news";
    else if (useCase.includes("conversational")) style = "conversational";
  }
  
  // Determine accent from labels or default to US
  let accent = "US";
  if (labels.accent) {
    accent = labels.accent.toUpperCase();
  } else if (labels.locale) {
    const locale = labels.locale.toLowerCase();
    if (locale.includes("en-gb")) accent = "UK";
    else if (locale.includes("en-au")) accent = "AU";
    else if (locale.includes("en-ca")) accent = "CA";
    else if (locale.includes("en-in")) accent = "IN";
  }
  
  return {
    gender,
    age,
    style,
    accent
  };
};

/**
 * Fetch available voices from ElevenLabs API
 */
const fetchElevenLabsVoices = async () => {
  if (!ELEVEN_API_KEY) {
    console.warn("ElevenLabs API key missing, using default voices");
    return DEFAULT_VOICES;
  }

  try {
    console.log("Fetching voices from ElevenLabs API...");
    
    const response = await axios.get(
      "https://api.elevenlabs.io/v1/voices",
      {
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
        },
        timeout: 10000
      }
    );

    if (!response.data.voices || !Array.isArray(response.data.voices)) {
      console.error("Invalid response from ElevenLabs API");
      return DEFAULT_VOICES;
    }

    const processedVoices = response.data.voices
      .filter(voice => voice.voice_id && voice.name) // Filter out invalid voices
      .map((voice) => {
        const metadata = extractVoiceMetadata(voice);
        
        return {
          voiceId: voice.voice_id,
          name: voice.name,
          style: metadata.style,
          accent: metadata.accent,
          gender: metadata.gender,
          age: metadata.age,
          preview_url: voice.preview_url || null,
          description: voice.description || `${metadata.gender} voice with ${metadata.style} style`,
          category: voice.category || "general",
          ...metadata // Include all extracted metadata
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    console.log(`Successfully fetched ${processedVoices.length} voices from ElevenLabs`);
    
    // If no voices were processed, return defaults
    if (processedVoices.length === 0) {
      console.warn("No valid voices processed, using default voices");
      return DEFAULT_VOICES;
    }
    
    return processedVoices;
  } catch (error) {
    console.error("Failed to fetch voices from ElevenLabs:", error.message);
    if (error.response) {
      console.error("API Response:", error.response.data);
    }
    return DEFAULT_VOICES;
  }
};

/**
 * Get voice preview URL for a specific voice
 */
const getVoicePreview = async (voiceId) => {
  if (!ELEVEN_API_KEY) {
    return null;
  }

  try {
    const response = await axios.get(
      `https://api.elevenlabs.io/v1/voices/${voiceId}`,
      {
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
        },
        timeout: 5000
      }
    );

    return response.data.preview_url || null;
  } catch (error) {
    console.error(`Failed to get preview for voice ${voiceId}:`, error.message);
    return null;
  }
};

/**
 * Filter voices by criteria
 */
const filterVoices = (voices, filters = {}) => {
  return voices.filter(voice => {
    if (filters.gender && voice.gender !== filters.gender) return false;
    if (filters.style && voice.style !== filters.style) return false;
    if (filters.accent && voice.accent !== filters.accent) return false;
    if (filters.age && voice.age !== filters.age) return false;
    if (filters.search && !voice.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
};

module.exports = { 
  fetchElevenLabsVoices, 
  DEFAULT_VOICES, 
  getVoicePreview, 
  filterVoices 
};

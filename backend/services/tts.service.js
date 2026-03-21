const fs = require("fs");
const path = require("path");
const axios = require("axios");

const ELEVEN_DEFAULT_VOICE = process.env.ELEVEN_DEFAULT_VOICE;

const textToSpeech = async (text, userId, voiceConfig) => {
  try {
    // Validate inputs
    if (!text || text.trim().length === 0) {
      throw new Error("Text is required for TTS");
    }
    
    if (!voiceConfig || !voiceConfig.voiceId) {
      throw new Error("Voice configuration is required");
    }

    // Ensure generated_audio directory exists for temporary storage
    const audioDir = path.join(__dirname, "..", "generated_audio");
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    console.log(`Generating TTS with voice: ${voiceConfig.voiceId}`);
    console.log(`Voice style: ${voiceConfig.style || 'neutral'}`);
    console.log(`Text length: ${text.length} characters`);

    // Estimate character cost (rough approximation: ~1 character = 1 credit for ElevenLabs)
    const estimatedCredits = Math.ceil(text.length * 1.2); // Add 20% buffer
    console.log(`Estimated credits needed: ${estimatedCredits.toLocaleString()}`);
    console.log(`Note: This is an estimate. Actual cost may vary based on voice and settings.`);

    // Check if text exceeds ElevenLabs limit (30,000 characters)
    const MAX_TEXT_LENGTH = 30000;
    const chunks = [];
    
    if (text.length > MAX_TEXT_LENGTH) {
      console.log(`Text too long (${text.length} chars), splitting into chunks...`);
      
      // Split text into chunks of max 30,000 characters
      let remainingText = text;
      let chunkIndex = 0;
      
      while (remainingText.length > 0) {
        let chunk = remainingText.substring(0, MAX_TEXT_LENGTH);
        
        // Try to end at a sentence boundary to avoid cutting words
        if (remainingText.length > MAX_TEXT_LENGTH) {
          const lastSentenceEnd = Math.max(
            chunk.lastIndexOf('. '),
            chunk.lastIndexOf('.\n'),
            chunk.lastIndexOf('! '),
            chunk.lastIndexOf('!\n'),
            chunk.lastIndexOf('? '),
            chunk.lastIndexOf('?\n')
          );
          
          if (lastSentenceEnd > MAX_TEXT_LENGTH * 0.8) {
            // Found a good sentence break, cut there
            chunk = chunk.substring(0, lastSentenceEnd + 1);
          } else {
            // No good sentence break, try to end at a word boundary
            const lastSpace = chunk.lastIndexOf(' ');
            if (lastSpace > MAX_TEXT_LENGTH * 0.9) {
              chunk = chunk.substring(0, lastSpace);
            }
          }
        }
        
        chunks.push({
          text: chunk.trim(),
          index: chunkIndex++
        });
        
        remainingText = remainingText.substring(chunk.length).trim();
      }
      
      console.log(`Split into ${chunks.length} chunks`);
      console.log(`Estimated credits per chunk: ~${Math.ceil(MAX_TEXT_LENGTH * 1.2).toLocaleString()}`);
      console.log(`Total estimated credits: ~${(chunks.length * Math.ceil(MAX_TEXT_LENGTH * 1.2)).toLocaleString()}`);
    } else {
      chunks.push({ text: text.trim(), index: 0 });
    }

    // Generate audio for each chunk
    const audioFiles = [];
    
    for (const chunk of chunks) {
      console.log(`Processing chunk ${chunk.index + 1}/${chunks.length} (${chunk.text.length} chars)`);
      
      // Prepare ElevenLabs request with advanced voice settings
      const requestBody = {
        text: chunk.text,
        model_id: "eleven_turbo_v2",
        voice_settings: {
          stability: voiceConfig.stability || 0.5,
          similarity_boost: voiceConfig.similarity_boost || 0.5,
          style: voiceConfig.style_exaggeration || 0.0,
          use_speaker_boost: voiceConfig.use_speaker_boost !== false
        }
      };

      // Add pronunciation guide if provided
      if (voiceConfig.pronunciation_guide) {
        requestBody.pronunciation_guide = voiceConfig.pronunciation_guide;
      }

      try {
        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceConfig.voiceId}`,
          requestBody,
          {
            headers: { 
              "xi-api-key": process.env.ELEVEN_LABS_API_KEY,
              "Content-Type": "application/json"
            },
            responseType: "arraybuffer",
            timeout: 60000 // 60 second timeout
          }
        );

        // Check if response is actually audio (check content-type)
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.includes('audio')) {
          // Try to decode error message
          const errorText = Buffer.from(response.data).toString('utf8');
          console.error("ElevenLabs returned non-audio response:", errorText);
          throw new Error(`ElevenLabs API error: ${errorText}`);
        }

        // Save chunk as temporary file
        const chunkFileName = `${userId}_${Date.now()}_chunk${chunk.index}.mp3`;
        const chunkFilePath = path.join(audioDir, chunkFileName);
        fs.writeFileSync(chunkFilePath, response.data);
        
        audioFiles.push({
          path: chunkFilePath,
          index: chunk.index
        });
        
        console.log(`Chunk ${chunk.index + 1} saved: ${chunkFileName}`);
        
      } catch (chunkError) {
        console.error(`Failed to process chunk ${chunk.index + 1}:`, chunkError.message);
        
        // Check for quota exceeded error
        if (chunkError.response?.data?.detail?.status === "quota_exceeded") {
          const errorDetail = chunkError.response.data.detail;
          const errorMessage = `ElevenLabs quota exceeded. ${errorDetail.message}. Please upgrade your plan or try with a shorter document.`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        // For other errors, continue with next chunk
        if (chunk.index === 0) {
          // If first chunk fails, we can't proceed
          throw new Error(`Failed to generate audio: ${chunkError.message}`);
        } else {
          // If subsequent chunk fails, log warning and continue
          console.warn(`Skipping chunk ${chunk.index + 1} due to error: ${chunkError.message}`);
        }
      }
    }

    // Check if we have at least one successful chunk
    if (audioFiles.length === 0) {
      throw new Error("Failed to generate any audio chunks. Please check your ElevenLabs quota and try again.");
    }

    // If only one chunk, return it directly
    if (audioFiles.length === 1) {
      console.log(`Single chunk audio generated: ${audioFiles[0].path}`);
      return audioFiles[0].path;
    }

    // If multiple chunks, we need to merge them (for now, return the first chunk)
    // TODO: Implement audio merging using ffmpeg or similar
    console.log(`Multiple chunks generated (${audioFiles.length}), returning first chunk for now`);
    console.log(`Note: Full concatenation of audio chunks will be implemented in a future update`);
    
    // Clean up additional chunks (keep only the first one)
    for (let i = 1; i < audioFiles.length; i++) {
      try {
        fs.unlinkSync(audioFiles[i].path);
        console.log(`Cleaned up extra chunk: ${audioFiles[i].path}`);
      } catch (cleanupError) {
        console.warn(`Failed to clean up chunk ${audioFiles[i].path}: ${cleanupError.message}`);
      }
    }
    
    return audioFiles[0].path;
  } catch (err) {
    console.error("ElevenLabs TTS Error:", err.response?.data || err.message);
    
    // If we have a response with data, try to decode it
    if (err.response?.data) {
      try {
        const errorText = Buffer.from(err.response.data).toString('utf8');
        console.error("Decoded error:", errorText);
      } catch (decodeErr) {
        console.error("Could not decode error response");
      }
    }
    
    throw new Error(`TTS generation failed: ${err.message}`);
  }
};

module.exports = { textToSpeech };

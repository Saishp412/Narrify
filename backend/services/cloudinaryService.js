const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload audio file to Cloudinary
 * @param {string} filePath - Local path to the audio file
 * @param {string} publicId - Optional custom public ID for the file
 * @returns {Promise<string>} - Secure URL of the uploaded audio
 */
const uploadAudio = async (filePath, publicId = null) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('Audio file does not exist');
    }

    // Generate public ID if not provided
    const filePublicId = publicId || `narrify_audio_${Date.now()}`;
    
    console.log(`Uploading audio to Cloudinary: ${filePublicId}`);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video', // Cloudinary treats audio as video
      public_id: filePublicId,
      folder: 'narrify/audiobooks',
      format: 'mp3',
      overwrite: true,
      // Audio-specific settings - removed invalid streaming_profile
      audio_codec: 'mp3'
    });

    console.log(`Cloudinary upload successful: ${result.secure_url}`);
    
    // Clean up local file after successful upload
    try {
      fs.unlinkSync(filePath);
      console.log(`Cleaned up local file: ${filePath}`);
    } catch (cleanupError) {
      console.warn(`Failed to clean up local file: ${cleanupError.message}`);
    }

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload audio to Cloudinary: ${error.message}`);
  }
};

/**
 * Delete audio file from Cloudinary
 * @param {string} publicId - Public ID of the file to delete
 * @returns {Promise<boolean>} - Success status
 */
const deleteAudio = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video'
    });
    
    console.log(`Cloudinary deletion result: ${result.result}`);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return false;
  }
};

/**
 * Get audio info from Cloudinary
 * @param {string} publicId - Public ID of the file
 * @returns {Promise<Object>} - Audio metadata
 */
const getAudioInfo = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'video'
    });
    return result;
  } catch (error) {
    console.error('Cloudinary info error:', error);
    throw new Error(`Failed to get audio info: ${error.message}`);
  }
};

module.exports = {
  uploadAudio,
  deleteAudio,
  getAudioInfo
};

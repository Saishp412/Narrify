const voices = require("../config/voices");

exports.getVoices = (req, res) => {
  res.json({
    success: true,
    voices
  });
};

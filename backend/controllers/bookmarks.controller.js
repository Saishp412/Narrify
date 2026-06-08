const User = require("../models/User.model");
const Audio = require("../models/Audio.model");

// GET /api/bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarkedAudiobooks');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      audiobooks: user.bookmarkedAudiobooks,
      discoveryBooks: user.bookmarkedDiscoveryBooks || []
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Server error fetching bookmarks" });
  }
};

// POST /api/bookmarks/toggle
exports.toggleBookmark = async (req, res) => {
  try {
    const { type, id } = req.body;
    
    if (!type || !id) {
      return res.status(400).json({ message: "Type and ID are required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (type === 'audio') {
      const isBookmarked = user.bookmarkedAudiobooks.includes(id);
      if (isBookmarked) {
        user.bookmarkedAudiobooks = user.bookmarkedAudiobooks.filter(
          (audioId) => audioId.toString() !== id.toString()
        );
      } else {
        user.bookmarkedAudiobooks.push(id);
      }
      await user.save();
      return res.status(200).json({ isBookmarked: !isBookmarked, type: 'audio' });
    } 
    else if (type === 'discovery') {
      const isBookmarked = user.bookmarkedDiscoveryBooks.includes(id);
      if (isBookmarked) {
        user.bookmarkedDiscoveryBooks = user.bookmarkedDiscoveryBooks.filter(
          (isbn) => isbn !== id
        );
      } else {
        user.bookmarkedDiscoveryBooks.push(id);
      }
      await user.save();
      return res.status(200).json({ isBookmarked: !isBookmarked, type: 'discovery' });
    } 
    else {
      return res.status(400).json({ message: "Invalid bookmark type" });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Server error toggling bookmark" });
  }
};

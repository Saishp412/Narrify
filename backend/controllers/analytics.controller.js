const Audio = require("../models/Audio.model");

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all audiobooks for the user
    const audiobooks = await Audio.find({ user: userId }).sort({ updatedAt: -1 });

    if (!audiobooks || audiobooks.length === 0) {
      // Return empty analytics data if the user has no audiobooks
      return res.status(200).json({
        totalListeningTime: 0,
        booksCompleted: 0,
        averageSessionDuration: 0,
        mostListenedGenre: "N/A",
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
        monthlyStats: [],
        topAudiobooks: [],
        listeningPatterns: { morning: 0, afternoon: 0, evening: 0, night: 0 },
      });
    }

    // --- Core Metrics ---
    let totalProgressSeconds = 0;
    let booksCompleted = 0;
    const voiceStyleCounts = {};

    audiobooks.forEach(audio => {
      totalProgressSeconds += (audio.progress || 0);
      
      // Assume completed if progress is >= 90% of duration (or duration is very short and progress > 0)
      if (audio.duration > 0 && audio.progress >= audio.duration * 0.9) {
        booksCompleted++;
      }

      // Track voice styles for "Top Genre"
      const style = audio.voice?.style || "neutral";
      voiceStyleCounts[style] = (voiceStyleCounts[style] || 0) + 1;
    });

    const totalListeningTimeHours = +(totalProgressSeconds / 3600).toFixed(1);

    // Most listened "genre" (voice style)
    let mostListenedGenre = "N/A";
    let maxStyleCount = 0;
    for (const [style, count] of Object.entries(voiceStyleCounts)) {
      if (count > maxStyleCount) {
        maxStyleCount = count;
        mostListenedGenre = style.charAt(0).toUpperCase() + style.slice(1);
      }
    }

    // Average Session Duration (Mocked loosely based on total listening time)
    // We assume an average session is 15-45 minutes. We'll approximate this by taking 20 mins per book started
    const averageSessionDuration = audiobooks.length > 0 
      ? Math.min(45, Math.max(15, Math.round((totalProgressSeconds / 60) / (audiobooks.length * 2))))
      : 0;

    // --- Weekly Progress (Approximation) ---
    // Spread the total listening time across the last 7 days based on the last updated timestamps
    const weeklyProgress = [0, 0, 0, 0, 0, 0, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
    const now = new Date();
    
    audiobooks.forEach(audio => {
      if (!audio.progress) return;
      const updatedDate = new Date(audio.updatedAt);
      const daysDiff = Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
      
      // If it was updated in the last 7 days, add some of its progress to that day
      if (daysDiff < 7) {
        // JS getDay() is 0 (Sun) to 6 (Sat). We want 0 (Mon) to 6 (Sun).
        const dayIndex = (updatedDate.getDay() + 6) % 7;
        // Distribute the progress (this is an approximation, we just attribute all progress to the last update day)
        // Cap the daily hours to something reasonable to avoid a huge spike
        const hours = (audio.progress / 3600);
        weeklyProgress[dayIndex] += hours;
      }
    });

    // Format weekly progress to 1 decimal place
    for (let i = 0; i < 7; i++) {
      weeklyProgress[i] = +(weeklyProgress[i].toFixed(1));
    }

    // --- Monthly Stats (Approximation) ---
    const monthlyStatsMap = {};
    audiobooks.forEach(audio => {
      const createdDate = new Date(audio.createdAt);
      const monthKey = createdDate.toLocaleString('default', { month: 'short' });
      
      if (!monthlyStatsMap[monthKey]) {
        monthlyStatsMap[monthKey] = { month: monthKey, hours: 0, books: 0 };
      }
      monthlyStatsMap[monthKey].books += 1;
      monthlyStatsMap[monthKey].hours += (audio.duration / 3600); // Approximate by book length created that month
    });

    // Format monthly stats
    const monthlyStats = Object.values(monthlyStatsMap).slice(0, 6).map(stat => ({
      ...stat,
      hours: +(stat.hours.toFixed(1))
    }));

    // --- Top Audiobooks ---
    const sortedByProgress = [...audiobooks].sort((a, b) => (b.progress || 0) - (a.progress || 0)).slice(0, 5);
    const topAudiobooks = sortedByProgress.map(audio => {
      const completionRate = audio.duration > 0 ? Math.round(((audio.progress || 0) / audio.duration) * 100) : 0;
      return {
        title: audio.title,
        author: `Voice: ${audio.voice?.name || "Unknown"}`,
        totalTime: +((audio.progress || 0) / 3600).toFixed(1),
        completionRate: Math.min(100, completionRate)
      };
    });

    // --- Listening Patterns (Approximation based on updatedAt hours) ---
    let morning = 0, afternoon = 0, evening = 0, night = 0;
    audiobooks.forEach(audio => {
      const hour = new Date(audio.updatedAt).getHours();
      if (hour >= 6 && hour < 12) morning++;
      else if (hour >= 12 && hour < 18) afternoon++;
      else if (hour >= 18 && hour < 24) evening++;
      else night++;
    });

    const totalPatternCount = morning + afternoon + evening + night;
    const listeningPatterns = totalPatternCount > 0 ? {
      morning: Math.round((morning / totalPatternCount) * 100),
      afternoon: Math.round((afternoon / totalPatternCount) * 100),
      evening: Math.round((evening / totalPatternCount) * 100),
      night: Math.round((night / totalPatternCount) * 100),
    } : { morning: 0, afternoon: 0, evening: 0, night: 0 };

    res.status(200).json({
      totalListeningTime: totalListeningTimeHours,
      booksCompleted,
      averageSessionDuration,
      mostListenedGenre,
      weeklyProgress,
      monthlyStats,
      topAudiobooks,
      listeningPatterns
    });

  } catch (error) {
    console.error("Analytics fetch error:", error);
    res.status(500).json({ message: "Server error fetching analytics" });
  }
};

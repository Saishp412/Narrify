"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useState, useEffect, useRef } from "react";

export default function BottomPlayer() {
  const { isPlaying, play, pause, queue, currentIndex, nextTrack, prevTrack, audioRef } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentAudio = queue[currentIndex];

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!currentAudio) return null;

  return (
    <div
      className="fixed bottom-0 left-64 right-0 z-50 bg-white/10 backdrop-blur-lg border-t border-white/20"
    >
      {/* Progress Bar */}
      <div className="relative h-1 bg-white/20">
        {/* Progress Line - White and bold on the left side */}
        <div 
          className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
        {/* Progress Dot - Centered on the line */}
        {duration > 0 && (
          <div 
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary-500 transition-all duration-100"
            style={{ 
              left: `${duration ? (currentTime / duration) * 100 : 0}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
          </div>
        )}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
          style={{ appearance: 'none' }}
        />
      </div>

      <div className="px-6 py-4">
        {/* Time Display */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Audio Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium font-outfit truncate">{currentAudio.title}</h3>
            {currentAudio.voice && (
              <p className="text-sm text-gray-400">{currentAudio.voice.name}</p>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevTrack}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>
            
            {isPlaying ? (
              <button
                onClick={pause}
                className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={play}
                className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
            
            <button
              onClick={nextTrack}
              disabled={currentIndex === queue.length - 1}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex-1 flex items-center justify-end">
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="ml-2 text-sm text-gray-400">
              {currentAudio.playbackSpeed ? `${currentAudio.playbackSpeed}x` : '1x'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

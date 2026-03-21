"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";

export type AudioBook = {
  _id: string;
  title: string;
  audioUrl: string;
  progress: number;
  playbackSpeed: number;
  voice?: {
    voiceId: string;
    name: string;
    style: string;
    accent: string;
    gender: string;
    age: string;
    preview_url?: string;
  };
  duration?: number;
  createdAt?: string;
};

interface PlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  queue: AudioBook[];
  currentIndex: number;
  play: () => Promise<void>;
  pause: () => void;
  playTrack: (audio: AudioBook) => void; // Play now
  addToQueue: (audio: AudioBook) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<AudioBook[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Play interrupted:", err);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playTrack = (audio: AudioBook) => {
    // Play this audio immediately
    setQueue([audio]);
    setCurrentIndex(0);
    if (audioRef.current) {
      audioRef.current.src = audio.audioUrl;
      audioRef.current.playbackRate = audio.playbackSpeed || 1;
      play();
    }
  };

  const addToQueue = (audio: AudioBook) => {
    setQueue((prev) => [...prev, audio]);
  };

  const nextTrack = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
      const nextAudio = queue[currentIndex + 1];
      if (audioRef.current) {
        audioRef.current.src = nextAudio.audioUrl;
        audioRef.current.playbackRate = nextAudio.playbackSpeed || 1;
        play();
      }
    }
  };

  const prevTrack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const prevAudio = queue[currentIndex - 1];
      if (audioRef.current) {
        audioRef.current.src = prevAudio.audioUrl;
        audioRef.current.playbackRate = prevAudio.playbackSpeed || 1;
        play();
      }
    }
  };

  // Auto next when track ends
  const handleEnded = () => {
    if (currentIndex + 1 < queue.length) {
      nextTrack();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        isPlaying,
        queue,
        currentIndex,
        play,
        pause,
        playTrack,
        addToQueue,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
      <audio ref={audioRef} onEnded={handleEnded} />
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};

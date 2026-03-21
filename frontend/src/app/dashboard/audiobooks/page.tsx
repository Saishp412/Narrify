"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";

type AudioBook = {
  _id: string;
  title: string;
  audioUrl: string;
  progress: number;
  playbackSpeed: number;
};

type Voice = {
  id: string;
  name: string;
  accent: string;
  tone: string;
};

export default function AudiobooksPage() {
  const { playTrack, isPlaying, queue, currentIndex } = usePlayer();
  const [audios, setAudios] = useState<AudioBook[]>([]);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const lastSavedRef = useRef<Record<string, number>>({});
  const [currentTime, setCurrentTime] = useState<string>("");

  // ---------- STEP 1: Voice State ----------
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoices, setSelectedVoices] = useState<Record<string, string>>(
    {}
  );

  // Update time only on client
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 📥 Fetch audiobooks
  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/audio/my-library", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch audiobooks");

        const data = await res.json();
        setAudios(data);

        // Initialize selected voices to default
        const initVoices: Record<string, string> = {};
        data.forEach((audio: AudioBook) => {
          initVoices[audio._id] = "default_en"; // fallback
        });
        setSelectedVoices(initVoices);
      } catch (err) {
        console.error(err);
        alert("Failed to load audiobooks");
      }
    };

    fetchAudios();
  }, []);

  // ---------- STEP 1: Fetch Voices ----------
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/voices");
        const data = await res.json();

        if (data.success && data.voices.length > 0) {
          setVoices(data.voices);

          // Update selected voices with first voice if not already set
          setSelectedVoices((prev) => {
            const updated: Record<string, string> = { ...prev };
            Object.keys(updated).forEach((key) => {
              if (!updated[key]) updated[key] = data.voices[0].id;
            });
            return updated;
          });
        }
      } catch (error) {
        console.error("Failed to load voices");
      }
    };

    fetchVoices();
  }, []);

  // ---------- STEP 2: Save voice preference ----------
  const saveVoicePreference = async (audioId: string, voiceId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch("http://localhost:5000/api/user/voice", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ voiceId }),
      });
    } catch (error) {
      console.error("Failed to save voice preference", error);
    }
  };

  // 💾 Save progress (throttled)
  const saveProgress = async (audioId: string, time: number) => {
    const lastSaved = lastSavedRef.current[audioId] || 0;
    if (Math.abs(time - lastSaved) < 5) return;
    lastSavedRef.current[audioId] = time;

    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`http://localhost:5000/api/audio/${audioId}/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress: time }),
    });
  };

  const savePlaybackSpeed = async (audioId: string, speed: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`http://localhost:5000/api/audio/${audioId}/speed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playbackSpeed: speed }),
    });
  };

  const changeSpeed = (audioId: string, speed: number) => {
    const audio = audioRefs.current[audioId];
    if (audio) audio.playbackRate = speed;

    setAudios((prev) =>
      prev.map((a) =>
        a._id === audioId ? { ...a, playbackSpeed: speed } : a
      )
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-12" style={{ backgroundColor: '#0f172a' }}>
      {/* Enhanced Header matching dashboard theme */}
      <section className="relative animate-fade-in mb-8">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4 lg:p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-outfit tracking-tight mb-1">
                  My Audiobooks
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Your Personal Library</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Continue listening, explore new audiobooks, and manage your personal audio collection
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-400">{audios.length} audiobooks available</span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {currentTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Info Section */}
      <section className="animate-slide-up mb-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white font-outfit tracking-tight">Library Information</h3>
              <p className="text-gray-400 mt-1">Manage your audiobook collection and preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse shadow-lg shadow-primary-400/50" />
              <span className="text-sm text-gray-400 font-medium">Active Library</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Smart Resume
              </h4>
              <p className="text-gray-300 text-sm">
                Each audiobook remembers your last listening position, so you can pick up exactly where you left off.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Playback Speed Control
              </h4>
              <p className="text-gray-300 text-sm">
                Adjust the playback speed to suit your preference. Choose from 0.75x to 2x speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Audiobooks Grid */}
      <section className="animate-slide-in-left">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white font-outfit tracking-tight">Your Collection</h2>
              <p className="text-gray-400 mt-1">Browse and play your audiobooks</p>
            </div>
            <div className="text-sm text-gray-400">
              {audios.length} {audios.length === 1 ? 'audiobook' : 'audiobooks'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audios.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg mb-2">No audiobooks uploaded yet</p>
                <p className="text-gray-500 text-sm">Start by uploading documents in the dashboard</p>
                <button
                  onClick={() => window.location.href = '/dashboard/upload'}
                  className="mt-4 px-6 py-3 bg-gradient-primary hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
                >
                  Upload First Document
                </button>
              </div>
            )}

            {audios.map((audio, index) => (
              <div
                key={audio._id}
                className="group relative animate-slide-up hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 font-outfit tracking-tight">{audio.title}</h3>
                      {audio.progress > 0 && (
                        <div className="flex items-center gap-2 text-sm text-primary-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Resume from {Math.floor(audio.progress)} sec</span>
                        </div>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced Voice Selector */}
                  {voices.length > 0 && (
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-300 mb-3 block">Narration Voice</label>
                      <div className="flex flex-wrap gap-2">
                        {voices.map((voice) => (
                          <button
                            key={voice.id}
                            onClick={() => {
                              setSelectedVoices((prev) => ({
                                ...prev,
                                [audio._id]: voice.id,
                              }));
                              saveVoicePreference(audio._id, voice.id);
                            }}
                            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-300 ${
                              selectedVoices[audio._id] === voice.id
                                ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                                : 'bg-white/5 border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {voice.name} ({voice.accent})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Audio Player */}
                  <div className="mb-6">
                    {/* Play Now Button */}
                    <button
                      onClick={() => playTrack(audio)}
                      className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play Now
                    </button>
                    
                    <audio
                      controls
                      src={audio.audioUrl}
                      className="w-full rounded-lg"
                      style={{
                        filter: 'invert(1) hue-rotate(180deg)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                      ref={(el) => {
                        audioRefs.current[audio._id] = el;
                        if (!el) return;
                        el.playbackRate = audio.playbackSpeed || 1;
                        if (audio.progress > 0) el.currentTime = audio.progress;
                      }}
                      onTimeUpdate={(e) =>
                        saveProgress(audio._id, e.currentTarget.currentTime)
                      }
                      onPause={(e) =>
                        saveProgress(audio._id, e.currentTarget.currentTime)
                      }
                    />
                  </div>

                  {/* Enhanced Speed Controls */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-300">Playback Speed</span>
                      <span className="text-xs text-primary-400">{audio.playbackSpeed || 1}x</span>
                    </div>
                    <div className="flex gap-2">
                      {[0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            changeSpeed(audio._id, speed);
                            savePlaybackSpeed(audio._id, speed);
                          }}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all duration-300 ${
                            (audio.playbackSpeed || 1) === speed
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500 border-primary-500 text-white shadow-lg shadow-primary-500/25'
                              : 'bg-white/5 border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Extra Info */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white font-medium">{Math.floor(Math.random() * 120 + 30)} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Category</span>
                        <span className="text-white font-medium">{["Fiction", "Self-help", "Tech", "Education"][index % 4]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Last listened</span>
                        <span className="text-white font-medium">
                          {audio.progress > 0 ? `${Math.floor(audio.progress / 60)} min ago` : "Not started"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


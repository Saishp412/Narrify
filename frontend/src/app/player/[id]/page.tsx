"use client"
import { API_BASE } from '../../utils/api';
;

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

type AudioBook = {
  _id: string;
  title: string;
  audioUrl: string;
  progress: number;
};

type Voice = {
  id: string;
  name: string;
  accent: string;
  tone: string;
};

export default function PlayerPage() {
  const { id } = useParams();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audio, setAudio] = useState<AudioBook | null>(null);

  // ---------- STEP 1: Voice State ----------
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>("");

  // ---------- Fetch Audiobook ----------
  useEffect(() => {
    const fetchAudio = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/audio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAudio(data);
    };

    fetchAudio();
  }, [id]);

  // ---------- STEP 1: Fetch Voices ----------
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch(`${API_BASE}/voices`);
        const data = await res.json();

        if (data.success && data.voices.length > 0) {
          setVoices(data.voices);
          setSelectedVoiceId(data.voices[0].id); // default selection
        }
      } catch (error) {
        console.error("Failed to load voices");
      }
    };

    fetchVoices();
  }, []);

  // ---------- Save Progress (UNCHANGED) ----------
  const saveProgress = async () => {
    if (!audioRef.current || !audio) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${API_BASE}/audio/${audio._id}/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        progress: audioRef.current.currentTime,
      }),
    });
  };

  if (!audio) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "700px",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>{audio.title}</h2>

      {/* ---------- STEP 1: Voice Selector UI ---------- */}
      {voices.length > 0 && (
        <div
          style={{
            marginBottom: 25,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        >
          <p style={{ marginBottom: 10, fontWeight: 600 }}>
            Narration Voice
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setSelectedVoiceId(voice.id)}
                style={{
                  padding: 12,
                  textAlign: "left",
                  borderRadius: 8,
                  border:
                    selectedVoiceId === voice.id
                      ? "2px solid #4f46e5"
                      : "1px solid #ccc",
                  background:
                    selectedVoiceId === voice.id
                      ? "#eef2ff"
                      : "#fff",
                  cursor: "pointer",
                }}
              >
                <strong>{voice.name}</strong>
                <div style={{ fontSize: 12, color: "#555" }}>
                  {voice.accent} • {voice.tone}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------- Audio Player (UNCHANGED) ---------- */}
      <audio
        ref={audioRef}
        src={audio.audioUrl}
        controls
        autoPlay
        onLoadedMetadata={() => {
          if (audioRef.current && audio.progress) {
            audioRef.current.currentTime = audio.progress;
          }
        }}
        onTimeUpdate={() => {
          if (
            audioRef.current &&
            Math.floor(audioRef.current.currentTime) % 5 === 0
          ) {
            saveProgress();
          }
        }}
        onPause={saveProgress}
        style={{ width: "100%" }}
      />

      <p style={{ marginTop: 12, color: "#666" }}>
        Your progress is saved automatically
      </p>
    </div>
  );
}

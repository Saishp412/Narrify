"use client";

import * as React from "react";
import { useState, useEffect } from "react";

export interface Voice {
  voiceId: string;
  name: string;
  style: string;
  accent: string;
  gender: string;
  age: string;
  preview_url: string | null;
  description: string;
  category?: string;
}

interface VoiceSelectorProps {
  onVoiceSelect: (voice: Voice) => void;
  selectedVoiceId?: string;
}

export default function VoiceSelector({ onVoiceSelect, selectedVoiceId }: VoiceSelectorProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    gender: "",
    style: "",
    accent: "",
    age: "",
    search: ""
  });
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  // Fetch voices from API
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await fetch("http://localhost:5000/api/voices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch voices");
        }

        const data = await response.json();
        setVoices(data.voices || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load voices");
      } finally {
        setLoading(false);
      }
    };

    fetchVoices();
  }, []);

  // Filter voices based on filters
  const filteredVoices = voices.filter(voice => {
    if (filters.gender && voice.gender !== filters.gender) return false;
    if (filters.style && voice.style !== filters.style) return false;
    if (filters.accent && voice.accent !== filters.accent) return false;
    if (filters.age && voice.age !== filters.age) return false;
    if (filters.search && !voice.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Play voice preview
  const playPreview = async (voice: Voice) => {
    if (!voice.preview_url) {
      alert("No preview available for this voice");
      return;
    }

    try {
      setPreviewingVoice(voice.voiceId);
      
      if (audioRef) {
        audioRef.pause();
      }

      const audio = new Audio(voice.preview_url);
      setAudioRef(audio);
      
      audio.onended = () => {
        setPreviewingVoice(null);
      };
      
      audio.onerror = () => {
        setPreviewingVoice(null);
        alert("Failed to play preview");
      };
      
      await audio.play();
    } catch (err) {
      setPreviewingVoice(null);
      alert("Failed to play preview");
    }
  };

  // Stop preview
  const stopPreview = () => {
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
    }
    setPreviewingVoice(null);
  };

  // Get unique filter options
  const getFilterOptions = (field: keyof Voice) => {
    const options = [...new Set(voices.map(voice => voice[field] as string))];
    return options.filter(Boolean).sort();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading voices...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-[#161a20] rounded-xl p-6 border border-white/10 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Filter Voices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search voices..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0f1115] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0f1115] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All</option>
              {getFilterOptions('gender').map(gender => (
                <option key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Style Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Style</label>
            <select
              value={filters.style}
              onChange={(e) => setFilters(prev => ({ ...prev, style: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0f1115] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All</option>
              {getFilterOptions('style').map(style => (
                <option key={style} value={style}>
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Accent Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Accent</label>
            <select
              value={filters.accent}
              onChange={(e) => setFilters(prev => ({ ...prev, accent: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0f1115] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All</option>
              {getFilterOptions('accent').map(accent => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
            <select
              value={filters.age}
              onChange={(e) => setFilters(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-3 py-2 bg-[#0f1115] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All</option>
              {getFilterOptions('age').map(age => (
                <option key={age} value={age}>
                  {age.charAt(0).toUpperCase() + age.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredVoices.length} of {voices.length} voices
        </div>
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVoices.map((voice) => (
          <div
            key={voice.voiceId}
            className={`bg-[#161a20] rounded-xl p-6 border cursor-pointer transition-all ${
              selectedVoiceId === voice.voiceId
                ? "border-indigo-500 ring-2 ring-indigo-500/20"
                : "border-white/10 hover:border-white/20"
            }`}
            onClick={() => onVoiceSelect(voice)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{voice.name}</h4>
                <p className="text-sm text-gray-400">{voice.description}</p>
              </div>
              
              {voice.preview_url && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (previewingVoice === voice.voiceId) {
                      stopPreview();
                    } else {
                      playPreview(voice);
                    }
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    previewingVoice === voice.voiceId
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  disabled={previewingVoice !== null && previewingVoice !== voice.voiceId}
                >
                  {previewingVoice === voice.voiceId ? (
                    <span className="text-white">⏸</span>
                  ) : (
                    <span className="text-white">▶</span>
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-[#0f1115] text-xs rounded-full text-gray-300">
                {voice.gender}
              </span>
              <span className="px-2 py-1 bg-[#0f1115] text-xs rounded-full text-gray-300">
                {voice.style}
              </span>
              <span className="px-2 py-1 bg-[#0f1115] text-xs rounded-full text-gray-300">
                {voice.accent}
              </span>
              <span className="px-2 py-1 bg-[#0f1115] text-xs rounded-full text-gray-300">
                {voice.age}
              </span>
            </div>

            <div className="text-sm text-gray-400">
              <div>Voice ID: <code className="text-xs bg-[#0f1115] px-1 rounded">{voice.voiceId}</code></div>
              {voice.category && <div>Category: {voice.category}</div>}
            </div>
          </div>
        ))}
      </div>

      {filteredVoices.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400">No voices match your filters</div>
          <button
            onClick={() => setFilters({ gender: "", style: "", accent: "", age: "", search: "" })}
            className="mt-2 text-indigo-400 hover:text-indigo-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

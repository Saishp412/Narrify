"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import VoiceSelector, { Voice } from "@/components/VoiceSelector";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    style: "",
    stability: 0.5,
    similarity_boost: 0.5
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // ---------- File Selection ----------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];
    
    // Validate file type
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    // Validate file size (25MB limit)
    if (file.size > 25 * 1024 * 1024) {
      alert("File size must be less than 25MB");
      return;
    }

    setSelectedFile(file);
    // Estimate processing time based on file size
    const estimatedMinutes = Math.ceil(file.size / (1024 * 1024) * 2);
    setEstimatedTime(estimatedMinutes);
    setCurrentStep(2);
  };

  // ---------- Voice Selection ----------
  const handleVoiceSelect = (voice: Voice) => {
    setSelectedVoice(voice);
  };

  // ---------- Upload Function ----------
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    if (!selectedVoice) {
      alert("Please select a voice first");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("voiceId", selectedVoice.voiceId);
    formData.append("style", voiceSettings.style || selectedVoice?.style || "");
    formData.append("stability", voiceSettings.stability.toString());
    formData.append("similarity_boost", voiceSettings.similarity_boost.toString());

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upload files");
      return;
    }

    try {
      setUploading(true);
      setCurrentStep(3);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 1000);
      
      const { API_BASE } = await import('@/app/utils/api');
      const res = await fetch(`${API_BASE}/upload/pdf`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setAudioUrl(data.audio.audioUrl);
      setCurrentStep(4);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
      setCurrentStep(2);
    } finally {
      setUploading(false);
    }
  };

  // ---------- Reset ----------
  const handleReset = () => {
    setSelectedFile(null);
    setSelectedVoice(null);
    setAudioUrl(null);
    setCurrentStep(1);
    setUploadProgress(0);
    setEstimatedTime(0);
    setVoiceSettings({
      style: "",
      stability: 0.5,
      similarity_boost: 0.5
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(1);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8" style={{ backgroundColor: '#0f172a' }}>
      <div className="mx-auto max-w-6xl space-y-12">

        {/* Enhanced Header */}
        <section className="relative animate-fade-in mb-8">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-outfit tracking-tight">
                Create Your Audio
                <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Perfect Audiobook Experience</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto font-inter">
                Transform your PDF documents into immersive audio experiences with AI-powered narration and customizable voice settings
              </p>
              
              {/* Enhanced Progress Steps */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                {[
                  { step: 1, label: "Upload", icon: "upload" },
                  { step: 2, label: "Voice", icon: "mic" },
                  { step: 3, label: "Generate", icon: "sparkles" },
                  { step: 4, label: "Complete", icon: "check" }
                ].map((item, index) => (
                  <React.Fragment key={item.step}>
                    <div className={`flex flex-col items-center space-y-2 ${currentStep >= item.step ? 'animate-pulse' : ''}`}>
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        currentStep >= item.step
                          ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/50 animate-pulse"
                          : "bg-white/10 text-gray-400 border border-white/20"
                      }`}>
                        {item.icon === "upload" && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        )}
                        {item.icon === "mic" && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        )}
                        {item.icon === "sparkles" && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {item.icon === "check" && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {currentStep > item.step && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white/10 animate-bounce" />
                        )}
                      </div>
                      <span className={`text-xs font-medium transition-colors ${
                        currentStep >= item.step ? "text-white" : "text-gray-400"
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`flex-1 h-0.5 w-8 transition-all duration-500 ${
                        currentStep > item.step ? "bg-gradient-to-r from-primary-500 to-accent-500" : "bg-white/10"
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Enhanced File Upload */}
        {currentStep === 1 && (
          <section className="animate-slide-up mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:border-white/30 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3 font-outfit tracking-tight">Select Document</h2>
                      <p className="text-gray-300 mb-6 font-inter">
                        Upload your PDF file to begin the conversion process
                      </p>
                    </div>

                    <div 
                      className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-white/40 transition-colors duration-300 bg-white/5 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 pointer-events-none">
                        <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                      />
                      <div className="pointer-events-none">
                        <span className="text-white font-medium mb-2 block">Click to upload or drag and drop</span>
                        <span className="text-gray-400 text-sm">PDF files only (MAX. 25MB)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold font-outfit tracking-tight hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 mb-8"
                    >
                      Browse Files
                    </button>
                  </div>

                  {/* Features & Info */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 font-outfit tracking-tight">Why Choose Narrify?</h3>
                      <div className="space-y-4">
                        {[
                          {
                            icon: "target",
                            title: "  AI-Powered Conversion",
                            desc: "Advanced AI algorithms ensure natural-sounding narration"
                          },
                          {
                            icon: "users",
                            title: "  Multiple Voice Options",
                            desc: "Choose from various voices and styles to match your content"
                          },
                          {
                            icon: "zap",
                            title: "  Fast Processing",
                            desc: "Quick conversion with real-time progress tracking"
                          },
                          {
                            icon: "shield",
                            title: "  Secure & Private",
                            desc: "Your documents are encrypted and processed securely"
                          }
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${
                              feature.icon === "target" ? "from-primary-500/20 to-accent-500/20" :
                              feature.icon === "users" ? "from-emerald-500/20 to-teal-500/20" :
                              feature.icon === "zap" ? "from-yellow-500/20 to-orange-500/20" :
                              "from-violet-500/20 to-purple-500/20"
                            } group-hover:scale-110 transition-transform duration-300`}>
                              {feature.icon === "target" && (
                                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              {feature.icon === "users" && (
                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                              )}
                              {feature.icon === "zap" && (
                                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              )}
                              {feature.icon === "shield" && (
                                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold font-outfit">{feature.title}</h4>
                              <p className="text-gray-400 text-sm font-inter">{feature.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white font-semibold mb-3 font-outfit">Supported Features</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-3 group">
                          <svg className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-300 group-hover:text-white transition-colors">Chapter detection</span>
                        </div>
                        <div className="flex items-center space-x-3 group">
                          <svg className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-gray-300 group-hover:text-white transition-colors">Auto-punctuation</span>
                        </div>
                        <div className="flex items-center space-x-3 group">
                          <svg className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-gray-300 group-hover:text-white transition-colors">Speed control</span>
                        </div>
                        <div className="flex items-center space-x-3 group">
                          <svg className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-300 group-hover:text-white transition-colors">Resume playback</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 2: Enhanced Voice Selection */}
        {currentStep === 2 && (
          <section className="space-y-8 animate-slide-up">
            {/* File Info Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-outfit">{selectedFile?.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Size: {formatFileSize(selectedFile?.size || 0)} MB</span>
                      <span>•</span>
                      <span>Est. time: {estimatedTime} min</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-inter"
                >
                  Change file
                </button>
              </div>
            </div>

            {/* Voice Selector */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-outfit tracking-tight">Choose Your Narrator</h3>
              <VoiceSelector
                onVoiceSelect={handleVoiceSelect}
                selectedVoiceId={selectedVoice?.voiceId}
              />
            </div>

            {/* Enhanced Voice Settings */}
            {selectedVoice && (
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-outfit tracking-tight">Voice Settings</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-inter">Speaking Style</label>
                    <select
                      value={voiceSettings.style}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, style: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:border-primary-500 transition-colors font-inter"
                    >
                      <option value="">Default ({selectedVoice?.style})</option>
                      <option value="neutral">Neutral</option>
                      <option value="narration">Narration</option>
                      <option value="storytelling">Storytelling</option>
                      <option value="dramatic">Dramatic</option>
                      <option value="calm">Calm</option>
                      <option value="news">News</option>
                      <option value="conversational">Conversational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-inter">
                      Stability: {voiceSettings.stability.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={voiceSettings.stability}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, stability: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Variable</span>
                      <span>Consistent</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-inter">
                      Similarity Boost: {voiceSettings.similarity_boost.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={voiceSettings.similarity_boost}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, similarity_boost: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-2 font-outfit">Preview Settings</h4>
                    <p className="text-gray-300 text-sm font-inter">
                      {selectedVoice?.name} will narrate your document with a {voiceSettings.style || selectedVoice?.style} style
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`w-full mt-6 py-4 rounded-2xl font-semibold font-outfit tracking-tight transition-all duration-300 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/30 hover:border-white/40 hover:scale-105 ${
                    uploading
                      ? "cursor-not-allowed opacity-60"
                      : "shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                  }`}
                >
                  <span className={`${uploading ? "text-gray-400" : "text-white"}`}>
                    {uploading ? "Processing..." : "Generate Audiobook"}
                  </span>
                </button>
              </div>
            )}
          </section>
        )}

        {/* Step 3: Enhanced Generating */}
        {currentStep === 3 && (
          <section className="animate-slide-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-3 font-outfit tracking-tight">Generating Your Audiobook</h3>
                    <p className="text-gray-300 text-lg font-inter max-w-2xl mx-auto">
                      We're converting "{selectedFile?.name}" using {selectedVoice?.name}'s voice with {voiceSettings.style || selectedVoice?.style} style
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-8">
                      <span>Processing...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden mb-8">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-white font-semibold font-outfit">{formatFileSize(selectedFile?.size || 0)} MB</div>
                      <div className="text-gray-400 text-sm">File Size</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <div className="text-white font-semibold font-outfit">{selectedVoice?.name}</div>
                      <div className="text-gray-400 text-sm">Voice</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
                      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-white font-semibold font-outfit">~{estimatedTime} min</div>
                      <div className="text-gray-400 text-sm">Est. Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 4: Enhanced Success */}
        {currentStep === 4 && audioUrl && (
          <section className="animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/50">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-3 font-outfit tracking-tight">Your Audiobook is Ready!</h3>
                    <p className="text-gray-300 text-lg font-inter max-w-2xl mx-auto">
                      Start listening now or find it later in your personal library
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 max-w-3xl mx-auto mt-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                      <div className="flex-1 text-center md:text-right">
                        <div className="text-sm text-gray-400 mb-1 font-inter uppercase tracking-wider">Document</div>
                        <div className="text-white font-semibold font-outfit truncate" title={selectedFile?.name}>{selectedFile?.name}</div>
                      </div>
                      
                      <div className="hidden md:flex flex-col items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mb-1" />
                        <div className="w-px h-8 bg-white/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1" />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="text-sm text-gray-400 mb-1 font-inter uppercase tracking-wider">Voice</div>
                        <div className="text-white font-semibold font-outfit">{selectedVoice?.name} ({voiceSettings.style || selectedVoice?.style})</div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10">
                      <audio controls src={audioUrl} className="w-full max-w-2xl mx-auto" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button
                      onClick={() => router.push("/dashboard/audiobooks")}
                      className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold font-outfit tracking-tight hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                    >
                      Go to My Library
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 bg-white/10 text-white rounded-2xl font-semibold font-outfit tracking-tight hover:bg-white/20 transition-all duration-300"
                    >
                      Create Another
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

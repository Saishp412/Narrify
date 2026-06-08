"use client"
import { API_BASE } from '../../utils/api';
;

import React, { useEffect, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";

type Download = {
  id: string;
  title: string;
  filename: string;
  size: string;
  downloadDate: string;
  format: string;
  duration: string;
  status: "completed" | "downloading" | "failed";
  progress?: number;
  audioUrl?: string;
};

export default function DownloadsPage() {
  const { playTrack } = usePlayer();
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<boolean>(false);

  // Update time
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real downloads data
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setIsLoading(true);
        setApiError(false);
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/downloads`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If API doesn't exist yet, handle gracefully
        if (res.status === 404) {
          console.log("Downloads API not implemented yet");
          setApiError(true);
          setDownloads([]);
          setIsLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch downloads");

        const data = await res.json();
        setDownloads(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setApiError(true);
        // Start with empty array instead of fake data
        setDownloads([]);
        setIsLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = download.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         download.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || download.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (downloadId: string) => {
    const download = downloads.find(d => d.id === downloadId);
    if (download && download.audioUrl) {
      const link = document.createElement('a');
      link.href = download.audioUrl;
      link.download = download.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDelete = (downloadId: string) => {
    setDownloads(prev => prev.filter(d => d.id !== downloadId));
  };

  const handleRetry = (downloadId: string) => {
    // Implement retry logic with actual API call
    setDownloads(prev => prev.map(d => 
      d.id === downloadId 
        ? { ...d, status: "downloading" as const, progress: 0 }
        : d
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "downloading": return "text-blue-400";
      case "failed": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "downloading":
        return (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case "failed":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const totalSize = downloads
    .filter(d => d.status === "completed")
    .reduce((acc, d) => acc + parseFloat(d.size || "0"), 0);

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8" style={{ backgroundColor: '#0f172a' }}>
      {/* Enhanced Header */}
      <section className="relative animate-fade-in mb-6">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-outfit tracking-tight mb-1">
                  Downloads
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Offline Audio Library</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Manage your downloaded audiobooks and enjoy offline listening anytime, anywhere
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-400">{downloads.filter(d => d.status === "completed").length} files ready</span>
                </div>
                <div className="text-sm text-gray-500">
                  Total size: {totalSize.toFixed(1)} MB
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {currentTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="animate-slide-up mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{downloads.filter(d => d.status === "completed").length}</h3>
            <p className="text-sm text-gray-400">Completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{downloads.filter(d => d.status === "downloading").length}</h3>
            <p className="text-sm text-gray-400">Downloading</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{downloads.filter(d => d.status === "failed").length}</h3>
            <p className="text-sm text-gray-400">Failed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{totalSize.toFixed(0)} MB</h3>
            <p className="text-sm text-gray-400">Total Size</p>
          </div>
        </div>
      </section>

      {/* Enhanced Filters and Search */}
      <section className="animate-slide-in-right mb-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search downloads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {["all", "completed", "downloading", "failed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    filterStatus === status
                      ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
                      : "bg-white/10 border border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Downloads List */}
      <section className="animate-slide-in-left mb-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white font-outfit tracking-tight">Download Library</h2>
              <p className="text-gray-400 mt-1">Your offline audio collection</p>
            </div>
            <div className="text-sm text-gray-400">
              {filteredDownloads.length} {filteredDownloads.length === 1 ? 'file' : 'files'}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Loading Downloads</h3>
              <p className="text-gray-400">Fetching your download library...</p>
            </div>
          ) : filteredDownloads.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {apiError ? "Downloads Not Available" : "No downloads yet"}
              </h3>
              <p className="text-gray-400 mb-6">
                {apiError 
                  ? "The downloads feature is not available yet. You can still enjoy your audiobooks online."
                  : (searchQuery || filterStatus !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Download audiobooks to build your offline library")
                }
              </p>
              {!searchQuery && filterStatus === "all" && (
                <button
                  onClick={() => window.location.href = '/dashboard/audiobooks'}
                  className="px-6 py-3 bg-gradient-primary hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
                >
                  {apiError ? "Browse Audiobooks" : "Browse Audiobooks"}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDownloads.map((download, index) => (
                <div
                  key={download.id}
                  className="group relative animate-slide-up hover:scale-[1.02] transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white font-outfit tracking-tight">{download.title}</h3>
                          <div className={`flex items-center gap-1 ${getStatusColor(download.status)}`}>
                            {getStatusIcon(download.status)}
                            <span className="text-sm font-medium capitalize">{download.status}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{download.filename}</p>
                        
                        {/* Progress Bar for Downloading */}
                        {download.status === "downloading" && download.progress !== undefined && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">Download Progress</span>
                              <span className="text-xs text-primary-400">{Math.round(download.progress)}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${download.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>

                    {/* File Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Size</p>
                        <p className="text-sm text-white font-medium">{download.size}</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Format</p>
                        <p className="text-sm text-white font-medium">{download.format}</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Duration</p>
                        <p className="text-sm text-white font-medium">{download.duration}</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Downloaded</p>
                        <p className="text-sm text-white font-medium">{download.downloadDate}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {download.status === "completed" && (
                        <>
                          <button
                            onClick={() => handleDownload(download.id)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-105 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Again
                          </button>
                          <button
                            onClick={() => {
                              if (download.audioUrl) {
                                const audioBook = {
                                  _id: download.id,
                                  title: download.title,
                                  audioUrl: download.audioUrl,
                                  progress: 0,
                                  playbackSpeed: 1,
                                };
                                playTrack(audioBook);
                              }
                            }}
                            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Play Now
                          </button>
                        </>
                      )}
                      
                      {download.status === "failed" && (
                        <>
                          <button
                            onClick={() => handleRetry(download.id)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Retry Download
                          </button>
                          <button
                            onClick={() => handleDelete(download.id)}
                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </>
                      )}
                      
                      {download.status === "downloading" && (
                        <button
                          onClick={() => handleDelete(download.id)}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Storage Info Section */}
      <section className="animate-slide-up">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white font-outfit tracking-tight">Download Settings</h3>
              <p className="text-gray-400 mt-1">Configure your download preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent-400 animate-pulse shadow-lg shadow-accent-400/50" />
              <span className="text-sm text-gray-400 font-medium">Settings Active</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Download Quality
                </h4>
                <div className="space-y-2">
                  {["High (320 kbps)", "Medium (192 kbps)", "Low (128 kbps)"].map((quality, index) => (
                    <label key={quality} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="quality"
                        defaultChecked={index === 1}
                        className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 focus:ring-primary-500/50"
                      />
                      <span className="text-sm text-gray-300">{quality}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Auto-Download Settings
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-300">Download on Wi-Fi only</span>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500/50"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-300">Auto-delete failed downloads</span>
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500/50"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-300">Download new audiobooks automatically</span>
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500/50"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

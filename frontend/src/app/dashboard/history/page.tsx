"use client"
import { API_BASE } from '../../utils/api';
;

import React, { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  type: "listen" | "download" | "upload" | "bookmark" | "complete";
  title: string;
  description: string;
  timestamp: string;
  duration?: string;
  progress?: number;
  metadata?: {
    author?: string;
    genre?: string;
    size?: string;
    format?: string;
  };
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Fetch real history data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setApiError(false);
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If API doesn't exist yet, handle gracefully
        if (res.status === 404) {
          console.log("History API not implemented yet");
          setApiError(true);
          setHistory([]);
          setIsLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        setHistory(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setApiError(true);
        setHistory([]);
        setIsLoading(false);
      }
    };

    fetchHistory();

    // Set up real-time history tracking
    const setupRealTimeTracking = () => {
      // Listen for custom events from other components
      const handleHistoryEvent = (event: CustomEvent) => {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          type: event.detail.type,
          title: event.detail.title,
          description: event.detail.description,
          timestamp: new Date().toISOString(),
          duration: event.detail.duration,
          progress: event.detail.progress,
          metadata: event.detail.metadata,
        };
        
        setHistory(prev => [newHistoryItem, ...prev]);
      };

      window.addEventListener('historyUpdate', handleHistoryEvent as EventListener);
      
      return () => {
        window.removeEventListener('historyUpdate', handleHistoryEvent as EventListener);
      };
    };

    const cleanup = setupRealTimeTracking();

    // Track page visits
    const trackPageVisit = () => {
      const visitItem: HistoryItem = {
        id: Date.now().toString(),
        type: "listen",
        title: "Visited History Page",
        description: "Viewed listening history and activity log",
        timestamp: new Date().toISOString(),
      };
      setHistory(prev => [visitItem, ...prev]);
    };

    trackPageVisit();

    return cleanup;
  }, []);

  // Load history from localStorage as fallback
  useEffect(() => {
    if (history.length === 0 && !isLoading) {
      const savedHistory = localStorage.getItem('userHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          setHistory(parsedHistory);
        } catch (err) {
          console.error('Error parsing saved history:', err);
        }
      }
    }
  }, [history.length, isLoading]);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('userHistory', JSON.stringify(history.slice(0, 100))); // Keep last 100 items
    }
  }, [history]);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "listen":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "download":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        );
      case "upload":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case "bookmark":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        );
      case "complete":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "listen": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "download": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "upload": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      case "bookmark": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "complete": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('userHistory');
  };

  const getHistoryStats = () => {
    const stats = {
      total: history.length,
      today: history.filter(item => {
        const itemDate = new Date(item.timestamp);
        const today = new Date();
        return itemDate.toDateString() === today.toDateString();
      }).length,
      thisWeek: history.filter(item => {
        const itemDate = new Date(item.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return itemDate >= weekAgo;
      }).length,
    };
    return stats;
  };

  const stats = getHistoryStats();

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
                  History
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Activity Timeline</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Track your listening journey and review your audiobook activities
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-400">Live tracking</span>
                </div>
                <div className="text-sm text-gray-500">
                  {stats.total} total activities
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {currentTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="animate-slide-up mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.total}</h3>
            <p className="text-sm text-gray-400">Total Activities</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.today}</h3>
            <p className="text-sm text-gray-400">Today's Activities</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.thisWeek}</h3>
            <p className="text-sm text-gray-400">This Week</p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
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
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {["all", "listen", "download", "upload", "bookmark", "complete"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    filterType === type
                      ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
                      : "bg-white/10 border border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 font-medium rounded-xl transition-all duration-300"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* History List */}
      <section className="animate-slide-in-left">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white font-outfit tracking-tight">Activity Timeline</h2>
              <p className="text-gray-400 mt-1">Your recent audiobook activities</p>
            </div>
            <div className="text-sm text-gray-400">
              {filteredHistory.length} {filteredHistory.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Loading History</h3>
              <p className="text-gray-400">Fetching your activity timeline...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {apiError ? "History Not Available" : "No history yet"}
              </h3>
              <p className="text-gray-400 mb-6">
                {apiError 
                  ? "The history feature is not available yet. Start listening to build your timeline."
                  : (searchQuery || filterType !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Your listening activities will appear here as you use the app")
                }
              </p>
              {!searchQuery && filterType === "all" && !apiError && (
                <button
                  onClick={() => window.location.href = '/dashboard/audiobooks'}
                  className="px-6 py-3 bg-gradient-primary hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
                >
                  Start Listening
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative animate-slide-up hover:scale-[1.02] transition-all duration-500"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${getTypeColor(item.type)} border flex items-center justify-center flex-shrink-0`}>
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white font-outfit tracking-tight mb-1">{item.title}</h3>
                            <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm text-gray-400">{formatTimestamp(item.timestamp)}</p>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-lg border ${getTypeColor(item.type)} mt-1`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Metadata */}
                        {item.metadata && (
                          <div className="flex flex-wrap gap-3 mb-3">
                            {item.metadata.author && (
                              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1">
                                <p className="text-xs text-gray-400">Author</p>
                                <p className="text-sm text-white">{item.metadata.author}</p>
                              </div>
                            )}
                            {item.metadata.genre && (
                              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1">
                                <p className="text-xs text-gray-400">Genre</p>
                                <p className="text-sm text-white">{item.metadata.genre}</p>
                              </div>
                            )}
                            {item.metadata.size && (
                              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1">
                                <p className="text-xs text-gray-400">Size</p>
                                <p className="text-sm text-white">{item.metadata.size}</p>
                              </div>
                            )}
                            {item.metadata.format && (
                              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1">
                                <p className="text-xs text-gray-400">Format</p>
                                <p className="text-sm text-white">{item.metadata.format}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Progress bar for listening activities */}
                        {item.type === "listen" && item.progress !== undefined && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">Listening Progress</span>
                              <span className="text-xs text-primary-400">{Math.round(item.progress)}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Duration display */}
                        {item.duration && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

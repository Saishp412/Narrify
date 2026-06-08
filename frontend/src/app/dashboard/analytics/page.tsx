"use client";

import React, { useEffect, useState } from "react";

type AnalyticsData = {
  totalListeningTime: number;
  booksCompleted: number;
  averageSessionDuration: number;
  mostListenedGenre: string;
  weeklyProgress: number[];
  monthlyStats: {
    month: string;
    hours: number;
    books: number;
  }[];
  topAudiobooks: {
    title: string;
    author: string;
    totalTime: number;
    completionRate: number;
  }[];
  listeningPatterns: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
};

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("week");
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

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        setApiError(false);
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const { API_BASE } = await import('@/app/utils/api');
        const res = await fetch(`${API_BASE}/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If API doesn't exist yet, handle gracefully
        if (res.status === 404) {
          console.log("Analytics API not implemented yet");
          setApiError(true);
          setAnalyticsData(null);
          setIsLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch analytics");

        const data = await res.json();
        setAnalyticsData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setApiError(true);
        setAnalyticsData(null);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const data = analyticsData;

  const formatHours = (hours: number) => {
    if (!hours) return "0h";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 90) return "text-green-400";
    if (rate >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center" style={{ backgroundColor: '#0f172a' }}>
        <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center" style={{ backgroundColor: '#0f172a' }}>
        <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 max-w-lg mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 font-outfit">No Analytics Data Yet</h2>
          <p className="text-gray-400 font-inter mb-8">
            Upload your first document and start listening to generate insights and track your progress.
          </p>
          <a href="/dashboard/upload" className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold font-outfit hover:scale-105 transition-all duration-300">
            Create an Audiobook
          </a>
        </div>
      </div>
    );
  }



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
                  Analytics
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Your Listening Insights</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Track your progress, discover patterns, and optimize your learning journey
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-400">Live tracking</span>
                </div>
                <div className="text-sm text-gray-500">
                  Total: {formatHours(data.totalListeningTime)}
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {currentTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Period Selector */}
      <section className="animate-slide-up mb-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-white font-outfit tracking-tight">Analytics Overview</h2>
            <div className="flex gap-2">
              {["week", "month", "year", "all"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedPeriod === period
                      ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
                      : "bg-white/10 border border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="animate-slide-up mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{formatHours(data.totalListeningTime)}</h3>
            <p className="text-sm text-gray-400">Total Listening</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{data.booksCompleted}</h3>
            <p className="text-sm text-gray-400">Books Completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{data.averageSessionDuration}m</h3>
            <p className="text-sm text-gray-400">Avg Session</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{data.mostListenedGenre}</h3>
            <p className="text-sm text-gray-400">Top Genre</p>
          </div>
        </div>
      </section>

      {/* Weekly Progress Chart */}
      <section className="animate-slide-in-right mb-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white font-outfit tracking-tight mb-2">Weekly Progress</h2>
            <p className="text-gray-400">Hours listened per day this week</p>
          </div>
          
          <div className="relative h-64 mb-6">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {data.weeklyProgress.map((hours, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-2">{hours}h</span>
                    <div 
                      className="w-full bg-gradient-to-t from-primary-500 to-accent-500 rounded-t-lg transition-all duration-500 hover:scale-105"
                      style={{ height: `${(hours / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-400" />
              <span className="text-gray-400">Daily average: {(data.weeklyProgress.reduce((a, b) => a + b, 0) / 7).toFixed(1)}h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-400" />
              <span className="text-gray-400">Peak day: {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][data.weeklyProgress.indexOf(Math.max(...data.weeklyProgress))]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Trends and Top Audiobooks */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trends */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 animate-slide-in-left">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white font-outfit tracking-tight mb-2">Monthly Trends</h2>
            <p className="text-gray-400">Listening hours over the last 6 months</p>
          </div>
          
          <div className="space-y-4">
            {data.monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4 mb-8">
                <span className="text-sm text-gray-400 w-12">{stat.month}</span>
                <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                    style={{ width: `${(stat.hours / 200) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white font-medium w-16 text-right">{stat.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Audiobooks */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 animate-slide-in-right">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white font-outfit tracking-tight mb-2">Top Audiobooks</h2>
            <p className="text-gray-400">Most listened titles this month</p>
          </div>
          
          <div className="space-y-4">
            {data.topAudiobooks.map((book, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-medium font-outfit">{book.title}</h3>
                    <p className="text-sm text-gray-400">{book.author}</p>
                  </div>
                  <span className={`text-sm font-medium ${getCompletionColor(book.completionRate)}`}>
                    {book.completionRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{formatHours(book.totalTime)}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-white/10 rounded-full h-1.5 max-w-20">
                      <div 
                        className={`h-1.5 rounded-full ${
                          book.completionRate >= 90 ? 'bg-green-400' : 
                          book.completionRate >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${book.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listening Patterns */}
      <section className="animate-slide-up">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white font-outfit tracking-tight mb-2">Listening Patterns</h2>
            <p className="text-gray-400">When you listen most throughout the day</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{data.listeningPatterns.morning}%</h3>
              <p className="text-sm text-gray-400">Morning (6AM-12PM)</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{data.listeningPatterns.afternoon}%</h3>
              <p className="text-sm text-gray-400">Afternoon (12PM-6PM)</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{data.listeningPatterns.evening}%</h3>
              <p className="text-sm text-gray-400">Evening (6PM-12AM)</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg shadow-gray-600/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{data.listeningPatterns.night}%</h3>
              <p className="text-sm text-gray-400">Night (12AM-6AM)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

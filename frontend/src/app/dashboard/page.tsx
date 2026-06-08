"use client"
import { API_BASE } from '../utils/api';
;

import * as React from "react";
import { useRouter } from "next/navigation";

type ContinueAudio = {
  _id: string;
  title: string;
  progress: number;
  duration: number;
  createdAt: string;
};

type RecentActivity = {
  id: string;
  title: string;
  type: "upload" | "conversion" | "listen";
  timestamp: string;
  status: "completed" | "processing" | "pending";
};

type UserStats = {
  totalDocuments: number;
  totalListeningTime: number;
  thisMonthConversions: number;
  storageUsed: number;
  storageLimit: number;
  plan: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [continueAudio, setContinueAudio] = React.useState<ContinueAudio | null>(null);
  const [recentActivity, setRecentActivity] = React.useState<RecentActivity[]>([]);
  const [userStats, setUserStats] = React.useState<UserStats>({
    totalDocuments: 0,
    totalListeningTime: 0,
    thisMonthConversions: 0,
    storageUsed: 0,
    storageLimit: 100, // Free plan limit
    plan: "Free",
  });
  const [loading, setLoading] = React.useState(true);

  // Fetch user data
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch continue listening data
        const continueRes = await fetch(
          `${API_BASE}/audio/continue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (continueRes.ok) {
          const data = await continueRes.json();
          setContinueAudio(data);
        }

        // Fetch user stats
        const statsRes = await fetch(
          `${API_BASE}/user/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setUserStats(statsData);
        }

        // Fetch recent activity
        const activityRes = await fetch(
          `${API_BASE}/user/activity",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setRecentActivity(activityData);
        }

      } catch (err) {
        console.error("Dashboard data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStoragePercentage = () => {
    return Math.round((userStats.storageUsed / userStats.storageLimit) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-12" style={{ backgroundColor: '#0f172a' }}>
      {/* Welcome Header with Enhanced Design */}
      <section className="relative animate-fade-in mb-8">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4 lg:p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-outfit tracking-tight mb-1">
                  Welcome back
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">to Your Dashboard</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Manage your documents, track your progress, and transform your content into immersive audio experiences
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-400">All systems operational</span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {[
          {
            value: userStats.totalDocuments,
            label: "Total Documents",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
            gradient: "from-primary-400 via-primary-500 to-primary-600",
            bgGradient: "from-primary-500/10 to-primary-600/5",
          },
          {
            value: formatTime(userStats.totalListeningTime),
            label: "Total Listening Time",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            gradient: "from-accent-400 via-accent-500 to-accent-600",
            bgGradient: "from-accent-500/10 to-accent-600/5",
          },
          {
            value: userStats.thisMonthConversions,
            label: "This Month's Conversions",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
            bgGradient: "from-emerald-500/10 to-emerald-600/5",
          },
          {
            value: `${getStoragePercentage()}%`,
            label: "Storage Used",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            ),
            gradient: "from-violet-400 via-violet-500 to-violet-600",
            bgGradient: "from-violet-500/10 to-violet-600/5",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="group relative animate-slide-up hover:scale-105 transition-all duration-500"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:border-white/30 transition-all duration-500">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg shadow-primary-500/25`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2 font-outfit tracking-tight">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Continue Listening Section - Enhanced */}
      {continueAudio && (
        <section className="animate-slide-in-left mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 hover:border-white/30 transition-all duration-500">
              <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white font-outfit tracking-tight">Continue Listening</h2>
                  <p className="text-gray-300 text-lg">Pick up exactly where you left off</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-sm text-gray-400 font-medium">Ready to play</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-3 font-outfit tracking-tight">{continueAudio.title}</h3>
                      <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Duration: {Math.floor(continueAudio.duration / 60)} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span>Progress: {Math.floor((continueAudio.progress / continueAudio.duration) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary-400 to-accent-400 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                          style={{ width: `${(continueAudio.progress / continueAudio.duration) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() => router.push("/dashboard/audiobooks")}
                        className="group relative px-8 py-4 bg-gradient-primary hover:scale-105 rounded-xl border border-white/20 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                      >
                        <span className="text-white font-semibold flex items-center gap-3 font-brand-light tracking-wide">
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Resume Listening
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Quick Actions */}
      <section className="animate-slide-in-right mb-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white font-outfit tracking-tight">Quick Actions</h2>
            <div className="text-sm text-gray-400">Get started instantly</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Upload Document",
                desc: "Convert new files to audio",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                ),
                gradient: "from-primary-400 via-primary-500 to-primary-600",
                bgGradient: "from-primary-500/10 to-primary-600/5",
                action: () => router.push("/dashboard/upload"),
              },
              {
                title: "My Library",
                desc: "Browse your audiobooks",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                gradient: "from-accent-400 via-accent-500 to-accent-600",
                bgGradient: "from-accent-500/10 to-accent-600/5",
                action: () => router.push("/dashboard/audiobooks"),
              },
              {
                title: "Settings",
                desc: "Customize voice preferences",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
                bgGradient: "from-emerald-500/10 to-emerald-600/5",
                action: () => router.push("/dashboard/settings"),
              },
            ].map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary-500/30 transition-all duration-500 hover:scale-105 text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.gradient} mb-4 shadow-lg shadow-primary-500/25`}>
                    <div className="text-white">{action.icon}</div>
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-lg font-outfit tracking-tight">{action.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Activity */}
      {recentActivity.length > 0 && (
        <section className="animate-slide-in-left mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white font-brand-light tracking-tight">Recent Activity</h2>
                <p className="text-gray-400 mt-1">Your latest actions and updates</p>
              </div>
              <button 
                onClick={() => router.push("/dashboard/audiobooks")}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors flex items-center gap-2"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <div
                  key={activity.id}
                  className="group flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-primary-500/30 transition-all duration-500 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                    activity.type === 'upload' ? 'bg-accent-500/20 border border-accent-500/30' :
                    activity.type === 'conversion' ? 'bg-primary-500/20 border border-primary-500/30' :
                    'bg-green-500/20 border border-green-500/30'
                  }`}>
                    {activity.type === 'upload' && (
                      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                    {activity.type === 'conversion' && (
                      <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {activity.type === 'listen' && (
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white font-medium text-lg">{activity.title}</div>
                    <div className="text-gray-400 text-sm mt-1">{activity.timestamp}</div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-full text-xs font-semibold border ${
                    activity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                    activity.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Storage Usage */}
      <section className="animate-slide-up mb-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-white font-brand-light tracking-tight">Storage Usage</h3>
              <p className="text-gray-400 mt-1">Monitor your cloud storage consumption</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{userStats.storageUsed}MB</div>
              <div className="text-sm text-gray-400">of {userStats.storageLimit}MB used</div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 rounded-full transition-all duration-700 relative overflow-hidden ${
                  getStoragePercentage() > 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                  getStoragePercentage() > 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-primary-400 to-accent-400'
                }`}
                style={{ width: `${getStoragePercentage()}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">0%</span>
              <span className="text-xs text-gray-400">{getStoragePercentage()}%</span>
              <span className="text-xs text-gray-400">100%</span>
            </div>
          </div>
          {getStoragePercentage() > 80 && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <p className="text-yellow-400 text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                You're running low on storage. Consider upgrading your plan for more space.
              </p>
            </div>
          )}
          {userStats.plan === "Free" && getStoragePercentage() < 80 && (
            <div className="mt-6 flex items-center justify-between p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl">
              <div>
                <p className="text-white font-medium">Upgrade to Pro</p>
                <p className="text-gray-300 text-sm">Get 10GB storage and unlimited conversions</p>
              </div>
              <button
                onClick={() => router.push("/pricing")}
                className="px-6 py-3 bg-gradient-primary hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

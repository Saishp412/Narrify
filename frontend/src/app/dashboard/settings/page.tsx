"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserSettings = {
  profile: {
    username: string;
    email: string;
    fullName: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
    birthDate: string;
    gender: string;
    language: string;
    timezone: string;
  };
  preferences: {
    defaultVoice: string;
    playbackSpeed: number;
    autoPlay: boolean;
    downloadQuality: string;
    streamingQuality: string;
    equalizer: string;
    crossfade: boolean;
    gaplessPlayback: boolean;
    showLyrics: boolean;
    normalizeVolume: boolean;
    audioFormat: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    conversionComplete: boolean;
    weeklyReport: boolean;
    newFeatures: boolean;
    friendRequests: boolean;
    playlistUpdates: boolean;
    newReleases: boolean;
    concertAlerts: boolean;
    socialActivity: boolean;
  };
  privacy: {
    profileVisibility: string;
    shareListeningData: boolean;
    analyticsTracking: boolean;
    personalizedRecommendations: boolean;
    publicPlaylists: boolean;
    followingList: boolean;
    listeningActivity: boolean;
    allowMessages: boolean;
    showOnlineStatus: boolean;
  };
  subscription: {
    plan: string;
    status: string;
    renewalDate: string;
    cancelAtPeriodEnd: boolean;
    paymentMethod: string;
    billingAddress: string;
    taxInfo: string;
  };
  devices: {
    offlineMode: boolean;
    downloadsQuality: string;
    downloadOnCellular: boolean;
    maxDownloads: number;
    automaticCleanup: boolean;
    syncAcrossDevices: boolean;
    lastSync: string;
  };
  social: {
    connectSpotify: boolean;
    connectApple: boolean;
    connectGoogle: boolean;
    shareToFacebook: boolean;
    shareToTwitter: boolean;
    shareToInstagram: boolean;
    publicProfile: boolean;
    allowFollowers: boolean;
  };
  advanced: {
    clearCache: boolean;
    resetRecommendations: boolean;
    exportData: boolean;
    deleteAccount: boolean;
    twoFactorAuth: boolean;
    sessionTimeout: number;
    apiAccess: boolean;
    developerMode: boolean;
  };
};

type Voice = {
  id: string;
  name: string;
  accent: string;
  tone: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  
  // Custom dropdown states
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] = useState(false);
  const [profileVisibilityDropdownOpen, setProfileVisibilityDropdownOpen] = useState(false);
  const [defaultVoiceDropdownOpen, setDefaultVoiceDropdownOpen] = useState(false);
  const [streamingQualityDropdownOpen, setStreamingQualityDropdownOpen] = useState(false);
  const [downloadQualityDropdownOpen, setDownloadQualityDropdownOpen] = useState(false);
  const [audioFormatDropdownOpen, setAudioFormatDropdownOpen] = useState(false);
  const [equalizerDropdownOpen, setEqualizerDropdownOpen] = useState(false);
  
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      username: "",
      email: "",
      fullName: "",
      avatar: "",
      bio: "",
      location: "",
      website: "",
      birthDate: "",
      gender: "",
      language: "en",
      timezone: "UTC",
    },
    preferences: {
      defaultVoice: "default_en",
      playbackSpeed: 1.0,
      autoPlay: true,
      downloadQuality: "high",
      streamingQuality: "high",
      equalizer: "normal",
      crossfade: false,
      gaplessPlayback: true,
      showLyrics: true,
      normalizeVolume: true,
      audioFormat: "mp3",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      conversionComplete: true,
      weeklyReport: false,
      newFeatures: true,
      friendRequests: true,
      playlistUpdates: true,
      newReleases: true,
      concertAlerts: false,
      socialActivity: true,
    },
    privacy: {
      profileVisibility: "private",
      shareListeningData: false,
      analyticsTracking: true,
      personalizedRecommendations: true,
      publicPlaylists: false,
      followingList: false,
      listeningActivity: false,
      allowMessages: true,
      showOnlineStatus: true,
    },
    subscription: {
      plan: "Free",
      status: "active",
      renewalDate: "2024-12-31",
      cancelAtPeriodEnd: false,
      paymentMethod: "credit_card",
      billingAddress: "",
      taxInfo: "",
    },
    devices: {
      offlineMode: true,
      downloadsQuality: "high",
      downloadOnCellular: false,
      maxDownloads: 10000,
      automaticCleanup: false,
      syncAcrossDevices: true,
      lastSync: "2024-11-20T10:30:00Z",
    },
    social: {
      connectSpotify: false,
      connectApple: false,
      connectGoogle: false,
      shareToFacebook: false,
      shareToTwitter: false,
      shareToInstagram: false,
      publicProfile: false,
      allowFollowers: true,
    },
    advanced: {
      clearCache: false,
      resetRecommendations: false,
      exportData: false,
      deleteAccount: false,
      twoFactorAuth: false,
      sessionTimeout: 24,
      apiAccess: false,
      developerMode: false,
    },
  });

  // Custom dropdown component
  const CustomDropdown = ({ 
    value, 
    options, 
    onChange, 
    placeholder,
    isOpen,
    setIsOpen,
    label
  }: {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    placeholder: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    label: string;
  }) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-xl text-white focus:border-primary-500 focus:outline-none focus:bg-gray-700 transition-all duration-300 appearance-none cursor-pointer text-left flex items-center justify-between"
      >
        <span>{options.find(opt => opt.value === value)?.label || placeholder}</span>
        <svg className="w-4 h-4 text-gray-400 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 20 20">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-white/20 rounded-xl shadow-2xl">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-all duration-200 hover:bg-white/20 ${
                  value === option.value ? 'bg-primary-500/30 text-primary-300' : 'text-white'
                }`}
                style={{
                  backgroundColor: value === option.value ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.custom-dropdown')) {
        setLanguageDropdownOpen(false);
        setGenderDropdownOpen(false);
        setTimezoneDropdownOpen(false);
        setProfileVisibilityDropdownOpen(false);
        setDefaultVoiceDropdownOpen(false);
        setStreamingQualityDropdownOpen(false);
        setDownloadQualityDropdownOpen(false);
        setAudioFormatDropdownOpen(false);
        setEqualizerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update time only on client
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch user data and voices
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        // Fetch user profile
        const profileRes = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setSettings(prev => ({
            ...prev,
            profile: {
              ...prev.profile,
              ...profileData
            }
          }));
        }

        // Fetch voices
        const voicesRes = await fetch("http://localhost:5000/api/voices");
        if (voicesRes.ok) {
          const voicesData = await voicesRes.json();
          if (voicesData.success) {
            setVoices(voicesData.voices);
          }
        }

      } catch (error) {
        console.error("Failed to fetch settings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Save settings error:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "preferences", label: "Audio" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "subscription", label: "Subscription" },
    { id: "devices", label: "Devices" },
    { id: "social", label: "Social" },
    { id: "advanced", label: "Advanced" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-12" style={{ backgroundColor: '#0f172a' }}>
      {/* Header */}
      <section className="relative animate-fade-in mb-8">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4 lg:p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-outfit tracking-tight mb-1">
                  Settings
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Manage Your Account</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Customize your experience, manage preferences, and control your privacy settings
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-gray-400">All settings up to date</span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {currentTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sticky top-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                    activeTab === tab.id
                      ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Profile Information</h2>
                  <p className="text-gray-400">Update your personal information and profile details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={settings.profile.fullName}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, fullName: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={settings.profile.username}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, username: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={settings.profile.bio}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, bio: e.target.value }
                      }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={settings.profile.location}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, location: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={settings.profile.website}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, website: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Birth Date</label>
                    <input
                      type="date"
                      value={settings.profile.birthDate}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, birthDate: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-primary-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="custom-dropdown">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <CustomDropdown
                      value={settings.profile.gender}
                      options={[
                        { value: "", label: "Prefer not to say" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" }
                      ]}
                      onChange={(value) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, gender: value }
                      }))}
                      placeholder="Select gender"
                      isOpen={genderDropdownOpen}
                      setIsOpen={setGenderDropdownOpen}
                      label="Gender"
                    />
                  </div>
                  <div className="custom-dropdown">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                    <CustomDropdown
                      value={settings.profile.language}
                      options={[
                        { value: "en", label: "English" },
                        { value: "es", label: "Spanish" },
                        { value: "fr", label: "French" },
                        { value: "de", label: "German" },
                        { value: "it", label: "Italian" },
                        { value: "pt", label: "Portuguese" },
                        { value: "ja", label: "Japanese" },
                        { value: "ko", label: "Korean" },
                        { value: "zh", label: "Chinese" }
                      ]}
                      onChange={(value) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, language: value }
                      }))}
                      placeholder="Select language"
                      isOpen={languageDropdownOpen}
                      setIsOpen={setLanguageDropdownOpen}
                      label="Language"
                    />
                  </div>
                  <div className="custom-dropdown">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                    <CustomDropdown
                      value={settings.profile.timezone}
                      options={[
                        { value: "UTC", label: "UTC" },
                        { value: "America/New_York", label: "Eastern Time" },
                        { value: "America/Chicago", label: "Central Time" },
                        { value: "America/Denver", label: "Mountain Time" },
                        { value: "America/Los_Angeles", label: "Pacific Time" },
                        { value: "Europe/London", label: "London" },
                        { value: "Europe/Paris", label: "Paris" },
                        { value: "Asia/Tokyo", label: "Tokyo" },
                        { value: "Asia/Shanghai", label: "Shanghai" }
                      ]}
                      onChange={(value) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, timezone: value }
                      }))}
                      placeholder="Select timezone"
                      isOpen={timezoneDropdownOpen}
                      setIsOpen={setTimezoneDropdownOpen}
                      label="Timezone"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Avatar</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl font-bold">
                      {settings.profile.fullName.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <button className="px-6 py-3 bg-gradient-primary hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25 mb-4">
                        Change Avatar
                      </button>
                      <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Audio Preferences */}
            {activeTab === "preferences" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Audio Preferences</h2>
                  <p className="text-gray-400">Customize your listening experience</p>
                </div>

                <div className="space-y-6">
                  <div className="custom-dropdown">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Default Voice</label>
                    <CustomDropdown
                      value={settings.preferences.defaultVoice}
                      options={voices.map(voice => ({ value: voice.id, label: `${voice.name} (${voice.accent})` }))}
                      onChange={(value) => setSettings(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, defaultVoice: value }
                      }))}
                      placeholder="Select voice"
                      isOpen={defaultVoiceDropdownOpen}
                      setIsOpen={setDefaultVoiceDropdownOpen}
                      label="Default Voice"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Default Playback Speed</label>
                    <div className="flex gap-2">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, playbackSpeed: speed }
                          }))}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all duration-300 ${
                            settings.preferences.playbackSpeed === speed
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500 border-primary-500 text-white shadow-lg shadow-primary-500/25'
                              : 'bg-white/5 border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="custom-dropdown">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Streaming Quality</label>
                      <CustomDropdown
                        value={settings.preferences.streamingQuality}
                        options={[
                          { value: "low", label: "Low (96 kbps)" },
                          { value: "normal", label: "Normal (160 kbps)" },
                          { value: "high", label: "High (320 kbps)" },
                          { value: "very-high", label: "Very High (320 kbps)" }
                        ]}
                        onChange={(value) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, streamingQuality: value }
                        }))}
                        placeholder="Select quality"
                        isOpen={streamingQualityDropdownOpen}
                        setIsOpen={setStreamingQualityDropdownOpen}
                        label="Streaming Quality"
                      />
                    </div>
                    <div className="custom-dropdown">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Download Quality</label>
                      <CustomDropdown
                        value={settings.preferences.downloadQuality}
                        options={[
                          { value: "low", label: "Low (96 kbps)" },
                          { value: "normal", label: "Normal (160 kbps)" },
                          { value: "high", label: "High (320 kbps)" },
                          { value: "lossless", label: "Lossless (FLAC)" }
                        ]}
                        onChange={(value) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, downloadQuality: value }
                        }))}
                        placeholder="Select quality"
                        isOpen={downloadQualityDropdownOpen}
                        setIsOpen={setDownloadQualityDropdownOpen}
                        label="Download Quality"
                      />
                    </div>
                    <div className="custom-dropdown">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Audio Format</label>
                      <CustomDropdown
                        value={settings.preferences.audioFormat}
                        options={[
                          { value: "mp3", label: "MP3" },
                          { value: "aac", label: "AAC" },
                          { value: "ogg", label: "OGG" },
                          { value: "flac", label: "FLAC" },
                          { value: "wav", label: "WAV" }
                        ]}
                        onChange={(value) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, audioFormat: value }
                        }))}
                        placeholder="Select format"
                        isOpen={audioFormatDropdownOpen}
                        setIsOpen={setAudioFormatDropdownOpen}
                        label="Audio Format"
                      />
                    </div>
                    <div className="custom-dropdown">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Equalizer Preset</label>
                      <CustomDropdown
                        value={settings.preferences.equalizer}
                        options={[
                          { value: "flat", label: "Flat" },
                          { value: "normal", label: "Normal" },
                          { value: "bass", label: "Bass Boost" },
                          { value: "treble", label: "Treble Boost" },
                          { value: "vocal", label: "Vocal" },
                          { value: "rock", label: "Rock" },
                          { value: "pop", label: "Pop" },
                          { value: "jazz", label: "Jazz" },
                          { value: "classical", label: "Classical" },
                          { value: "electronic", label: "Electronic" }
                        ]}
                        onChange={(value) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, equalizer: value }
                        }))}
                        placeholder="Select preset"
                        isOpen={equalizerDropdownOpen}
                        setIsOpen={setEqualizerDropdownOpen}
                        label="Equalizer Preset"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Playback Options</h3>
                    {[
                      {
                        key: 'autoPlay',
                        title: 'Auto-play next episode',
                        description: 'Automatically play the next audiobook when current one ends'
                      },
                      {
                        key: 'crossfade',
                        title: 'Crossfade tracks',
                        description: 'Smoothly transition between audiobooks'
                      },
                      {
                        key: 'gaplessPlayback',
                        title: 'Gapless playback',
                        description: 'Remove silence between tracks'
                      },
                      {
                        key: 'showLyrics',
                        title: 'Show lyrics',
                        description: 'Display lyrics when available'
                      },
                      {
                        key: 'normalizeVolume',
                        title: 'Normalize volume',
                        description: 'Set the same volume level for all audiobooks'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, [item.key]: !prev.preferences[item.key as keyof typeof prev.preferences] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.preferences[item.key as keyof typeof prev.preferences] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.preferences[item.key as keyof typeof prev.preferences] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Notification Preferences</h2>
                  <p className="text-gray-400">Control how and when you receive notifications</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">General Notifications</h3>
                    {[
                      {
                        key: 'emailNotifications',
                        title: 'Email Notifications',
                        description: 'Receive updates and alerts via email'
                      },
                      {
                        key: 'pushNotifications',
                        title: 'Push Notifications',
                        description: 'Get real-time notifications in your browser'
                      },
                      {
                        key: 'conversionComplete',
                        title: 'Conversion Complete',
                        description: 'Notify when document conversion is finished'
                      },
                      {
                        key: 'weeklyReport',
                        title: 'Weekly Report',
                        description: 'Get a summary of your weekly activity'
                      },
                      {
                        key: 'newFeatures',
                        title: 'New Features',
                        description: 'Be the first to know about new features and updates'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, [item.key]: !prev.notifications[item.key as keyof typeof prev.notifications] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.notifications[item.key as keyof typeof prev.notifications] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.notifications[item.key as keyof typeof prev.notifications] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Social Notifications</h3>
                    {[
                      {
                        key: 'friendRequests',
                        title: 'Friend Requests',
                        description: 'Get notified when someone wants to follow you'
                      },
                      {
                        key: 'playlistUpdates',
                        title: 'Playlist Updates',
                        description: 'Notify when playlists you follow are updated'
                      },
                      {
                        key: 'newReleases',
                        title: 'New Releases',
                        description: 'Get alerts for new audiobook releases from your favorite authors'
                      },
                      {
                        key: 'concertAlerts',
                        title: 'Concert Alerts',
                        description: 'Receive notifications about live events and performances'
                      },
                      {
                        key: 'socialActivity',
                        title: 'Social Activity',
                        description: 'Get notified about likes, comments, and shares'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, [item.key]: !prev.notifications[item.key as keyof typeof prev.notifications] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.notifications[item.key as keyof typeof prev.notifications] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.notifications[item.key as keyof typeof prev.notifications] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Privacy & Security</h2>
                  <p className="text-gray-400">Manage your privacy settings and data sharing preferences</p>
                </div>

                <div className="space-y-6">
                  <div className="custom-dropdown">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Visibility</label>
                    <CustomDropdown
                      value={settings.privacy.profileVisibility}
                      options={[
                        { value: "private", label: "Private" },
                        { value: "friends", label: "Friends Only" },
                        { value: "public", label: "Public" }
                      ]}
                      onChange={(value) => setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, profileVisibility: value }
                      }))}
                      placeholder="Select visibility"
                      isOpen={profileVisibilityDropdownOpen}
                      setIsOpen={setProfileVisibilityDropdownOpen}
                      label="Profile Visibility"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Data Sharing</h3>
                    {[
                      {
                        key: 'shareListeningData',
                        title: 'Share Listening Data',
                        description: 'Allow us to use your listening habits to improve recommendations'
                      },
                      {
                        key: 'analyticsTracking',
                        title: 'Analytics Tracking',
                        description: 'Help us improve the service by allowing anonymous usage tracking'
                      },
                      {
                        key: 'personalizedRecommendations',
                        title: 'Personalized Recommendations',
                        description: 'Get personalized audiobook recommendations based on your preferences'
                      },
                      {
                        key: 'publicPlaylists',
                        title: 'Public Playlists',
                        description: 'Allow others to see and follow your playlists'
                      },
                      {
                        key: 'followingList',
                        title: 'Following List',
                        description: 'Make your following list public'
                      },
                      {
                        key: 'listeningActivity',
                        title: 'Listening Activity',
                        description: 'Share your listening activity with followers'
                      },
                      {
                        key: 'allowMessages',
                        title: 'Allow Messages',
                        description: 'Let other users send you messages'
                      },
                      {
                        key: 'showOnlineStatus',
                        title: 'Show Online Status',
                        description: 'Let others see when you\'re online'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            privacy: { ...prev.privacy, [item.key]: !prev.privacy[item.key as keyof typeof prev.privacy] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.privacy[item.key as keyof typeof prev.privacy] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.privacy[item.key as keyof typeof prev.privacy] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-4">
                    <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                    <p className="text-gray-300 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Devices Settings */}
            {activeTab === "devices" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Device Settings</h2>
                  <p className="text-gray-400">Manage your devices and offline downloads</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Offline Mode</h3>
                    {[
                      {
                        key: 'offlineMode',
                        title: 'Offline Mode',
                        description: 'Enable offline listening for downloaded content'
                      },
                      {
                        key: 'downloadOnCellular',
                        title: 'Download on Cellular',
                        description: 'Allow downloads when using mobile data'
                      },
                      {
                        key: 'automaticCleanup',
                        title: 'Automatic Cleanup',
                        description: 'Remove old downloads automatically when storage is full'
                      },
                      {
                        key: 'syncAcrossDevices',
                        title: 'Sync Across Devices',
                        description: 'Keep your listening position synced across all devices'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            devices: { ...prev.devices, [item.key]: !prev.devices[item.key as keyof typeof prev.devices] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.devices[item.key as keyof typeof prev.devices] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.devices[item.key as keyof typeof prev.devices] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Downloads Quality</label>
                      <select
                        value={settings.devices.downloadsQuality}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          devices: { ...prev.devices, downloadsQuality: e.target.value }
                        }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-primary-500 focus:outline-none transition-colors"
                      >
                        <option value="low">Low (96 kbps)</option>
                        <option value="normal">Normal (160 kbps)</option>
                        <option value="high">High (320 kbps)</option>
                        <option value="lossless">Lossless (FLAC)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Downloads</label>
                      <select
                        value={settings.devices.maxDownloads}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          devices: { ...prev.devices, maxDownloads: parseInt(e.target.value) }
                        }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-primary-500 focus:outline-none transition-colors"
                      >
                        <option value="1000">1,000 songs</option>
                        <option value="5000">5,000 songs</option>
                        <option value="10000">10,000 songs</option>
                        <option value="50000">50,000 songs</option>
                        <option value="100000">100,000 songs</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-medium mb-2">Last Sync</h4>
                    <p className="text-gray-400 text-sm">{new Date(settings.devices.lastSync).toLocaleString()}</p>
                    <button className="mt-3 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors">
                      Sync Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Social Settings */}
            {activeTab === "social" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Social Connections</h2>
                  <p className="text-gray-400">Connect your accounts and manage social preferences</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Connected Accounts</h3>
                    {[
                      {
                        key: 'connectSpotify',
                        title: 'Spotify',
                        description: 'Connect your Spotify account to import playlists'
                      },
                      {
                        key: 'connectApple',
                        title: 'Apple Music',
                        description: 'Connect your Apple Music account'
                      },
                      {
                        key: 'connectGoogle',
                        title: 'Google',
                        description: 'Connect your Google account for easy login'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-6">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            social: { ...prev.social, [item.key]: !prev.social[item.key as keyof typeof prev.social] }
                          }))}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            settings.social[item.key as keyof typeof prev.social]
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-primary-500 hover:bg-primary-600 text-white'
                          }`}
                        >
                          {settings.social[item.key as keyof typeof prev.social] ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Social Sharing</h3>
                    {[
                      {
                        key: 'shareToFacebook',
                        title: 'Facebook',
                        description: 'Share your listening activity on Facebook'
                      },
                      {
                        key: 'shareToTwitter',
                        title: 'Twitter/X',
                        description: 'Share your listening activity on Twitter'
                      },
                      {
                        key: 'shareToInstagram',
                        title: 'Instagram',
                        description: 'Share stories about your favorite audiobooks'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-6">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            social: { ...prev.social, [item.key]: !prev.social[item.key as keyof typeof prev.social] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.social[item.key as keyof typeof prev.social] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.social[item.key as keyof typeof prev.social] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Profile Settings</h3>
                    {[
                      {
                        key: 'publicProfile',
                        title: 'Public Profile',
                        description: 'Make your profile visible to everyone'
                      },
                      {
                        key: 'allowFollowers',
                        title: 'Allow Followers',
                        description: 'Let other users follow your activity'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-6">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            social: { ...prev.social, [item.key]: !prev.social[item.key as keyof typeof prev.social] }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.social[item.key as keyof typeof prev.social] ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.social[item.key as keyof typeof prev.social] ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === "advanced" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Advanced Settings</h2>
                  <p className="text-gray-400">Advanced options and account management</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Security</h3>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                      <div>
                        <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, twoFactorAuth: !prev.advanced.twoFactorAuth }
                        }))}
                        className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                          settings.advanced.twoFactorAuth ? 'bg-primary-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                          settings.advanced.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (hours)</label>
                      <select
                        value={settings.advanced.sessionTimeout}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          advanced: { ...prev.advanced, sessionTimeout: parseInt(e.target.value) }
                        }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-primary-500 focus:outline-none transition-colors"
                      >
                        <option value="1">1 hour</option>
                        <option value="6">6 hours</option>
                        <option value="12">12 hours</option>
                        <option value="24">24 hours</option>
                        <option value="168">1 week</option>
                        <option value="720">1 month</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <h4 className="text-white font-medium">API Access</h4>
                          <p className="text-gray-400 text-sm">Enable API access for developers</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, apiAccess: !prev.advanced.apiAccess }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.advanced.apiAccess ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.advanced.apiAccess ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <h4 className="text-white font-medium">Developer Mode</h4>
                          <p className="text-gray-400 text-sm">Enable experimental features</p>
                        </div>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, developerMode: !prev.advanced.developerMode }
                          }))}
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.advanced.developerMode ? 'bg-primary-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            settings.advanced.developerMode ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Data Management</h3>
                    {[
                      {
                        key: 'clearCache',
                        title: 'Clear Cache',
                        description: 'Clear temporary files and cached data',
                        action: () => alert('Cache cleared successfully!')
                      },
                      {
                        key: 'resetRecommendations',
                        title: 'Reset Recommendations',
                        description: 'Reset your personalized recommendations',
                        action: () => alert('Recommendations reset successfully!')
                      },
                      {
                        key: 'exportData',
                        title: 'Export Data',
                        description: 'Download all your data in JSON format',
                        action: () => alert('Data export started!')
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={item.action}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                        >
                          Execute
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                    <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                    <p className="text-gray-300 text-sm mb-4">Irreversible actions that will permanently affect your account.</p>
                    <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300">
                      Delete Account Permanently
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Settings */}
            {activeTab === "subscription" && (
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-outfit tracking-tight">Subscription Management</h2>
                  <p className="text-gray-400">Manage your subscription plan and billing</p>
                </div>

                <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{settings.subscription.plan} Plan</h3>
                      <p className="text-gray-300">
                        {settings.subscription.plan === "Free" 
                          ? "Basic features with 100MB storage" 
                          : "Unlimited features with 10GB storage"}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      settings.subscription.status === "active" 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                    }`}>
                      {settings.subscription.status}
                    </div>
                  </div>

                  {settings.subscription.plan === "Free" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl">
                          <h4 className="text-white font-medium mb-2">Current Limits</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 100MB storage</li>
                            <li>• 10 conversions per month</li>
                            <li>• Basic voices only</li>
                            <li>• Standard quality</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-primary-500/10 rounded-xl">
                          <h4 className="text-primary-400 font-medium mb-2">Pro Benefits</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 10GB storage</li>
                            <li>• Unlimited conversions</li>
                            <li>• Premium voices</li>
                            <li>• High quality audio</li>
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push("/pricing")}
                        className="w-full px-6 py-4 bg-gradient-primary hover:scale-105 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
                      >
                        Upgrade to Pro - $9.99/month
                      </button>
                    </div>
                  )}

                  {settings.subscription.plan === "Pro" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="text-gray-300 text-sm">Next billing date</p>
                          <p className="text-white font-medium">{settings.subscription.renewalDate}</p>
                        </div>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors">
                          Change Plan
                        </button>
                      </div>
                      
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <p className="text-yellow-400 text-sm font-medium flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {settings.subscription.cancelAtPeriodEnd 
                            ? "Your subscription will cancel at the end of the billing period."
                            : "Your subscription will automatically renew."}
                        </p>
                      </div>

                      <button
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          subscription: { ...prev.subscription, cancelAtPeriodEnd: !prev.subscription.cancelAtPeriodEnd }
                        }))}
                        className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl transition-all duration-300 border border-red-500/30"
                      >
                        {settings.subscription.cancelAtPeriodEnd ? "Resume Subscription" : "Cancel Subscription"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: "2024-11-01", amount: "$9.99", status: "Paid", description: "Pro Plan - Monthly" },
                      { date: "2024-10-01", amount: "$9.99", status: "Paid", description: "Pro Plan - Monthly" },
                      { date: "2024-09-01", amount: "$9.99", status: "Paid", description: "Pro Plan - Monthly" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                        <div>
                          <p className="text-white font-medium">{invoice.description}</p>
                          <p className="text-gray-400 text-sm">{invoice.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white font-medium">{invoice.amount}</span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                            {invoice.status}
                          </span>
                          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-between pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Changes are saved automatically. Last saved: {currentTime}
              </p>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-gradient-primary hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

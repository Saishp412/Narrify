"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [userToken, setUserToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    router.push("/");
  };

  return (
    <main 
      className="min-h-screen text-gray-100 overflow-hidden" 
      style={{ backgroundColor: '#0a0f1c' }}
    >
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-radial opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-8 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold leading-tight text-white">
                Transform Your
                <span className="block text-primary-400">Documents into</span>
                <span className="block text-accent-400">Immersive Audio</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Narrify revolutionizes how you consume content. Convert any document into high-quality, natural-sounding audiobooks with AI-powered narration that brings your text to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {userToken ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="relative px-8 py-4 text-white font-light transition-all duration-300 hover:scale-105"
                      style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                      onMouseEnter={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '0';
                      }}
                    >
                      <span className="relative z-10">Go to Dashboard<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                    <button
                      onClick={handleLogout}
                      className="relative px-8 py-4 text-gray-400 font-light transition-all duration-300 hover:scale-105 hover:text-white"
                      style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                      onMouseEnter={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '0';
                      }}
                    >
                      <span className="relative z-10">Logout<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                    <button
                      onClick={() => router.push("/auth/register")}
                      className="relative px-8 py-4 text-white font-light transition-all duration-300 hover:scale-105"
                      style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                      onMouseEnter={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '0';
                      }}
                    >
                      <span className="relative z-10">Get Started Free<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                    <button
                      onClick={() => router.push("/auth/login")}
                      className="relative px-8 py-4 text-gray-400 font-light transition-all duration-300 hover:scale-105 hover:text-white"
                      style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                      onMouseEnter={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '0';
                      }}
                    >
                      <span className="relative z-10">Sign In<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D8MTF8c3VlcmFtZW5kYXRl&auto=format&fit=crop&w=100&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D8MTF8c3VlcmFtZW5kYXRl&auto=format&fit=crop&w=100&q=80", 
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D8MTF8c3VlcmFtZW5kYXRl&auto=format&fit=crop&w=100&q=80",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D8MTF8c3VlcmFtZW5kYXRl&auto=format&fit=crop&w=100&q=80"
                ].map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-12 h-12 rounded-full border-3 border-dark-primary overflow-hidden"
                  >
                    <img 
                      src={imageUrl} 
                      alt={`User ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' fill='%2314b8a6'/%3E%3Ccircle cx='24' cy='20' r='8' fill='%23f3f4f6'/%3E%3Cpath d='M8 40c0-8 7-14 16-14s16 6 16 14' fill='%23f3f4f6'/%3E%3C/svg%3E`;
                      }}
                    />
                    <div className="absolute inset-0 border-2 border-primary-500/30 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-primary-400 font-semibold">10,000+</span> users already listening
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:block animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl animate-pulse-slow" />
              <div className="relative h-[500px] rounded-3xl border border-primary-500/20 bg-dark-card/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
                
                {/* App Interface Mockup */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-light tracking-wide font-brand">NARRIFY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-gray-400">Live</span>
                    </div>
                  </div>

                  {/* Document Upload Area */}
                  <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-dashed border-white/20 shadow-xl p-8 flex flex-col items-center justify-center mb-6">
                    <svg className="w-16 h-16 text-primary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <h3 className="text-white font-semibold mb-2">Drop your documents here</h3>
                    <p className="text-gray-400 text-sm text-center">PDF, DOCX, TXT • Up to 100MB</p>
                  </div>

                  {/* Recent Files */}
                  <div className="space-y-3">
                    <h4 className="text-white font-medium text-sm">Recent Conversions</h4>
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl">
                        <div className="w-8 h-8 rounded bg-primary-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">Research Paper.pdf</div>
                          <div className="text-gray-500 text-xs">Converted 2 hours ago • 15 min</div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl">
                        <div className="w-8 h-8 rounded bg-accent-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">Course Notes.docx</div>
                          <div className="text-gray-500 text-xs">Converted yesterday • 8 min</div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Audio Waveform Animation */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl">
                      <div className="flex gap-1 flex-1">
                        {[4, 8, 12, 16, 20, 16, 12, 8, 4, 6, 10, 14, 18, 14, 10, 6, 8, 12, 16, 12].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-primary rounded-full animate-pulse"
                            style={{
                              height: `${height}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-primary-400 font-medium">Now Playing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Documents Converted" },
              { number: "1M+", label: "Minutes Listened" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for
              <span className="block text-primary-400">Modern Learning</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to transform your reading experience into an immersive audio journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Smart Document Processing",
                desc: "Support for PDFs, Word documents, text files, and more with intelligent formatting preservation.",
                gradient: "from-primary-400 to-primary-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: "Natural AI Voices",
                desc: "Advanced text-to-speech with multiple voice options, accents, and customizable speaking styles.",
                gradient: "from-accent-400 to-accent-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast Conversion",
                desc: "Transform documents into audiobooks in seconds with our optimized processing pipeline.",
                gradient: "from-primary-400 to-accent-400"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Cross-Device Sync",
                desc: "Seamlessly sync your progress across all devices - phone, tablet, desktop, and smart speakers.",
                gradient: "from-accent-400 to-primary-400"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Smart Playback Controls",
                desc: "Adjust speed, skip sections, create bookmarks, and use intelligent chapter detection.",
                gradient: "from-primary-600 to-accent-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure & Private",
                desc: "Bank-level encryption for your documents with GDPR-compliant data handling.",
                gradient: "from-accent-600 to-primary-600"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-dark-border bg-dark-card/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="relative">
                  <div className="text-primary-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How Narrify
              <span className="block text-primary-400">Works in 3 Steps</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get started in minutes and transform your document consumption forever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload Your Documents",
                desc: "Simply drag and drop or browse your files. We support PDF, DOCX, TXT, and many more formats.",
                details: ["Multiple file formats", "Batch upload", "Cloud storage integration"],
                gradient: "from-primary-400 to-primary-600"
              },
              {
                step: "02",
                title: "AI-Powered Conversion",
                desc: "Our advanced AI processes your content, preserving formatting and generating natural-sounding audio.",
                details: ["Smart formatting", "Multiple voice options", "Language detection"],
                gradient: "from-accent-400 to-accent-600"
              },
              {
                step: "03",
                title: "Listen Anywhere",
                desc: "Access your audiobooks on any device with automatic progress sync and intelligent playback controls.",
                details: ["Cross-device sync", "Offline download", "Smart bookmarks"],
                gradient: "from-primary-400 to-accent-400"
              },
            ].map((item, index) => (
              <div key={index} className="relative animate-slide-in-right" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`absolute -inset-4 bg-gradient-to-br ${item.gradient} opacity-10 rounded-2xl blur-xl`} />
                <div className="relative bg-dark-card border border-dark-border rounded-2xl p-8">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by
              <span className="block text-primary-400">Users Worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Graduate Student",
                content: "Narrify has completely transformed how I study. I can listen to research papers while commuting, saving hours every week.",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "Business Executive",
                content: "Perfect for staying updated with industry reports. The voice quality is surprisingly natural, and the mobile app is fantastic.",
                rating: 5
              },
              {
                name: "Emily Thompson",
                role: "Content Creator",
                content: "I use Narrify to review my blog posts by listening to them. It helps me catch awkward phrasing I'd miss when reading.",
                rating: 5
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-dark-card border border-dark-border rounded-2xl p-8 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-gradient-primary" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent
              <span className="block text-primary-400">Pricing</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees or surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "₹0",
                features: ["5 documents/month", "Basic voices", "Mobile app", "Progress sync"],
                highlighted: false
              },
              {
                name: "Pro",
                price: "₹799",
                features: ["Unlimited documents", "Premium voices", "Batch processing", "Priority support"],
                highlighted: true
              },
              {
                name: "Team",
                price: "₹2,399",
                features: ["Everything in Pro", "Team collaboration", "Admin dashboard", "Custom voices"],
                highlighted: false
              },
            ].map((plan, index) => (
              <div key={index} className={`relative ${plan.highlighted ? 'scale-105' : ''} animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                {plan.highlighted && (
                  <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 blur-xl" />
                )}
                <div className={`relative bg-dark-card border ${plan.highlighted ? 'border-primary-500' : 'border-dark-border'} rounded-2xl p-8`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary-400 mb-6">{plan.price}<span className="text-lg text-gray-400">/month</span></div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-primary-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                    <button className={`w-full py-3 transition-all duration-300 ${plan.highlighted ? 'text-white hover:scale-105' : 'text-gray-400 hover:text-white hover:scale-105'} font-brand-light`} style={{ letterSpacing: '0.05em' }}
                      onMouseEnter={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '100%';
                      }}
                      onMouseLeave={(e) => {
                        const underline = e.currentTarget.querySelector('.button-underline');
                        if (underline) underline.style.width = '0';
                      }}
                    >
                      <span className="relative z-10">{plan.name}<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-dark-border">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl blur-3xl" />
            <div className="relative bg-dark-card border border-primary-500/20 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your
                <span className="block text-primary-400">Reading Experience?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already consuming content more efficiently with <span className="font-bold">Narrify</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <button
                    onClick={() => router.push("/auth/register")}
                    className="relative px-8 py-4 text-white font-brand-light transition-all duration-300 hover:scale-105"
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector('.button-underline');
                      if (underline) underline.style.width = '100%';
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector('.button-underline');
                      if (underline) underline.style.width = '0';
                    }}
                  >
                    <span className="relative z-10">Start Free Trial<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="relative px-8 py-4 text-gray-400 font-brand-light transition-all duration-300 hover:scale-105 hover:text-white"
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector('.button-underline');
                      if (underline) underline.style.width = '100%';
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector('.button-underline');
                      if (underline) underline.style.width = '0';
                    }}
                  >
                    <span className="relative z-10">View Demo<div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

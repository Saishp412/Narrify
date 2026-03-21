"use client";

export default function FeaturesPage() {
  return (
    <main 
      className="min-h-screen text-gray-100" 
      style={{ backgroundColor: '#0a0f1c' }}
    >
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        <div className="relative mx-auto max-w-7xl px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-white">
              Powerful
              <span className="block text-primary-400">Features</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to transform your reading experience into an immersive audio journey
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The essential tools that make Narrify revolutionary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Smart Document Processing",
                desc: "Intelligent parsing that preserves formatting, tables, and structure while converting to audio.",
                features: ["PDF, DOCX, TXT support", "Format preservation", "Chapter detection", "Image descriptions"],
                gradient: "from-primary-400 to-primary-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: "Natural AI Voices",
                desc: "Advanced text-to-speech with multiple voice options and customizable speaking styles.",
                features: ["Multiple voice options", "Accent variations", "Speed control", "Emotional tone"],
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
                features: ["Instant processing", "Batch conversion", "Cloud-based", "Real-time preview"],
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
                features: ["Real-time sync", "Offline access", "Multi-device support", "Cloud storage"],
                gradient: "from-accent-400 to-primary-400"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Smart Playback Controls",
                desc: "Advanced playback features including bookmarks, speed adjustment, and intelligent skipping.",
                features: ["Variable speed", "Bookmarks", "Chapter navigation", "Sleep timer"],
                gradient: "from-primary-600 to-accent-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Enterprise Security",
                desc: "Bank-level encryption and compliance with privacy regulations to protect your data.",
                features: ["End-to-end encryption", "GDPR compliant", "2FA authentication", "Data privacy"],
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
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-primary-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional features for power users and teams
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Voice Customization",
                desc: "Fine-tune every aspect of the audio experience to match your preferences.",
                details: [
                  "Pitch and tone adjustment",
                  "Speaking rate control",
                  "Pause duration settings",
                  "Voice gender selection",
                  "Language-specific optimization"
                ],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2h4a2 2 0 012 2v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V9a2 2 0 012-2zm-6 0a2 2 0 012 2h4a2 2 0 012 2v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V9a2 2 0 012-2zm-6 0a2 2 0 012 2h4a2 2 0 012 2v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V9a2 2 0 012-2z" />
                  </svg>
                )
              },
              {
                title: "Collaboration Tools",
                desc: "Work together with your team to create and share audiobook libraries.",
                details: [
                  "Shared workspaces",
                  "Team libraries",
                  "Comment and annotation",
                  "Version control",
                  "Access permissions"
                ],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Analytics & Insights",
                desc: "Track your listening habits and optimize your learning experience.",
                details: [
                  "Listening statistics",
                  "Progress tracking",
                  "Completion rates",
                  "Time analysis",
                  "Productivity insights"
                ],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Integration Ecosystem",
                desc: "Connect Narrify with your favorite tools and workflows.",
                details: [
                  "Calendar integration",
                  "Note-taking apps",
                  "Cloud storage sync",
                  "API access",
                  "Zapier automation"
                ],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l4-4a4 4 0 000-5.656zm1.414-1.414a2 2 0 112.828 2.828M10 11a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex gap-8 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-4xl">
                  {feature.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
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

      {/* Platform Support */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Available Everywhere
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Access your audiobooks on any device, anytime
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "iOS", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ), desc: "iPhone & iPad" },
              { name: "Android", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ), desc: "Phones & Tablets" },
              { name: "Web", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9 9m9-9c1.657 0 3-4.03 7-8.972m-7 8.972V21a2 2 0 002 2h14a2 2 0 002-2v-8.972" />
                  </svg>
                ), desc: "Browser Access" },
              { name: "Desktop", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ), desc: "Mac & Windows" },
              { name: "Smart Speakers", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010-7.072m0 0a5 5 0 007.072 7.072m-7.072 0a5 5 0 007.072 7.072M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), desc: "Alexa & Google" },
              { name: "CarPlay", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ), desc: "In-Car Audio" },
              { name: "Wearables", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), desc: "Apple Watch" },
              { name: "TV", icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ), desc: "Smart TV Apps" },
            ].map((platform, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-3xl">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                  <p className="text-gray-500 text-sm">{platform.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how Narrify fits into your workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Students",
                desc: "Study more efficiently by listening to textbooks, research papers, and course materials.",
                benefits: ["Commuting study time", "Accessibility support", "Better retention", "Multi-tasking"]
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Professionals",
                desc: "Stay updated with industry reports, business documents, and professional development content.",
                benefits: ["Time optimization", "Continuous learning", "Meeting preparation", "Industry insights"]
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Researchers",
                desc: "Process academic papers and research documents faster with audio-based review.",
                benefits: ["Literature review", "Data analysis", "Peer review", "Conference prep"]
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
                title: "Content Creators",
                desc: "Review and edit your written content by listening to it for better flow and clarity.",
                benefits: ["Content review", "Editing assistance", "Quality control", "Audience testing"]
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Book Lovers",
                desc: "Convert your favorite books and articles into audiobooks for on-the-go listening.",
                benefits: ["Digital library", "Reading accessibility", "Travel companion", "Bedtime stories"]
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Language Learners",
                desc: "Improve pronunciation and comprehension by listening to content in your target language.",
                benefits: ["Pronunciation practice", "Vocabulary building", "Listening skills", "Cultural immersion"]
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary-400 mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{useCase.desc}</p>
                <div className="space-y-2">
                  {useCase.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl blur-3xl" />
            <div className="relative bg-dark-card border border-primary-500/20 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Start your free trial today and discover a new way to consume content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <a
                    href="/auth/register"
                    className="relative px-8 py-4 text-white font-light transition-all duration-300 hover:scale-105"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                  >
                    <span className="relative z-10">Start Free Trial</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <a
                    href="/pricing"
                    className="relative px-8 py-4 text-gray-400 font-light transition-all duration-300 hover:scale-105 hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                  >
                    <span className="relative z-10">View Pricing</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

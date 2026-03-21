"use client";

export default function AboutPage() {
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
              About
              <span className="block text-primary-400">Narrify</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how people consume content, making knowledge accessible through the power of audio.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl font-bold text-white">
                Our Story
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Founded in 2023, Narrify emerged from a simple observation: in our fast-paced world, finding time to read is increasingly challenging. Yet the hunger for knowledge and information has never been greater.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our team of AI researchers, audio engineers, and education specialists came together with a shared vision: to break down barriers to knowledge consumption by transforming written content into immersive audio experiences.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we're proud to serve thousands of users worldwide, helping students, professionals, and lifelong learners access content in a way that fits their busy lives.
              </p>
            </div>
            
            {/* Team Image */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl" />
                <div className="relative h-[400px] rounded-3xl border border-primary-500/20 overflow-hidden bg-dark-secondary">
                  <img 
                    src="https://www.shutterstock.com/image-photo/diverse-team-collaborates-passionately-bright-600nw-2654596535.jpg" 
                    alt="Narrify Team Working Together"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.src = "data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%230a0f1c'/%3E%3Crect x='50' y='100' width='300' height='200' rx='10' fill='%231a202c' opacity='0.8'/%3E%3Crect x='70' y='120' width='260' height='160' rx='8' fill='%2314b8a6' opacity='0.9'/%3E%3Ccircle cx='150' cy='200' r='30' fill='%23f97316' opacity='0.7'/%3E%3Ccircle cx='250' cy='200' r='30' fill='%23f97316' opacity='0.7'/%3E%3Cpath d='M130 200L170 200M230 200L270 200' stroke='%23f3f4f6' stroke-width='2'/%3E%3Ctext x='200' y='220' font-family='Arial' font-size='14' fill='%23f3f4f6' text-anchor='middle'%3EAI-Powered Content Creation%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-dark-primary/90 backdrop-blur-sm rounded-lg p-4 border border-primary-500/30 shadow-lg">
                      <p className="text-white font-bold text-sm text-center leading-relaxed drop-shadow-lg">
                        Our diverse team passionately collaborating to innovate audio content
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Guiding principles that drive everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Accessibility First",
                desc: "Making knowledge accessible to everyone, regardless of learning style or time constraints.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Quality Excellence",
                desc: "Delivering the highest quality audio experience with natural, engaging narration.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              },
              {
                title: "Innovation Driven",
                desc: "Continuously pushing the boundaries of what's possible with AI and audio technology.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "User Privacy",
                desc: "Protecting user data with enterprise-grade security and transparent policies.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: "Continuous Learning",
                desc: "Always improving our technology based on user feedback and research.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#14b8a6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Global Impact",
                desc: "Supporting multiple languages and diverse content from around the world.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-dark-border bg-dark-card/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary-400 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technology & Innovation
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Cutting-edge AI technology powering the future of audio content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h3 className="text-3xl font-bold text-white mb-6">
                Advanced AI Technology
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our proprietary AI technology combines state-of-the-art natural language processing with advanced speech synthesis to create the most natural-sounding audio content available today.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Neural Text-to-Speech",
                    desc: "Deep learning models that understand context and emotion in text"
                  },
                  {
                    title: "Contextual Understanding",
                    desc: "AI that comprehends document structure and content meaning"
                  },
                  {
                    title: "Voice Adaptation",
                    desc: "Dynamic voice adjustment based on content type and user preferences"
                  },
                  {
                    title: "Real-time Processing",
                    desc: "Lightning-fast conversion without compromising quality"
                  }
                ].map((tech, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{tech.title}</h4>
                      <p className="text-gray-400 text-sm">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-accent opacity-20 rounded-3xl blur-3xl" />
                <div className="relative h-[400px] rounded-3xl border border-accent-500/20 overflow-hidden bg-dark-secondary">
                  <img 
                    src="https://www.simplepinmedia.com/wp-content/uploads/2023/11/ai-on-pinterest.png" 
                    alt="AI Technology Visualization"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.src = "data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%230a0f1c'/%3E%3Ccircle cx='200' cy='200' r='80' fill='%23f97316' opacity='0.3'/%3E%3Ccircle cx='200' cy='200' r='60' fill='%2314b8a6' opacity='0.5'/%3E%3Cpath d='M200 140L200 260M140 200L260 200' stroke='%23f3f4f6' stroke-width='3'/%3E%3Ctext x='200' y='350' font-family='Arial' font-size='16' fill='%23f3f4f6' text-anchor='middle'%3EAI-Powered Innovation%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-dark-primary/90 backdrop-blur-sm rounded-lg p-4 border border-accent-500/30 shadow-lg">
                      <p className="text-white font-bold text-sm text-center leading-relaxed" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)' }}>
                        Advanced AI algorithms transforming text into natural speech
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-400">
              Numbers that tell our story
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Documents Converted" },
              { number: "1M+", label: "Minutes Listened" },
              { number: "99.9%", label: "Uptime" },
              { number: "25+", label: "Supported Languages" },
              { number: "15+", label: "Voice Options" },
              { number: "4.9/5", label: "User Rating" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
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
                Join Our Journey
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We're just getting started. Be part of the future of content consumption.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <a
                    href="/auth/register"
                    className="relative px-8 py-4 text-white font-light transition-all duration-300 hover:scale-105"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                  >
                    <span className="relative z-10">Get Started Free</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <a
                    href="/careers"
                    className="relative px-8 py-4 text-gray-400 font-light transition-all duration-300 hover:scale-105 hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                  >
                    <span className="relative z-10">Work With Us</span>
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

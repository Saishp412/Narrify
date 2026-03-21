"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              Get in
              <span className="block text-primary-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
                <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                    Send us a message
                  </h2>
                  
                  {isMounted && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/30 transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/30 transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary-500/30 transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/30 transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
                      <button
                        type="submit"
                        className="relative w-full py-3 text-white font-light transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                      >
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                      </button>
                    </div>
                  </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-20 animate-slide-in-right">
              {/* Quick Contact */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
                <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500">Email</div>
                        <a href="mailto:support@narrify.com" className="text-primary-400 hover:text-primary-300 transition-colors font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                          support@narrify.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500">Phone</div>
                        <a href="tel:+1234567890" className="text-primary-400 hover:text-primary-300 transition-colors font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500">Office</div>
                        <div className="text-gray-300 font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>123 Tech Street, Silicon Valley, CA 94025</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-8"></div>

              {/* Social Media */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
                <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                    Follow Us
                  </h3>
                  <p className="text-gray-400 mb-6 text-center font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                    Stay connected and get the latest updates
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="https://instagram.com/narrify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group flex items-center gap-3 p-4 bg-dark-secondary/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358.2 6.78 2.618 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                          <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                          <circle cx="18.406" cy="5.594" r="1.44"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-medium">Instagram</div>
                        <div className="text-gray-500 text-sm">@narrify</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                      href="https://twitter.com/narrify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group flex items-center gap-3 p-4 bg-dark-secondary/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-medium">X (Twitter)</div>
                        <div className="text-gray-500 text-sm">@narrify</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                      href="https://facebook.com/narrify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group flex items-center gap-3 p-4 bg-dark-secondary/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-2.083c-2.088.062-4.093-.124-6.043-.371v2.083c2.058-.247 4.019-.333 6.043-.371 3.875.617 7.125 2.875 8.625 6.875 0 0 2.875-2.5 8.625-6.875 3.5-4 6.75-6.258 8.625-6.875zm-3.875 0c0 1.5-.75 2.5-2.125 2.5s-2.125-1-2.125-2.5c0-1.5.75-2.5 2.125-2.5s2.125 1 2.125 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-medium">Facebook</div>
                        <div className="text-gray-500 text-sm">@narrify</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="h-8"></div>

              {/* Support Hours */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
                <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '8px' }}>
                    Support Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Monday - Friday</span>
                      <span className="text-white font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Saturday</span>
                      <span className="text-white font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Sunday</span>
                      <span className="text-white font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                    <p className="text-sm text-primary-400 font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                      <strong>Emergency Support:</strong> For critical issues, email emergency@narrify.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-4xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly do you respond to support requests?",
                answer: "We typically respond to all support inquiries within 24 hours during business days. Premium and Enterprise customers receive priority support with faster response times."
              },
              {
                question: "What file formats do you support?",
                answer: "Narrify supports PDF, DOCX, TXT, EPUB, and many other document formats. We're constantly adding support for new file types based on user feedback."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
              },
              {
                question: "Do you offer custom voice options?",
                answer: "We offer a variety of natural-sounding voices in multiple languages. Enterprise customers can request custom voice training for their specific needs."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

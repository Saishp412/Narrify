"use client";

import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const [plans] = useState([
    {
      id: "free",
      name: "Free",
      price: { monthly: "₹0", annual: "₹0" },
      description: "Perfect for getting started",
      features: [
        "5 documents per month",
        "Basic voice options",
        "Mobile app access",
        "Progress sync",
        "Email support"
      ],
      cta: "Get Started"
    },
    {
      id: "pro",
      name: "Pro",
      price: { monthly: "₹799", annual: "₹639" },
      description: "For serious learners and professionals",
      features: [
        "Unlimited documents",
        "Premium voice library",
        "High-quality audio",
        "Batch processing",
        "Priority support",
        "Custom playback speeds",
        "Advanced bookmarks",
        "Cross-device sync"
      ],
      limitations: [],
      cta: "Start Free Trial"
    },
    {
      id: "team",
      name: "Team",
      price: { monthly: "₹2,399", annual: "₹1,999" },
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Centralized billing",
        "Custom voice training",
        "API access",
        "SSO integration",
        "Dedicated support"
      ],
      limitations: [],
      cta: "Contact Sales"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For large organizations",
      features: [
        "Everything in Team",
        "Unlimited users",
        "Custom integrations",
        "On-premise options",
        "White-label solution",
        "SLA guarantee",
        "Custom contracts",
        "24/7 phone support"
      ],
      limitations: [],
      cta: "Talk to Sales"
    }
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <main 
      className="min-h-screen text-gray-100" 
      style={{ backgroundColor: '#0a0f1c' }}
    >
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        <div className="relative mx-auto max-w-7xl px-8">
          <div className="text-center space-y-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-white">
              Simple, Transparent
              <span className="block text-primary-400">Pricing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Choose the plan that fits your needs. Start free and scale as you grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl p-1">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative px-6 py-2 font-light transition-all duration-300 hover:scale-105 rounded-full ${
                    billingCycle === "monthly"
                      ? "text-white bg-white/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                >
                  <span className="relative z-10">Monthly</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`relative px-6 py-2 font-light transition-all duration-300 hover:scale-105 rounded-full ${
                    billingCycle === "annual"
                      ? "text-white bg-white/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                >
                  <span className="relative z-10">Annual</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                </button>
              </div>
              {billingCycle === "annual" && (
                <div className="text-center animate-fade-in">
                  <span className="text-accent-400 text-sm font-light" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                    You save 20% on annual offer
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative animate-slide-up cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'transform scale-105 shadow-2xl shadow-primary-500/30' 
                    : 'hover:transform hover:scale-102 hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className={`relative h-full bg-dark-card border rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'border-primary-500 bg-primary-500/5'
                    : 'border-dark-border hover:border-primary-500/30'
                }`}>
                  
                  <div className="space-y-6 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
                    </div>
                    
                    <div>
                      <div className="text-4xl font-bold text-primary-400">
                        {plan.price[billingCycle] === "Custom" ? (
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-medium text-gray-300">Custom Pricing</span>
                          </div>
                        ) : (
                          <>
                            {plan.price[billingCycle]}
                            <span className="text-lg text-gray-400">/month</span>
                          </>
                        )}
                      </div>
                      {billingCycle === "annual" && plan.price[billingCycle] !== "Custom" && (
                        <div className="text-xs text-accent-400 mt-2 font-medium">
                          Billed annually
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-primary-400" />
                            </div>
                            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle plan selection
                        }}
                        className={`w-full py-3 font-light transition-all duration-300 ${
                          selectedPlan === plan.id
                            ? 'text-white hover:scale-105' 
                            : 'text-gray-400 hover:text-white hover:scale-105'
                        }`} 
                        style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                      >
                        <span className="relative z-10">{plan.cta}</span>
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Compare Features
            </h2>
            <p className="text-xl text-gray-400">
              Detailed breakdown of what each plan includes
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left p-6 text-gray-400 font-medium">Feature</th>
                    <th className="text-center p-6 text-gray-400 font-medium">Free</th>
                    <th className="text-center p-6 text-primary-400 font-medium">Pro</th>
                    <th className="text-center p-6 text-gray-400 font-medium">Team</th>
                    <th className="text-center p-6 text-gray-400 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Documents per month", free: "5", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
                    { feature: "File size limit", free: "10MB", pro: "100MB", team: "500MB", enterprise: "Unlimited" },
                    { feature: "Voice options", free: "2 Basic", pro: "10 Premium", team: "20 Premium", enterprise: "Custom" },
                    { feature: "Audio quality", free: "Standard", pro: "High", team: "High", enterprise: "Studio" },
                    { feature: "Batch processing", free: "❌", pro: "✅", team: "✅", enterprise: "✅" },
                    { feature: "Cross-device sync", free: "✅", pro: "✅", team: "✅", enterprise: "✅" },
                    { feature: "Custom voices", free: "❌", pro: "❌", team: "✅", enterprise: "✅" },
                    { feature: "API access", free: "❌", pro: "❌", team: "✅", enterprise: "✅" },
                    { feature: "Team collaboration", free: "❌", pro: "❌", team: "✅", enterprise: "✅" },
                    { feature: "Priority support", free: "❌", pro: "✅", team: "✅", enterprise: "✅" },
                    { feature: "Dedicated account manager", free: "❌", pro: "❌", team: "❌", enterprise: "✅" },
                    { feature: "SLA guarantee", free: "❌", pro: "❌", team: "❌", enterprise: "✅" },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-dark-border/50">
                      <td className="p-6 text-gray-300">{row.feature}</td>
                      <td className="p-6 text-center text-gray-400">{row.free}</td>
                      <td className="p-6 text-center text-primary-400 font-medium">{row.pro}</td>
                      <td className="p-6 text-center text-gray-400">{row.team}</td>
                      <td className="p-6 text-center text-gray-400">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-4xl px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change or cancel my plan anytime?",
                answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle, and you keep access to paid features until the end of your current period."
              },
              {
                question: "What happens if I exceed my plan limits?",
                answer: "Free plan users will be notified when they reach their monthly limit and can upgrade to continue. Pro and Team plans have generous limits that accommodate most users' needs."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use bank-level encryption and follow industry best practices for data security. Your documents and personal information are never shared with third parties."
              },
              {
                question: "Can I try paid features before upgrading?",
                answer: "Yes! We offer a 7-day free trial of our Pro plan with full access to all premium features. No credit card required to start your trial."
              },
              {
                question: "Do you offer educational discounts?",
                answer: "Yes, we offer 50% off our Pro plan for students and educators with valid academic credentials. Contact our support team to learn more."
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

      {/* CTA */}
      <section className="py-24 border-t border-dark-border">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl blur-3xl" />
            <div className="relative bg-dark-card border border-primary-500/20 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of users who are already transforming their reading experience with Narrify.
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
                    href="/contact"
                    className="relative px-8 py-4 text-gray-400 font-light transition-all duration-300 hover:scale-105 hover:text-white"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                  >
                    <span className="relative z-10">Talk to Sales</span>
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

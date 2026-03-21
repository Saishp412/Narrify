"use client";

import { useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (name: string, email: string, password: string) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && !name) {
      setError("Name is required");
      return;
    }
    onSubmit(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {mode === "register" && (
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 font-light transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400/50 border border-white/20 rounded-full shadow-xl"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
          />
        </div>
      )}
      
      <div className="relative mb-8">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 font-light transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400/50 border border-white/20 rounded-full shadow-xl"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
        />
      </div>
      
      <div className="relative mb-8">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 font-light transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400/50 border border-white/20 rounded-full shadow-xl"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-8">
          <p className="text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}
      
      <div className="relative flex justify-center">
        <button
          type="submit"
          className="relative px-12 py-4 text-white font-light transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-xl"
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
          <span className="relative z-10">
            {mode === "login" ? "Sign In" : "Create Account"}
            <div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" />
          </span>
        </button>
      </div>
    </form>
  );
}

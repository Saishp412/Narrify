"use client";

import AuthForm from "../../../components/AuthForm";
import { registerUser } from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CustomCursor from "@/components/CustomCursor";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const data = await registerUser(name, email, password);

      if (data?.token) {
        login(data.token);
        router.push("/dashboard");
      } else {
        alert(data?.message || "Registration failed");
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong during registration");
      }
    }
  };

  return (
    <main 
      className="min-h-screen text-gray-100 overflow-hidden" 
      style={{ backgroundColor: '#0a0f1c' }}
    >
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-radial opacity-20 pointer-events-none" />

      {/* Main Content */}
      <section className="relative mx-auto max-w-7xl px-8 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold leading-tight text-white">
                Create Your
                <span className="block text-primary-400">Audio Library</span>
                <span className="block text-accent-400">Today</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Join thousands of users who are transforming their reading experience. Upload documents, convert them to audiobooks, and enjoy content on your terms.
              </p>
            </div>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span>Convert any document to audio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span>Smart progress tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span>Cross-device synchronization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span>Custom playback controls</span>
              </div>
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

          {/* Right: Register Form */}
          <div className="hidden lg:block animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl animate-pulse-slow" />
              <div className="relative h-[600px] rounded-3xl border border-primary-500/20 bg-dark-card/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
                
                {/* Register Form Container */}
                <div className="p-8 h-full flex flex-col justify-center">
                  <div className="max-w-md mx-auto w-full">
                    <h2 className="text-3xl font-semibold text-white mb-2">
                      Create Account
                    </h2>
                    <p className="text-gray-400 mb-8">
                      Start your audio journey today
                    </p>

                    <AuthForm mode="register" onSubmit={handleRegister} />

                    <div className="mt-8 text-center text-sm text-gray-400">
                      Already have an account?{" "}
                      <Link
                        href="/auth/login"
                        className="create-link font-brand-light"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Register Form */}
      <section className="lg:hidden px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Start your audio journey today
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl" />
            <div className="relative p-8">
              <AuthForm mode="register" onSubmit={handleRegister} />

              <div className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="create-link font-brand-light"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

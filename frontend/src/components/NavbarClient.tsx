"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarClient() {
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Check if current page is auth page
  const isAuthPage = pathname?.includes("/auth");

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="w-full bg-dark-secondary/90 backdrop-blur-md border-b border-dark-border/50 sticky top-0 z-50">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center transition-all duration-300 hover:scale-105">
            <h1 className="text-2xl font-light tracking-wide text-white group-hover:text-primary-400 transition-all duration-500 font-brand">
              NARRIFY
            </h1>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="relative px-8 py-3">
            {/* Glass Background Frame */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />

            <div className="relative flex items-center gap-8 text-sm font-light">
              {[
                { href: "/", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative group py-2 transition-all duration-300 font-brand-light ${
                    isActive(item.href)
                      ? "text-primary-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onMouseEnter={(e) => {
                    const underline = e.currentTarget.querySelector('.button-underline') as HTMLElement;
                    if (underline) underline.style.width = '100%';
                  }}
                  onMouseLeave={(e) => {
                    const underline = e.currentTarget.querySelector('.button-underline') as HTMLElement;
                    if (underline && !isActive(item.href)) underline.style.width = '0';
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div
                    className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out"
                    style={{
                      width: isActive(item.href) ? '100%' : '0'
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 ml-auto">
          <div className="hidden md:flex items-center gap-6 text-sm font-light">
            {isAuthPage ? (
              // Show different content when on auth pages
              <div className="flex items-center gap-4">
                <span className="text-primary-400 font-brand-light">
                  Welcome back!
                </span>
                <Link
                  href="/"
                  className="relative group py-2 text-gray-400 hover:text-white transition-all duration-300 font-brand-light"
                >
                  <span className="relative z-10">Back to Home</span>
                  <div
                    className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out"
                  />
                </Link>
              </div>
            ) : token ? (
              <>
                <Link
                  href="/dashboard"
                  className="relative group py-2 text-gray-400 hover:text-white transition-all duration-300 font-brand-light"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div
                    className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out"
                  />
                </Link>
                <Link
                  href="/dashboard/audiobooks"
                  className="relative group py-2 text-gray-400 hover:text-white transition-all duration-300 font-brand-light"
                >
                  <span className="relative z-10">Library</span>
                  <div
                    className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="relative group py-2 text-gray-400 hover:text-white transition-all duration-300 font-brand-light"
                >
                  <span className="relative z-10">Logout</span>
                  <div
                    className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out"
                  />
                </button>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <Link
                    href="/auth/login"
                    className="relative px-6 py-2 text-gray-400 font-brand-light transition-all duration-300 hover:scale-105 hover:text-white block"
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector(
                        ".button-underline"
                      ) as HTMLElement;
                      if (underline) underline.style.width = "100%";
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector(
                        ".button-underline"
                      ) as HTMLElement;
                      if (underline) underline.style.width = "0";
                    }}
                  >
                    <span className="relative z-10">
                      Sign In
                      <div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" />
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl" />
                  <Link
                    href="/auth/register"
                    className="relative px-6 py-2 text-white font-brand-light transition-all duration-300 hover:scale-105 block"
                    onMouseEnter={(e) => {
                      const underline = e.currentTarget.querySelector(
                        ".button-underline"
                      ) as HTMLElement;
                      if (underline) underline.style.width = "100%";
                    }}
                    onMouseLeave={(e) => {
                      const underline = e.currentTarget.querySelector(
                        ".button-underline"
                      ) as HTMLElement;
                      if (underline) underline.style.width = "0";
                    }}
                  >
                    <span className="relative z-10">
                      Get Started
                      <div className="button-underline absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out" />
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <div
                className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-2.5 bg-primary-400"
                    : ""
                }`}
              />
              <div
                className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <div
                className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-2.5 bg-primary-400"
                    : ""
                }`}
              />
            </div>
            <div
              className={`absolute inset-0 bg-gradient-primary/20 rounded-lg transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden border-t border-dark-border/50 overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          <div className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/features", label: "Features" },
              { href: "/pricing", label: "Pricing" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-primary-400 bg-primary-500/10"
                    : "text-gray-400 hover:text-primary-400 hover:bg-primary-500/10"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">{item.label}</span>
                <div
                  className={`ml-auto h-0.5 bg-gradient-primary transition-all duration-300 ${
                    isActive(item.href) ? "w-8" : "w-0 group-hover:w-8"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-dark-border/50 space-y-3">
            {isAuthPage ? (
              // Show different content for mobile when on auth pages
              <>
                <div className="text-center py-4">
                  <span className="text-primary-400 font-brand-light text-lg">
                    Welcome back!
                  </span>
                </div>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-3 py-3 px-4 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Back to Home</span>
                </Link>
              </>
            ) : token ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 py-3 px-4 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/audiobooks"
                  className="flex items-center gap-3 py-3 px-4 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>My Library</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 py-3 px-4 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

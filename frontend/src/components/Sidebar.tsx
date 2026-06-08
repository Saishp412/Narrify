"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPlan, setUserPlan] = useState<string>("Free");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get user info from token or localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // You can decode JWT or fetch user info here
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setUserEmail(user.email || "");
          setUserPlan(user.plan || "Free");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href || pathname === "/dashboard/";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="h-full w-full flex flex-col">
      {/* Brand */}
      <div className="mb-8 mt-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide text-white group-hover:text-primary-400 transition-all duration-500 font-brand inline-block">NARRIFY</h1>
          <p className="mt-1 text-xs text-gray-400">
            Listen. Learn. Anywhere.
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 px-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-2xl transition-all duration-300 blur-xl" />
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:border-primary-500/40 transition-all duration-300">
            <div className="text-center space-y-3">
              <p className="text-xs text-gray-300 font-medium uppercase tracking-wide">Current Plan</p>
              <p className="text-lg text-primary-400 font-bold">{userPlan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-2">
        <SidebarLink
          href="/dashboard"
          title="Dashboard"
          desc="Overview & progress"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
          active={isActive("/dashboard")}
        />
        <SidebarLink
          href="/dashboard/discover"
          title="Discover"
          desc="Find new books"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          active={isActive("/dashboard/discover")}
        />
        <SidebarLink
          href="/dashboard/audiobooks"
          title="My Audiobooks"
          desc="Your listening library"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
          active={isActive("/dashboard/audiobooks")}
        />
        <SidebarLink
          href="/dashboard/upload"
          title="Upload Document"
          desc="Convert to audio"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          }
          active={isActive("/dashboard/upload")}
        />
        <SidebarLink
          href="/dashboard/analytics"
          title="Analytics"
          desc="Usage statistics"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          active={isActive("/dashboard/analytics")}
        />
        <SidebarLink
          href="/dashboard/bookmarks"
          title="Bookmarks"
          desc="Saved positions"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          }
          active={isActive("/dashboard/bookmarks")}
        />
        <SidebarLink
          href="/dashboard/history"
          title="History"
          desc="Recent activity"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          active={isActive("/dashboard/history")}
        />
        <SidebarLink
          href="/dashboard/downloads"
          title="Downloads"
          desc="Offline files"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          }
          active={isActive("/dashboard/downloads")}
        />
        <SidebarLink
          href="/dashboard/settings"
          title="Settings"
          desc="Voice & preferences"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          active={isActive("/dashboard/settings")}
        />
        <SidebarLink
          href="/dashboard/help"
          title="Help & Support"
          desc="Get assistance"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          active={isActive("/dashboard/help")}
        />
      </nav>

      {/* Divider */}
      <div className="my-6 h-px bg-white/10 mx-4" />

      {/* Upgrade CTA */}
      {userPlan === "Free" && (
        <div className="px-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 rounded-2xl transition-all duration-500 blur-xl" />
            <div className="relative bg-gradient-to-br from-primary-500/10 to-accent-500/10 backdrop-blur-lg border border-primary-500/30 rounded-2xl p-4 hover:border-primary-500/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <p className="text-xs text-primary-400 font-bold uppercase tracking-wide">Upgrade to Pro</p>
              </div>
              <p className="text-xs text-gray-300 mb-3 leading-relaxed">Unlock unlimited conversions & premium voices</p>
              <button
                onClick={() => router.push("/pricing")}
                className="w-full relative py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-primary-500/40 text-white text-xs font-medium rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <span className="relative z-10">Upgrade Now</span>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-left rounded-lg hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm text-gray-400 group-hover:text-red-400 transition-colors">Logout</span>
          </div>
        </button>
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
          © {new Date().getFullYear()} Narrify
        </div>
      </div>
    </aside>
  );
}

/* 🔗 Sidebar Link */
function SidebarLink({
  href,
  title,
  desc,
  icon,
  active = false,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative rounded-xl px-3 py-3 transition-all duration-200 ${
        active
          ? "bg-primary-500/20 border border-primary-500/30"
          : "hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`${
          active ? "text-primary-400" : "text-gray-400 group-hover:text-white"
        } transition-colors`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${
            active ? "text-primary-400" : "text-gray-100 group-hover:text-white"
          } transition-colors`}>{title}</p>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>
        {active && (
          <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
        )}
      </div>
    </Link>
  );
}

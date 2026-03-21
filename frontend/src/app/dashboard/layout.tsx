"use client";

import Sidebar from "@/components/Sidebar";
import { PlayerProvider } from "@/context/PlayerContext";
import BottomPlayer from "@/components/BottomPlayer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <div className="flex min-h-screen text-gray-100 overflow-hidden" style={{ backgroundColor: '#0a0f1c' }}>
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-radial opacity-20 pointer-events-none" />
        
        {/* Sidebar */}
        <aside className="relative w-64 flex-shrink-0 z-10">
          <div className="h-full border-r border-white/10 bg-dark-card/50 backdrop-blur-sm">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />
          <div className="relative h-full overflow-auto pb-24">
            {children}
          </div>
        </main>
        
        {/* Bottom Player */}
        <BottomPlayer />
      </div>
    </PlayerProvider>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const isAuthPage = pathname?.includes('/auth');

  // For auth pages, show navbar without footer
  if (isAuthPage) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <main className="flex-1" style={{ backgroundColor: '#0a0f1c' }}>{children}</main>
      </>
    );
  }

  // For dashboard pages, show only cursor (no navbar/footer)
  if (isDashboardPage) {
    return (
      <>
        <CustomCursor />
        <main className="flex-1" style={{ backgroundColor: '#0a0f1c' }}>{children}</main>
      </>
    );
  }

  // For all other pages, show navbar and footer
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex-1" style={{ backgroundColor: '#0a0f1c' }}>{children}</main>
      <Footer />
    </>
  );
}

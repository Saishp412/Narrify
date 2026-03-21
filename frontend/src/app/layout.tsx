import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Narrify - Transform Documents into Immersive Audio",
  description: "Convert your documents into high-quality audiobooks with AI-powered narration. Listen, learn, and consume content on your terms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#0a0f1c' }} className={`${inter.variable} ${outfit.variable}`}>
      <body 
        className="flex min-h-screen flex-col text-gray-100 font-inter" 
        style={{ 
          backgroundColor: '#0a0f1c',
          color: '#f3f4f6',
          margin: 0,
          padding: 0
        }}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

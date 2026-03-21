import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Sign In - Narrify",
  description: "Sign in to your Narrify account to access your personal audio library.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

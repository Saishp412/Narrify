"use client";
import { ReactNode } from "react";
import { PlayerProvider } from "@/context/PlayerContext";

export default function PlayerWrapper({ children }: { children: ReactNode }) {
  return <PlayerProvider>{children}</PlayerProvider>;
}

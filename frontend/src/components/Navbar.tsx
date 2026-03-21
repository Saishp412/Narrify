"use client";

import dynamic from "next/dynamic";

// Dynamically import NavbarClient and disable SSR
const NavbarClient = dynamic(() => import("./NavbarClient"), { ssr: false });

export default function Navbar() {
  return <NavbarClient />;
}

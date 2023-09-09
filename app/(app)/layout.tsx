"use client";

import { AppBar } from "@/components/navigation/AppBar";
import { SessionProvider } from "next-auth/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <AppBar />
        <div className="container">{children}</div>
      </SessionProvider>
    </>
  );
}

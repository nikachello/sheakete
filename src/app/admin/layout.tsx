"use client";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      {path.includes("shesvla") ? "" : <Sidebar />}
      <div className="flex-1 pt-20 lg:pt-10 px-6 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default layout;

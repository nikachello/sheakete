import { Sidebar } from "@/components/admin/sidebar/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      <Sidebar />
      <div className="flex-1 pt-20 lg:pt-10 px-6">{children}</div>
    </div>
  );
};

export default layout;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { label: "მთავარი", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "ლიდები", icon: Users, href: "/admin/leads", badge: 5 },
  { label: "შეკვეთები", icon: ShoppingCart, href: "/admin/orders" },
  { label: "ჩარიცხვები", icon: ShoppingCart, href: "/admin/remittances" },
  { label: "მარაგები", icon: Package, href: "/admin/stocks" },
  { label: "ფინანსები", icon: Package, href: "/admin/finances" },
  { label: "ხარჯები", icon: Package, href: "/admin/expenses" },
];

// Reusable Navigation Content
const SidebarContent = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="size-6 bg-black rounded flex items-center justify-center">
            <div className="size-2 bg-white rotate-45" />
          </div>
          <span className="font-bold text-sm tracking-tight text-zinc-900 uppercase">
            Sheakete
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
        <div>
          <p className="px-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">
            Management
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200",
                    isActive
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Profile */}
      <div className="p-4 border-t border-zinc-100">
        <div className="flex items-center gap-3 px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200">
          <div className="size-8 rounded-full bg-zinc-200 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-zinc-900 truncate">
              Admin User
            </span>
            <span className="text-[10px] text-zinc-400 truncate">
              admin@crm.ge
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* MOBILE TRIGGER (Visible only on small screens) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white border border-zinc-200 rounded-md shadow-sm"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* MOBILE OVERLAY/DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Hidden on mobile, visible on lg+) */}
      <aside className="hidden lg:flex flex-col h-screen w-64 sticky top-0 border-r border-zinc-200 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
};

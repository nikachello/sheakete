import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MetaTracking } from "@/components/tracking/MetaTracking";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteAnalytics } from "@/components/tracking/SiteAnalytics";

const georgian = localFont({
  src: [
    { path: "../../public/fonts/georgian-regular.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/georgian-bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "შეაკეთე",
  description: "სახლის ნივთების საუკეთესო არჩევანი",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`h-full ${georgian.variable}`}>
      <body className="font-georgian antialiased">{children}<SiteFooter /><MetaTracking /><SiteAnalytics /></body>
    </html>
  );
}

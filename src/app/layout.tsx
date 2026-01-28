import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const georgian = Noto_Sans_Georgian({
  weight: ["400", "700"],
  subsets: ["georgian", "latin"],
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
    <html lang="en" className={`h-full ${georgian.variable}`}>
      <body className="font-georgian antialiased">{children}</body>
    </html>
  );
}

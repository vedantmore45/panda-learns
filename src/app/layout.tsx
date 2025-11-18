import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Load Geist Sans font for body text
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Load Geist Mono font for code/monospace text
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * App metadata for SEO and browser display
 */
export const metadata: Metadata = {
  title: "Panda Learns - LMS for Founders & Teams",
  description: "LMS for Founders & teams learning growth, systems, and AI",
};

/**
 * Root layout component
 * Wraps all pages with fonts and global styles
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

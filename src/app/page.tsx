"use client";

import Link from "next/link";
import AnimatedPandas from "./components/AnimatedPandas";

/**
 * Home/Landing page
 * Features animated pandas background and call-to-action to view courses
 */
export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Animated pandas decoration */}
      <AnimatedPandas />
      
      {/* Main content */}
      <main className="relative z-10 flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-32 px-8 sm:px-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
            Panda Learns
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400 sm:text-2xl">
            LMS for Founders & teams learning growth, systems, and AI
          </p>
          <Link
            href="/courses"
            className="group mt-4 flex h-14 items-center justify-center gap-2 rounded-full bg-black px-8 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-zinc-800 hover:shadow-lg active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            View Courses
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}

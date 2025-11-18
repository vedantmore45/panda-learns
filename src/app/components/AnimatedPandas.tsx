"use client";

import { useEffect, useState } from "react";

/**
 * Panda interface for animation state
 */
interface Panda {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  rotation: number;
}

/**
 * Fixed positions for pandas across the home page
 * Positions are in percentage (0-100) for responsive layout
 */
const FIXED_PANDA_POSITIONS: Array<{ x: number; y: number; size: number; rotation: number }> = [
  { x: 5, y: 8, size: 48, rotation: 15 },
  { x: 18, y: 6, size: 42, rotation: -20 },
  { x: 32, y: 10, size: 52, rotation: 30 },
  { x: 45, y: 7, size: 45, rotation: -15 },
  { x: 58, y: 9, size: 50, rotation: 25 },
  { x: 72, y: 8, size: 43, rotation: -30 },
  { x: 85, y: 11, size: 47, rotation: 20 },
  { x: 96, y: 9, size: 41, rotation: -25 },
  { x: 10, y: 22, size: 46, rotation: 20 },
  { x: 25, y: 20, size: 44, rotation: -25 },
  { x: 40, y: 24, size: 49, rotation: 10 },
  { x: 55, y: 21, size: 42, rotation: -20 },
  { x: 70, y: 23, size: 48, rotation: 35 },
  { x: 85, y: 22, size: 45, rotation: -15 },
  { x: 8, y: 38, size: 51, rotation: -15 },
  { x: 22, y: 40, size: 44, rotation: 22 },
  { x: 38, y: 36, size: 47, rotation: -30 },
  { x: 52, y: 39, size: 50, rotation: 18 },
  { x: 68, y: 37, size: 43, rotation: -22 },
  { x: 82, y: 41, size: 46, rotation: 28 },
  { x: 95, y: 38, size: 49, rotation: -18 },
  { x: 12, y: 56, size: 45, rotation: 25 },
  { x: 28, y: 58, size: 52, rotation: -18 },
  { x: 44, y: 55, size: 48, rotation: 32 },
  { x: 60, y: 57, size: 44, rotation: -25 },
  { x: 76, y: 56, size: 47, rotation: 15 },
  { x: 92, y: 59, size: 43, rotation: -28 },
  { x: 6, y: 75, size: 46, rotation: 25 },
  { x: 18, y: 78, size: 51, rotation: -18 },
  { x: 32, y: 76, size: 48, rotation: 32 },
  { x: 46, y: 79, size: 43, rotation: -25 },
  { x: 60, y: 77, size: 50, rotation: 15 },
  { x: 74, y: 80, size: 45, rotation: -28 },
  { x: 88, y: 78, size: 47, rotation: 20 },
  { x: 98, y: 76, size: 44, rotation: -22 },
  { x: 4, y: 93, size: 48, rotation: 30 },
  { x: 15, y: 95, size: 45, rotation: -22 },
  { x: 28, y: 92, size: 50, rotation: 18 },
  { x: 42, y: 96, size: 47, rotation: -28 },
  { x: 56, y: 94, size: 49, rotation: 25 },
  { x: 70, y: 97, size: 44, rotation: -20 },
  { x: 84, y: 95, size: 46, rotation: 32 },
  { x: 96, y: 93, size: 48, rotation: -25 },
];

/**
 * Initialize pandas from fixed positions
 * Converts position data into Panda objects with animation state
 */
function getInitialPandas(): Panda[] {
  return FIXED_PANDA_POSITIONS.map((pos, i) => ({
    id: i,
    x: pos.x,
    y: pos.y,
    speedX: 0, // Fixed positions - no movement
    speedY: 0,
    size: pos.size,
    rotation: pos.rotation,
  }));
}

/**
 * AnimatedPandas component
 * Displays decorative pandas that rotate in place across the home page
 */
export default function AnimatedPandas() {
  const [pandas, setPandas] = useState<Panda[]>([]);

  useEffect(() => {
    // Initialize pandas with fixed positions
    const initialPandas = getInitialPandas();
    setPandas(initialPandas);

    // Animation loop - rotates pandas continuously
    const interval = setInterval(() => {
      setPandas((prev) =>
        prev.map((panda) => ({
          ...panda,
          rotation: panda.rotation + 1.2, // Rotation speed
        }))
      );
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {pandas.map((panda) => (
        <div
          key={panda.id}
          className="absolute transition-all duration-75 ease-linear"
          style={{
            left: `${panda.x}%`,
            top: `${panda.y}%`,
            transform: `translate(-50%, -50%) rotate(${panda.rotation}deg)`,
            width: `${panda.size}px`,
            height: `${panda.size}px`,
            opacity: 0.10,
          }}
        >
          <svg
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <ellipse cx="50" cy="70" rx="25" ry="30" fill="currentColor" className="text-black dark:text-white" />
            <circle cx="50" cy="35" r="22" fill="currentColor" className="text-black dark:text-white" />
            <circle cx="35" cy="20" r="12" fill="currentColor" className="text-black dark:text-white" />
            <circle cx="35" cy="20" r="8" fill="currentColor" className="text-white dark:text-black" />
            <circle cx="65" cy="20" r="12" fill="currentColor" className="text-black dark:text-white" />
            <circle cx="65" cy="20" r="8" fill="currentColor" className="text-white dark:text-black" />
            <ellipse cx="40" cy="32" rx="8" ry="10" fill="currentColor" className="text-black dark:text-white" />
            <ellipse cx="60" cy="32" rx="8" ry="10" fill="currentColor" className="text-black dark:text-white" />
            <circle cx="40" cy="32" r="4" fill="currentColor" className="text-white dark:text-black" />
            <circle cx="40" cy="32" r="2" fill="currentColor" className="text-black dark:text-white" />
            <circle cx="60" cy="32" r="4" fill="currentColor" className="text-white dark:text-black" />
            <circle cx="60" cy="32" r="2" fill="currentColor" className="text-black dark:text-white" />
            <ellipse cx="50" cy="42" rx="3" ry="4" fill="currentColor" className="text-black dark:text-white" />
            <path
              d="M 50 46 Q 45 50 48 52 Q 50 54 52 52 Q 55 50 50 46"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-black dark:text-white"
            />
            <ellipse cx="30" cy="65" rx="8" ry="15" fill="currentColor" className="text-black dark:text-white" />
            <ellipse cx="70" cy="65" rx="8" ry="15" fill="currentColor" className="text-black dark:text-white" />
            <ellipse cx="40" cy="100" rx="10" ry="12" fill="currentColor" className="text-black dark:text-white" />
            <ellipse cx="60" cy="100" rx="10" ry="12" fill="currentColor" className="text-black dark:text-white" />
          </svg>
        </div>
      ))}
    </div>
  );
}


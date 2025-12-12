"use client";

import React, { useEffect, useState } from "react";

interface ClickAnimationProps {
  x: number;
  y: number;
  onComplete?: () => void;
}

export default function ClickAnimation({ x, y, onComplete }: ClickAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes clickRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        @keyframes clickPulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }
        @keyframes clickDot {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.5;
          }
        }
      `}</style>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        {/* Outer ripple */}
        <div
          className="absolute w-20 h-20 rounded-full border-4 border-blue-500"
          style={{
            left: '50%',
            top: '50%',
            animation: "clickRipple 1s ease-out forwards",
          }}
        />
        {/* Inner circle */}
        <div
          className="absolute w-10 h-10 rounded-full bg-blue-500"
          style={{
            left: '50%',
            top: '50%',
            animation: "clickPulse 1s ease-out forwards",
          }}
        />
        {/* Center dot */}
        <div 
          className="absolute w-4 h-4 rounded-full bg-white"
          style={{
            left: '50%',
            top: '50%',
            animation: "clickDot 1s ease-out forwards",
          }}
        />
      </div>
    </>
  );
}


"use client";

import { useEffect, useState, useRef } from "react";

const BAR_COUNT = 48;
const ACCENT_INDEX = 22;

export function Waveform() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-end justify-center gap-[3px] h-16 md:h-20"
      aria-hidden="true"
    >
      {Array.from({ length: BAR_COUNT }, (_, i) => {
        const isAccent = i === ACCENT_INDEX;
        const delay = `${(i * 0.04).toFixed(2)}s`;
        const duration = `${(0.8 + Math.sin(i * 0.3) * 0.4).toFixed(2)}s`;

        if (!isClient) {
          return (
            <span
              key={i}
              className="block w-[3px] rounded-full bg-zinc-200"
              style={{ height: "30%", minHeight: 4 }}
            />
          );
        }

        return (
          <span
            key={i}
            className={`block w-[3px] rounded-full ${
              isAccent ? "waveform-accent bg-accent shadow-[0_0_8px_rgba(0,102,255,0.4)]" : "waveform-bar bg-zinc-200"
            }`}
            style={{
              animationDelay: delay,
              animationDuration: duration,
              height: "30%",
              minHeight: 4,
            }}
          />
        );
      })}
    </div>
  );
}

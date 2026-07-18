"use client";

import { createPortal } from "react-dom";

interface LoadingProps {
  fullscreen?: boolean;
  inline?: boolean;
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Loading({ fullscreen = false, inline = false }: LoadingProps) {
  if (inline) {
    return <Spinner className="text-zinc-400" />;
  }

  if (fullscreen && typeof document !== "undefined") {
    return createPortal(
      <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/30">
        <Spinner className="text-white w-10 h-10" />
      </div>,
      document.body
    );
  }

  return <Spinner className="text-zinc-400" />;
}

"use client";

import { useState } from "react";

type Status = "idle" | "playing" | "paused";

const statusText: Record<Status, string> = {
  idle: "暂无音频",
  playing: "播放中",
  paused: "已暂停",
};

export function Miniplayer() {
  const [status] = useState<Status>("idle");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-zinc-100 flex items-center justify-center">
      <span className="text-sm font-bold text-zinc-900">
        {statusText[status]}
      </span>
    </div>
  );
}

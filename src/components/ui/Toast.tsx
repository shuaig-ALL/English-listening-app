"use client";

import { X, CheckCircle, WarningCircle, Info, XCircle } from "@phosphor-icons/react";
import type { Toast as ToastData } from "@/stores/toastStore";
import { useToastStore } from "@/stores/toastStore";

const config = {
  success: { bg: "bg-emerald-500", icon: CheckCircle },
  error: { bg: "bg-red-500", icon: XCircle },
  warning: { bg: "bg-amber-500", icon: WarningCircle },
  info: { bg: "bg-accent", icon: Info },
};

export function ToastItem({ id, type, message }: ToastData) {
  const removeToast = useToastStore((s) => s.removeToast);
  const { bg, icon: Icon } = config[type];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg animate-in slide-in-from-right-4 fade-in ${bg}`}
    >
      <Icon weight="fill" className="w-5 h-5 shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => removeToast(id)}
        className="shrink-0 rounded-lg p-0.5 hover:bg-white/20 transition-colors"
      >
        <X weight="bold" className="w-4 h-4" />
      </button>
    </div>
  );
}

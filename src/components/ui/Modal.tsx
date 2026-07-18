"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          {title && (
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
          >
            <X weight="bold" className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 pb-6 text-sm text-zinc-600 leading-relaxed">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 pb-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

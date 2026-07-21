"use client";

import { type ComponentProps, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent/90",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  small: "h-8 px-3 text-xs rounded-lg gap-1.5",
  medium: "h-10 px-5 text-sm rounded-xl gap-2",
  large: "h-12 px-7 text-base rounded-xl gap-2.5",
};

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-bold tracking-tight transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {loading ? "加载中" : children}
    </button>
  );
}

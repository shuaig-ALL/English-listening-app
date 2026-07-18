"use client";

import { useState, type ComponentProps } from "react";

interface InputProps extends Omit<ComponentProps<"input">, "type" | "value" | "onChange"> {
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  error,
  type = "text",
  value: externalValue,
  onChange: externalOnChange,
  className = "",
  id,
  placeholder,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    externalOnChange?.(e);
  };

  const inputId = id || (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-bold text-zinc-900 tracking-tight"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`h-10 rounded-xl border px-4 text-sm text-zinc-900 placeholder:text-zinc-400 bg-white outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-200 focus:border-accent"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

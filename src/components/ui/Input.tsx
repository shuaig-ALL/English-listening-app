"use client";

import { useState, type ComponentProps } from "react";

interface InputProps extends Omit<ComponentProps<"input">, "type" | "value" | "onChange"> {
  label?: string;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Input({
  label,
  error: externalError,
  required = false,
  type = "text",
  value: externalValue,
  onChange: externalOnChange,
  className = "",
  id,
  placeholder,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = useState("");
  const [internalError, setInternalError] = useState("");
  const [touched, setTouched] = useState(false);

  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;
  const displayError = externalError || internalError;

  const validate = (val: string): string => {
    if (required && val.trim() === "") {
      return "此项为必填";
    }
    if (type === "email" && val.trim() !== "" && !EMAIL_RE.test(val.trim())) {
      return "邮箱格式不正确";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!isControlled) {
      setInternalValue(v);
    }
    if (touched) {
      setInternalError(validate(v));
    }
    externalOnChange?.(e);
  };

  const handleBlur = () => {
    setTouched(true);
    setInternalError(validate(value));
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
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`h-10 rounded-xl border px-4 text-sm text-zinc-900 placeholder:text-zinc-400 bg-white outline-none transition-colors ${
          displayError
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-200 focus:border-accent"
        } ${className}`}
        {...props}
      />
      {displayError && (
        <p className="text-xs text-red-500">{displayError}</p>
      )}
    </div>
  );
}

"use client";

import { forwardRef, useState } from "react";
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  FieldValues,
} from "react-hook-form";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS } from "@/styles/colors";

export type InputError<T extends FieldValues = FieldValues> =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<T>>;

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: InputError;
  withCopyButton?: boolean;
  leftSlot?: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    className = "",
    error,
    type,
    value,
    withCopyButton,
    leftSlot,
    disabled,
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword && type === "password" ? "text" : type;

  const inputClassName = twMerge(
    clsx(
      "block w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 border-1",
      COLORS.input.bg,
      COLORS.input.text,
      COLORS.input.placeholder,
      {
        [COLORS.input.disabledBg]: !!disabled,
        [COLORS.input.border]: !error,
        [COLORS.input.focusBorder]: !error,
        [COLORS.input.focusRing]: !error,
        [COLORS.input.errorBorder]: !!error,
        [COLORS.input.errorRing]: !!error,
        [COLORS.input.disabledBg]: disabled,
      },
      className
    )
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <div className="relative">
        {leftSlot ? (
          <div
            className={twMerge(
              "absolute inset-y-0 left-0 flex w-10 items-center justify-center",
              COLORS.input.leftSlot
            )}
          >
            {leftSlot}
          </div>
        ) : null}

        <input
          ref={ref}
          type={inputType}
          className={inputClassName}
          value={value}
          disabled={disabled}
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={twMerge(
              "absolute right-3 top-1/2 -translate-y-1/2",
              COLORS.input.passwordToggle
            )}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}

        {withCopyButton && (
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(String(value ?? ""))}
            className={twMerge(
              "absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium",
              COLORS.input.copyButton
            )}
          >
            Copy
          </button>
        )}
      </div>

      {error && (
        <span className={twMerge("text-xs font-medium", COLORS.input.errorText)}>
          {typeof error.message === "string"
            ? error.message
            : JSON.stringify(error.message)}
        </span>
      )}
    </div>
  );
});

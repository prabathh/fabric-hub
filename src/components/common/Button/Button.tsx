import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { COLORS } from "@/styles/colors";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  theme?:
    | "primary"
    | "secondary"
    | "success"
    | "attention"
    | "disabled";
  size?: "small" | "medium" | "large";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      type = "button",
      className = "",
      theme = "primary",
      disabled = false,
      size = "medium",
      ...rest
    },
    ref
  ) {
    const mergedClassName = twMerge(
      clsx(
        "flex items-center justify-center gap-1 rounded-lg font-bold uppercase",
        {
          ["text-sm px-3 py-2"]: size === "small",
          ["px-4 py-3 text-sm"]: size === "medium",
          ["px-6 py-4 text-base"]: size === "large",
          [`${COLORS.primary.bg} ${COLORS.primary.text} ${COLORS.primary.hoverBg} ${COLORS.primary.ring}`]:
            !disabled && theme === "primary",
          [`${COLORS.secondary.bg} ${COLORS.secondary.text} ${COLORS.secondary.hoverBg} ${COLORS.secondary.ring}`]:
            !disabled && theme === "secondary",
          [`${COLORS.success.bg} ${COLORS.success.text} ${COLORS.success.hoverBg} ${COLORS.success.ring}`]:
            !disabled && theme === "success",
        },
        className
      )
    );

    return (
      <button
        ref={ref}
        className={mergedClassName}
        type={type}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

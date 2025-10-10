"use client";

import { Button } from "@/components/common/Button";
import { IconType } from "react-icons";

interface LeftNavProps {
  label: string;
  description: string;
  button?: string;
  // theme?: string;
  theme?: "disabled" | "primary" | "secondary" | "success" | "attention" | "dark";
  onClick?: () => void;
  Icon?: IconType;
}

export default function PageHeader({
  label,
  description,
  button,
  theme,
  onClick,
  Icon,
}: LeftNavProps) {
  return (
    <header className="flex justify-between items-start mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold text-gray-800">{label}</h1>
        <p className="text-lg text-gray-500 mt-1">{description}</p>
      </div>
      {button && (
        <div className="flex-shrink-0 ml-4">
          <Button
            onClick={onClick}
            theme={theme || "primary"}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{button}</span>
          </Button>
        </div>
      )}
    </header>
  );
}

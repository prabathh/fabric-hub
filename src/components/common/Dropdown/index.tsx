import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  options: { id: string; name: string }[];
  value: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
  error,
  disabled = false,
}: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (disabled) return;
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative z-20">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <div
        className={twMerge(
          "border rounded-lg p-2 flex flex-wrap gap-1 min-h-[40px]",
          error ? "border-red-500" : "border-gray-300",
          disabled
            ? "bg-gray-200 cursor-not-allowed"
            : "cursor-pointer"
        )}
        onClick={() => !disabled && setDropdownOpen((prev) => !prev)}
      >
        {value.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          value.map((val) => {
            const option = options.find((opt) => opt.id === val);
            return (
              <span
                key={val}
                className={twMerge(
                  "px-2 py-1 rounded-md text-xs flex items-center gap-1",
                  disabled
                    ? "bg-white text-gray-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {option ? option.name : val}
                {!disabled && (
                  <button type="button" onClick={() => toggleOption(val)}>
                    ×
                  </button>
                )}
              </span>
            );
          })
        )}
      </div>

      {!disabled && dropdownOpen && (
        <ul className="absolute w-full bg-white rounded-b-md rounded-t-sm shadow-lg max-h-40 overflow-y-auto border-l border-r border-b border-gray-300">
          {options.map((opt) => (
            <li
              key={opt.id}
              className={`p-2 cursor-pointer hover:bg-red-100 ${
                value.includes(opt.id) ? "bg-red-100" : ""
              }`}
              onClick={() => toggleOption(opt.id)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <span className="text-xs text-red-500 mt-1 block">{error}</span>
      )}
    </div>
  );
}

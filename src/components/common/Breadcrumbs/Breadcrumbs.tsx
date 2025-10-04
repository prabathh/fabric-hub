"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string; // optional so last item won't need a link
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-500 mb-6 space-x-2">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <span key={idx}>
            {!isLast && item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{item.label}</span>
            )}
            {!isLast && <span className="mx-2">&gt;</span>}
          </span>
        );
      })}
    </nav>
  );
}

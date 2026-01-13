"use client";

import { useMemo } from "react";

type NavItem = {
  id: string;
  label: string;
};

export default function Navbar({
  items,
  activeId,
}: {
  items: NavItem[];
  activeId: string;
}) {
  const renderedItems = useMemo(() => items, [items]);
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Faizan Hamid
        </a>
        <nav
          aria-label="Primary"
          className="flex w-full flex-wrap items-center gap-4 text-sm text-zinc-300 sm:w-auto sm:gap-6"
        >
          {renderedItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative pb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                } ${
                  isActive
                    ? "after:absolute after:left-0 after:top-full after:h-[2px] after:w-full after:bg-emerald-300"
                    : ""
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <a
            href="#contact"
            className="inline-flex w-full justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:w-auto"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

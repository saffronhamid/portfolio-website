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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          Faizan Hamid
        </a>
        <nav
          aria-label="Primary"
          className="flex w-full flex-wrap items-center gap-2 text-sm text-zinc-300 sm:w-auto sm:gap-3"
        >
          {renderedItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                  isActive
                    ? "bg-white/10 text-white shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
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
            className="btn-primary inline-flex w-full justify-center px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:w-auto"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

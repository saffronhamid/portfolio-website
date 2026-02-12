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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.36em] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          Faizan Hamid
        </a>
        <nav
          aria-label="Primary"
          className="flex w-full flex-wrap items-center gap-2 text-sm text-muted sm:w-auto sm:gap-3"
        >
          {renderedItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${
                  isActive
                    ? "bg-white/10 text-ink shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
                    : "text-muted hover:bg-white/5 hover:text-ink"
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
            className="btn-primary inline-flex w-full justify-center px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:w-auto"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

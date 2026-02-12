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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f6f2]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.38em] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          Faizan Hamid
        </a>
        <nav
          aria-label="Primary"
          className="flex w-full flex-wrap items-center gap-4 text-sm text-muted sm:w-auto sm:gap-6"
        >
          {renderedItems.map((item) => {
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "page" : undefined}
                className="nav-link text-xs uppercase tracking-[0.22em] text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex w-full items-center justify-between gap-4 text-sm text-muted sm:w-auto sm:justify-end">
          <a
            href="#contact"
            className="btn-ghost inline-flex px-4 py-2 text-xs uppercase tracking-[0.24em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            Contact
          </a>
          <button
            type="button"
            className="btn-ghost inline-flex px-3 py-2 text-xs uppercase tracking-[0.24em]"
            aria-label="Switch language"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

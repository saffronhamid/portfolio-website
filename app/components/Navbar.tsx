"use client";

import { useEffect, useMemo, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    setTheme("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Faizan Hamid
        </a>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-5 text-sm text-zinc-300 md:gap-7"
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:inline-flex"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

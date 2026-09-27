"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Container, CloseIcon, MenuIcon, SearchIcon } from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer or search sheet is open.
  useEffect(() => {
    const locked = drawer || search;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
        setSearch(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-paper transition-shadow duration-300",
        scrolled ? "shadow-header" : "shadow-none",
      ].join(" ")}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <a
            href="#top"
            className="font-display text-[1.5rem] font-bold tracking-[0.02em]"
          >
            {site.wordmark}
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[0.75rem] font-semibold tracking-[0.09em] uppercase transition-colors duration-200 hover:text-gray"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSearch((v) => !v);
                setMega(false);
              }}
              className="flex h-9 items-center gap-2 px-3 text-[0.75rem] font-medium tracking-[0.06em] uppercase transition-colors duration-200 hover:text-gray"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => setMega((v) => !v)}
              aria-expanded={mega}
              className="flex h-9 items-center gap-2 px-3 text-[0.75rem] font-medium tracking-[0.06em] uppercase transition-colors duration-200 hover:text-gray"
            >
              <MenuIcon className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">Menu</span>
            </button>

            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mega dropdown */}
      <div
        className={[
          "hidden overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-300 ease-out lg:block",
          mega ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!mega}
      >
        <Container>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-1 py-6 md:grid-cols-4">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMega(false)}
                className="flex items-center justify-between border-b border-line-soft py-3 text-[0.8125rem] font-medium transition-colors duration-200 hover:text-gray"
              >
                {item.label}
                <span aria-hidden className="text-gray">
                  &rsaquo;
                </span>
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {/* Search sheet */}
      <div
        className={[
          "overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-300 ease-out",
          search ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!search}
      >
        <Container>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-4 py-5"
          >
            <label htmlFor="site-search" className="sr-only">
              Search the site
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search programmes, research, news…"
              className="w-full border-b border-ink/25 bg-transparent pb-2 text-[0.9375rem] outline-none transition-colors duration-200 placeholder:text-gray focus:border-ink"
            />
            <button
              type="submit"
              className="shrink-0 bg-ink px-5 py-2.5 text-[0.8125rem] font-medium text-paper transition-colors duration-200 hover:bg-gray"
            >
              Search
            </button>
          </form>
        </Container>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          drawer ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setDrawer(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={[
          "fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,360px)] flex-col bg-paper transition-transform duration-300 ease-out lg:hidden",
          drawer ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="font-display text-[1.375rem] font-bold">{site.wordmark}</span>
          <button
            type="button"
            onClick={() => setDrawer(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setDrawer(false)}
              className="flex items-center justify-between border-b border-line-soft py-4 text-[0.9375rem] font-medium transition-colors duration-200 hover:text-gray"
            >
              {item.label}
              <span aria-hidden className="text-gray">
                &rsaquo;
              </span>
            </a>
          ))}
        </nav>
        <div className="border-t border-line px-5 py-5 text-[0.8125rem] text-gray">
          {site.location}
        </div>
      </div>
    </header>
  );
}

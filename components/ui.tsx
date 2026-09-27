"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------ primitives */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-site px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section heading with the hairline divider running from the heading to the
 * right edge of the section, plus an optional control cluster.
 */
export function SectionHeading({
  children,
  aside,
  className = "",
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.02em] whitespace-nowrap">
        {children}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
      {aside}
    </div>
  );
}

/** Solid dark pill with chevron, used for CTAs and carousel controls. */
export function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`h-[0.7em] w-[0.7em] ${className}`}
      fill="none"
    >
      <path
        d="M5.5 3.5 10 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CtaButton({
  children,
  chevron = true,
  className = "",
}: {
  children: ReactNode;
  chevron?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`group inline-flex items-center gap-2.5 bg-ink px-5 py-3 text-[0.8125rem] font-medium tracking-[0.02em] text-paper transition-colors duration-200 hover:bg-gray ${className}`}
    >
      {children}
      {chevron ? (
        <ChevronIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </span>
  );
}

/** Rounded gray date chip. */
export function DatePill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full bg-gray/15 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.06em] text-gray uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ tabs */

/**
 * Filter tab: outline when idle, solid ink when active.
 */
export function Tab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full border px-4 py-2 text-[0.8125rem] font-medium tracking-[0.01em]",
        "transition-all duration-200",
        active
          ? "border-ink bg-ink text-paper"
          : "border-ink/25 bg-paper text-ink hover:border-ink hover:bg-ink/5",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** Previous / Next control pair. */
export function PairPills({
  onPrev,
  onNext,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  const cls =
    "inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3.5 text-paper text-[0.75rem] font-medium transition-colors duration-200 hover:bg-gray disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-ink";
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <button type="button" onClick={onPrev} className={cls}>
        <ChevronIcon className="rotate-180" />
        Previous
      </button>
      <button type="button" onClick={onNext} className={cls}>
        Next
        <ChevronIcon />
      </button>
    </div>
  );
}

/* --------------------------------------------------------- scroll reveal */

/**
 * Fades and lifts children into view once, on first intersection.
 * Renders children immediately so a disabled observer degrades gracefully.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the observer is unavailable, never hide content: fall back to visible
    // via the `reveal-fallback` class rather than setting state in the effect.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.shown = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- icon set */

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m12.8 12.8 4 4" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
    </svg>
  );
}

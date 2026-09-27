"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/lib/data";
import { Art } from "@/lib/art";
import { Container, DatePill } from "./ui";

const INTERVAL = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      {/* Crossfading plates */}
      <div className="relative h-[62vh] min-h-[420px] w-full md:h-[68vh]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={[
              "absolute inset-0 transition-opacity duration-[1100ms] ease-in-out",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            aria-hidden={i !== index}
          >
            <Art
              seed={s.id}
              tone="ink"
              className="h-full w-full"
              label={i === index ? s.headline : undefined}
            />
          </div>
        ))}

        {/* Legibility veil over the dark plate */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/55 to-ink/30"
        />

        <Container>
          <div className="relative flex h-full flex-col justify-end pb-14 md:pb-16">
            <div
              key={slides[index].id}
              className="max-w-3xl motion-safe:animate-[fadeUp_.7s_cubic-bezier(.22,1,.36,1)_both]"
            >
              <DatePill>{slides[index].date}</DatePill>

              <h1 className="mt-6 font-display text-[clamp(2rem,5.4vw,3.75rem)] leading-[1.04] tracking-[-0.025em] text-paper">
                {slides[index].headline}
              </h1>

              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.65] text-paper/75 md:text-base">
                {slides[index].body}
              </p>

              <div className="mt-8">
                <a href="#news" className="inline-block">
                  <span className="group inline-flex items-center gap-2.5 bg-paper px-5 py-3 text-[0.8125rem] font-medium text-ink transition-colors duration-200 hover:bg-gray hover:text-paper">
                    {slides[index].cta}
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="h-[0.7em] w-[0.7em] transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                    >
                      <path
                        d="M5.5 3.5 10 8l-4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Manual controls */}
      <Container>
        <div className="flex items-center justify-between gap-4 border-t border-line py-5">
          {/* Progress ticks */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1} of ${slides.length}`}
                aria-current={i === index}
                className="group py-2"
              >
                <span
                  className={[
                    "block h-[3px] transition-all duration-300",
                    i === index
                      ? "w-10 bg-ink"
                      : "w-5 bg-ink/20 group-hover:bg-ink/45",
                  ].join(" ")}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 hidden text-[0.75rem] tracking-[0.08em] text-gray uppercase sm:inline">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center bg-ink text-paper transition-colors duration-200 hover:bg-gray"
            >
              <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none">
                <path
                  d="M10.5 3.5 6 8l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center bg-ink text-paper transition-colors duration-200 hover:bg-gray"
            >
              <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none">
                <path
                  d="M5.5 3.5 10 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

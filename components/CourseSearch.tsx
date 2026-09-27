"use client";

import { useState } from "react";
import { Art } from "@/lib/art";
import { courseSearch } from "@/lib/data";
import {
  Container,
  CtaButton,
  Reveal,
  Tab,
} from "./ui";

export function CourseSearch() {
  const [track, setTrack] = useState<string>(courseSearch.tracks[0].id);
  const [open, setOpen] = useState<string | null>(courseSearch.tracks[0].id);
  const [panel, setPanel] = useState(0);

  const active = courseSearch.tracks.find((t) => t.id === track) ?? courseSearch.tracks[0];

  return (
    <section
      id="admissions"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="course-h"
    >
      <Container>
        <Reveal>
          <div className="flex items-center justify-end gap-2.5">
            {courseSearch.tracks.map((t) => (
              <Tab
                key={t.id}
                active={t.id === track}
                onClick={() => {
                  setTrack(t.id);
                  setPanel(0);
                }}
              >
                {t.label}
              </Tab>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <Reveal delay={60}>
            <div>
              <h2
                id="course-h"
                className="font-display text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.025em]"
              >
                {courseSearch.heading}
              </h2>

              <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.7] text-gray">
                {courseSearch.body}
              </p>

              {/* Expand / collapse control */}
              <button
                type="button"
                onClick={() => setOpen((v) => (v === active.id ? null : active.id))}
                aria-expanded={open === active.id}
                className="group mt-10 flex h-10 w-10 items-center justify-center border border-ink/25 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
                aria-label={
                  open === active.id
                    ? "Collapse course detail"
                    : "Expand course detail"
                }
              >
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className={[
                    "h-4 w-4 transition-transform duration-300",
                    open === active.id ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                  fill="none"
                >
                  <path
                    d="M3.5 6 8 10.5 12.5 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                </svg>
              </button>

              {/* Progress bar, partially filled */}
              <div className="mt-6 h-[3px] w-full max-w-md bg-ink/12">
                <div
                  className="h-full bg-ink transition-[width] duration-500 ease-out"
                  style={{ width: `${45 + panel * 27}%` }}
                />
              </div>

              {/* Accordion */}
              <div className="mt-10 max-w-md border-t border-line">
                {courseSearch.tracks.map((t) => {
                  const isOpen = open === t.id;
                  return (
                    <div key={t.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : t.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-5 text-left transition-colors duration-200 hover:text-gray"
                      >
                        <span className="text-[0.9375rem] font-medium">
                          {t.label === "Undergraduate" ? "Undergraduates" : "Postgraduates"}
                        </span>
                        <span
                          aria-hidden
                          className={[
                            "text-lg leading-none transition-transform duration-300",
                            isOpen ? "rotate-45" : "rotate-0",
                          ].join(" ")}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={[
                          "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 text-[0.875rem] leading-[1.75] text-gray">
                            {t.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-9">
                <a href="#admissions" className="inline-block">
                  <CtaButton>Search courses</CtaButton>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right column: image panel */}
          <Reveal delay={120}>
            <div>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink sm:aspect-[5/4] lg:aspect-[4/5]">
                {courseSearch.tracks.map((t, i) => (
                  <div
                    key={t.id}
                    className={[
                      "absolute inset-0 transition-opacity duration-700 ease-in-out",
                      i === panel ? "opacity-100" : "pointer-events-none opacity-0",
                    ].join(" ")}
                    aria-hidden={i !== panel}
                  >
                    <Art
                      seed={`course-${t.id}`}
                      tone={i === panel ? "ink" : "paper"}
                      className="h-full w-full"
                      label={i === panel ? `${t.label} programmes` : undefined}
                    />
                  </div>
                ))}

                {/* Nav arrows, top-left of panel */}
                <div className="absolute top-5 left-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPanel((p) => (p + courseSearch.tracks.length - 1) % courseSearch.tracks.length)
                    }
                    aria-label="Previous panel"
                    className="flex h-8 w-8 items-center justify-center bg-ink/85 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-gray"
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
                    onClick={() => setPanel((p) => (p + 1) % courseSearch.tracks.length)}
                    aria-label="Next panel"
                    className="flex h-8 w-8 items-center justify-center bg-ink/85 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-gray"
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

              <a
                href="#admissions"
                className="mt-6 inline-block text-[0.875rem] font-medium underline decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-gray"
              >
                {courseSearch.imageLink} &rsaquo;
              </a>

              <p className="mt-4 max-w-md text-[0.8125rem] leading-[1.75] text-gray">
                {courseSearch.imageCaption}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

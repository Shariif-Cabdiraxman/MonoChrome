"use client";

import { useState } from "react";
import { Art } from "@/lib/art";
import { facultyNote, faculties } from "@/lib/data";
import {
  Container,
  CtaButton,
  DatePill,
  Reveal,
  SectionHeading,
  Tab,
} from "./ui";

export function Faculties() {
  const [active, setActive] = useState(faculties[0].slug);
  const faculty = faculties.find((f) => f.slug === active) ?? faculties[0];

  return (
    <section
      id="faculties"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="faculties-h"
    >
      <Container>
        <Reveal>
          <SectionHeading>
            <span id="faculties-h">Faculties</span>
          </SectionHeading>
        </Reveal>

        {/* Two wrapping rows of filter tabs */}
        <Reveal delay={60}>
          <div
            className="mt-10 flex max-w-4xl flex-wrap gap-2.5"
            role="group"
            aria-label="Filter by faculty"
          >
            <Tab active={false} onClick={() => setActive(faculties[0].slug)}>
              Random
            </Tab>
            {faculties.map((f) => (
              <Tab
                key={f.slug}
                active={f.slug === active}
                onClick={() => setActive(f.slug)}
              >
                {f.name}
              </Tab>
            ))}
          </div>
        </Reveal>

        {/* Featured card + carousel peek */}
        <Reveal delay={100}>
          <div className="mt-12 flex items-stretch gap-5">
            <div
              key={faculty.slug}
              className="grid min-w-0 flex-1 gap-10 transition-opacity duration-500 motion-safe:animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)_both] md:grid-cols-2 md:items-center"
            >
              <div>
                <DatePill>Established {faculty.since}</DatePill>

                <h3 className="mt-5 font-display text-[clamp(1.5rem,3vw,2.125rem)] leading-[1.14] tracking-[-0.02em]">
                  {faculty.name}
                </h3>

                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-gray">
                  {faculty.summary}
                </p>

                <p className="mt-4 text-[0.9375rem] leading-[1.7]">
                  {faculty.detail}
                </p>

                <div className="mt-7">
                  <a href="#admissions" className="inline-block">
                    <CtaButton>Explore this faculty</CtaButton>
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <Art
                    seed={`faculty-${faculty.slug}`}
                    className="h-full w-full"
                    label={`${faculty.name} — abstract plate`}
                  />
                </div>
              </div>
            </div>

            {/* Peeking cards hinting at a horizontal carousel */}
            <div aria-hidden className="hidden w-[26px] shrink-0 flex-col gap-4 xl:flex">
              <div className="w-3 flex-1 bg-ink/10" />
              <div className="w-3 flex-1 bg-ink/6" />
              <div className="w-3 flex-1 bg-ink/3" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:gap-6">
            <span className="shrink-0 font-display text-[0.8125rem] font-bold tracking-[0.1em] uppercase">
              Note:
            </span>
            <p className="max-w-3xl text-[0.8125rem] leading-[1.7] text-gray">
              {facultyNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

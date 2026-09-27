"use client";

import { useMemo, useState } from "react";
import { Art } from "@/lib/art";
import { researchCards, researchCategories } from "@/lib/data";
import {
  Container,
  PairPills,
  Reveal,
  SectionHeading,
  Tab,
} from "./ui";

const PER_PAGE = 4;

export function Research() {
  const [category, setCategory] = useState<string>("date");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (category === "random") {
      // Deterministic rotation so "Random" is stable across renders.
      return [...researchCards].sort(
        (a, b) => a.id.charCodeAt(1) - b.id.charCodeAt(1),
      );
    }
    if (category === "date") return researchCards;
    return researchCards.filter((c) => c.category === category);
  }, [category]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  // Clamp when the active filter yields fewer pages than the current index.
  const safePage = Math.min(page, pages - 1);
  const visible = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  const selectCategory = (id: string) => {
    setCategory(id);
    setPage(0);
  };

  const paginate = (delta: number) => {
    setPage((p) => Math.min(Math.max(p + delta, 0), pages - 1));
  };

  return (
    <section
      id="research"
      className="border-t border-line py-[length:var(--space-section)]"
      aria-labelledby="research-h"
    >
      <Container>
        <Reveal>
          <SectionHeading
            aside={
              <PairPills
                onPrev={() => paginate(-1)}
                onNext={() => paginate(1)}
              />
            }
          >
            <span id="research-h">Research &amp; Publication</span>
          </SectionHeading>
        </Reveal>

        <Reveal delay={60}>
          <div
            className="mt-10 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter research by category"
          >
            {researchCategories.map((c) => (
              <Tab
                key={c.id}
                active={c.id === category}
                onClick={() => selectCategory(c.id)}
              >
                {c.label}
              </Tab>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            key={`${category}-${safePage}`}
            className="mt-12 grid gap-x-6 gap-y-12 motion-safe:animate-[fadeUp_.5s_cubic-bezier(.22,1,.36,1)_both] sm:grid-cols-2 lg:grid-cols-4"
            aria-live="polite"
          >
            {visible.map((card) => (
              <article key={card.id} className="group flex flex-col">
                <div className="aspect-square w-full overflow-hidden">
                  <Art
                    seed={`research-${card.id}`}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    label={`Abstract plate for ${card.title}`}
                  />
                </div>

                <p className="mt-5 text-[0.6875rem] tracking-[0.08em] text-gray uppercase">
                  {card.date}
                </p>

                <h3 className="mt-2.5 font-display text-[1.0625rem] leading-[1.32] font-semibold">
                  {card.linked ? (
                    <a
                      href="#research"
                      className="underline decoration-1 underline-offset-4 transition-colors duration-200 group-hover:text-gray"
                    >
                      {card.title}
                    </a>
                  ) : (
                    card.title
                  )}
                </h3>

                <p className="mt-3 flex-1 text-[0.875rem] leading-[1.7] text-gray">
                  {card.body}
                </p>

                <a
                  href="#research"
                  className="mt-4 self-start text-[0.8125rem] font-medium underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-gray"
                >
                  View more
                </a>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 flex items-center justify-center gap-3 text-[0.75rem] tracking-[0.08em] text-gray uppercase">
          <span>
            Page {safePage + 1} of {pages}
          </span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span>{filtered.length} entries</span>
        </div>
      </Container>
    </section>
  );
}

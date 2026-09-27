"use client";

import { site } from "@/lib/site";
import { Container, CtaButton, Reveal, SectionHeading } from "./ui";

export function About() {
  return (
    <section className="py-[length:var(--space-section)]" aria-labelledby="about-h">
      <Container>
        <Reveal>
          <SectionHeading>
            <span id="about-h">About {site.wordmark}</span>
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Left column intentionally left open, per the reference composition */}
          <div className="hidden lg:block" />

          <Reveal delay={60}>
            <div className="lg:text-right">
              <p className="font-display text-[clamp(1.25rem,2.5vw,1.875rem)] leading-[1.4] tracking-[-0.015em]">
                Founded in <span className="text-gray">{site.location}</span>, the
                university has grown from a single department into an institution
                of{" "}
                <span className="font-semibold text-ink underline decoration-2 underline-offset-[6px]">
                  7 faculties
                </span>{" "}
                teaching more than{" "}
                <span className="font-semibold text-ink underline decoration-2 underline-offset-[6px]">
                  6,400
                </span>{" "}
                students across diploma, undergraduate and postgraduate
                programmes, with fieldwork and extension work along{" "}
                <span className="text-gray">fourteen coastal sites</span>.
              </p>

              <div className="mt-9">
                <a href="#admissions" className="inline-block">
                  <CtaButton>More about {site.wordmark}</CtaButton>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Small descriptive note, bottom left */}
        <Reveal delay={120}>
          <div className="mt-20 max-w-sm border-t border-line pt-6 md:absolute md:mt-24">
            <p className="text-[0.75rem] leading-[1.75] text-gray">
              The university is administered by a council of representatives and
              an academic senate. Admission to undergraduate programmes is by
              completed secondary certificate, with selection applied per
              faculty.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

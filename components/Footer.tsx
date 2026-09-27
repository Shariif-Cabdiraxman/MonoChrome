import { nav, site } from "@/lib/site";
import { Container } from "./ui";

const socials = [
  {
    label: "Facebook",
    path: "M13.5 9H15V6.5h-1.5c-1.93 0-3.5 1.57-3.5 3.5V11H8v2.5h2V20h2.5v-6.5H14l.5-2.5h-2V10c0-.55.45-1 1-1Z",
  },
  {
    label: "X",
    path: "M13.7 10.6 19.4 4h-1.4l-4.9 5.7L9.2 4H4l6 8.7L4 20h1.4l5.2-6.1 4.1 6.1H20l-6.3-9.4Zm-1.8 2.1-.6-.9L6.4 5h2l3.6 5.3.6.9 4.8 7.1h-2l-4.5-6.7Z",
  },
  {
    label: "LinkedIn",
    path: "M6.9 8.6H4.4V20h2.5V8.6ZM5.6 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM20 13.4c0-2.7-1.4-4-3.4-4-1 0-1.8.5-2.2 1.1V8.6H12V20h2.5v-5.9c0-1.2.5-1.9 1.5-1.9s1.5.7 1.5 2V20H20v-6.6Z",
  },
  {
    label: "YouTube",
    path: "M19.6 7.2a2 2 0 0 0-1.4-1.4C16.9 5.5 12 5.5 12 5.5s-4.9 0-6.2.3A2 2 0 0 0 4.4 7.2 21 21 0 0 0 4.1 12c0 1.6.1 3.2.3 4.8a2 2 0 0 0 1.4 1.4c1.3.3 6.2.3 6.2.3s4.9 0 6.2-.3a2 2 0 0 0 1.4-1.4c.2-1.6.3-3.2.3-4.8s-.1-3.2-.3-4.8ZM10.4 14.6V9.4l4.3 2.6-4.3 2.6Z",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="font-display text-[1.75rem] font-bold">{site.wordmark}</span>
            <p className="mt-4 max-w-xs text-[0.8125rem] leading-[1.75] text-paper/60">
              {site.tagline}
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center border border-paper/25 transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[0.75rem] font-semibold tracking-[0.12em] text-paper/50 uppercase">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 py-1.5 text-[0.875rem] text-paper/75 transition-colors duration-200 hover:text-paper"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-paper transition-all duration-200 group-hover:w-3"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.75rem] font-semibold tracking-[0.12em] text-paper/50 uppercase">
              Contact
            </h2>
            <address className="mt-5 space-y-3 text-[0.875rem] leading-[1.7] text-paper/75 not-italic">
              <p>{site.location}</p>
              <p>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-200 hover:text-paper"
                >
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-200 hover:text-paper"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-paper/15 py-6 text-[0.75rem] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}</p>
          <p>All rights reserved</p>
        </div>
      </Container>
    </footer>
  );
}

/**
 * Brand configuration — the single source of truth for institutional identity.
 * Rename the institution here and it propagates through header, footer,
 * metadata and copy references.
 */
export const site = {
  /** Short wordmark used in the header and footer. */
  wordmark: "GWK",
  /** Full display name used in prose and metadata. */
  name: "GWK University",
  /** Campus location. */
  location: "Port Adaar, Coastal Region",
  tagline: "Teaching and research shaped by the coast it sits beside.",
  email: "office@gwk.example.edu",
  phone: "+00 000 000 0000",
} as const;

export const nav = [
  { label: "Admissions", href: "#admissions" },
  { label: "News", href: "#news" },
  { label: "Research", href: "#research" },
  { label: "Faculties", href: "#faculties" },
  { label: "Semester Registration", href: "#registration" },
  { label: "Library", href: "#library" },
] as const;

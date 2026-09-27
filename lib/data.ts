/**
 * Editorial content for the GWK University monochrome homepage.
 *
 * Entirely original — written for this project. No text or imagery is taken
 * from any existing institution, and all artwork is generated (see lib/art.tsx).
 */

import { nav } from "./site";

export { nav };

/* ------------------------------------------------------------------ hero */

export type Slide = {
  id: string;
  date: string;
  headline: string;
  body: string;
  cta: string;
};

export const slides: Slide[] = [
  {
    id: "gwk-coast-resilience",
    date: "18th October 2026",
    headline: "Building resilience along the coast, one programme at a time.",
    body: "The Faculty of Marine and Coastal Sciences opened its term with a review of three years of shoreline monitoring data, and a commitment to publishing the underlying dataset openly.",
    cta: "Read the full story",
  },
  {
    id: "gwk-research-station",
    date: "29th September 2026",
    headline: "The coastal research station opens its doors to students.",
    body: "The new station provides wet laboratory space, a running seawater system and two shared vessels for supervised fieldwork across fourteen sites.",
    cta: "Read the full story",
  },
  {
    id: "gwk-scholarship-fund",
    date: "07th September 2026",
    headline: "Applications open for the regional scholarship fund.",
    body: "Thirty funded places are available across six faculties for students from the surrounding districts. The fund covers full tuition and a living allowance.",
    cta: "Read the full story",
  },
];

/* ------------------------------------------------------------ faculties */

export type Faculty = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  since: number;
};

export const faculties: Faculty[] = [
  {
    slug: "marine-coastal-sciences",
    name: "Marine & Coastal Sciences",
    summary:
      "Oceanography, fisheries science and coastal management, taught with year-round field access.",
    detail:
      "The faculty supervises a fixed shoreline monitoring network and runs a seawater laboratory used by partner institutes for settlement and larval studies.",
    since: 2009,
  },
  {
    slug: "renewable-energy",
    name: "Renewable Energy Engineering",
    summary:
      "Tidal, solar and thermal generation, with grid integration and storage design.",
    detail:
      "Teaching is anchored by a shared energy systems laboratory and a working micro-grid test bed that students design and commission themselves.",
    since: 2012,
  },
  {
    slug: "ai-data-science",
    name: "Artificial Intelligence & Data Science",
    summary:
      "Machine learning, statistical learning and language technology, including low-bandwidth systems.",
    detail:
      "The faculty maintains a computing cluster configured for research and a public dataset programme that publishes anonymised material alongside each paper.",
    since: 2015,
  },
  {
    slug: "global-health-nutrition",
    name: "Global Health & Nutrition",
    summary:
      "Epidemiology, clinical nutrition and health systems, with district placement from year three.",
    detail:
      "Placement rotations run through four partner clinics, and the faculty publishes an open repository of its community health survey instruments.",
    since: 2010,
  },
  {
    slug: "urban-planning",
    name: "Urban Planning & Development",
    summary:
      "Settlement policy, housing and transport, with a studio-based design curriculum.",
    detail:
      "The planning studio works on live briefs supplied by two municipalities, and students present their final schemes to those councils each year.",
    since: 2013,
  },
  {
    slug: "finance-digital-economy",
    name: "Finance & the Digital Economy",
    summary:
      "Accounting, financial markets and digital payments for a rapidly formalising regional economy.",
    detail:
      "The faculty runs a professional accounting track recognised for local practice and maintains a fintech incubation room shared with the local exchange.",
    since: 2011,
  },
  {
    slug: "education-policy-society",
    name: "Education, Policy & Society",
    summary:
      "Teaching methodology, education policy and sociology, with school-based research placements.",
    detail:
      "Trainee teachers complete term-long placements across the district's secondary schools, and the faculty publishes classroom research jointly with those schools.",
    since: 2014,
  },
];

export const facultyNote =
  "Filter by faculty to narrow the featured announcement. Each selection loads the matching faculty profile, its current priorities and the announcements published this term.";

/* -------------------------------------------------------------- research */

export const researchCategories = [
  { id: "random", label: "Random" },
  { id: "date", label: "Date" },
  { id: "marine", label: "Marine Biology" },
  { id: "climate", label: "Climate Systems" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "health", label: "Public Health" },
  { id: "energy", label: "Renewable Technology" },
  { id: "education", label: "Education" },
] as const;

export type ResearchCategoryId = (typeof researchCategories)[number]["id"];

export type ResearchCard = {
  id: string;
  category: Exclude<ResearchCategoryId, "random" | "date">;
  date: string;
  title: string;
  body: string;
  linked?: boolean;
};

export const researchCards: ResearchCard[] = [
  {
    id: "gw01",
    category: "marine",
    date: "April 2026 — March 2026",
    title: "Nursery translocation viability across six coastal sites",
    body: "The Marine and Coastal Sciences faculty tracked tagged fragments at six reef sites for fourteen months. Survival correlated with current exposure rather than depth. The dataset is published openly for reuse.",
    linked: true,
  },
  {
    id: "gw02",
    category: "energy",
    date: "January 2026 — December 2025",
    title: "Seasonal capacity of a regional tidal array",
    body: "Renewable Energy Engineering modelled output across a full lunar cycle and found predictability high enough to displace thermal peaking plant for roughly nine months of the year.",
  },
  {
    id: "gw03",
    category: "ai",
    date: "March 2026 — February 2026",
    title: "Speech recognition for clinics on congested links",
    body: "A compact model was fine-tuned on 140 hours of clinical dictation recorded over degraded connections. Word error rate on the hardest conditions was 11.2 per cent, within reach of useful deployment.",
    linked: true,
  },
  {
    id: "gw04",
    category: "health",
    date: "November 2025 — October 2025",
    title: "Attendance and dietary adequacy in district primary schools",
    body: "A survey of 62 schools found meal provision associated with a measurable attendance effect. The faculty recommends targeting the twenty schools with the largest gap.",
  },
  {
    id: "gw05",
    category: "climate",
    date: "February 2026 — January 2026",
    title: "Heat-resilient housing for arid coastal settlements",
    body: "Thermal modelling across nine housing typologies identified reflective roofing and cross-ventilation as the highest-yield pair. Retrofit cost is modelled against a decade of energy data.",
  },
  {
    id: "gw06",
    category: "ai",
    date: "June 2026 — May 2026",
    title: "Federated learning across district clinics",
    body: "Four clinics trained a shared diagnostic model without exchanging patient records. The approach is described in full, including the aggregation schedule and its failure modes.",
    linked: true,
  },
  {
    id: "gw07",
    category: "marine",
    date: "August 2025 — July 2025",
    title: "Co-management and quota compliance in the inshore fishery",
    body: "Landing-site monitoring across eleven sites over eighteen months found compliance driven almost entirely by market price rather than enforcement intensity.",
  },
  {
    id: "gw08",
    category: "climate",
    date: "May 2026 — April 2026",
    title: "Stabilising sand movement behind the new coastal road",
    body: "Sediment surveys at eight transects found the road alignment interrupting longshore drift. The faculty recommends a managed retreat over hard protection in three of the five reaches studied.",
  },
  {
    id: "gw09",
    category: "education",
    date: "October 2025 — September 2025",
    title: "Measuring attention in low-bandwidth classrooms",
    body: "A lightweight attention proxy built on interaction logs performed acceptably against classroom observation. The instruments and scoring code are released for classroom use.",
  },
  {
    id: "gw10",
    category: "energy",
    date: "December 2025 — November 2025",
    title: "Recovering waste heat from district hospital ventilation",
    body: "Retrofit modelling across four hospitals estimated annual heat recovery sufficient to supply a meaningful share of domestic hot water, at payback under five years.",
  },
  {
    id: "gw11",
    category: "health",
    date: "July 2026 — June 2026",
    title: "Cold-chain continuity for district immunisation",
    body: "A twelve-month log review of 34 cold points found the largest single failure mode was power interruption rather than equipment fault. The faculty recommends prioritising backup capacity.",
    linked: true,
  },
  {
    id: "gw12",
    category: "education",
    date: "March 2026 — February 2026",
    title: "Vocational pathway uptake in coastal towns",
    body: "Survey work across five towns found uptake strongly predicted by perceived wage return rather than entry cost. The study argues financial aid alone would shift enrolment little.",
  },
];

/* ----------------------------------------------------------------- news */

export type NewsCard = {
  id: string;
  date: string;
  title: string;
  body: string;
  linked?: boolean;
};

export const newsCards: NewsCard[] = [
  {
    id: "gn01",
    date: "18th October 2026",
    title: "Marine research station opens to student researchers",
    body: "The station brings wet laboratory space, a running seawater system and two shared vessels under one roof. The Faculty of Marine and Coastal Sciences will supervise all supervised coursework from the new site.",
    linked: true,
  },
  {
    id: "gn02",
    date: "29th September 2026",
    title: "Energy faculty signs agreement with the regional utility",
    body: "The agreement gives students supervised access to the utility's metering data and two grid sites. Renewable Energy Engineering will use it for forecasting coursework and a live forecasting exercise each term.",
  },
  {
    id: "gn03",
    date: "07th September 2026",
    title: "Scholarship fund opens thirty funded places",
    body: "Thirty places covering full tuition and a living allowance are available across six faculties for students from surrounding districts. Applications close at the end of the month.",
    linked: true,
  },
  {
    id: "gn04",
    date: "24th August 2026",
    title: "Semester registration opens for all faculties",
    body: "Registration runs for three weeks through the student portal. A schedule of faculty-specific windows is published, and the registry has extended evening hours for the opening week.",
  },
  {
    id: "gn05",
    date: "11th August 2026",
    title: "First cohort completes the coastal engineering certificate",
    body: "All twenty-one candidates completed the nine-month certificate, which combines supervised fieldwork with a supervised placement in a municipal works department.",
    linked: true,
  },
  {
    id: "gn06",
    date: "30th July 2026",
    title: "Health sciences faculty publishes an open survey dataset",
    body: "Anonymised instruments and collected responses from the district health survey are now openly available. The faculty invites reuse and documents the consent and anonymisation process.",
  },
  {
    id: "gn07",
    date: "16th July 2026",
    title: "Student robotics team places at the regional competition",
    body: "The team finished second overall, with their autonomous survey rover awarded the instrumentation prize. The build is being documented as an open teaching kit for next year.",
  },
  {
    id: "gn08",
    date: "02nd July 2026",
    title: "Planning studio briefs confirmed with two municipalities",
    body: "Students in the Urban Planning studio will present final schemes to both municipal councils at the end of the academic year, as they have for the last four cohorts.",
    linked: true,
  },
];

/* ------------------------------------------------------- course search */

export const courseSearch = {
  heading: "Begin at GWK; search programmes across seven faculties.",
  body: "Compare entry requirements, credit loads and field time across every programme, then submit one application covering up to three choices.",
  imageLink: "Admissions",
  imageCaption:
    "Selection is by completed application rather than first sitting. Supporting documents can be uploaded through the student portal at any point before the closing date.",
  tracks: [
    {
      id: "undergraduate",
      label: "Undergraduate",
      summary:
        "Programmes run across all seven faculties. Entry is by completed secondary certificate, with subject requirements varying by programme. Most degrees are three years, with four-year options in engineering and planning.",
    },
    {
      id: "postgraduate",
      label: "Postgraduate",
      summary:
        "Taught master's programmes and research degrees are available in every faculty. Applicants need a recognised first degree or equivalent, and research applicants submit a proposal as part of the application.",
    },
  ],
} as const;

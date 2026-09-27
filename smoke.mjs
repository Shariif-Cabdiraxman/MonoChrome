/**
 * Smoke test against the production build.
 * Verifies rendered DOM *and* the compiled CSS/JS bundles, since the reveal
 * observer and reduced-motion rules live outside the HTML.
 */
const BASE = process.env.BASE || "http://localhost:3000";

const checks = [];
const check = (name, cond, detail = "") =>
  checks.push({ name, pass: !!cond, detail });

const res = await fetch(BASE);
const html = await res.text();
check("HTTP 200", res.status === 200, `got ${res.status}`);

/* ------------------------------------------------------------------ DOM */

// Note: React SSR splits interleaved text and expressions with comment markers
// ("About <!-- -->GWK"), so headings built from config are checked by anchor.
for (const [anchor, word] of [
  ["about-h", "About"],
  ["faculties-h", "Faculties"],
  ["research-h", "Research"],
  ["news-h", "Latest News"],
  ["course-h", "Begin at GWK"],
]) {
  check(`heading "${word}"`, html.includes(anchor) && html.includes(word));
}

check("GWK wordmark", html.includes("GWK"));
check("no UOH branding remains", !html.includes("UOH"));
check("no Hargeisa references", !html.includes("Hargeisa"));
check("no Somaliland references", !html.includes("Somaliland"));
for (const n of ["Admissions", "News", "Research", "Faculties", "Semester Registration", "Library"]) {
  check(`nav "${n}"`, html.includes(n));
}
check("sticky header", html.includes("sticky") && html.includes("top-0"));

check("hero headline", html.includes("Building resilience along the coast"));
check("hero crossfade layers", (html.match(/duration-\[1100ms\]/g) || []).length >= 3);
const tabCount = (html.match(/aria-pressed="(true|false)"/g) || []).length;
check("filter tabs present", tabCount >= 14, `${tabCount} tabs`);

for (const f of [
  "Marine &amp; Coastal Sciences",
  "Renewable Energy Engineering",
  "Artificial Intelligence &amp; Data Science",
  "Global Health &amp; Nutrition",
  "Urban Planning &amp; Development",
  "Finance &amp; the Digital Economy",
  "Education, Policy &amp; Society",
]) {
  check(`faculty "${f.replace(/&amp;/g, "&")}"`, html.includes(f));
}
check("NOTE: label", html.includes("Note:"));
for (const c of ["Marine Biology", "Climate Systems", "Artificial Intelligence", "Public Health", "Renewable Technology", "Education"]) {
  check(`research tab "${c}"`, html.includes(c));
}

// 3 hero + 1 faculty + 4 research + 4 news + 2 course = 14 plates
const plates = (html.match(/viewBox="0 0 1200 800"/g) || []).length;
check("generated art plates", plates === 14, `${plates} plates`);
check("4-col card grid", html.includes("lg:grid-cols-4"));
check("carousel controls", html.includes("Previous") && html.includes("Next"));
check("course accordion", html.includes("Undergraduates"));
check("aria-expanded wired", html.includes("aria-expanded"));
check("admissions link", html.includes("Admissions"));
check("footer quick links", html.includes("Quick Links"));
check("footer copyright", html.includes("All rights reserved"));
check("reveal wrappers", html.includes("data-shown"));

/* ------------------------------------------------------- compiled CSS */

const cssHref = (html.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/) || [])[1];
check("css bundle linked", !!cssHref, cssHref || "none");
const css = cssHref ? await (await fetch(BASE + cssHref)).text() : "";

check("reduced-motion honoured", css.includes("prefers-reduced-motion"));
check("reveal keyframes present", css.includes("fadeUp"));
check("serif display font", css.includes("Source Serif") || css.includes("source-serif"));
check("body sans font", /Inter|--font-inter/.test(css));

// Palette discipline, measured on the stylesheet only.
// Tailwind v4 encodes alpha as an extra byte on the hex (#111 + 14% -> #11111114),
// so split the digits and compare only the colour portion.
const NORMALISE = new Map([
  ["#111111", "ink"],
  ["#111", "ink"],
  ["#888888", "gray"],
  ["#888", "gray"],
  ["#ffffff", "paper"],
  ["#fff", "paper"],
  ["#000000", "transparent"],
  ["#000", "transparent"],
]);

const strayHex = [];
for (const raw of css.match(/#[0-9a-fA-F]{3,8}\b/g) || []) {
  const digits = raw.slice(1).toLowerCase();
  let base;
  if (digits.length === 8) base = `#${digits.slice(0, 6)}`; // 6-digit + alpha
  else if (digits.length === 4) base = `#${digits.slice(0, 3)}`; // 3-digit + alpha
  else base = `#${digits}`;

  if (!NORMALISE.has(base)) strayHex.push(raw);
}
check("CSS palette limited to 3 values", strayHex.length === 0, strayHex.join(", "));

// Every 8-digit hex must be a pure alpha derivation of ink or paper.
const badAlpha = (css.match(/#[0-9a-fA-F]{8}\b/g) || [])
  .map((h) => h.toLowerCase())
  .filter((h) => !h.startsWith("#111111") && !h.startsWith("#ffffff"));
check("alpha only from ink/paper", badAlpha.length === 0, badAlpha.join(", "));

// Alpha derivations only — no other rgb() hues allowed.
const rgbs = new Set(
  (css.match(/rgb\(\s*\d+\s+\d+\s+\d+/g) || []).map((s) =>
    s.replace(/[^0-9\s]/g, "").trim().split(/\s+/).slice(0, 3).join(" "),
  ),
);
const strayRgb = [...rgbs].filter((c) => c !== "17 17 17" && c !== "255 255 255");
check("alpha derivations only", strayRgb.length === 0, strayRgb.join(" | "));

/* -------------------------------------------------------- compiled JS */

const jsSrcs = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map(
  (m) => m[1],
);
check("js chunks linked", jsSrcs.length > 0, `${jsSrcs.length} chunks`);
const js = (
  await Promise.all(jsSrcs.map((u) => fetch(BASE + u).then((r) => r.text())))
).join("\n");

check("IntersectionObserver in bundle", js.includes("IntersectionObserver"));
check("hero autoplay interval", js.includes("6500"));

/* ------------------------------------------------------------ report */

let failed = 0;
for (const c of checks) {
  if (!c.pass) failed++;
  console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.detail ? `  [${c.detail}]` : ""}`);
}
console.log(`\n${checks.length - failed}/${checks.length} passed`);
process.exit(failed ? 1 : 0);

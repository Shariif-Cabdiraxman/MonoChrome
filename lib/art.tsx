/**
 * Monochrome artwork generator.
 *
 * Produces deterministic, inline SVG compositions from a string seed, so every
 * category gets a visually distinct plate while the whole set still reads as one
 * family. Constrained to the three palette values — no hue, ever.
 *
 * Rendering inline (rather than shipping image files) keeps output crisp at any
 * size and removes the network dependency entirely.
 */

const INK = "#111111";
const GRAY = "#888888";
const PAPER = "#FFFFFF";

/** xmur3 string hash → 32-bit seed. */
function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i += 1) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^= h >>> 16) >>> 0;
}

/** mulberry32 PRNG — small, fast, stable across runs. */
function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Palette = typeof INK | typeof GRAY | typeof PAPER;

/** Builds an rgba() string from one of the three palette values. */
function wash(base: Palette, alpha: number): string {
  const hex = base.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

const ARCHETYPES = [
  "strata",
  "arc",
  "lattice",
  "rays",
  "steps",
  "orbit",
  "field",
] as const;

type Archetype = (typeof ARCHETYPES)[number];

const VIEW = { w: 1200, h: 800 } as const;

function strata(r: () => number) {
  const out: React.ReactNode[] = [];
  const bands = 7 + Math.floor(r() * 5);
  let y = 0;
  for (let i = 0; i < bands; i += 1) {
    const h = (VIEW.h / bands) * (0.45 + r() * 1.15);
    const x = (r() - 0.5) * VIEW.w * 0.34;
    const w = VIEW.w * (0.34 + r() * 0.72);
    const fill = r() > 0.72 ? INK : GRAY;
    const alpha = 0.1 + r() * 0.62;
    out.push(
      <rect
        key={`s${i}`}
        x={x}
        y={y}
        width={w}
        height={h}
        fill={wash(fill, alpha)}
      />,
    );
    y += h * 0.72;
    if (y > VIEW.h) break;
  }
  return out;
}

function arc(r: () => number) {
  const out: React.ReactNode[] = [];
  const cx = r() > 0.5 ? 0 : VIEW.w;
  const cy = r() > 0.5 ? 0 : VIEW.h;
  const rings = 6 + Math.floor(r() * 5);
  for (let i = 0; i < rings; i += 1) {
    const rad = 60 + i * (46 + r() * 54);
    const fill = i % 3 === 0 ? INK : GRAY;
    out.push(
      <circle
        key={`a${i}`}
        cx={cx}
        cy={cy}
        r={rad}
        fill="none"
        stroke={wash(fill, 0.14 + r() * 0.5)}
        strokeWidth={2 + r() * 30}
      />,
    );
  }
  out.push(
    <circle
      key="ac"
      cx={cx}
      cy={cy}
      r={30 + r() * 46}
      fill={wash(INK, 0.88)}
    />,
  );
  return out;
}

function lattice(r: () => number) {
  const out: React.ReactNode[] = [];
  const cols = 8 + Math.floor(r() * 6);
  const gap = 8;
  const cw = (VIEW.w - gap * (cols + 1)) / cols;
  const rows = Math.ceil((VIEW.h + gap) / (cw + gap));
  for (let x = 0; x < cols; x += 1) {
    for (let y = 0; y < rows; y += 1) {
      const v = r();
      if (v < 0.42) continue;
      const fill = v > 0.86 ? INK : GRAY;
      out.push(
        <rect
          key={`l${x}-${y}`}
          x={gap + x * (cw + gap)}
          y={gap + y * (cw + gap)}
          width={cw}
          height={cw}
          fill={wash(fill, 0.08 + v * 0.66)}
        />,
      );
    }
  }
  return out;
}

function rays(r: () => number) {
  const out: React.ReactNode[] = [];
  const ox = r() > 0.5 ? -VIEW.w * 0.1 : VIEW.w * 1.1;
  const oy = r() > 0.5 ? -VIEW.h * 0.1 : VIEW.h * 1.1;
  const n = 16 + Math.floor(r() * 18);
  const spread = Math.PI * 0.5;
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * spread + r() * 0.03;
    const len = 900 + r() * 700;
    const x2 = ox + Math.cos(a) * len * Math.sign(ox > VIEW.w / 2 ? -1 : 1);
    const y2 = oy + Math.sin(a) * len;
    out.push(
      <line
        key={`r${i}`}
        x1={ox}
        y1={oy}
        x2={x2}
        y2={y2}
        stroke={wash(i % 4 === 0 ? INK : GRAY, 0.12 + r() * 0.5)}
        strokeWidth={3 + r() * 16}
      />,
    );
  }
  return out;
}

function steps(r: () => number) {
  const out: React.ReactNode[] = [];
  const n = 9 + Math.floor(r() * 7);
  const bw = VIEW.w / n;
  for (let i = 0; i < n; i += 1) {
    const h = VIEW.h * (0.16 + (i / n) * (0.42 + r() * 0.4));
    const fill = r() > 0.78 ? INK : GRAY;
    out.push(
      <rect
        key={`t${i}`}
        x={i * bw + bw * 0.12}
        y={VIEW.h - h}
        width={bw * 0.76}
        height={h}
        fill={wash(fill, 0.12 + r() * 0.6)}
      />,
    );
  }
  out.push(
    <rect
      key="tl"
      x={0}
      y={VIEW.h - 3}
      width={VIEW.w}
      height={3}
      fill={wash(INK, 0.8)}
    />,
  );
  return out;
}

function orbit(r: () => number) {
  const out: React.ReactNode[] = [];
  const cx = VIEW.w * (0.3 + r() * 0.4);
  const cy = VIEW.h * (0.3 + r() * 0.4);
  for (let i = 0; i < 5; i += 1) {
    const rad = 90 + i * (70 + r() * 60);
    out.push(
      <circle
        key={`o${i}`}
        cx={cx}
        cy={cy}
        r={rad}
        fill="none"
        stroke={wash(i % 2 ? GRAY : INK, 0.14 + r() * 0.4)}
        strokeWidth={1.5 + r() * 5}
      />,
    );
  }
  const dots = 6 + Math.floor(r() * 7);
  for (let i = 0; i < dots; i += 1) {
    const ang = r() * Math.PI * 2;
    const rad = 90 + r() * 420;
    out.push(
      <circle
        key={`od${i}`}
        cx={cx + Math.cos(ang) * rad}
        cy={cy + Math.sin(ang) * rad}
        r={8 + r() * 40}
        fill={wash(r() > 0.5 ? INK : GRAY, 0.2 + r() * 0.6)}
      />,
    );
  }
  return out;
}

function field(r: () => number) {
  const out: React.ReactNode[] = [];
  const step = 34;
  const fx = VIEW.w * (0.25 + r() * 0.5);
  const fy = VIEW.h * (0.25 + r() * 0.5);
  const max = Math.hypot(VIEW.w, VIEW.h);
  for (let x = step; x < VIEW.w; x += step) {
    for (let y = step; y < VIEW.h; y += step) {
      const d = Math.hypot(x - fx, y - fy) / max;
      const v = r() * (1 - d) * 1.7;
      if (v < 0.12) continue;
      const rad = 1.5 + v * 11;
      out.push(
        <circle
          key={`f${x}-${y}`}
          cx={x}
          cy={y}
          r={rad}
          fill={wash(v > 0.72 ? INK : GRAY, 0.14 + v * 0.6)}
        />,
      );
    }
  }
  return out;
}

const RENDER: Record<Archetype, (r: () => number) => React.ReactNode[]> = {
  strata,
  arc,
  lattice,
  rays,
  steps,
  orbit,
  field,
};

export type ArtProps = {
  /** Stable identity for this plate — same seed always yields the same art. */
  seed: string;
  /** `ink` puts a dark plate behind light content; `paper` keeps it light. */
  tone?: "ink" | "paper";
  className?: string;
  /** Accessible label; omit for purely decorative use. */
  label?: string;
};

/**
 * Deterministic monochrome plate. Server-rendered inline SVG.
 */
export function Art({ seed, tone = "paper", className, label }: ArtProps) {
  const r = rng(hashSeed(seed));
  const archetype = ARCHETYPES[hashSeed(seed) % ARCHETYPES.length];
  const shape = RENDER[archetype](r);
  const base = tone === "ink" ? INK : PAPER;

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <rect width={VIEW.w} height={VIEW.h} fill={base} />
      {shape}
      <rect
        width={VIEW.w}
        height={VIEW.h}
        fill="none"
        stroke={wash(INK, 0.16)}
        strokeWidth={2}
      />
    </svg>
  );
}

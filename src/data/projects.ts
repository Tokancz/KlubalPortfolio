/**
 * Data-driven portfolio projects.
 *
 * Images are auto-discovered from `src/assets/images/projects/<key>/*` — no
 * manual imports. Each project = one folder; the files inside (sorted by name,
 * e.g. 01.jpg, 02.jpg) become that project's gallery, first = cover.
 *
 * To ADD a project:    npm run new-project <key>   (then drop photos in + fill the stub)
 * To REMOVE a project: npm run remove-project <key>
 *
 * `idx` ("001") is derived from order below, so you never hand-maintain it.
 * imagetools (see vite.config.ts) resizes/compresses every image at build time.
 */

/** A design token name used as a per-project accent colour. */
export type AccentVar = '--red' | '--magenta' | '--cyan' | '--brass'

/** Hand-authored fields for a project (everything except images + derived idx). */
export interface ProjectMeta {
  /** Stable key — must match the folder name under images/projects/. */
  key: string
  title: string
  kind: string
  year: string
  /** Design-token name for the accent colour. */
  accent: AccentVar
  /** Whether this is the large 2×2 featured tile in the grid. */
  featured?: boolean
  tools: string[]
  /** One paragraph per entry. */
  blurb: string[]
  /** Ordered key/value spec readout. */
  specs: Record<string, string>
}

/** A fully resolved project: metadata + auto-discovered images + derived index. */
export interface Project extends ProjectMeta {
  /** Zero-padded display index, e.g. "001" — derived from order. */
  idx: string
  /** All gallery image URLs for this project, in filename order. */
  images: string[]
  /** First image, used as the grid/card thumbnail. */
  cover: string
}

/**
 * Eagerly import + optimize every project image. The glob path is relative
 * (import.meta.glob does not resolve the `@` alias) and the query runs each
 * file through imagetools → resized to ≤2560px wide, re-encoded JPEG q80.
 */
const files = import.meta.glob<string>(
  '../assets/images/projects/*/*.{jpg,jpeg,png}',
  { eager: true, import: 'default', query: { w: 2560, format: 'jpg', quality: 80 } },
)

/** Group image URLs by their `<key>` folder, sorted by path for stable order. */
const imagesByKey: Record<string, string[]> = {}
for (const path of Object.keys(files).sort()) {
  const match = path.match(/\/projects\/([^/]+)\//)
  if (!match) continue
  const key = match[1]
  ;(imagesByKey[key] ??= []).push(files[path])
}

/**
 * Project metadata, in display order. Order here defines the Work grid layout
 * and the lightbox prev/next sequence. The featured project becomes the 2×2
 * tile; everything else flows as uniform tiles.
 *
 * NOTE: some `specs` figures are sample/placeholder values — confirm real
 * numbers before shipping a new piece.
 */
const projectMeta: ProjectMeta[] = [
  {
    key: 'railgun',
    title: 'Railgun',
    kind: 'Hard-Surface',
    year: '2025',
    accent: '--red',
    featured: true,
    tools: ['Blender', 'Cycles', 'Substance'],
    blurb: [
      'A Six-legged siege drone built around a top-mounted railgun. The brief I set myself: read as a threat from silhouette alone, then reward a closer look with mechanical detail.',
      'Hard-surface modeling with emissive red accents driving the mood. Lit on a neutral studio grey so the glow does the work.',
    ],
    specs: {
      Engine: 'Cycles',
      Tris: '400K',
      Maps: 'Mostly procedural',
      Year: '2025',
    },
  },
  {
    key: 'hope',
    title: 'Hope',
    kind: 'Short film',
    year: '2026',
    accent: '--magenta',
    tools: ['Blender', 'Cycles', 'Davinci Resolve'],
    blurb: [
      'Hope is a short film about a big Earths mission to save humanity from an extinction-level asteroid. I made it as a student project to practice storytelling and animation, and to explore a more painterly style.',
    ],
    specs: {
      Engine: 'Cycles',
      Tris: '2M',
      Comp: 'Davinci Resolve',
      Year: '2026',
    },
  },
  {
    key: 'deluxo',
    title: 'Deluxo',
    kind: 'Vehicle',
    year: '2025',
    accent: '--cyan',
    tools: ['Blender', 'Cycles'],
    blurb: [
      'A retro-future car inspired by Back to the future and GTA5 with neon underglow, caught mid-motion on a coastal overpass. Motion blur and a shallow depth of field keep the eye on the light.',
      'My study in animating a believable speed shot — the rig, the road, and the rim light all built to read at 24fps.',
    ],
    specs: {
      Engine: 'Cycles',
      Tris: '190K',
      Maps: 'Mostly procedural',
      Year: '2025',
    },
  },
  {
    key: 'steampunk',
    title: 'Steampunk Balloon',
    kind: 'Environment',
    year: '2024',
    accent: '--red',
    tools: ['Blender', 'Cycles'],
    blurb: [
      'A sky full of steampunk inspired airships and balloon-craft over open cloud. A warm, busy scene.',
      'Gears, rivets and canvas — the most prop-heavy piece I have made.',
    ],
    specs: {
      Engine: 'Cycles',
      Tris: '4.5M',
      Craft: '12 unique',
      Year: '2024',
    },
  },
  {
    key: 'ornithopter',
    title: 'Ornithopter',
    kind: 'Vehicle',
    year: '2024',
    accent: '--brass',
    tools: ['Blender'],
    blurb: [
      'A desert ornithopter from Dune, modeled on a clean seamless to focus purely on form and worn-metal texture.',
      'An early piece — kept here because the panel work and the cockpit glass still hold up.',
    ],
    specs: {
      Engine: 'Cycles',
      Tris: '40K',
      Maps: 'Mostly procedural',
      Year: '2024',
    },
  },
  /* @new-project-anchor */
]

/** Resolved projects: metadata merged with auto-discovered images + derived idx. */
export const projects: Project[] = projectMeta.map((meta, i) => {
  const images = imagesByKey[meta.key] ?? []
  return {
    ...meta,
    idx: String(i + 1).padStart(3, '0'),
    images,
    cover: images[0] ?? '',
  }
})

/** Look a project up by its key. */
export function findProject(key: string): Project | undefined {
  return projects.find((p) => p.key === key)
}

/**
 * Static portfolio project data, ported from the design handoff's
 * `site.js` PROJECTS / ORDER. Order here defines the Work grid layout
 * and the lightbox prev/next sequence.
 *
 * NOTE: the `specs` figures are sample/placeholder values from the
 * handoff — confirm real numbers with the artist before shipping.
 */
import railgunImg from '@/assets/images/railgun.jpg'
import hopeImg from '@/assets/images/hope.jpg'
import deluxoImg from '@/assets/images/deluxo.jpg'
import steampunkImg from '@/assets/images/steampunk.jpg'
import ornithopterImg from '@/assets/images/ornithopter.jpg'

/** A design token name used as a per-project accent colour. */
export type AccentVar = '--red' | '--magenta' | '--cyan' | '--brass'

/** Position in the asymmetric Work grid (see grid-template-areas). */
export type GridArea = 'f' | 'a' | 'b' | 'c' | 'd'

export interface Project {
  /** Stable key used for routing within the lightbox. */
  key: string
  /** Zero-padded display index, e.g. "001". */
  idx: string
  title: string
  kind: string
  year: string
  /** Design-token name for the accent colour. */
  accent: AccentVar
  /** Bundled image URL. */
  img: string
  /** Whether this is the large 2×2 featured tile. */
  featured: boolean
  /** Named grid area for the Work layout. */
  area: GridArea
  tools: string[]
  /** One paragraph per entry. */
  blurb: string[]
  /** Ordered key/value spec readout. */
  specs: Record<string, string>
}

export const projects: Project[] = [
  {
    key: 'railgun',
    idx: '001',
    title: 'Railgun',
    kind: 'Hard-Surface',
    year: '2025',
    accent: '--red',
    img: railgunImg,
    featured: true,
    area: 'f',
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
    idx: '002',
    title: 'Hope',
    kind: 'Short film',
    year: '2026',
    accent: '--magenta',
    img: hopeImg,
    featured: false,
    area: 'a',
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
    idx: '003',
    title: 'Deluxo',
    kind: 'Vehicle',
    year: '2025',
    accent: '--cyan',
    img: deluxoImg,
    featured: false,
    area: 'b',
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
    idx: '004',
    title: 'Skyport',
    kind: 'Environment',
    year: '2024',
    accent: '--brass',
    img: steampunkImg,
    featured: false,
    area: 'c',
    tools: ['Blender', 'Cycles'],
    blurb: [
      'A sky full of brass airships and balloon-craft over open cloud. A warm, busy scene to practice instancing and atmospheric depth.',
      'Gears, rivets and canvas — the most prop-heavy piece I have made, and the one that taught me to budget polygons.',
    ],
    specs: {
      Samples: '1536',
      Engine: 'Cycles',
      Render: '21m 03s',
      Tris: '5.6M',
      Craft: '12 unique',
      Year: '2024',
    },
  },
  {
    key: 'ornithopter',
    idx: '005',
    title: 'Ornithopter',
    kind: 'Vehicle',
    year: '2024',
    accent: '--brass',
    img: ornithopterImg,
    featured: false,
    area: 'd',
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
]

/** Look a project up by its key. */
export function findProject(key: string): Project | undefined {
  return projects.find((p) => p.key === key)
}

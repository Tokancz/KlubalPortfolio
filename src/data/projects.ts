/**
 * Static portfolio project data, ported from the design handoff's
 * `site.js` PROJECTS / ORDER. Order here defines the Work grid layout
 * and the lightbox prev/next sequence.
 *
 * NOTE: the `specs` figures are sample/placeholder values from the
 * handoff — confirm real numbers with the artist before shipping.
 */
import railgunImg from '@/assets/images/railgun.png'
import hopeImg from '@/assets/images/hope.png'
import deluxoImg from '@/assets/images/deluxo.png'
import steampunkImg from '@/assets/images/steampunk.png'
import ornithopterImg from '@/assets/images/ornithopter.png'

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
      'A four-legged siege drone built around a top-mounted railgun. The brief I set myself: read as a threat from silhouette alone, then reward a closer look with mechanical detail.',
      'Hard-surface modeling with emissive red accents driving the mood. Lit on a neutral studio grey so the glow does the work.',
    ],
    specs: {
      Samples: '4096',
      Engine: 'Cycles',
      Render: '14m 22s',
      Tris: '1.8M',
      Maps: '4K PBR',
      Year: '2025',
    },
  },
  {
    key: 'hope',
    idx: '002',
    title: 'Hope',
    kind: 'Environment',
    year: '2025',
    accent: '--magenta',
    img: hopeImg,
    featured: false,
    area: 'a',
    tools: ['Blender', 'Eevee', 'Photoshop'],
    blurb: [
      'The VISIONÄRE orbital station, parked above a rose-colored world inside an asteroid belt. An exercise in scale — tiny structural detail against a planet-sized backdrop.',
      'Chromatic aberration and bloom were pushed in comp to sell the cinematic, lens-captured feel.',
    ],
    specs: {
      Samples: '2048',
      Engine: 'Eevee',
      Render: '6m 10s',
      Tris: '3.2M',
      Comp: 'Photoshop',
      Year: '2025',
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
      'A retro-future hover coupe with neon underglow, caught mid-motion on a coastal overpass. Motion blur and a shallow depth of field keep the eye on the light.',
      'My study in animating a believable speed shot — the rig, the road, and the rim light all built to read at 24fps.',
    ],
    specs: {
      Samples: '3072',
      Engine: 'Cycles',
      Render: '9m 48s',
      Tris: '900K',
      Maps: '2K PBR',
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
      'A desert dropship with long folding wings, modeled on a clean seamless to focus purely on form and worn-metal texture.',
      'An early piece — kept here because the panel work and the cockpit glass still hold up.',
    ],
    specs: {
      Samples: '1024',
      Engine: 'Cycles',
      Render: '4m 51s',
      Tris: '740K',
      Maps: '2K PBR',
      Year: '2024',
    },
  },
]

/** Look a project up by its key. */
export function findProject(key: string): Project | undefined {
  return projects.find((p) => p.key === key)
}

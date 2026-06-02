#!/usr/bin/env node
/**
 * Scaffold a new portfolio project.
 *
 *   npm run new-project <key>
 *
 * Creates src/assets/images/projects/<key>/ and inserts a ready-to-fill
 * metadata stub into src/data/projects.ts (just before the @new-project-anchor).
 * Then drop your photos into the folder and fill in the title/blurb/specs.
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ANCHOR = '/* @new-project-anchor */'

const key = (process.argv[2] ?? '').trim()

if (!key) {
  console.error('✖ Usage: npm run new-project <key>   (e.g. npm run new-project mech-suit)')
  process.exit(1)
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(key)) {
  console.error(`✖ Key "${key}" must be kebab-case: lowercase letters/numbers, words joined by "-".`)
  process.exit(1)
}

const folder = join(root, 'src/assets/images/projects', key)
const dataFile = join(root, 'src/data/projects.ts')
const data = readFileSync(dataFile, 'utf8')

if (existsSync(folder) || data.includes(`key: '${key}'`)) {
  console.error(`✖ Project "${key}" already exists. Pick another key or remove it first.`)
  process.exit(1)
}
if (!data.includes(ANCHOR)) {
  console.error(`✖ Could not find ${ANCHOR} in projects.ts — did the file change?`)
  process.exit(1)
}

// 1. Image folder (with a .gitkeep so the empty folder can be committed).
mkdirSync(folder, { recursive: true })
writeFileSync(join(folder, '.gitkeep'), '')

// 2. Metadata stub, inserted just before the anchor.
const title = key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
const year = String(new Date().getFullYear())
const stub = `{
    key: '${key}',
    title: '${title}',
    kind: 'Hard-Surface',
    year: '${year}',
    accent: '--red',
    featured: false,
    tools: ['Blender'],
    blurb: [
      'Describe this project — what it is and what you set out to do.',
      'A second paragraph on technique or process (optional).',
    ],
    specs: {
      Engine: 'Cycles',
      Year: '${year}',
    },
  },
  ${ANCHOR}`

writeFileSync(dataFile, data.replace(ANCHOR, stub))

console.log(`✓ Created src/assets/images/projects/${key}/`)
console.log(`✓ Added a "${title}" stub to src/data/projects.ts`)
console.log('')
console.log('Next:')
console.log(`  1. Drop your renders into projects/${key}/ (name them 01.jpg, 02.jpg, … for order)`)
console.log(`  2. Edit the stub in src/data/projects.ts — title, kind, accent, tools, blurb, specs`)
console.log(`  3. Set featured: true on at most one project for the big 2×2 tile`)

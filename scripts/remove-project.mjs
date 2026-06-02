#!/usr/bin/env node
/**
 * Remove a portfolio project.
 *
 *   npm run remove-project <key>          (asks to confirm)
 *   npm run remove-project <key> -- --yes (skip the prompt)
 *
 * Deletes src/assets/images/projects/<key>/ and removes the matching metadata
 * object from src/data/projects.ts.
 */
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import { existsSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { createInterface } from 'node:readline'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const yes = args.includes('--yes') || args.includes('-y')
const key = (args.find((a) => !a.startsWith('-')) ?? '').trim()

if (!key) {
  console.error('✖ Usage: npm run remove-project <key> [-- --yes]')
  process.exit(1)
}

const folder = join(root, 'src/assets/images/projects', key)
const dataFile = join(root, 'src/data/projects.ts')
const data = readFileSync(dataFile, 'utf8')

const keyMarker = `key: '${key}'`
const hasEntry = data.includes(keyMarker)
const hasFolder = existsSync(folder)

if (!hasEntry && !hasFolder) {
  console.error(`✖ No project "${key}" found (no folder and no entry in projects.ts).`)
  process.exit(1)
}

/** Remove the object literal containing `key: '<key>'` (key is its first field). */
function stripEntry(src) {
  const startKey = src.indexOf(keyMarker)
  if (startKey === -1) return src
  const open = src.lastIndexOf('{', startKey)
  let depth = 0
  let end = -1
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}' && --depth === 0) {
      end = i
      break
    }
  }
  if (end === -1) return src
  let after = end + 1
  if (src[after] === ',') after++
  // also swallow the leading indentation + newline before the object
  let before = open
  while (before > 0 && (src[before - 1] === ' ' || src[before - 1] === '\t')) before--
  if (src[before - 1] === '\n') before--
  return src.slice(0, before) + src.slice(after)
}

async function confirm() {
  if (yes) return true
  if (!process.stdin.isTTY) {
    console.error('✖ Not a TTY — re-run with -- --yes to confirm deletion non-interactively.')
    process.exit(1)
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const answer = await new Promise((res) =>
    rl.question(`Delete project "${key}" (folder + projects.ts entry)? [y/N] `, res),
  )
  rl.close()
  return /^y(es)?$/i.test(answer.trim())
}

if (!(await confirm())) {
  console.log('Aborted — nothing removed.')
  process.exit(0)
}

if (hasFolder) {
  rmSync(folder, { recursive: true, force: true })
  console.log(`✓ Deleted ${relative(root, folder)}/`)
}
if (hasEntry) {
  writeFileSync(dataFile, stripEntry(data))
  console.log(`✓ Removed the "${key}" entry from src/data/projects.ts`)
}

/**
 * Personal details shared by the About/Contact sections and the print-only
 * PDF résumé, so the site and the exported PDF can never disagree.
 */

/** Canonical public URL — every link in the exported PDF points here. */
export const siteUrl = 'https://klubal.art'

export const email = 'matyasklubal@gmail.com'

/** Usage terms + privacy policy page (legal.html, served extensionless). */
export const legalPath = '/legal'

export const instagram = {
  handle: '@tunakos_',
  url: 'https://www.instagram.com/tunakos_/',
}

/** CV served from /public. `fileName` is what the browser saves it as. */
export const cv = {
  href: '/Matyas-Klubal-CV.pdf',
  fileName: 'Matyas-Klubal-CV.pdf',
}

export interface Skill {
  name: string
  /** Lit segments out of 10. */
  fill: number
  value: string
}

export const skills: Skill[] = [
  { name: 'Blender', fill: 8, value: '4 YRS · CORE' },
  { name: 'Affinity', fill: 3, value: 'BEGINNER' },
  { name: 'Houdini', fill: 1, value: 'JUST STARTED' },
]

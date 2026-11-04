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

export interface CvVersion {
  /** BCP 47 code, used for `hreflang` on the links. */
  lang: string
  /** Short tag shown on the language switch. */
  tag: string
  /** Full language name, for labels and screen readers. */
  name: string
  href: string
  /** What the browser saves the file as. */
  fileName: string
}

/** CVs served from /public. The first one is the default (the site is in English). */
export const cvs: CvVersion[] = [
  {
    lang: 'en',
    tag: 'EN',
    name: 'English',
    href: '/Matyas-Klubal-CV-EN.pdf',
    fileName: 'Matyas-Klubal-CV-EN.pdf',
  },
  {
    lang: 'cs',
    tag: 'CZ',
    name: 'Czech',
    href: '/Matyas-Klubal-CV-CZ.pdf',
    fileName: 'Matyas-Klubal-CV-CZ.pdf',
  },
]

/** Default CV — linked from the print résumé. */
export const cv = cvs[0]

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

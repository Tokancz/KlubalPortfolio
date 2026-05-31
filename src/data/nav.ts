/** Primary navigation links — shared by the desktop nav and mobile menu. */
export interface NavLink {
  /** Two-digit display prefix, e.g. "01". */
  num: string
  /** Target section id (and anchor href without the #). */
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { num: '01', id: 'home', label: 'Index' },
  { num: '02', id: 'about', label: 'About' },
  { num: '03', id: 'work', label: 'Work' },
  { num: '04', id: 'contact', label: 'Contact' },
]

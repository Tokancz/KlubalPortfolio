# Handoff: Klubal — 3D Artist Portfolio (Single-Page Site)

## Overview
A single-page personal portfolio website for **Matyáš Klubal**, a student 3D artist
specializing in hard-surface sci-fi / cyberpunk renders made in Blender. The page is one
long vertical scroll with four sections — **Hero (Index) → About → Work → Contact** — plus a
fixed top navigation, a project **lightbox overlay**, and a set of restrained "technical-HUD"
flourishes (crosshair cursor, scanlines, blueprint grid, scroll-reveal, scroll progress bar).

The aesthetic is a **dark technical-HUD / cyberpunk terminal**: near-black surfaces, **signal
red** as the single primary accent, squared display type vs. precise monospace labels, hard
corners with occasional diagonal "corner-cut" notches, and saturated cinematic renders shown
large.

---

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** — a working
prototype that demonstrates the intended look, layout, copy, and behavior. They are **not
meant to be shipped verbatim** as production code.

The task is to **recreate this design in your target codebase's environment** (React, Next.js,
Vue, Svelte, Astro, plain HTML, etc.), using that project's established patterns, component
conventions, and build tooling. If no codebase exists yet, pick the most appropriate stack for
a small content site (a static framework like **Astro** or **Next.js** is a natural fit) and
implement the design there.

You can open `Klubal Portfolio Site.html` directly in a browser to see the reference running.

---

## Fidelity
**High-fidelity (hifi).** This is a pixel-level reference with final colors, typography,
spacing, interactions, and copy. Recreate the UI faithfully using your codebase's libraries.
All exact values (hex, px, font weights, easing) are documented below and centralized in
`assets/colors_and_type.css` as CSS custom properties — port these tokens first.

---

## Tech Stack of the Reference
- **Plain HTML + CSS + vanilla JS.** No framework, no build step.
- **`assets/colors_and_type.css`** — the design-system token layer (`:root` custom properties
  + a few semantic helper classes). Port this first.
- **`site.js`** — all interactivity (lightbox, nav active-tracking, mobile menu, crosshair
  cursor, scroll-reveal, progress bar, back-to-top). ~250 lines, dependency-free.
- **Lucide icons** via CDN (`https://unpkg.com/lucide@latest`) — call `lucide.createIcons()`
  after DOM/content changes. In a component framework, prefer that framework's Lucide package
  (`lucide-react`, `lucide-vue-next`, etc.) instead of the CDN + global.
- **Google Fonts** via `@import` in the token CSS: **Chakra Petch** (display), **Space
  Grotesk** (body), **JetBrains Mono** (labels/numbers). In production, self-host or use the
  framework's font loader for performance.

---

## Layout System
- **Content width:** `max-width: 1200px`, centered, with `40px` horizontal gutters (`22px` on
  mobile). Helper class `.container`.
- **Fixed top nav:** `60px` tall. Sections use `scroll-margin-top: 60px` so anchor jumps land
  below it.
- **Section vertical rhythm:** each section has `padding-top: 104px; padding-bottom: 40px`
  (class `.sec`). The hero is full-viewport-height instead.
- **Z-index layers:** blueprint grid `0`, scanlines `1`, content `2`, back-to-top `45`, nav
  `50`, mobile menu `55`, progress bar `60`, lightbox `90`, crosshair cursor `120`.
- **Responsive breakpoint:** a single breakpoint at **`max-width: 880px`** switches the nav to
  a hamburger, collapses two-column grids to one, reflows the work grid to 2 columns, and
  disables the custom cursor.

---

## Screens / Views

### 0. Global chrome (present on all sections)

**Fixed Top Nav** (`.nav`)
- Full-width bar, `height: 60px`, `padding: 0 40px`, `position: fixed; top:0`.
- Background `rgba(8,10,15,.82)` + `backdrop-filter: blur(8px)`, bottom border `1px var(--line-2)`.
- **Left — brand:** a `32×32` square outlined box (`1.5px var(--red)`, `--glow-red` shadow)
  containing "MK" in Chakra Petch 700/14px red; followed by the wordmark "Klubal" in Chakra
  Petch 700/16px uppercase with a **red period** (`.s`).
- **Center — links:** JetBrains Mono, `11px`, letter-spacing `.16em`, uppercase, color
  `--fg-2`. Each link is prefixed with a red two-digit number (`01`–`04`). Items: `01 Index`,
  `02 About`, `03 Work`, `04 Contact`.
  - **Active state:** text → `--fg-0`, and a `1px` red underline animates in from the left
    (`::after`, width transition `.22s`). Active section is tracked on scroll (see Interactions).
  - **Hover:** text → `--fg-0`.
- **Right:** a ghost button "Hire ↗" (see Button styles) + a hamburger button (hidden ≥880px).

**Blueprint grid** (`.bp-grid`) — fixed full-screen, `44px` grid of `1px var(--line-1)` lines,
`opacity .5`, `pointer-events:none`.
**Scanlines** (`.scanlines`) — fixed full-screen, `repeating-linear-gradient` 4px horizontal
dark lines, `opacity .35`, `pointer-events:none`.
**Scroll progress bar** (`.progress`) — fixed top, `height: 2px`, red fill with `--glow-red`,
width = scroll fraction.
**Back-to-top** (`.totop`) — fixed bottom-right `48×48`, corner-cut, appears after scrolling
> 60% of viewport height; hover border/text → red.

---

### 1. Hero / Index (`#home`, `.hero`)
**Purpose:** First impression — full-bleed featured render + name/positioning + primary CTAs.

**Layout:** `position: relative; height: 100vh; min-height: 640px; overflow: hidden`.
Content (`.inner`) is a `.container` flex column, **bottom-aligned** (`justify-content:flex-end`),
with `padding-bottom: 9vh`.

**Components (back to front):**
1. **Background image** (`.bg img`) — full-cover featured render (`assets/hope.png`).
   `object-fit: cover`, `filter: saturate(1.08) contrast(1.05)`, `transform: scale(1.04)`.
2. **Protection gradient** (`.grad`) — `linear-gradient(180deg, rgba(8,10,15,.5) 0%,
   rgba(8,10,15,.18) 38%, rgba(8,10,15,.97) 100%)`. Keeps bottom text legible.
3. **Vignette** (`.vig`) — `radial-gradient(120% 80% at 68% 38%, transparent 38%,
   rgba(6,7,10,.72) 100%)`.
4. **Mono label** (`.mlabel`) — a pulsing red dot (`.dot`, 7px circle, `pulse` 1.8s) + text
   `3D ARTIST · BLENDER` + red `// 2025`. JetBrains Mono 12px, tracking `.18em`, uppercase.
5. **Headline** (`.hero-h`) — Chakra Petch 700, uppercase, `font-size: clamp(50px,9.4vw,128px)`,
   `line-height: .9`. Two treatments on one line:
   - `RENDER` uses **chromatic split**: `text-shadow: 3px 0 var(--red), -3px 0 var(--cyan)`.
   - `THE FUTURE` uses **outline/stroke**: `color: transparent; -webkit-text-stroke: 2px var(--fg-0)`.
6. **Sub copy** (`.hero-sub`) — Space Grotesk, `clamp(15px,1.5vw,19px)`, color `--fg-1`,
   `max-width: 540px`. Text: *"Hard-surface sci-fi and cyberpunk scenes, modeled and lit in
   Blender. I'm a student and still learning — these are the pieces I'm proud of so far."*
7. **CTAs** (`.hero-cta`) — primary "View the work ↗" (solid red, corner-cut) + ghost "Get in
   touch" with a mail icon.
8. **Feature tag** (`.feat`, bottom-right, hidden < 880px) — mono `// NOW FEATURING` over
   "VISIONÄRE — Station" (Chakra Petch 600/18px).
9. **Scroll cue** (`.scroll`, bottom-center) — "SCROLL" + chevron-down with a `nudge` bob
   animation (1.8s). Anchors to `#about`.

---

### 2. About (`#about`)
**Purpose:** Short first-person bio + skill proficiency.

**Section head** (`.sec-head`) — flex row, bottom-aligned, `1px var(--line-2)` bottom border,
`padding-bottom:20px; margin-bottom:46px`. Left: mono `// SECTION_02 — PROFILE` (the `— PROFILE`
in red) above the title "About me" (`.sec-title`, Chakra Petch 700, `clamp(32px,5vw,52px)`,
uppercase, `white-space:nowrap`). Right: muted mono `CZ · OPEN FOR WORK`.

**Body grid** (`.about-grid`) — `grid-template-columns: 1fr 1.45fr; gap: 56px` (collapses to
1col < 880px).
- **Left — portrait** (`.about-portrait`): `assets/matyas_klubal.png`, `1px var(--line-2)`
  border, `filter: grayscale(.28) contrast(1.05)`, a faint red scanline overlay (`.scan`), and
  two red **corner bracket ticks** (`.brk`, L-shaped 20px, top-left + bottom-right).
- **Right — text + meters:**
  - Mono `// CZ — MATYÁŠ KLUBAL` (red accent on the name).
  - Heading (`.about-h`) Chakra Petch 700, `clamp(28px,3.6vw,42px)`, uppercase: *"Student 3D
    artist, building hard-surface worlds."*
  - Two body paragraphs (`.about-p`, 16px, line-height 1.75, `--fg-1`, `max-width:560px`).
    Exact copy is in the HTML.
  - **Skill meters** (`.meters`) — top border, `padding-top:28px`. Each meter (`.meter`) is a
    grid `108px 1fr 120px`:
    - **Name** (mono 12px uppercase): Blender / Affinity / Houdini.
    - **Segmented bar** (`.segs`): **10 segments** (`<i>` cells, `14px` tall, `4px` gap). Filled
      segments get `.on` → red fill + `0 0 8px rgba(255,46,51,.45)` glow. Fill counts:
      **Blender 8/10, Affinity 3/10, Houdini 1/10.** Segments are generated in JS and animate on
      in a staggered sweep (`45ms` per cell) when the section scrolls into view.
    - **Value** (mono 10.5px, right-aligned): `4 YRS · CORE`, `BEGINNER`, `JUST STARTED`.

---

### 3. Work (`#work`)
**Purpose:** Showcase 5 selected projects in an asymmetric but fully-filled grid; click to open
a detail lightbox.

**Section head:** mono `// SECTION_03 — 005 PROJECTS · SELECTED`, title "The work", right-side
muted `CLICK ANY TILE`.

**Grid** (`.work-grid`) — CSS Grid, **4 columns**, `grid-auto-rows: 292px`, `gap: 18px`, using
named areas so it resolves to a clean rectangle (no ragged row):
```
grid-template-areas:
  "f f a a"
  "f f b b"
  "c c d d";
```
- `f` = 2×2 **featured** tile (Railgun), `a`/`b` = wide 2×1 tiles, `c`/`d` = wide 2×1 tiles.
- Mobile (< 880px): 2 columns, `grid-auto-rows: 200px`, areas `"f f" "f f" "a a" "b b" "c c" "d d"`.

**Project card** (`.pcard`) — `position:relative`, `1px var(--line-2)` border, `overflow:hidden`,
`cursor:pointer`.
- **Thumb** (`.thumb img`): full-cover render, `filter: saturate(1.05) contrast(1.03)`.
- **Bottom gradient** (`.grad`): `linear-gradient(180deg, transparent 40%, rgba(6,7,10,.5) 70%,
  rgba(6,7,10,.95) 100%)`.
- **Top accent bar** (`.accent`): `3px` tall, project-colored, `transform: scaleX(0)` →
  `scaleX(1)` on hover (`.3s`).
- **Index chip** (`.idx`, top-left): mono `001`–`005` on `rgba(6,7,10,.7)`.
- **"View ↗" tag** (`.view-tag`, top-right): fades/slides in on hover.
- **Caption** (`.over`, bottom): project **name** (Chakra Petch 700 uppercase, `23px`; `32px`
  for the featured tile) + **kind** (mono 10px, e.g. `Hard-Surface · 2025`) on the left, an
  `arrow-up-right` icon on the right.
- **Hover state:** card lifts `translateY(-3px)`, border → `--line-red`, `--shadow-2`, thumbnail
  `scale(1.06)`, arrow turns red and nudges, accent bar wipes in.

**The 5 projects** (grid order, each `data-project` keyed to lightbox data):
| Area | idx | Name | Kind · Year | Accent token | Image |
|---|---|---|---|---|---|
| f | 001 | Railgun | Hard-Surface · 2025 | `--red` | `assets/railgun.png` |
| a | 002 | Hope | Environment · 2025 | `--magenta` | `assets/hope.png` |
| b | 003 | Deluxo | Vehicle · 2025 | `--cyan` | `assets/deluxo.png` |
| c | 004 | Skyport | Environment · 2024 | `--brass` | `assets/steampunk.png` |
| d | 005 | Ornithopter | Vehicle · 2024 | `--brass` | `assets/ornithopter.png` |

---

### 4. Project Lightbox (`#lb`) — overlay, opened from a Work tile
**Purpose:** Quick detail view without leaving the page. **Not** a separate route.

**Structure:**
- **Scrim** (`.lb-scrim`): `rgba(4,5,8,.9)` + `backdrop-filter: blur(5px)`, fades in (`.25s`).
  Clicking it closes the lightbox.
- **Panel** (`.lb-panel`): centered, `max-width: 1080px`, `max-height: 88vh`, two-column grid
  `1.55fr 1fr`, `1px var(--line-2)` border, `--shadow-3`, pop-in animation (`lbpop .28s`).
  > **Important:** the panel must be `overflow: visible` so the edge-mounted prev/next buttons
  > aren't clipped; the **image column** carries its own `overflow:hidden`.
- **Top accent bar** (`.lb-accent`): `3px`, set to the project's accent color.
- **Image column** (`.lb-img`): full-cover render, an index chip (`idx`, e.g. `001 / RAILGUN`)
  top-left, and a position counter (`.lb-counter`, e.g. `01 / 05`) bottom-right.
- **Body column** (`.lb-body`, scrollable):
  - **Kind line** (`.lb-kind`): mono, colored with the project accent, e.g. `// HARD-SURFACE · 2025`.
  - **Title** (`.lb-title`): Chakra Petch 700, `38px`, uppercase.
  - **Tools** (`.lb-tools`): corner-cut mono chips (`.tag`), e.g. Blender / Cycles / Substance.
  - **Blurb** (`.lb-blurb`): 1–2 paragraphs, 14.5px, line-height 1.7, `--fg-1`.
  - **Spec readout** (`.lb-specs`): a 2-column grid of key/value cells separated by hairlines.
    Keys are mono 9px uppercase `--fg-3`; values mono 14px `--fg-0`. (Samples, Engine, Render
    time, Tris, Maps/Comp/Craft, Year.)
- **Controls:** close button (`.lb-close`, top-right `40×40`), prev/next (`.lb-nav`, `46×46`,
  half-overlapping the panel's left/right edges at `-23px`; move inside to `8px` on mobile).

**Per-project lightbox data** lives in `site.js` as the `PROJECTS` object (keys: `railgun`,
`hope`, `deluxo`, `steampunk`, `ornithopter`) with `ORDER` defining prev/next sequence. Each
entry: `idx, title, kind, year, accent, img, tools[], blurb[], specs{}`. Reproduce this as a
typed data module in your codebase. **The spec numbers are sample/placeholder values** — confirm
real figures with the artist before shipping.

**Mobile (< 880px):** panel becomes full-screen, grid switches to rows `42vh 1fr` (image on top,
body below).

---

### 5. Contact (`#contact`)
**Purpose:** Conversion — email + Instagram.

**Section head:** mono `// SECTION_04 — CONTACT`, title "Get in touch", right muted `RESPONDS
WITHIN A DAY`.

**Body** (`.contact-wrap`) — grid `1.15fr .85fr; gap: 56px`, vertically centered (1col < 880px).
- **Left:** big statement (`.contact-big`, Chakra Petch 700, `clamp(40px,6vw,76px)`, uppercase,
  `line-height:.94`): **"LET'S BUILD SOMETHING ↗"** (the `↗` is red). Below it a sub line
  (`.contact-sub`, 16px, `--fg-1`, `max-width:420px`).
- **Right — contact panel** (`.contact-panel`): corner-cut panel (notch `16px`) with red corner
  ticks. Contains two rows (`.clink`):
  1. **Email** — `mailto:matyasklubal@gmail.com`. Icon box + mono `// EMAIL` label + value
     `matyasklubal@gmail.com` (Chakra Petch 600/18px).
  2. **Instagram** — `https://www.instagram.com/tunakos_/` (opens new tab). `// INSTAGRAM` /
     `@tunakos_`.
  - Each row: `arrow-up-right` on the right; hover → `--red-ghost` background wash, icon box
    border/text → red, arrow turns red and nudges.

**Footer** (`.foot`): top border, a bar with the MK wordmark (left) and muted
`© 2025 MATYÁŠ KLUBAL · RENDERED IN BLENDER` (right).

---

## Interactions & Behavior
All implemented in `site.js`:

- **Smooth scrolling:** `html { scroll-behavior: smooth }` + anchor links. Disabled under
  reduced-motion.
- **Active nav tracking:** an `IntersectionObserver` (`rootMargin: -45% 0 -50% 0`) flags the
  section nearest viewport center and toggles `.on` on the matching nav link.
- **Scroll progress + back-to-top:** a passive `scroll` listener sets the progress bar width to
  the scroll fraction and shows `.totop` past 60% of the first viewport.
- **Scroll-reveal:** elements with `.reveal` start at `opacity:0; translateY(26px)` and
  transition to `.in` (`opacity/transform .7s cubic-bezier(.2,.7,.3,1)`) when observed
  (`threshold .12`). Optional per-element `transition-delay` staggers cards. Skipped entirely
  under reduced-motion (everything shown immediately).
- **Skill meters:** segments generated in JS; a separate observer fills them with a staggered
  `45ms` sweep when `#meters` enters view.
- **Lightbox:** click `.pcard` → `openLB(key)` renders from `PROJECTS` and locks body scroll
  (`overflow:hidden`). Prev/next cycle through `ORDER` (wrapping). Close via the × button, the
  scrim, or **Esc**. **Arrow keys** ←/→ navigate while open. Re-runs `lucide.createIcons()`
  after each render.
- **Mobile menu:** hamburger opens a full-screen sheet (`.msheet`, slides down via
  `transform: translateY(-100%) → 0`, `.32s`). Closes on link click or ×.
- **HUD crosshair cursor:** desktop + fine-pointer + no-reduced-motion only. Hides the native
  cursor (`body.cross *{cursor:none}`). Full-width/height faint red tracking lines follow the
  mouse instantly; a bracketed reticle (`.ret`) eases toward the pointer (`rx += (mx-rx)*0.35`
  per rAF). Over interactive elements (`a, button, .pcard, .scroll`) the reticle grows
  (`26px → 40px`) and its brackets turn red (`.hot`). Auto-disabled on touch/coarse pointers
  and ≤880px.

**Easing/timing reference:** hover transitions `.15–.18s ease`; reveal/lightbox-pop
`cubic-bezier(.2,.7,.3,1)`; pulse + nudge loops `1.8s ease-in-out`.

---

## State Management
The reference is DOM-only; for a component implementation you'll want:
- `activeSection: 'home'|'about'|'work'|'contact'` — drives nav active state (or derive from an
  intersection hook).
- `lightbox: { open: boolean, currentKey: string }` — plus derived prev/next from project order.
- `mobileMenuOpen: boolean`.
- `scrollProgress: number` and `showBackToTop: boolean` (or compute from a scroll hook).
- Reveal/“in-view” can be a reusable `useInView`-style hook rather than ad-hoc observers.
- **Body scroll lock** while the lightbox or mobile menu is open.
- Respect `prefers-reduced-motion` everywhere (skip reveals, crosshair, smooth scroll, loops).
No data fetching — project content is static; model it as a typed array/JSON.

---

## Design Tokens
Full source in `assets/colors_and_type.css`. Key values:

**Surfaces:** `--bg-0 #06070A`, `--bg-1 #0B0D12` (page), `--bg-2 #11141B` (panel),
`--bg-3 #181C26` (card), `--bg-4 #232836` (hover/input).
**Text:** `--fg-0 #F4F6FA`, `--fg-1 #C2C8D4`, `--fg-2 #818A9C`, `--fg-3 #525A6B`, `--fg-4 #333A48`.
**Primary (signal red):** `--red #FF2E33`, `--red-bright #FF4B45` (hover), `--red-deep #C8131C`
(pressed), `--red-dim #5A1418`, `--red-ghost rgba(255,46,51,.12)`.
**Secondary (violet):** `--violet #9A4DFF` (+ bright `#B57BFF`, deep `#6A1FD0`, ghost .12).
**Project accents:** `--cyan #2FB6FF`, `--magenta #FF3D8A`, `--brass #E0A23C`, `--acid #B6FF3C`.
**Semantic:** success `#35D07F`, warning `#E0A23C`, danger `#FF2E33`, info `#2FB6FF`.
**Borders:** `--line-1 rgba(255,255,255,.07)`, `--line-2 .13`, `--line-strong .22`,
`--line-red rgba(255,46,51,.45)`.
**Glow/shadow:** `--glow-red 0 0 24px rgba(255,46,51,.45), 0 0 4px rgba(255,46,51,.6)`;
`--glow-violet`, `--glow-cyan`; `--shadow-1/2/3` (black drop shadows, increasing).
**Radii:** `--r-0 0` (default, hard), `--r-1/--r-2 2px` (chips/cards ceiling), `--r-pill 999px`
(status dots only), `--cut 10px` (corner-notch clip-path size).
**Spacing (4px grid):** `--s-1 4 · --s-2 8 · --s-3 12 · --s-4 16 · --s-5 24 · --s-6 32 ·
--s-7 48 · --s-8 64 · --s-9 96 · --s-10 128`.
**Type families:** display `--font-display 'Chakra Petch'`, body `--font-body 'Space Grotesk'`,
mono `--font-mono 'JetBrains Mono'`.
**Type scale:** `--t-display 72 · --t-h1 48 · --t-h2 34 · --t-h3 24 · --t-h4 18 · --t-body 16 ·
--t-small 14 · --t-meta 12 · --t-micro 11`. (The page also uses fluid `clamp()` sizes for hero
and section titles — see each section above.)
**Line-height:** `--lh-tight 1.05 · --lh-snug 1.25 · --lh-body 1.6`.
**Tracking:** `--tracking-label .18em` (mono labels), `--tracking-tight -.01em`.

**Signature shape language:** hard `0` corners by default; the **corner-cut notch** via
`clip-path: polygon(...)` (~9–16px) on primary buttons and panels; **L-shaped red corner
ticks** (`.brk`) rather than full glows; mono labels prefixed with `//` or wrapped in `[ ]`.

### Button styles
- **Primary** (`.btn-primary` + `.btn-cut`): solid `--red`, white text, `--glow-red`, corner-cut
  (`clip-path: polygon(9px 0,100% 0,100% calc(100%-9px),calc(100%-9px) 100%,0 100%,0 9px)`).
  Hover → `--red-bright`; active → `--red-deep` + `translateY(1px)`.
- **Ghost** (`.btn-ghost`): transparent, `1px var(--line-strong)` border; hover → red border +
  red text.
- Both: JetBrains Mono `12px`, tracking `.12em`, uppercase, `padding: 13px 22px`,
  `gap: 9px`, `white-space: nowrap`, icon `15px`.

---

## Assets
In `assets/` (all real, provided — not placeholders):
- `railgun.png` — Railgun mech (project 001).
- `hope.png` — VISIONÄRE station; also the **hero background** (project 002).
- `deluxo.png` — Deluxo hover car (project 003).
- `steampunk.png` — "Skyport" airships (project 004).
- `ornithopter.png` — Ornithopter dropship (project 005).
- `matyas_klubal.png` — artist portrait (About).
- `colors_and_type.css` — the design-system token layer (port first).

**Icons:** [Lucide](https://lucide.dev). Used: `arrow-up-right`, `arrow-up`, `mail`,
`instagram`, `menu`, `x`, `chevron-down`, `chevron-left`, `chevron-right`. Outline style,
~15–18px, stroke inherits text color, red on hover. **No emoji** anywhere — status comes from
mono labels, colored dots, and icons.

**Fonts:** Chakra Petch / Space Grotesk / JetBrains Mono (Google Fonts). Self-host or use your
framework's font loader in production.

---

## Files in this bundle
- `Klubal Portfolio Site.html` — the full single-page reference (markup + all CSS in `<style>`).
- `site.js` — all interactions + the `PROJECTS` / `ORDER` data for the lightbox.
- `assets/colors_and_type.css` — design tokens + semantic helper classes.
- `assets/*.png` — the 5 project renders + portrait.

---

## Implementation Notes & Gotchas
1. **Port tokens first** — recreate `colors_and_type.css` as your theme (CSS vars, Tailwind
   config, or a theme object) before building components.
2. **Lightbox panel must allow overflow** so the edge prev/next buttons render; keep
   `overflow:hidden` on the image sub-element only.
3. **Lucide:** re-run icon creation after dynamic content (the lightbox does this). In a
   component framework, use the native Lucide package instead of the CDN global.
4. **Reduced motion:** the reference fully honors `prefers-reduced-motion` — keep that.
5. **Custom cursor is desktop-only** and must never hide the cursor on touch devices.
6. **"005 PROJECTS"** label is hardcoded to the 5 entries — make it derive from the data length.
7. **Spec readout values are sample data** — confirm real numbers with the artist.
8. **Copy is final** — section text, bio, and CTAs are exactly as the artist approved; preserve
   wording unless asked to change it.

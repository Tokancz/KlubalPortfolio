<script setup lang="ts">
import portraitImg from '@/assets/images/matyas_klubal.jpg'
import { projects } from '@/data/projects'
import { siteUrl, email, instagram, cv, skills, legalPath } from '@/data/profile'

/**
 * Print-only, shortened portfolio — hidden on screen, it replaces the whole
 * site when the page is printed / saved as PDF (see the print rules in
 * _base.scss). Built from the same data as the site, so it never goes stale.
 * Every project links back to the live site for the full renders and videos.
 */
const siteLabel = siteUrl.replace(/^https?:\/\//, '')
const projectsUrl = `${siteUrl}/#projects`
const cvUrl = `${siteUrl}${cv.href}`
const legalUrl = `${siteUrl}${legalPath}`
const year = new Date().getFullYear()
</script>

<template>
  <article class="print-sheet" aria-hidden="true">
    <header class="ps-head">
      <div class="ps-head__portrait"><img :src="portraitImg" alt="" /></div>
      <div class="ps-head__id">
        <p class="ps-kicker">3D Artist · Blender · CZ</p>
        <h1 class="ps-head__name">Matyáš Klubal</h1>
        <p class="ps-head__tagline">Student 3D artist — hard-surface sci-fi, vehicles and cyberpunk scenes.</p>
      </div>
      <ul class="ps-head__contact">
        <li><span>Portfolio</span><a :href="siteUrl">{{ siteLabel }}</a></li>
        <li><span>Email</span><a :href="`mailto:${email}`">{{ email }}</a></li>
        <li><span>Instagram</span><a :href="instagram.url">{{ instagram.handle }}</a></li>
        <li><span>CV</span><a :href="cvUrl">{{ siteLabel }}{{ cv.href }}</a></li>
      </ul>
    </header>

    <section class="ps-block ps-about">
      <div>
        <h2 class="ps-kicker">// Profile</h2>
        <p>
          I'm a student, no degree yet, just a lot of renders. I model hard-surface sci-fi and build
          cyber-leaning scenes — machines and vehicles. Most of my work is done in Blender, where
          I've spent the last four years learning modeling, lighting and texturing one project at a
          time. I'm picking up Affinity for texture, and just started exploring Houdini.
        </p>
      </div>
      <div>
        <h2 class="ps-kicker">// Skills</h2>
        <ul class="ps-skills">
          <li v-for="skill in skills" :key="skill.name">
            <strong>{{ skill.name }}</strong>
            <span class="ps-skills__bar"><i :style="{ width: `${skill.fill * 10}%` }" /></span>
            <em>{{ skill.value }}</em>
          </li>
        </ul>
      </div>
    </section>

    <section class="ps-block">
      <h2 class="ps-kicker">
        // Personal projects
        <a class="ps-kicker__link" :href="projectsUrl">Full renders &amp; videos → {{ siteLabel }}</a>
      </h2>
      <div class="ps-projects">
        <a v-for="project in projects" :key="project.key" class="ps-project" :href="projectsUrl">
          <img v-if="project.cover" class="ps-project__img" :src="project.cover" alt="" />
          <div class="ps-project__body">
            <p class="ps-project__meta">
              {{ project.idx }} · {{ project.kind }} · {{ project.year }}
            </p>
            <h3 class="ps-project__title">{{ project.title }}</h3>
            <p class="ps-project__blurb">{{ project.blurb[0] }}</p>
            <p class="ps-project__tools">{{ project.tools.join(' · ') }}</p>
          </div>
        </a>
        <!-- Fills the grid's spare slot (or starts a new row) with a pointer to the live site. -->
        <a class="ps-more" :href="projectsUrl">
          <span class="ps-kicker">// Online</span>
          <strong>See it all at<br />{{ siteLabel }}</strong>
          <span>High-res renders, animations and the full project breakdowns.</span>
        </a>
      </div>
    </section>

    <footer class="ps-foot">
      © {{ year }} Matyáš Klubal. All artwork is free for personal use; any commercial use requires
      my written permission — <a :href="legalUrl">{{ siteLabel }}{{ legalPath }}</a>
    </footer>
  </article>
</template>

<style scoped lang="scss">
// Ink-friendly palette: paper-white with the site's signal red as the accent.
.print-sheet {
  --ink: #111318;
  --ink-2: #4a505c;
  --ink-3: #8a909c;
  --rule: #d9dce2;
  --accent: #e3262c;

  display: none;
  color: var(--ink);
  background: #fff;
  font-family: var(--font-body);
  font-size: 9.5pt;
  line-height: 1.5;

  @media print {
    display: block;
  }

  a {
    color: inherit;
  }
}

.ps-kicker {
  margin: 0 0 6px;
  font-family: var(--font-mono);
  font-size: 7.5pt;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);

  &__link {
    float: right;
    color: var(--ink-2) !important;
    letter-spacing: 0.1em;
  }
}

.ps-head {
  display: grid;
  grid-template-columns: 26mm 1fr auto;
  gap: 7mm;
  align-items: center;
  padding-bottom: 6mm;
  border-bottom: 2px solid var(--ink);

  &__portrait {
    width: 26mm;
    height: 26mm;
    overflow: hidden;

    // The photo is a tall 2:3 shot — crop to a head-and-shoulders square.
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 0;
      transform: scale(1.5);
      transform-origin: 50% 4%;
      filter: grayscale(0.9) contrast(1.05);
    }
  }

  &__name {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 26pt;
    line-height: 1;
    text-transform: uppercase;
  }

  &__tagline {
    margin: 5px 0 0;
    color: var(--ink-2);
  }

  &__contact {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 8.5pt;

    li {
      display: flex;
      gap: 8px;
      line-height: 1.7;
    }

    span {
      width: 17mm;
      font-family: var(--font-mono);
      font-size: 6.5pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink-3);
      line-height: 2.2;
    }

    a {
      font-weight: 600;
    }
  }
}

.ps-block {
  padding-top: 6mm;
}

.ps-about {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 9mm;

  p {
    margin: 0;
    color: var(--ink-2);
  }
}

.ps-skills {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 17mm 1fr 22mm;
    gap: 3mm;
    align-items: center;
    line-height: 1.9;
  }

  strong {
    font-family: var(--font-display);
    font-weight: 600;
  }

  em {
    font-family: var(--font-mono);
    font-size: 6.5pt;
    font-style: normal;
    letter-spacing: 0.1em;
    color: var(--ink-3);
  }

  &__bar {
    height: 3px;
    background: var(--rule);

    i {
      display: block;
      height: 100%;
      background: var(--accent);
    }
  }
}

.ps-projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6mm 5mm;
  margin-top: 2mm;
}

.ps-project {
  display: block;
  break-inside: avoid;
  text-decoration: none;

  &__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border: 1px solid var(--rule);
  }

  &__body {
    padding-top: 2.5mm;
  }

  &__meta {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 6.5pt;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
  }

  &__title {
    margin: 1px 0 3px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 11pt;
    text-transform: uppercase;
  }

  &__blurb {
    margin: 0;
    color: var(--ink-2);
    font-size: 7.5pt;
    line-height: 1.45;
  }

  &__tools {
    margin: 3px 0 0;
    font-family: var(--font-mono);
    font-size: 6.5pt;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
  }
}

.ps-more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3mm;
  padding: 6mm;
  border: 1.5px solid var(--accent);
  break-inside: avoid;
  text-decoration: none;

  .ps-kicker {
    margin: 0;
  }

  strong {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14pt;
    line-height: 1.1;
    text-transform: uppercase;
  }

  span:last-child {
    font-size: 7.5pt;
    color: var(--ink-2);
  }
}
.ps-foot {
  margin-top: 8mm;
  padding-top: 3mm;
  border-top: 1px solid var(--rule);
  break-inside: avoid;
  font-size: 7pt;
  color: var(--ink-3);

  a {
    color: var(--ink-2);
  }
}
</style>

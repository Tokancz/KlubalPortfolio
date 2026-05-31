<script setup lang="ts">
import portraitImg from '@/assets/images/matyas_klubal.png'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import MonoLabel from '@/components/ui/MonoLabel.vue'
import SkillMeter from '@/components/about/SkillMeter.vue'

const skills = [
  { name: 'Blender', fill: 8, value: '4 YRS · CORE' },
  { name: 'Affinity', fill: 3, value: 'BEGINNER' },
  { name: 'Houdini', fill: 1, value: 'JUST STARTED' },
]
</script>

<template>
  <section id="about" class="section container">
    <SectionHeader
      label="// SECTION_02"
      accent="— PROFILE"
      title="About me"
      meta="CZ · OPEN FOR WORK"
    />

    <div class="about">
      <figure class="about__portrait" v-reveal>
        <span class="about__bracket about__bracket--tl" aria-hidden="true" />
        <span class="about__bracket about__bracket--br" aria-hidden="true" />
        <img :src="portraitImg" alt="Matyáš Klubal" />
        <span class="about__scan" aria-hidden="true" />
      </figure>

      <div class="about__body" v-reveal="0.08">
        <MonoLabel>
          // CZ
          <template #accent>— MATYÁŠ KLUBAL</template>
        </MonoLabel>

        <h3 class="about__heading">Student 3D artist,<br />building hard-surface worlds.</h3>

        <div class="about__copy">
          <p>
            I'm Matyáš Klubal — a student, no degree yet, just a lot of renders. I model
            hard-surface sci-fi and like building cyber-leaning scenes: machines, vehicles, and the
            worlds they live in.
          </p>
          <p>
            Most of my work lives in Blender, where I've spent the last four years learning
            modeling, lighting and texturing one project at a time. I'm picking up Affinity for
            texture and post, and just started exploring Houdini for procedural detail.
          </p>
        </div>

        <div class="about__meters">
          <SkillMeter
            v-for="skill in skills"
            :key="skill.name"
            :name="skill.name"
            :fill="skill.fill"
            :value="skill.value"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  display: grid;
  grid-template-columns: 1fr 1.45fr;
  gap: 56px;
  align-items: start;

  @include below-tablet {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  &__portrait {
    position: relative;
    margin: 0;
    overflow: hidden;
    border: 1px solid var(--line-2);
    filter: grayscale(0.28) contrast(1.05);

    img {
      width: 100%;
    }
  }

  &__bracket {
    position: absolute;
    z-index: 3;
    width: 20px;
    height: 20px;
    border-color: var(--red);

    &--tl {
      top: 10px;
      left: 10px;
      border-top: 1.5px solid;
      border-left: 1.5px solid;
    }
    &--br {
      bottom: 10px;
      right: 10px;
      border-bottom: 1.5px solid;
      border-right: 1.5px solid;
    }
  }

  &__scan {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(255, 46, 51, 0.05) 3px,
      rgba(255, 46, 51, 0.05) 4px
    );
  }

  &__heading {
    margin: 12px 0 22px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(28px, 3.6vw, 42px);
    line-height: 1.04;
    text-transform: uppercase;
  }

  &__copy {
    max-width: 560px;

    p {
      margin: 0 0 16px;
      font-size: 16px;
      line-height: 1.75;
      color: var(--fg-1);
    }
  }

  &__meters {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 560px;
    margin-top: 34px;
    padding-top: 28px;
    border-top: 1px solid var(--line-2);
  }
}
</style>

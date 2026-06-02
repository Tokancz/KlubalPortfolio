<script setup lang="ts">
import { ArrowUpRight, Mail, ChevronDown } from 'lucide-vue-next'
import { findProject } from '@/data/projects'
import MonoLabel from '@/components/ui/MonoLabel.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

// Reuse the optimized "Hope" cover from the projects data as the hero backdrop.
const heroImg = findProject('hope')?.cover ?? ''
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <img :src="heroImg" alt="" />
    </div>
    <div class="hero__grad" aria-hidden="true" />
    <div class="hero__vignette" aria-hidden="true" />

    <div class="hero__inner container">
      <MonoLabel dot class="hero__label">
        3D Artist · Blender
        <template #accent>// 2025</template>
      </MonoLabel>

      <h1 class="hero__headline">
        <span class="hero__chroma">Render</span>
        <span class="hero__stroke">the future</span>
      </h1>

      <p class="hero__sub">
        Hard-surface sci-fi and cyberpunk scenes, modeled and lit in Blender. I'm a student and
        still learning — these are the pieces I'm proud of so far.
      </p>

      <div class="hero__cta">
        <BaseButton href="#work" variant="primary" cut>
          View the work <ArrowUpRight />
        </BaseButton>
        <BaseButton href="#contact" variant="ghost">
          <Mail /> Get in touch
        </BaseButton>
      </div>
    </div>

    <aside class="hero__feature">
      <p class="hero__feature-kicker">// Now featuring</p>
      <p class="hero__feature-name">VISIONÄRE — Station</p>
    </aside>

    <a class="hero__scroll scroll-cue" href="#about" aria-label="Scroll to about">
      Scroll
      <ChevronDown class="hero__chevron" />
    </a>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  z-index: 2;

  &__bg {
    position: absolute;
    inset: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(1.08) contrast(1.05);
      transform: scale(1.04);
    }
  }

  &__grad {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(8, 10, 15, 0.5) 0%,
      rgba(8, 10, 15, 0.18) 38%,
      rgba(8, 10, 15, 0.97) 100%
    );
  }

  &__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(120% 80% at 68% 38%, transparent 38%, rgba(6, 7, 10, 0.72) 100%);
  }

  &__inner {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 9vh;
  }

  &__label {
    text-shadow: 0 1px 10px rgba(6, 7, 10, 0.95);
  }

  &__headline {
    margin: 16px 0 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(50px, 9.4vw, 128px);
    line-height: 0.9;
    letter-spacing: var(--tracking-tight);
    text-transform: uppercase;
  }

  &__chroma {
    text-shadow: 3px 0 var(--red), -3px 0 var(--cyan);
  }

  &__stroke {
    color: transparent;
    -webkit-text-stroke: 2px var(--fg-0);
  }

  &__sub {
    max-width: 540px;
    margin: 22px 0 30px;
    font-family: var(--font-body);
    font-size: clamp(15px, 1.5vw, 19px);
    line-height: 1.55;
    color: var(--fg-1);
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  &__feature {
    position: absolute;
    right: 40px;
    bottom: 9vh;
    z-index: 3;
    text-align: right;

    @include below-tablet {
      display: none;
    }
  }

  &__feature-kicker {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-2);
  }

  &__feature-name {
    margin: 4px 0 0;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--fg-0);
  }

  &__scroll {
    position: absolute;
    left: 50%;
    bottom: 20px;
    z-index: 3;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--fg-2);
    cursor: pointer;
  }

  &__chevron {
    width: 15px;
    height: 15px;
    animation: hero-nudge 1.8s ease-in-out infinite;
  }
}

@keyframes hero-nudge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}
</style>

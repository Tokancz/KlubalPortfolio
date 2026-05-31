<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project }>()
defineEmits<{ open: [key: string] }>()

const accentColor = `var(${props.project.accent})`
</script>

<template>
  <button
    class="pcard"
    :class="{ 'pcard--featured': project.featured }"
    type="button"
    :style="{ gridArea: project.area, '--card-accent': accentColor }"
    :aria-label="`Open project: ${project.title}`"
    @click="$emit('open', project.key)"
  >
    <span class="pcard__accent" aria-hidden="true" />
    <span class="pcard__idx">{{ project.idx }}</span>
    <span class="pcard__view" aria-hidden="true">View ↗</span>

    <span class="pcard__thumb">
      <img :src="project.img" :alt="project.title" />
    </span>
    <span class="pcard__grad" aria-hidden="true" />

    <span class="pcard__over">
      <span class="pcard__meta">
        <span class="pcard__name">{{ project.title }}</span>
        <span class="pcard__kind">{{ project.kind }} · {{ project.year }}</span>
      </span>
      <ArrowUpRight class="pcard__arrow" />
    </span>
  </button>
</template>

<style scoped lang="scss">
.pcard {
  position: relative;
  display: block;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--line-2);
  background: var(--bg-2);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: 0.18s ease;

  &:hover {
    border-color: var(--line-red);
    transform: translateY(-3px);
    box-shadow: var(--shadow-2);
  }

  &__thumb {
    position: absolute;
    inset: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(1.05) contrast(1.03);
      transition: 0.45s ease;
    }
  }

  &:hover &__thumb img {
    transform: scale(1.06);
  }

  &__grad {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      transparent 40%,
      rgba(6, 7, 10, 0.5) 70%,
      rgba(6, 7, 10, 0.95) 100%
    );
  }

  &__accent {
    position: absolute;
    inset: 0 0 auto 0;
    z-index: 3;
    height: 3px;
    background: var(--card-accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s;
  }

  &:hover &__accent {
    transform: scaleX(1);
  }

  &__idx {
    position: absolute;
    top: 14px;
    left: 16px;
    z-index: 3;
    padding: 4px 9px;
    background: rgba(6, 7, 10, 0.7);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: #fff;
  }

  &__view {
    position: absolute;
    top: 14px;
    right: 16px;
    z-index: 3;
    padding: 4px 9px;
    background: rgba(6, 7, 10, 0.6);
    font-family: var(--font-mono);
    font-size: 9.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #fff;
    opacity: 0;
    transform: translateY(-4px);
    transition: 0.2s;
  }

  &:hover &__view {
    opacity: 1;
    transform: translateY(0);
  }

  &__over {
    position: absolute;
    inset: auto 18px 16px;
    z-index: 3;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }

  &__name {
    display: block;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 23px;
    line-height: 1;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: var(--fg-0);
  }

  &--featured &__name {
    font-size: 32px;
  }

  &__kind {
    display: block;
    margin-top: 7px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-1);
  }

  &__arrow {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: #fff;
    transition: 0.18s;
  }

  &:hover &__arrow {
    color: var(--red);
    transform: translate(2px, -2px);
  }
}
</style>

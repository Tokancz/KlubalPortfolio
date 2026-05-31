<script setup lang="ts">
import { projects } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'

defineEmits<{ open: [key: string] }>()

// "005 PROJECTS" is derived from the data, not hardcoded.
const countLabel = `— ${String(projects.length).padStart(3, '0')} PROJECTS · SELECTED`

// Per-card stagger to match the handoff's reveal cadence.
const revealDelay: Record<string, number> = { f: 0, a: 0.06, b: 0.12, c: 0.06, d: 0.12 }
</script>

<template>
  <section id="work" class="section container">
    <SectionHeader
      label="// SECTION_03"
      :accent="countLabel"
      title="The work"
      meta="CLICK ANY TILE"
    />

    <div class="work-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.key"
        v-reveal="revealDelay[project.area]"
        :project="project"
        @open="$emit('open', $event)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.work-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 292px;
  gap: 18px;
  grid-template-areas:
    'f f a a'
    'f f b b'
    'c c d d';

  @include below-tablet {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    grid-template-areas:
      'f f'
      'f f'
      'a a'
      'b b'
      'c c'
      'd d';
  }
}
</style>

<script setup lang="ts">
import { projects } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'

defineEmits<{ open: [key: string] }>()

// "005 PROJECTS" is derived from the data, not hardcoded.
const countLabel = `— ${String(projects.length).padStart(3, '0')} PROJECTS · SELECTED`

// Per-card reveal stagger by position, cycling so long grids don't fan out forever.
const revealDelay = (i: number) => (i % 6) * 0.05
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
        v-for="(project, i) in projects"
        :key="project.key"
        v-reveal="revealDelay(i)"
        :project="project"
        @open="$emit('open', $event)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.work-grid {
  // Auto-flow grid: the featured project spans 2×2, every other project is a
  // uniform tile, and `dense` backfills the gaps so any number of projects pack
  // neatly and wrap to new rows. Spans are set per-card in ProjectCard.vue.
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 292px;
  grid-auto-flow: dense;
  gap: 18px;

  @include below-tablet {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }
}
</style>

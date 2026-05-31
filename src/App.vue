<script setup lang="ts">
import { computed, ref } from 'vue'
import { projects } from '@/data/projects'
import { useActiveSection } from '@/composables/useActiveSection'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'

import AmbientBackdrop from '@/components/chrome/AmbientBackdrop.vue'
import ScrollProgress from '@/components/chrome/ScrollProgress.vue'
import SiteNav from '@/components/chrome/SiteNav.vue'
import MobileMenu from '@/components/chrome/MobileMenu.vue'
import BackToTop from '@/components/chrome/BackToTop.vue'
import CrosshairCursor from '@/components/chrome/CrosshairCursor.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import ProjectLightbox from '@/components/work/ProjectLightbox.vue'

const activeId = useActiveSection(['home', 'about', 'work', 'contact'])
const { progress, showBackToTop } = useScrollProgress()
const prefersReducedMotion = useReducedMotion()

const mobileMenuOpen = ref(false)
/** Index into `projects`, or null when the lightbox is closed. */
const lightboxIndex = ref<number | null>(null)

const openProject = (key: string) => {
  const index = projects.findIndex((p) => p.key === key)
  if (index >= 0) lightboxIndex.value = index
}

// Lock page scroll whenever an overlay is showing.
const scrollLocked = computed(() => mobileMenuOpen.value || lightboxIndex.value !== null)
useBodyScrollLock(scrollLocked)
</script>

<template>
  <AmbientBackdrop />
  <ScrollProgress :progress="progress" />

  <SiteNav :active-id="activeId" @open-menu="mobileMenuOpen = true" />
  <MobileMenu :open="mobileMenuOpen" @close="mobileMenuOpen = false" />

  <main>
    <HeroSection />
    <AboutSection />
    <WorkSection @open="openProject" />
    <ContactSection />
  </main>

  <SiteFooter />

  <BackToTop :show="showBackToTop" :smooth="!prefersReducedMotion" />
  <CrosshairCursor />

  <ProjectLightbox
    v-model:index="lightboxIndex"
    :projects="projects"
    @close="lightboxIndex = null"
  />
</template>

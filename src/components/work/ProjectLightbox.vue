<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { X, ChevronLeft, ChevronRight, ArrowUp, Play } from 'lucide-vue-next'
import type { Project, Media } from '@/data/projects'

/**
 * Project detail overlay — a tall, vertically-scrolling "dossier" (ported from
 * design_handoff_project_panel): sticky HUD bar with prev/next/close, a 16:9
 * hero, tool chips, description + spec columns, and a "MORE SHOTS" gallery grid.
 *
 * Controlled via `index` (position in `projects`, or null when closed).
 * Prev/next wrap around; closes on the scrim, the × button, or Escape; arrow
 * keys navigate while open; the scroll body resets to top on every change.
 */
const props = defineProps<{ projects: Project[]; index: number | null }>()
const emit = defineEmits<{ close: []; 'update:index': [value: number] }>()

const closeButton = ref<HTMLButtonElement>()
const scrollBody = ref<HTMLElement>()
const dialogRoot = ref<HTMLElement>()
/** The element focused before the dialog opened, restored on close. */
const previouslyFocused = ref<HTMLElement | null>(null)

// Show the scroll-to-top button once the dossier is scrolled past the hero.
const showScrollTop = ref(false)
const onScroll = () => {
  showScrollTop.value = (scrollBody.value?.scrollTop ?? 0) > 120
}
const scrollToTop = () => {
  scrollBody.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

const project = computed<Project | null>(() =>
  props.index === null ? null : (props.projects[props.index] ?? null),
)
const accentColor = computed(() => (project.value ? `var(${project.value.accent})` : ''))
const counter = computed(() => {
  if (props.index === null) return ''
  const total = props.projects.length
  return `${String(props.index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
})
// Hero shows the currently-selected media (cover image by default); clicking a
// gallery thumbnail swaps it in. The gallery lists every shot — images and
// videos — so you can always jump back to the cover.
const coverMedia = computed<Media | null>(() =>
  project.value ? { type: 'image', src: project.value.cover } : null,
)
const activeMedia = ref<Media | null>(null)
const heroVideo = ref<HTMLVideoElement>()
const gallery = computed<Media[]>(() => project.value?.media ?? [])
const hasGallery = computed(() => gallery.value.length > 1)
const sameMedia = (a: Media | null, b: Media | null) => a?.src === b?.src

// Clicking a gallery item swaps it into the hero, scrolls the panel back up so
// the hero is in view, and — for videos — starts playback immediately.
const selectMedia = (item: Media) => {
  activeMedia.value = item
  scrollBody.value?.scrollTo({ top: 0, behavior: 'smooth' })
  if (item.type === 'video') {
    nextTick(() => heroVideo.value?.play().catch(() => {}))
  }
}

const step = (direction: -1 | 1) => {
  if (props.index === null) return
  const total = props.projects.length
  emit('update:index', (props.index + direction + total) % total)
}

// Keep Tab focus inside the dialog: wrap from the last focusable back to the
// first (and vice-versa with Shift). Querying live each Tab covers the gallery
// thumbnails and hero video controls appearing/disappearing as you navigate.
const trapFocus = (e: KeyboardEvent) => {
  const root = dialogRoot.value
  if (!root) return
  const focusable = Array.from(
    root.querySelectorAll<HTMLElement>(
      'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null)
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement
  if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (props.index === null) return
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'Tab') trapFocus(e)
}

// On open: remember the trigger so focus can return to it on close. On open /
// project change: reset the scroll body to the top and focus close. On close:
// restore focus to whatever was focused before (the project card).
watch(
  () => props.index,
  (value, previous) => {
    if (value !== null && previous == null) {
      previouslyFocused.value = document.activeElement as HTMLElement | null
    }
    if (value === null) {
      previouslyFocused.value?.focus?.()
      previouslyFocused.value = null
      return
    }
    activeMedia.value = coverMedia.value
    showScrollTop.value = false
    nextTick(() => {
      if (scrollBody.value) scrollBody.value.scrollTop = 0
      closeButton.value?.focus()
    })
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="lb-fade">
      <div
        v-if="project"
        ref="dialogRoot"
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="`${project.title} — project detail`"
      >
        <div class="lb-scrim" @click="$emit('close')" />

        <div class="lb-stage">
          <div class="lb-panel" :style="{ '--lb-accent': accentColor }">
            <span class="lb-accent" aria-hidden="true" />

            <!-- sticky HUD bar -->
            <div class="lb-top">
              <div class="lb-top-l">
                <span class="lb-idx">{{ project.idx }} / {{ project.key.toUpperCase() }}</span>
                <span class="lb-counter">{{ counter }}</span>
              </div>
              <div class="lb-top-r">
                <button class="lb-ctl" type="button" aria-label="Previous project" @click="step(-1)">
                  <ChevronLeft class="ic" />
                </button>
                <button class="lb-ctl" type="button" aria-label="Next project" @click="step(1)">
                  <ChevronRight class="ic" />
                </button>
                <button
                  ref="closeButton"
                  class="lb-ctl lb-close"
                  type="button"
                  aria-label="Close"
                  @click="$emit('close')"
                >
                  <X class="ic" />
                </button>
              </div>
            </div>

            <!-- scroll body -->
            <div ref="scrollBody" class="lb-scroll" @scroll="onScroll">
              <div class="lb-hero" :class="{ 'is-video': activeMedia?.type === 'video' }">
                <video
                  v-if="activeMedia?.type === 'video'"
                  ref="heroVideo"
                  :key="activeMedia.src"
                  :src="activeMedia.src"
                  :poster="project.cover"
                  controls
                  autoplay
                  playsinline
                />
                <img v-else :src="activeMedia?.src ?? project.cover" :alt="project.title" />
                <div class="lb-hero-grad" aria-hidden="true" />
                <div class="lb-hero-cap">
                  <div class="lb-kind">// {{ project.kind.toUpperCase() }} · {{ project.year }}</div>
                  <h3 class="lb-title">{{ project.title }}</h3>
                </div>
              </div>

              <div class="lb-content">
                <div class="lb-tools">
                  <span v-for="tool in project.tools" :key="tool" class="tag">{{ tool }}</span>
                </div>

                <div class="lb-cols">
                  <div class="lb-blurb">
                    <p v-for="(para, i) in project.blurb" :key="i">{{ para }}</p>
                  </div>
                  <div class="lb-specs">
                    <div v-for="(val, key) in project.specs" :key="key" class="lb-spec">
                      <div class="k">{{ key }}</div>
                      <div class="v">{{ val }}</div>
                    </div>
                  </div>
                </div>

                <template v-if="hasGallery">
                  <div class="lb-gallery-head">
                    <span class="mlabel">// MORE SHOTS <span class="ac">— GALLERY</span></span>
                    <span class="muted">{{ String(gallery.length).padStart(2, '0') }} {{ gallery.length === 1 ? 'SHOT' : 'SHOTS' }}</span>
                  </div>
                  <div class="lb-gallery" :data-n="gallery.length">
                    <button
                      v-for="(item, i) in gallery"
                      :key="item.src"
                      class="lb-shot"
                      type="button"
                      :class="{ 'is-active': sameMedia(item, activeMedia), 'is-video': item.type === 'video' }"
                      :aria-label="item.type === 'video' ? `Play clip ${i + 1}` : `Show shot ${i + 1}`"
                      :aria-pressed="sameMedia(item, activeMedia)"
                      @click="selectMedia(item)"
                    >
                      <video
                        v-if="item.type === 'video'"
                        :src="item.src"
                        :poster="project.cover"
                        muted
                        preload="metadata"
                      />
                      <img v-else :src="item.src" :alt="`${project.title} — shot ${i + 1}`" loading="lazy" />
                      <span v-if="item.type === 'video'" class="lb-play" aria-hidden="true">
                        <Play class="ic" />
                      </span>
                    </button>
                  </div>
                </template>
              </div>
            </div>

            <Transition name="lb-top-btn">
              <button
                v-if="showScrollTop"
                class="lb-scrolltop"
                type="button"
                aria-label="Scroll to top"
                @click="scrollToTop"
              >
                <ArrowUp class="ic" />
              </button>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.lb {
  position: fixed;
  inset: 0;
  z-index: 90;
}

.lb-scrim {
  position: absolute;
  inset: 0;
  background: rgba(4, 5, 8, 0.92);
  backdrop-filter: blur(6px);
}

.lb-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @include below-tablet {
    padding: 0;
  }
}

.lb-panel {
  position: relative;
  width: 100%;
  max-width: 980px;
  max-height: var(--lb-maxh, 90vh);
  display: flex;
  flex-direction: column;
  background: var(--bg-1);
  border: 1px solid var(--line-2);
  box-shadow: var(--shadow-3);
  overflow: hidden;
  animation: lb-pop 0.3s cubic-bezier(0.2, 0.7, 0.3, 1);

  @include below-tablet {
    max-width: none;
    height: 100%;
    max-height: 100%;
  }

  @include reduced-motion {
    animation: none;
  }
}

.lb-accent {
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 6;
  height: 3px;
  background: var(--lb-accent);
}

/* sticky HUD top bar */
.lb-top {
  position: relative;
  z-index: 5;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 14px 0 18px;
  background: rgba(11, 13, 18, 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line-2);
}

.lb-top-l {
  display: flex;
  align-items: baseline;
  gap: 14px;
  min-width: 0;
}

.lb-idx {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--fg-0);
  white-space: nowrap;
}

.lb-counter {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--fg-3);
  white-space: nowrap;
}

.lb-top-r {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lb-ctl {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-2);
  background: transparent;
  color: var(--fg-1);
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    border-color: var(--red);
    color: var(--red);
  }

  :deep(svg) {
    width: 17px;
    height: 17px;
  }
}

.lb-close {
  margin-left: 6px;
}

/* scroll body */
.lb-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--line-strong) transparent;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--line-strong);
    border: 3px solid transparent;
    background-clip: content-box;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--red);
    background-clip: content-box;
  }
}

/* hero */
.lb-hero {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #06070a;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // When a video is playing in the hero, letterbox it (no crop) and drop the
  // title/gradient overlay so it can't sit over the player controls.
  &.is-video {
    video {
      object-fit: contain;
    }

    .lb-hero-grad,
    .lb-hero-cap {
      display: none;
    }
  }

  @include below-tablet {
    aspect-ratio: auto;
    height: 36vh;
  }
}

.lb-hero-grad {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 42%,
    rgba(6, 7, 10, 0.4) 70%,
    rgba(6, 7, 10, 0.96) 100%
  );
}

.lb-hero-cap {
  position: absolute;
  left: 26px;
  right: 26px;
  bottom: 20px;
  z-index: 2;
}

.lb-kind {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lb-accent);
}

.lb-title {
  margin: 8px 0 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 0.95;
  text-transform: uppercase;
  color: #fff;
}

/* content */
.lb-content {
  padding: 26px 30px 34px;

  @include below-tablet {
    padding: 22px 20px 30px;
  }
}

.lb-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}

.tag {
  padding: 5px 10px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-1);
  border: 1px solid var(--line-2);
  @include corner-cut(6px);
}

.lb-cols {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 34px;
  align-items: start;

  @include below-tablet {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}

.lb-blurb {
  font-size: 15px;
  line-height: 1.75;
  color: var(--fg-1);

  p {
    margin: 0 0 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.lb-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid var(--line-2);
  background: var(--line-1);
}

.lb-spec {
  padding: 13px 15px;
  background: var(--bg-1);

  .k {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-3);
  }

  .v {
    margin-top: 5px;
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 0.03em;
    color: var(--fg-0);
  }
}

/* gallery */
.lb-gallery-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin: 36px 0 16px;
  padding-top: 24px;
  border-top: 1px solid var(--line-2);
}

.mlabel {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-2);

  .ac {
    color: var(--red);
  }
}

.muted {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--fg-3);
  white-space: nowrap;
}

.lb-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  &[data-n='1'],
  &[data-n='2'],
  &[data-n='4'] {
    grid-template-columns: repeat(2, 1fr);
  }

  @include below-tablet {
    grid-template-columns: repeat(2, 1fr);
  }
}

.lb-shot {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  display: block;
  border: 1px solid var(--line-2);
  background: var(--bg-2);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.15s, transform 0.15s;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.15s;
  }

  &:hover {
    border-color: var(--lb-accent);

    img,
    video {
      opacity: 0.82;
    }

    .lb-play {
      background: var(--lb-accent);
      color: #fff;
      border-color: var(--lb-accent);
    }
  }

  &.is-active {
    border-color: var(--lb-accent);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 0 2px var(--lb-accent);
      pointer-events: none;
    }
  }
}

/* play badge on video thumbnails */
.lb-play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(8, 10, 14, 0.62);
  color: #fff;
  pointer-events: none;
  transition: 0.15s;

  :deep(svg) {
    width: 18px;
    height: 18px;
    margin-left: 2px;
    fill: currentColor;
  }
}

/* scroll-to-top button (floats over the scroll body, bottom-right) */
.lb-scrolltop {
  position: absolute;
  z-index: 7;
  right: 18px;
  bottom: 18px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-2);
  background: rgba(11, 13, 18, 0.94);
  backdrop-filter: blur(8px);
  color: var(--fg-1);
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    border-color: var(--lb-accent);
    color: var(--lb-accent);
  }

  :deep(svg) {
    width: 18px;
    height: 18px;
  }
}

.lb-top-btn-enter-active,
.lb-top-btn-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.lb-top-btn-enter-from,
.lb-top-btn-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* overlay fade (whole lightbox) */
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}

@keyframes lb-pop {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>

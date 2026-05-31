<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Project } from '@/data/projects'

/**
 * Project detail overlay. Controlled via `index` (position in `projects`,
 * or null when closed). Prev/next wrap around; closes on the scrim, the ×
 * button, or Escape; arrow keys navigate while open.
 */
const props = defineProps<{ projects: Project[]; index: number | null }>()
const emit = defineEmits<{ close: []; 'update:index': [value: number] }>()

const closeButton = ref<HTMLButtonElement>()

const project = computed<Project | null>(() =>
  props.index === null ? null : (props.projects[props.index] ?? null),
)
const accentColor = computed(() => (project.value ? `var(${project.value.accent})` : ''))
const counter = computed(() => {
  if (props.index === null) return ''
  const total = props.projects.length
  return `${String(props.index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
})

const step = (direction: -1 | 1) => {
  if (props.index === null) return
  const total = props.projects.length
  emit('update:index', (props.index + direction + total) % total)
}

const onKeydown = (e: KeyboardEvent) => {
  if (props.index === null) return
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}

// Move focus to the close button when the lightbox opens.
watch(
  () => props.index,
  (value) => {
    if (value !== null) nextTick(() => closeButton.value?.focus())
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
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="`${project.title} — project detail`"
      >
        <div class="lb__scrim" @click="$emit('close')" />

        <div class="lb__stage">
          <article class="lb__panel" :style="{ '--lb-accent': accentColor }">
            <span class="lb__accent" aria-hidden="true" />

            <button class="lb__nav lb__nav--prev" type="button" aria-label="Previous project" @click="step(-1)">
              <ChevronLeft />
            </button>
            <button class="lb__nav lb__nav--next" type="button" aria-label="Next project" @click="step(1)">
              <ChevronRight />
            </button>

            <div class="lb__image">
              <img :src="project.img" :alt="project.title" />
              <span class="lb__image-fade" aria-hidden="true" />
              <span class="lb__chip">{{ project.idx }} / {{ project.key.toUpperCase() }}</span>
              <span class="lb__counter">{{ counter }}</span>
            </div>

            <div class="lb__body">
              <p class="lb__kind">// {{ project.kind.toUpperCase() }} · {{ project.year }}</p>
              <h3 class="lb__title">{{ project.title }}</h3>

              <ul class="lb__tools">
                <li v-for="tool in project.tools" :key="tool" class="lb__tag">{{ tool }}</li>
              </ul>

              <div class="lb__blurb">
                <p v-for="(para, i) in project.blurb" :key="i">{{ para }}</p>
              </div>

              <dl class="lb__specs">
                <div v-for="(val, key) in project.specs" :key="key" class="lb__spec">
                  <dt>{{ key }}</dt>
                  <dd>{{ val }}</dd>
                </div>
              </dl>
            </div>

            <button ref="closeButton" class="lb__close" type="button" aria-label="Close" @click="$emit('close')">
              <X />
            </button>
          </article>
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

  &__scrim {
    position: absolute;
    inset: 0;
    background: rgba(4, 5, 8, 0.9);
    backdrop-filter: blur(5px);
  }

  &__stage {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;

    @include below-tablet {
      padding: 0;
    }
  }

  &__panel {
    position: relative;
    width: 100%;
    max-width: 1080px;
    max-height: 88vh;
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    background: var(--bg-1);
    border: 1px solid var(--line-2);
    box-shadow: var(--shadow-3);
    /* Must stay visible so the edge-mounted prev/next render unclipped. */
    overflow: visible;
    animation: lb-pop 0.28s cubic-bezier(0.2, 0.7, 0.3, 1);

    @include below-tablet {
      max-width: none;
      width: 100%;
      height: 100%;
      max-height: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: 42vh 1fr;
    }

    @include reduced-motion {
      animation: none;
    }
  }

  &__accent {
    position: absolute;
    inset: 0 0 auto 0;
    z-index: 5;
    height: 3px;
    background: var(--lb-accent);
  }

  &__image {
    position: relative;
    min-height: 300px;
    overflow: hidden;
    background: #06070a;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__image-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 70%, rgba(6, 7, 10, 0.4));
  }

  &__chip {
    position: absolute;
    top: 16px;
    left: 18px;
    z-index: 3;
    padding: 5px 11px;
    background: rgba(6, 7, 10, 0.7);
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    color: #fff;
  }

  &__counter {
    position: absolute;
    right: 18px;
    bottom: 16px;
    z-index: 3;
    padding: 4px 10px;
    background: rgba(6, 7, 10, 0.7);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    color: #fff;
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: 30px 30px 28px;
    overflow-y: auto;
  }

  &__kind {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--lb-accent);
  }

  &__title {
    margin: 10px 0 14px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 38px;
    line-height: 0.95;
    text-transform: uppercase;
  }

  &__tools {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 20px;
    padding: 0;
    list-style: none;
  }

  &__tag {
    padding: 5px 10px;
    border: 1px solid var(--line-2);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-1);
    @include corner-cut(6px);
  }

  &__blurb {
    font-size: 14.5px;
    line-height: 1.7;
    color: var(--fg-1);

    p {
      margin: 0 0 13px;
    }
  }

  &__specs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    margin: auto 0 0;
    padding-top: 20px;
    border-top: 1px solid var(--line-2);
    background: var(--line-1);
  }

  &__spec {
    padding: 12px 14px;
    background: var(--bg-1);

    dt {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--fg-3);
    }

    dd {
      margin: 4px 0 0;
      font-family: var(--font-mono);
      font-size: 14px;
      letter-spacing: 0.03em;
      color: var(--fg-0);
    }
  }

  &__close {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 8;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line-2);
    background: rgba(6, 7, 10, 0.6);
    color: #fff;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      border-color: var(--red);
      color: var(--red);
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    z-index: 8;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    border: 1px solid var(--line-2);
    background: rgba(6, 7, 10, 0.72);
    color: #fff;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      border-color: var(--red);
      color: var(--red);
    }

    &--prev {
      left: -23px;
      @include below-tablet {
        left: 8px;
      }
    }
    &--next {
      right: -23px;
      @include below-tablet {
        right: 8px;
      }
    }
  }

  :deep(svg) {
    width: 18px;
    height: 18px;
  }
}

/* Scrim fade for the whole overlay. */
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
    transform: translateY(14px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>

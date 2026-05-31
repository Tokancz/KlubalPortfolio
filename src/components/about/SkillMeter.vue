<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Segmented skill proficiency bar. Lights `fill` of 10 segments with a
 * staggered sweep the first time it scrolls into view (instant under
 * reduced motion).
 */
const props = defineProps<{
  name: string
  /** Number of lit segments, 0–10. */
  fill: number
  /** Right-hand status text, e.g. "4 YRS · CORE". */
  value: string
}>()

const TOTAL = 10
const lit = ref<boolean[]>(Array.from({ length: TOTAL }, () => false))
const root = ref<HTMLElement>()

let observer: IntersectionObserver | null = null
const timers: number[] = []

const fillSegments = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  for (let i = 0; i < props.fill; i++) {
    if (reduced) {
      lit.value[i] = true
    } else {
      timers.push(window.setTimeout(() => (lit.value[i] = true), i * 45))
    }
  }
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !('IntersectionObserver' in window)) {
    fillSegments()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          fillSegments()
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.3 },
  )
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  timers.forEach((t) => clearTimeout(t))
})
</script>

<template>
  <div ref="root" class="meter">
    <span class="meter__name">{{ name }}</span>
    <div
      class="meter__segs"
      role="meter"
      :aria-label="name"
      :aria-valuenow="fill"
      aria-valuemin="0"
      aria-valuemax="10"
    >
      <i v-for="(on, i) in lit" :key="i" :class="{ 'is-on': on }" />
    </div>
    <span class="meter__value">{{ value }}</span>
  </div>
</template>

<style scoped lang="scss">
.meter {
  display: grid;
  grid-template-columns: 108px 1fr 120px;
  align-items: center;
  gap: 18px;

  @include below-tablet {
    grid-template-columns: 92px 1fr;
  }

  &__name {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--fg-0);
  }

  &__segs {
    display: flex;
    gap: 4px;

    i {
      flex: 1;
      height: 14px;
      background: var(--bg-3);
      border: 1px solid var(--line-2);
      transition: 0.4s ease;

      &.is-on {
        background: var(--red);
        border-color: var(--red);
        box-shadow: 0 0 8px rgba(255, 46, 51, 0.45);
      }
    }
  }

  &__value {
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-2);
    text-align: right;

    @include below-tablet {
      grid-column: 2;
      margin-top: 2px;
      text-align: left;
    }
  }
}
</style>

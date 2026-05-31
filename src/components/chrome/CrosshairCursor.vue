<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * HUD crosshair cursor. Full-width/height tracking lines follow the
 * pointer instantly; a bracketed reticle eases toward it and grows + turns
 * red over interactive targets. Desktop / fine-pointer / motion-allowed
 * only — it hides the native cursor (via `body.cross`) so it must never
 * activate on touch devices.
 */
const active = ref(false)
const hot = ref(false)
const visible = ref(true)

const hLine = ref<HTMLElement>()
const vLine = ref<HTMLElement>()
const reticle = ref<HTMLElement>()

let mx = 0
let my = 0
let rx = 0
let ry = 0
let raf = 0

const HOT_SELECTOR = 'a, button, .pcard, .scroll-cue, [role="button"]'

const onMouseMove = (e: MouseEvent) => {
  mx = e.clientX
  my = e.clientY
  if (hLine.value) hLine.value.style.top = `${my}px`
  if (vLine.value) vLine.value.style.left = `${mx}px`

  const target = e.target as Element | null
  hot.value = !!target?.closest?.(HOT_SELECTOR)
}

const loop = () => {
  rx += (mx - rx) * 0.35
  ry += (my - ry) * 0.35
  if (reticle.value) {
    reticle.value.style.left = `${rx}px`
    reticle.value.style.top = `${ry}px`
  }
  raf = requestAnimationFrame(loop)
}

const onLeave = () => (visible.value = false)
const onEnter = () => (visible.value = true)

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return

  active.value = true
  mx = rx = window.innerWidth / 2
  my = ry = window.innerHeight / 2
  document.body.classList.add('cross')

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
  document.body.classList.remove('cross')
})
</script>

<template>
  <div
    v-if="active"
    class="cross"
    :class="{ 'cross--hot': hot }"
    :style="{ opacity: visible ? 1 : 0 }"
    aria-hidden="true"
  >
    <div ref="hLine" class="cross__line cross__line--h" />
    <div ref="vLine" class="cross__line cross__line--v" />
    <div ref="reticle" class="cross__reticle">
      <span class="cross__bracket cross__bracket--tl" />
      <span class="cross__bracket cross__bracket--tr" />
      <span class="cross__bracket cross__bracket--bl" />
      <span class="cross__bracket cross__bracket--br" />
      <span class="cross__core" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cross {
  position: fixed;
  inset: 0;
  z-index: 120;
  pointer-events: none;

  &__line {
    position: absolute;
    background: rgba(255, 46, 51, 0.18);

    &--h {
      left: 0;
      right: 0;
      height: 1px;
    }
    &--v {
      top: 0;
      bottom: 0;
      width: 1px;
    }
  }

  &__reticle {
    position: absolute;
    width: 26px;
    height: 26px;
    transform: translate(-50%, -50%);
    transition:
      width 0.14s ease,
      height 0.14s ease;
  }

  &__bracket {
    position: absolute;
    width: 7px;
    height: 7px;
    border: 1.5px solid var(--fg-1);
    transition: border-color 0.14s ease;

    &--tl {
      top: 0;
      left: 0;
      border-right: 0;
      border-bottom: 0;
    }
    &--tr {
      top: 0;
      right: 0;
      border-left: 0;
      border-bottom: 0;
    }
    &--bl {
      bottom: 0;
      left: 0;
      border-right: 0;
      border-top: 0;
    }
    &--br {
      bottom: 0;
      right: 0;
      border-left: 0;
      border-top: 0;
    }
  }

  &__core {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3px;
    height: 3px;
    background: var(--red);
    transform: translate(-50%, -50%);
  }

  &--hot &__reticle {
    width: 40px;
    height: 40px;
  }

  &--hot &__bracket {
    border-color: var(--red);
  }
}
</style>

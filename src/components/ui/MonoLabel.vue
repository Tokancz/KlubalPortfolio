<script setup lang="ts">
/**
 * Monospace HUD label, e.g. `// SECTION_02 — PROFILE`.
 * Default slot = base text; `accent` slot = red-highlighted suffix;
 * `dot` prop prepends the pulsing signal-red status dot.
 */
withDefaults(defineProps<{ dot?: boolean }>(), { dot: false })
</script>

<template>
  <span class="mono-label">
    <span v-if="dot" class="mono-label__dot" aria-hidden="true" />
    <slot />
    <span v-if="$slots.accent" class="mono-label__accent"><slot name="accent" /></span>
  </span>
</template>

<style scoped lang="scss">
.mono-label {
  @include mono-label;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  white-space: nowrap;

  // Allow the kicker + accent suffix to wrap instead of overflowing on mobile.
  @include below-tablet {
    flex-wrap: wrap;
    white-space: normal;
  }

  &__accent {
    color: var(--red);
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: var(--r-pill);
    background: var(--red);
    box-shadow: var(--glow-red);
    animation: mono-pulse 1.8s ease-in-out infinite;
  }
}

@keyframes mono-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
</style>

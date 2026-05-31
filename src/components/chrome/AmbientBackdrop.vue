<script setup lang="ts">
/** Fixed, non-interactive blueprint grid + scanline overlay behind all content. */
</script>

<template>
  <div class="bp-grid" aria-hidden="true" />
  <div class="scanlines" aria-hidden="true" />
</template>

<style scoped lang="scss">
.bp-grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    linear-gradient(var(--line-1) 1px, transparent 1px),
    linear-gradient(90deg, var(--line-1) 1px, transparent 1px);
  background-size: 44px 44px;
}

.scanlines {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.35;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.18) 3px,
    rgba(0, 0, 0, 0.18) 4px
  );
}
</style>

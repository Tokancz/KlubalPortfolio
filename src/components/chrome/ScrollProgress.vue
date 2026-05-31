<script setup lang="ts">
/** Fixed top scroll-progress bar. `progress` is a 0–1 fraction. */
defineProps<{ progress: number }>()
</script>

<template>
  <div class="progress" role="presentation" :style="{ width: `${progress * 100}%` }" />
</template>

<style scoped lang="scss">
.progress {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 60;
  height: 2px;
  background: var(--red);
  box-shadow: var(--glow-red);
  transition: width 0.08s linear;
}
</style>

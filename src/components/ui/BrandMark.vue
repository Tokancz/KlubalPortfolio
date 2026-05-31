<script setup lang="ts">
/** The "MK" monogram + "Klubal." wordmark. Links back to the hero. */
</script>

<template>
  <a class="brand" href="#home" aria-label="Klubal — back to top">
    <span class="brand__mono" aria-hidden="true">MK</span>
    <span class="brand__wordmark">Klubal<span class="brand__stop">.</span></span>
  </a>
</template>

<style scoped lang="scss">
.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;

  &__mono {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid var(--red);
    box-shadow: var(--glow-red);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14px;
    color: var(--red);
  }

  &__wordmark {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  &__stop {
    color: var(--red);
  }
}
</style>

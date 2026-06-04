<script setup lang="ts">
import MonoLabel from '@/components/ui/MonoLabel.vue'

/**
 * Shared section header: a mono kicker label (with accented suffix), the
 * big display title, and a muted meta note on the right.
 */
defineProps<{
  /** Kicker text, e.g. "// SECTION_02". */
  label: string
  /** Red-accented suffix of the kicker, e.g. "— PROFILE". */
  accent: string
  /** Display title rendered as an <h2>. */
  title: string
  /** Right-aligned muted note, e.g. "CZ · OPEN FOR WORK". */
  meta: string
}>()
</script>

<template>
  <header class="section-head" v-reveal>
    <div class="section-head__lead">
      <MonoLabel>
        {{ label }}
        <template #accent>&nbsp;{{ accent }}</template>
      </MonoLabel>
      <h2 class="section-head__title">{{ title }}</h2>
    </div>
    <p class="section-head__meta">{{ meta }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 20px;
  margin-bottom: 46px;
  border-bottom: 1px solid var(--line-2);

  // Stack the title and meta on mobile so the two nowrap lines never overlap.
  @include below-tablet {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  &__lead {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 12px 0 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(32px, 5vw, 52px);
    line-height: 1;
    letter-spacing: var(--tracking-tight);
    text-transform: uppercase;
    white-space: nowrap;

    // Let long titles wrap instead of overflowing on narrow screens.
    @include below-tablet {
      white-space: normal;
    }
  }

  &__meta {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--fg-3);
    white-space: nowrap;
  }
}
</style>

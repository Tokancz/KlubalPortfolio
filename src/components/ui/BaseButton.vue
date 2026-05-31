<script setup lang="ts">
import { computed } from 'vue'

/**
 * Styled action — renders an <a> when `href` is set, otherwise a <button>.
 * `variant` switches solid-red vs. outlined-ghost; `cut` applies the
 * signature corner-notch. Content (label + icon) comes from the slot.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    cut?: boolean
    href?: string
    target?: string
    rel?: string
    type?: 'button' | 'submit'
  }>(),
  { variant: 'ghost', cut: false, type: 'button' },
)

const tag = computed(() => (props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    class="btn"
    :class="[`btn--${variant}`, { 'btn--cut': cut }]"
    :href="href"
    :target="target"
    :rel="rel"
    :type="href ? undefined : type"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 22px;
  border: 1px solid transparent;
  background: none;
  color: var(--fg-0);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.16s ease;

  &--cut {
    @include corner-cut(9px);
  }

  &--primary {
    background: var(--red);
    color: #fff;
    box-shadow: var(--glow-red);

    &:hover {
      background: var(--red-bright);
    }
    &:active {
      background: var(--red-deep);
      transform: translateY(1px);
    }
  }

  &--ghost {
    border-color: var(--line-strong);

    &:hover {
      border-color: var(--red);
      color: var(--red);
    }
  }

  :deep(svg) {
    width: 15px;
    height: 15px;
  }
}
</style>

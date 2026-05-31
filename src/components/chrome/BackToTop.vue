<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'

const props = defineProps<{ show: boolean; smooth?: boolean }>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: props.smooth ? 'smooth' : 'auto' })
}
</script>

<template>
  <button
    class="totop"
    :class="{ 'totop--show': show }"
    type="button"
    aria-label="Back to top"
    @click="scrollToTop"
  >
    <ArrowUp />
  </button>
</template>

<style scoped lang="scss">
.totop {
  position: fixed;
  right: 26px;
  bottom: 26px;
  z-index: 45;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-2);
  background: rgba(8, 10, 15, 0.82);
  backdrop-filter: blur(8px);
  color: var(--fg-1);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: 0.22s ease;
  @include corner-cut(8px);

  &--show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  &:hover {
    border-color: var(--red);
    color: var(--red);
  }

  :deep(svg) {
    width: 18px;
    height: 18px;
  }
}
</style>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { navLinks } from '@/data/nav'

/** Full-screen mobile navigation sheet. */
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <div class="msheet" :class="{ 'msheet--open': open }" :aria-hidden="!open">
    <button class="msheet__close" type="button" aria-label="Close menu" @click="$emit('close')">
      <X />
    </button>
    <nav aria-label="Mobile">
      <a
        v-for="link in navLinks"
        :key="link.id"
        :href="`#${link.id}`"
        :tabindex="open ? 0 : -1"
        @click="$emit('close')"
      >
        <span class="msheet__num">{{ link.num }}</span>{{ link.label }}
      </a>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.msheet {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  background: rgba(6, 7, 10, 0.97);
  backdrop-filter: blur(6px);
  transform: translateY(-100%);
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);

  &--open {
    transform: translateY(0);
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  a {
    display: flex;
    align-items: baseline;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line-1);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 34px;
    text-transform: uppercase;
    color: var(--fg-1);

    &:active {
      color: var(--red);
    }
  }

  &__num {
    font-family: var(--font-mono);
    font-weight: 400;
    font-size: 13px;
    color: var(--red);
  }

  &__close {
    position: absolute;
    top: 14px;
    right: 34px;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line-2);
    background: none;
    color: var(--fg-0);
    cursor: pointer;

    :deep(svg) {
      width: 18px;
      height: 18px;
    }
  }
}
</style>

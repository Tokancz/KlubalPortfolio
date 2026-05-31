<script setup lang="ts">
import { ArrowUpRight, Menu } from 'lucide-vue-next'
import { navLinks } from '@/data/nav'
import BrandMark from '@/components/ui/BrandMark.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

/** Fixed top navigation. `activeId` highlights the current section. */
defineProps<{ activeId: string }>()
defineEmits<{ openMenu: [] }>()
</script>

<template>
  <nav class="nav" aria-label="Primary">
    <BrandMark />

    <ul class="nav__links">
      <li v-for="link in navLinks" :key="link.id">
        <a
          :href="`#${link.id}`"
          :class="{ 'is-active': activeId === link.id }"
          :aria-current="activeId === link.id ? 'true' : undefined"
        >
          <span class="nav__num">{{ link.num }}</span>{{ link.label }}
        </a>
      </li>
    </ul>

    <div class="nav__right">
      <BaseButton href="#contact" variant="ghost">
        Hire <ArrowUpRight />
      </BaseButton>
      <button class="nav__hamburger" type="button" aria-label="Open menu" @click="$emit('openMenu')">
        <Menu />
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: rgba(8, 10, 15, 0.82);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line-2);

  @include below-tablet {
    padding: 0 22px;
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 30px;
    margin: 0;
    padding: 0;
    list-style: none;

    @include below-tablet {
      display: none;
    }

    a {
      position: relative;
      padding: 4px 0;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--fg-2);
      white-space: nowrap;
      cursor: pointer;
      transition: 0.15s;

      &:hover,
      &.is-active {
        color: var(--fg-0);
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 100%;
        bottom: -2px;
        height: 1px;
        background: var(--red);
        transition: right 0.22s ease;
      }

      &.is-active::after {
        right: 0;
      }
    }
  }

  &__num {
    margin-right: 7px;
    font-size: 10px;
    color: var(--red);
    opacity: 0.8;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  &__hamburger {
    display: none;
    width: 38px;
    height: 38px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line-2);
    background: none;
    color: var(--fg-0);
    cursor: pointer;

    @include below-tablet {
      display: flex;
    }

    :deep(svg) {
      width: 18px;
      height: 18px;
    }
  }
}
</style>

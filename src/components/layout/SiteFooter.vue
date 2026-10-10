<script setup lang="ts">
import BrandMark from '@/components/ui/BrandMark.vue'
import { legalPath } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="container">
      <div class="foot__bar">
        <BrandMark />
        <p class="foot__note">
          © {{ year }} MATYÁŠ KLUBAL · ALL RIGHTS RESERVED ·
          <a class="foot__link" :href="legalPath">USAGE &amp; PRIVACY</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.foot {
  position: relative;
  z-index: 2;
  margin-top: 90px;
  border-top: 1px solid var(--line-2);

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
    padding: 26px 0;
  }

  &__note {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--fg-3);
  }

  &__link {
    color: var(--fg-2);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: 0.15s;

    &:hover {
      color: var(--red);
    }
  }
}
</style>

<script setup lang="ts">
import { Mail, Instagram, ArrowUpRight } from 'lucide-vue-next'
import SectionHeader from '@/components/ui/SectionHeader.vue'

interface ContactLink {
  icon: typeof Mail
  label: string
  value: string
  href: string
  external?: boolean
}

const links: ContactLink[] = [
  { icon: Mail, label: '// EMAIL', value: 'matyasklubal@gmail.com', href: 'mailto:matyasklubal@gmail.com' },
  {
    icon: Instagram,
    label: '// INSTAGRAM',
    value: '@tunakos_',
    href: 'https://www.instagram.com/tunakos_/',
    external: true,
  },
]
</script>

<template>
  <section id="contact" class="section container">
    <SectionHeader
      label="// SECTION_04"
      accent="— CONTACT"
      title="Get in touch"
      meta="RESPONDS WITHIN A DAY"
    />

    <div class="contact">
      <div class="contact__lead" v-reveal>
        <p class="contact__big">Let's build<br />something<ArrowUpRight class="contact__arrow" /></p>
        <p class="contact__sub">
          Commissions, collaborations, or just want to talk renders? Drop me a line — I'm a student
          and always up for an interesting brief.
        </p>
      </div>

      <address class="contact__panel" v-reveal="0.08">
        <span class="contact__bracket contact__bracket--tl" aria-hidden="true" />
        <span class="contact__bracket contact__bracket--br" aria-hidden="true" />

        <a
          v-for="link in links"
          :key="link.href"
          class="clink"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener' : undefined"
        >
          <span class="clink__icon">
            <component :is="link.icon" />
          </span>
          <span class="clink__text">
            <span class="clink__label">{{ link.label }}</span>
            <span class="clink__value">{{ link.value }}</span>
          </span>
          <ArrowUpRight class="clink__arrow" />
        </a>
      </address>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;

  @include below-tablet {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  &__big {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(40px, 6vw, 76px);
    line-height: 0.94;
    letter-spacing: var(--tracking-tight);
    text-transform: uppercase;
  }

  &__arrow {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-left: 0.06em;
    vertical-align: -0.16em;
    color: var(--red);
    stroke-width: 2.75;
  }

  &__sub {
    max-width: 420px;
    margin: 22px 0 0;
    font-size: 16px;
    line-height: 1.7;
    color: var(--fg-1);
  }

  &__panel {
    position: relative;
    padding: 8px 4px;
    border: 1px solid var(--line-2);
    background: linear-gradient(180deg, var(--bg-2), var(--bg-1));
    font-style: normal;
    clip-path: polygon(
      0 0,
      calc(100% - 16px) 0,
      100% 16px,
      100% 100%,
      16px 100%,
      0 calc(100% - 16px)
    );
  }

  &__bracket {
    position: absolute;
    width: 15px;
    height: 15px;
    border: 1.5px solid var(--red);

    &--tl {
      top: 8px;
      left: 8px;
      border-right: 0;
      border-bottom: 0;
    }
    &--br {
      bottom: 8px;
      right: 8px;
      border-left: 0;
      border-top: 0;
    }
  }
}

.clink {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
  border-bottom: 1px solid var(--line-1);
  transition: 0.16s ease;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: var(--red-ghost);
  }

  &__icon {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line-2);
    color: var(--fg-1);
    transition: 0.16s;

    :deep(svg) {
      width: 18px;
      height: 18px;
    }
  }

  &:hover &__icon {
    border-color: var(--red);
    color: var(--red);
  }

  &__label {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-3);
  }

  &__value {
    display: block;
    margin-top: 3px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.01em;
    color: var(--fg-0);
    word-break: break-all;
  }

  &__arrow {
    margin-left: auto;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: var(--fg-3);
    transition: 0.16s;
  }

  &:hover &__arrow {
    color: var(--red);
    transform: translate(2px, -2px);
  }
}
</style>

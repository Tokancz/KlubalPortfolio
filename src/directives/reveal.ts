import type { Directive, DirectiveBinding } from 'vue'

/**
 * `v-reveal` — fades/slides an element in when it scrolls into view.
 *
 * Adds the global `.reveal` class on mount and toggles `.in` once the
 * element intersects the viewport. An optional binding value sets a
 * stagger delay in seconds: `v-reveal="0.08"`. Under reduced-motion (or
 * without IntersectionObserver) the element is shown immediately.
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>()

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    el.classList.add('reveal')

    if (binding.value) {
      el.style.transitionDelay = `${binding.value}s`
    }

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('in')
            observer.unobserve(el)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    observer.observe(el)
    observers.set(el, observer)
  },

  unmounted(el: HTMLElement) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}

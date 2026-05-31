import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * Reactive `prefers-reduced-motion` flag. Components use this to skip
 * decorative animation (custom cursor, looped pulses, smooth scroll).
 */
export function useReducedMotion() {
  const prefersReducedMotion = ref(false)
  let mq: MediaQueryList | null = null

  const update = () => {
    if (mq) prefersReducedMotion.value = mq.matches
  }

  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mq.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mq?.removeEventListener('change', update)
  })

  return prefersReducedMotion
}

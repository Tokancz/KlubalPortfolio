import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * Reactive scroll state for the top progress bar and the back-to-top
 * button. `progress` is the 0–1 scroll fraction; `showBackToTop` flips
 * once past 60% of the first viewport.
 */
export function useScrollProgress() {
  const progress = ref(0)
  const showBackToTop = ref(false)

  const onScroll = () => {
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    progress.value = max > 0 ? (doc.scrollTop || document.body.scrollTop) / max : 0
    showBackToTop.value = window.scrollY > window.innerHeight * 0.6
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return { progress, showBackToTop }
}

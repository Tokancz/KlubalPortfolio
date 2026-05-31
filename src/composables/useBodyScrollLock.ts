import { watch, onBeforeUnmount, type Ref } from 'vue'

/**
 * Locks page scroll while `locked` is true — used by the lightbox and the
 * mobile menu so the overlay can't be scrolled behind. Always restores
 * scroll on unmount.
 */
export function useBodyScrollLock(locked: Ref<boolean>) {
  const stop = watch(
    locked,
    (isLocked) => {
      document.body.style.overflow = isLocked ? 'hidden' : ''
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    document.body.style.overflow = ''
    stop()
  })
}

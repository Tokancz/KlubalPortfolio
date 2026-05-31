import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * Tracks which section is nearest the viewport centre and returns its id.
 * Drives the active state of the nav links. Mirrors the handoff's
 * IntersectionObserver (rootMargin centred band).
 */
export function useActiveSection(sectionIds: string[]) {
  const activeId = ref(sectionIds[0] ?? '')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId.value = entry.target.id
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return activeId
}

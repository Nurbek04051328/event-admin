// composables/useInView.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(targetRef, options = {}) {
  const isIntersecting = ref(false)

  let observer

  const callback = ([entry]) => {
    if (entry.isIntersecting) {
      isIntersecting.value = true
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(callback, options)
    if (targetRef.value) observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer && targetRef.value) observer.unobserve(targetRef.value)
  })

  return { isIntersecting }
}

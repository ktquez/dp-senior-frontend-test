import { onMounted, onUnmounted, ref } from '@nuxtjs/composition-api'

export default function useEventListener (type, listener, options = {}, target) {
  const eventOptions = { capture: false, ...options }
  const el = ref(null)

  onMounted(() => {
    el.value = typeof target === 'string' ? document.querySelector(target) : window
    el.value.addEventListener(type, listener, eventOptions)
  })

  onUnmounted(() => {
    el.value.removeEventListener(type, listener, eventOptions)
  })
}

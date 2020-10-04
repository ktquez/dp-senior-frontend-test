import { ref } from '@nuxtjs/composition-api'

export default function useNotification (wait = 6000) {
  let timeout = null
  const notification = ref({
    show: false,
    type: 'success',
    message: ''
  })

  function setNotification (data) {
    notification.value = { ...notification.value, show: true, ...data }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      notification.value.show = false
    }, wait)
  }

  function setErrorNotification (message) {
    notification.value = { ...notification.value, type: 'error', message }
  }

  return {
    notification,
    setNotification,
    setErrorNotification
  }
}

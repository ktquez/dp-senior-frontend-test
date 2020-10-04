import { ref } from '@nuxtjs/composition-api'

export default function useNotification (timeout = 6000) {
  const notification = ref({
    show: false,
    type: 'success',
    message: ''
  })

  function setNotification (data) {
    notification.value = { ...notification.value, show: true, ...data }
    setTimeout(() => {
      notification.value.show = false
    }, timeout)
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

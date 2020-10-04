import { ref } from '@nuxtjs/composition-api'

export default function useNotification (wait = 6000) {
  let timeout = null
  const notification = ref({
    show: false,
    type: 'success',
    message: ''
  })

  function handleDisplayNotification () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      notification.value.show = false
    }, wait)
  }

  function setNotification (data) {
    notification.value = { ...notification.value, show: true, ...data }
    handleDisplayNotification()
  }

  function setErrorNotification (message) {
    notification.value = { ...notification.value, show: true, type: 'error', message }
    handleDisplayNotification()
  }

  return {
    notification,
    setNotification,
    setErrorNotification
  }
}

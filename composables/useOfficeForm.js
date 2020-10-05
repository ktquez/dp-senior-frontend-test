import { ref } from '@nuxtjs/composition-api'

import useDisclosure from './useDisclosure'

export default function useOfficeForm () {
  const { isOpen: isOfficeFormOpen, toggle } = useDisclosure()
  const elementInEdition = ref(null)
  const currentOfficeForm = ref(null)

  const animateOfficeForm = (cb, timeout = 500) => setTimeout(cb, timeout)

  function openOfficeForm (office, target = null) {
    if (target) {
      elementInEdition.value = document.querySelector(target)
    }
    toggle()
    animateOfficeForm(() => {
      currentOfficeForm.value = office
    })
  }

  function closeOfficeForm () {
    currentOfficeForm.value = null
    const offsetTop = elementInEdition.value ? elementInEdition.value.offsetTop - 250 : 0
    scrollTo({ top: offsetTop, behavior: 'smooth' })
    animateOfficeForm(toggle)
    elementInEdition.value = null
  }

  return {
    openOfficeForm,
    closeOfficeForm,
    isOfficeFormOpen,
    currentOfficeForm
  }
}

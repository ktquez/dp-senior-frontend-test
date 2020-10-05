import { ref } from '@nuxtjs/composition-api'
import { officesData, colors } from '@/data/offices.js'

export default function useOffices () {
  const offices = ref([...officesData])
  const id = ref(offices.value.length)
  const officeColors = colors

  function create (data) {
    ++id.value
    data = { id: id.value, ...data }
    offices.value = [data, ...offices.value]
  }

  function update (id, data) {
    offices.value = offices.value.map(office => {
      if (office.id !== id) return office
      return { ...office, ...data }
    })
  }

  function destroy (id) {
    const index = offices.value.findIndex(office => office.id === id)
    offices.value = [...offices.value.slice(0, index), ...offices.value.slice(index + 1)]
  }

  return {
    create,
    update,
    destroy,
    offices,
    officeColors
  }
}

import { ref } from '@nuxtjs/composition-api'
import makeOffices from '@/data/offices.js'

export default function useOffices (numberItems = 6) {
  const offices = ref([...makeOffices(numberItems)])

  function create (data) {
    offices.value = [...data, ...offices.value]
  }

  function update (id, data) {
    const index = offices.value.findIndex(office => office.id === id)
    offices.value = [...offices.value.splice(index, 1, data)]
  }

  function destroy (id) {
    const index = offices.value.findIndex(office => office.id === id)
    offices.value = [...offices.value.slice(0, index), ...offices.value.slice(index + 1)]
  }

  return {
    fetch,
    create,
    update,
    destroy,
    offices
  }
}

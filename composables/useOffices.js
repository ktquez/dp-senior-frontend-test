import { ref } from '@nuxtjs/composition-api'
import makeOffices from '@/data/offices.js'

export default function useOffices () {
  const offices = ref([])

  function fetch (numberItems = 6) {
    offices.value = [...makeOffices(numberItems)]
  }

  function create (data) {
    console.log(data)
  }

  function update (index, data) {
    console.log(index, data)
  }

  function remove (index) {
    console.log(index)
  }

  return {
    fetch,
    create,
    update,
    remove,
    offices
  }
}

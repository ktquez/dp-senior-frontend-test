<template>
  <div>
    <h1 class="bg-blue-200">
      {{ heading }}
    </h1>
  </div>
</template>

<script>
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Offices',
  head: {},

  setup () {
    const heading = 'Offices'
    useMeta({ title: 'Offices | Senior frontend test' })

    return {
      heading
    }
  }
})
</script>

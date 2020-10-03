<template>
  <div class="w-full max-w-xs py-24 mx-auto">
    <header class="mb-10 text-center">
      <h1 class="text-6xl font-light text-link">
        Offices
      </h1>
    </header>
    <main id="main">
      <ul>
        <li>
          <button
            type="button"
            class="flex justify-between w-full p-4 rounded-md bg-accent-red"
          >
            <span class="font-medium text-black">Add new location</span>
            <svg-icon
              name="plus"
              aria-hidden="true"
              focusable="false"
              class="w-6 h-6"
            />
          </button>
        </li>
        <li
          v-for="office in offices"
          :key="`office-${office.id}`"
          class="mt-6 last:mt-0"
        >
          <OfficeCard :office="office" />
        </li>
      </ul>
    </main>
    <footer class="pt-6 text-center">
      <p>This project is for test purpose only.</p>
      <address>
        <a
          href="https://www.dogandponystudios.com"
          title="Dog and Pony Studios website"
          class="text-xs uppercase text-link"
        >
          www.dogandponystudios.com
        </a>
      </address>
    </footer>
  </div>
</template>

<script>
import { defineComponent, useAsync } from '@nuxtjs/composition-api'

import useOffices from '@/composables/useOffices'

import OfficeCard from '@/components/OfficeCard'

export default defineComponent({
  name: 'Offices',

  components: {
    OfficeCard
  },

  head: {
    title: 'Offices | Senior frontend test'
  },

  setup () {
    const heading = 'Offices'
    const offices = useAsync(async () => {
      const { offices, fetch } = await useOffices()
      await fetch(7)
      return offices.value
    })

    return { heading, offices }
  }
})
</script>

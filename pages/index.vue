<template>
  <div class="w-full max-w-xs py-24 mx-auto">
    <div
      aria-live="assertive"
      aria-atomic="true"
    >
      <Notification v-bind="notification" />
    </div>
    <header class="my-10 text-center">
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
          <OfficeCard
            :office="office"
            @on-delete="removeOffice(office)"
          />
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
import { defineComponent } from '@nuxtjs/composition-api'

import { useNotification, useOffices } from '@/composables'

import OfficeCard from '@/components/OfficeCard'
import Notification from '@/components/Notification'

export default defineComponent({
  name: 'Offices',

  components: {
    OfficeCard,
    Notification
  },

  head: {
    title: 'Offices | Senior frontend test'
  },

  setup () {
    const heading = 'Offices'
    const { offices, destroy, create, update } = useOffices()
    const { notification, setNotification, setErrorNotification } = useNotification()

    function createOffice (office) {
      try {
        create(office)
        setNotification({ message: `The location ${office.title} has been created successfully.` })
      } catch (e) {
        setErrorNotification(`Error creating the location ${office.title}.`)
      }
    }

    function updateOffice (office) {
      try {
        update(office.id, office)
        setNotification({ message: `The location ${office.title} has been updated.` })
      } catch (e) {
        setErrorNotification(`Error updating the location ${office.title}.`)
      }
    }

    function removeOffice (office) {
      try {
        destroy(office.id)
        setNotification({ message: `The location ${office.title} has been deleted.` })
      } catch (e) {
        setErrorNotification(`Error deleting the location ${office.title}.`)
      }
    }

    return {
      create,
      update,
      heading,
      offices,
      createOffice,
      updateOffice,
      removeOffice,
      notification
    }
  }
})
</script>

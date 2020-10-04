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
        <li class="relative w-full">
          <TransitionSlideDown>
            <button
              v-show="!isFormOpen"
              type="button"
              class="w-full overflow-hidden rounded-md bg-accent-red"
              @click="openOfficeForm({})"
            >
              <span class="flex justify-between px-6 py-4">
                <span class="font-medium text-black">Add new location</span>
                <Icon name="plus" />
              </span>
            </button>
          </TransitionSlideDown>
          <TransitionSlideDown>
            <OfficeForm
              v-if="currentOfficeForm"
              class="overflow-hidden rounded-md"
              :office="currentOfficeForm"
              @on-save="persistOffice"
              @on-close="closeOfficeForm"
            />
          </TransitionSlideDown>
        </li>
        <li
          v-for="office in offices"
          :key="`office-${office.id}`"
          class="mt-6 last:mt-0"
        >
          <OfficeCard
            :office="office"
            @on-edit="openOfficeForm(office)"
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
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

import { useNotification, useOffices, useDisclosure } from '@/composables'

import OfficeCard from '@/components/OfficeCard'
import OfficeForm from '@/components/OfficeForm'
import Notification from '@/components/Notification'

export default defineComponent({
  name: 'Offices',

  components: {
    OfficeCard,
    OfficeForm,
    Notification
  },

  head: {
    title: 'Offices | Senior frontend test'
  },

  setup () {
    const heading = 'Offices'
    const currentOfficeForm = ref(null)
    const { offices, fetchOffices, destroy, create, update } = useOffices()
    const { isOpen: isFormOpen, toggle: toggleForm } = useDisclosure()
    const { notification, setNotification, setErrorNotification } = useNotification()

    const animateOfficeForm = cb => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(cb, 500)
    }

    function openOfficeForm (office) {
      toggleForm()
      animateOfficeForm(() => {
        currentOfficeForm.value = office
      })
    }

    function closeOfficeForm () {
      currentOfficeForm.value = null
      animateOfficeForm(toggleForm)
    }

    function persistOffice (office) {
      const isEdit = office.id
      try {
        isEdit ? update(office.id, office) : create(office)
        setNotification({ message: `The location ${office.title} has been ${isEdit ? 'updated' : 'created successfully'}.` })
        closeOfficeForm()
      } catch (e) {
        setErrorNotification(`Error ${isEdit ? 'updating' : 'creating'} the location ${office.title}.`)
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

    fetchOffices(7)

    return {
      create,
      update,
      heading,
      offices,
      isFormOpen,
      openOfficeForm,
      closeOfficeForm,
      persistOffice,
      removeOffice,
      notification,
      currentOfficeForm
    }
  }
})
</script>

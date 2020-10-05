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
        {{ heading }}
      </h1>
    </header>
    <main id="main">
      <NewLocation @on-save="persistOffice" />
      <ul
        ref="listOffices"
        data-test="offices-list"
      >
        <li
          v-for="office in offices"
          :id="`office-item-${office.id}`"
          :key="`office-${office.id}`"
          class="mt-6 last:mt-0"
        >
          <div class="w-full overflow-hidden rounded-md">
            <OfficeCard
              :office="office"
              @on-edit="openOfficeForm(office, `#office-item-${office.id}`)"
              @on-delete="removeOffice(office)"
            />
          </div>
          <TransitionSlideDown>
            <OfficeForm
              v-if="currentOfficeForm && currentOfficeForm.id === office.id"
              class="mt-6 overflow-hidden rounded-md"
              :office="currentOfficeForm"
              @on-save="persistOffice"
              @on-close="closeOfficeForm"
            />
          </TransitionSlideDown>
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

import { useNotification, useOffices, useOfficeForm } from '@/composables'

export default defineComponent({
  name: 'Offices',

  components: {
    OfficeCard: () => import(/* webpackChunkName: "OfficeCard" */ '@/components/OfficeCard'),
    OfficeForm: () => import(/* webpackChunkName: "OfficeForm" */ '@/components/OfficeForm'),
    NewLocation: () => import(/* webpackChunkName: "NewLocation" */ '@/components/NewLocation'),
    Notification: () => import(/* webpackChunkName: "Notification" */ '@/components/Notification')
  },

  head: {
    title: 'Offices | Senior frontend test'
  },

  setup (_, { refs }) {
    const heading = 'Offices'
    const { offices, destroy, create, update } = useOffices()
    const { openOfficeForm, closeOfficeForm, currentOfficeForm } = useOfficeForm()
    const { notification, setNotification, setErrorNotification } = useNotification()

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
        scrollTo({ top: 0, behavior: 'smooth' })
        setNotification({ message: `The location ${office.title} has been deleted.` })
      } catch (e) {
        setErrorNotification(`Error deleting the location ${office.title}.`)
      }
    }

    return {
      heading,
      offices,
      removeOffice,
      notification,
      persistOffice,
      openOfficeForm,
      closeOfficeForm,
      currentOfficeForm
    }
  }
})
</script>

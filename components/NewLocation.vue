<template>
  <div
    id="add-office"
    class="relative w-full"
  >
    <TransitionSlideDown>
      <button
        v-show="!isOfficeFormOpen"
        type="button"
        class="w-full overflow-hidden rounded-md bg-accent-red"
        aria-haspopup="true"
        aria-controls="add-office-form"
        :aria-expanded="isOfficeFormOpen.toString()"
        @click="openOfficeForm({})"
      >
        <span class="flex justify-between px-6 py-4">
          <span class="font-medium text-black">Add new location</span>
          <Icon name="plus" />
        </span>
      </button>
    </TransitionSlideDown>
    <div id="add-office-form">
      <TransitionSlideDown>
        <OfficeForm
          v-if="currentOfficeForm"
          class="overflow-hidden rounded-md"
          :office="currentOfficeForm"
          @on-save="saveNewLocation"
          @on-close="closeOfficeForm"
        />
      </TransitionSlideDown>
    </div>
  </div>
</template>

<script>
import { useOfficeForm } from '@/composables'

export default {
  name: 'NewLocation',

  components: {
    OfficeForm: () => import(/* webpackChunkName: "OfficeForm" */ '@/components/OfficeForm')
  },

  setup (_, { emit }) {
    const { isOfficeFormOpen, openOfficeForm, closeOfficeForm, currentOfficeForm } = useOfficeForm()

    function saveNewLocation (e) {
      closeOfficeForm()
      emit('on-save', e)
    }

    return {
      openOfficeForm,
      closeOfficeForm,
      saveNewLocation,
      isOfficeFormOpen,
      currentOfficeForm
    }
  }
}
</script>

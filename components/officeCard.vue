<template>
  <article class="bg-white rounded-md shadow-xl">
    <FocusLoop :disabled="!isOpen">
      <WrapperCard
        ref="headerCard"
        data-test="officeCard"
        class="flex items-center justify-between px-6 py-10 text-black rounded-md hover:shadow-focus focus-within:shadow-focus"
        :class="office.color"
        :style="`color: ${fontColor};`"
        @trigger="toggle"
      >
        <div class="pr-6">
          <h2
            :id="`officeTitle-${office.id}`"
            class="mb-3 text-2xl font-bold leading-7"
            data-test="officeTitle"
          >
            {{ office.title }}
          </h2>
          <p>{{ office.address }}</p>
        </div>
        <button
          type="button"
          class="focus:outline-none"
          aria-haspopup="true"
          :aria-controls="`office-info-${office.id}`"
          :aria-expanded="isOpen.toString()"
          :aria-label="`${isOpen ? 'Close' : 'Open' } ${office.title} informations`"
          @keypress.enter.space="toggle"
        >
          <svg-icon
            name="arrow-down"
            aria-hidden="true"
            focusable="false"
            class="w-6 h-6"
            :class="{
              'transform rotate-180': isOpen
            }"
          />
        </button>
      </WrapperCard>
      <transition
        enter-active-class="transition-all duration-500 ease-in"
        leave-active-class="transition-all duration-500 ease-out"
        enter-class="p-0 max-h-0"
        enter-to-class="max-h-300"
        leave-class="max-h-300"
        leave-to-class="p-0 max-h-0"
      >
        <div
          v-show="isOpen"
          :id="`office-info-${office.id}`"
          ref="officeInfo"
          data-test="officeInfo"
          class="overflow-hidden rounded-b-md"
        >
          <div class="px-8 pt-6 pb-2">
            <h3 class="text-xl font-bold">
              {{ office.fullName }}
            </h3>
            <p class="my-2">
              {{ office.jobPosition }}
            </p>

            <address>
              <a
                :href="`mailto:${office.email}`"
                class="block mb-2 text-link"
              >
                {{ office.email }}
              </a>
              <a :href="`tel:${office.phone.replace(/\D/g, '')}`">
                {{ office.phone }}
              </a>
            </address>

            <hr class="mt-4 mb-1">

            <div class="flex justify-between">
              <button
                type="button"
                class="flex items-center px-2 py-3"
                :aria-labelledby="`edit-button-${office.id} officeTitle-${office.id}`"
              >
                <svg-icon
                  name="edit"
                  aria-hidden="true"
                  focusable="false"
                  class="w-6 h-6"
                />
                <span
                  :id="`edit-button-${office.id}`"
                  class="ml-2 text-sm uppercase"
                >
                  Edit
                </span>
              </button>
              <button
                type="button"
                class="flex items-center px-2 py-3 text-error"
                :aria-labelledby="`delete-button-${office.id} officeTitle-${office.id}`"
                @click="modalToggle"
              >
                <svg-icon
                  name="trash"
                  aria-hidden="true"
                  focusable="false"
                  class="w-6 h-6"
                />
                <span
                  :id="`delete-button-${office.id}`"
                  class="ml-2 text-sm uppercase"
                >
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </FocusLoop>

    <Modal
      v-if="isModalOpen"
      @on-close="modalToggle"
    >
      <template #header>
        <h2 class="text-2xl font-bold">
          Do you want to remove the office "{{ office.title }}"?
        </h2>
      </template>
      <template #footer>
        <button
          class="px-4 py-2 font-medium bg-gray-300 border border-gray-500 rounded-md"
          @click="modalToggle"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 ml-4 font-medium text-black rounded-md bg-accent-red"
          @click="deleteOffice"
        >
          Delete
        </button>
      </template>
    </Modal>
  </article>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
import { useDisclosure, useColorContrast } from '@/composables'
import { programmaticFocus } from '@/utils'

import { FocusLoop } from '@vue-a11y/focus-loop'
import WrapperCard from '@/components/WrapperCard'
import Modal from '@/components/Modal'

export default defineComponent({
  name: 'OfficeCard',

  components: {
    Modal,
    FocusLoop,
    WrapperCard
  },

  props: {
    office: {
      type: Object,
      required: true
    }
  },

  setup (_, { refs, emit }) {
    const fontColor = ref('')
    const { isOpen, toggle } = useDisclosure()
    const { isOpen: isModalOpen, toggle: modalToggle } = useDisclosure()

    onMounted(() => {
      const { color } = useColorContrast(refs.headerCard.$el)
      fontColor.value = color.value
    })

    watch(isOpen, val => {
      if (val) refs.officeInfo && programmaticFocus(refs.officeInfo)
    })

    function deleteOffice () {
      emit('on-delete')
      modalToggle()
    }

    return {
      isOpen,
      toggle,
      fontColor,
      isModalOpen,
      modalToggle,
      deleteOffice
    }
  }
})
</script>

<style lang="scss"></style>

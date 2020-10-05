<template>
  <article class="bg-white rounded-md shadow-xl">
    <WrapperCard
      ref="headerCard"
      data-test="officeCard"
      class="flex items-center justify-between px-6 py-10 text-black rounded-md hover:shadow-focus focus-within:shadow-focus"
      :class="office.color || 'bg-accent-blue'"
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
        <Icon
          name="arrow-down"
          :class="{
            'transform rotate-180': isOpen
          }"
        />
      </button>
    </WrapperCard>
    <TransitionSlideDown>
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
              data-test="edit-button"
              :aria-labelledby="`edit-button-${office.id} officeTitle-${office.id}`"
              @click="$emit('on-edit') && toggle()"
            >
              <Icon name="edit" />
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
              data-test="delete-button"
              :aria-labelledby="`delete-button-${office.id} officeTitle-${office.id}`"
              @click="modalToggle"
            >
              <Icon name="trash" />
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
    </TransitionSlideDown>

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
          data-test="cancel-button-dialog"
          @click="modalToggle"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 ml-4 font-medium text-black rounded-md bg-accent-red"
          data-test="delete-button-dialog"
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

import WrapperCard from '@/components/WrapperCard'

export default defineComponent({
  name: 'OfficeCard',

  components: {
    Modal: () => import(/* webpackChunkName: "Modal" */ '@/components/Modal'),
    WrapperCard
  },

  props: {
    office: {
      type: Object,
      required: true
    }
  },

  setup (props, { refs, emit }) {
    const fontColor = ref('#000')
    const { isOpen, toggle } = useDisclosure()
    const { isOpen: isModalOpen, toggle: modalToggle } = useDisclosure()

    onMounted(() => {
      const { color } = useColorContrast(refs.headerCard.$el)
      fontColor.value = color.value
    })

    watch(isOpen, val => {
      if (val) refs.officeInfo && programmaticFocus(refs.officeInfo)
    })

    watch(() => props.office.color, () => {
      const { color } = useColorContrast(refs.headerCard.$el)
      fontColor.value = color.value
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

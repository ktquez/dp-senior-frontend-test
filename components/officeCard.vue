<template>
  <article class="relative bg-white rounded-md shadow-xl">
    <WrapperCard
      ref="headerCard"
      data-test="officeCard"
      class="flex items-center justify-between px-6 py-10 rounded-md hover:shadow-focus focus-within:shadow-focus"
      :class="office.color"
      :style="`color: ${fontColor};`"
      @trigger="toggle"
    >
      <div>
        <h2
          class="text-2xl font-bold"
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
              href="mailto:georgia.young@example.com"
              class="block mb-2 text-a11y-blue"
            >
              {{ office.email }}
            </a>
            <a href="tel:+8085550111">
              {{ office.phone }}
            </a>
          </address>

          <hr class="mt-4 mb-1">

          <div class="flex justify-between">
            <button
              type="button"
              class="flex items-center px-2 py-3"
            >
              <svg-icon
                name="edit"
                aria-hidden="true"
                focusable="false"
                class="w-6 h-6"
              />
              <span class="ml-2 text-sm uppercase">Edit</span>
            </button>
            <button
              type="button"
              class="flex items-center px-2 py-3 text-a11y-red"
            >
              <svg-icon
                name="trash"
                aria-hidden="true"
                focusable="false"
                class="w-6 h-6"
              />
              <span class="ml-2 text-sm uppercase">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </article>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { useDisclosure, useColorContrast } from '@/composables'

import WrapperCard from '@/components/WrapperCard'

export default defineComponent({
  name: 'OfficeCard',

  components: {
    WrapperCard
  },

  props: {
    office: {
      type: Object,
      required: true
    }
  },

  setup (_, { refs }) {
    const fontColor = ref('')
    const { isOpen, toggle } = useDisclosure()

    onMounted(() => {
      const { color } = useColorContrast(refs.headerCard.$el)
      fontColor.value = color.value
    })

    return {
      isOpen,
      toggle,
      fontColor
    }
  }
})
</script>

<style lang="scss"></style>

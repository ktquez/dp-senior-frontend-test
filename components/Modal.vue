<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDesc"
  >
    <div
      data-test="backdrop"
      class="fixed z-10 w-full h-full bg-black bg-opacity-75"
      @click="onClose"
    />

    <FocusLoop class="relative z-20">
      <div class="max-w-xl p-0 mx-4 bg-white rounded-md md:mx-auto">
        <div
          v-show="slots.header"
          id="modalTitle"
          class="p-6"
        >
          <slot name="header" />
        </div>
        <div
          v-show="slots.body"
          id="modalDesc"
          class="p-6"
        >
          <slot name="body" />
        </div>
        <div
          v-show="slots.footer"
          class="flex w-full p-6 mt-2 bg-gray-100 rounded-b-md"
        >
          <slot name="footer" />
        </div>
      </div>
    </FocusLoop>
  </div>
</template>

<script>
import { FocusLoop } from '@vue-a11y/focus-loop'

import { useEventListener } from '@/composables'

export default {
  name: 'Modal',

  components: {
    FocusLoop
  },

  setup (_, { emit, slots }) {
    useEventListener('keydown', e => e.key === 'Escape' && onClose())

    function onClose () {
      emit('on-close')
    }

    return {
      slots,
      onClose
    }
  }
}
</script>

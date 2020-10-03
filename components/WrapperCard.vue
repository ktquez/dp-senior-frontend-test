<template>
  <component
    :is="tag"
    class="cursor-pointer"
    @mousedown="onMouseEvent"
    @mouseup="onMouseEvent"
  >
    <slot />
  </component>
</template>

<script>
import { ref, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'WrapperCard',

  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },

  setup (_, { emit }) {
    const up = ref(null)
    const down = ref(null)

    function isRightClick (buttons) {
      return buttons === 2
    }

    function onMouseEvent ({ type, buttons, target }) {
      if (isRightClick(buttons)) return
      type === 'mousedown' ? onMouseDown() : onMouseUp()
    }

    function onMouseUp () {
      up.value = +new Date()
      if ((up.value - down.value) < 200) emit('trigger')
    }

    function onMouseDown () {
      down.value = +new Date()
    }

    return {
      onMouseEvent
    }
  }
})
</script>

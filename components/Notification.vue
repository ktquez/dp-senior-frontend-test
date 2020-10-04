<template>
  <TransitionSlideDown>
    <div
      v-show="show"
      data-test="notification"
      class="fixed top-0 left-0 z-20 w-full overflow-hidden bg-white"
    >
      <div class="flex items-center justify-center py-8">
        <Icon
          data-test="notification-icon"
          :name="type"
          :class="{
            'text-green-700': type === 'success',
            'text-error': type === 'error'
          }"
        />
        <span
          aria-live="assertive"
          class="ml-4"
        >
          {{ message }}
        </span>
      </div>
    </div>
  </TransitionSlideDown>
</template>

<script>
export default {
  name: 'Notification',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

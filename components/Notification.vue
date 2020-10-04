<template>
  <transition
    enter-active-class="transition-all duration-500 ease-in"
    leave-active-class="transition-all duration-500 ease-out"
    enter-class="max-h-0"
    enter-to-class="max-h-300"
    leave-class="max-h-300"
    leave-to-class="max-h-0"
  >
    <div
      v-show="show"
      data-test="notification"
      class="fixed top-0 left-0 w-full overflow-hidden bg-white"
    >
      <div class="flex items-center justify-center py-8">
        <svg-icon
          data-test="notification-icon"
          :name="type"
          :class="{
            'text-green-700': type === 'success',
            'text-error': type === 'error'
          }"
          aria-hidden="true"
          focusable="false"
          class="w-6 h-6"
        />
        <span
          aria-live="assertive"
          class="ml-4"
        >
          {{ message }}
        </span>
      </div>
    </div>
  </transition>
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

<template functional>
  <transition
    enter-active-class="transition-all duration-300 ease-in motion-reduce:transition-none"
    leave-active-class="transition-all duration-500 ease-out motion-reduce:transition-none"
    enter-class="p-0 max-h-0"
    enter-to-class="max-h-300"
    leave-class="max-h-300"
    leave-to-class="p-0 max-h-0"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionSlideDown'
}
</script>

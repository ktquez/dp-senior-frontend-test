<template>
  <svg-icon
    :name="name"
    aria-hidden="true"
    focusable="false"
    :class="[
      `w-${size}`,
      `h-${size}`
    ]"
  />
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 6
    }
  }
}
</script>

<template>
  <svg-icon
    :name="name"
    aria-hidden="true"
    focusable="false"
    :width="width"
    :height="height"
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
    width: {
      type: String,
      default: '24px'
    },
    height: {
      type: String,
      default: '24px'
    }
  }
}
</script>

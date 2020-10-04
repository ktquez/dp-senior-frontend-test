<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for -->
  <label class="block mb-1 font-medium">
    <span>
      <slot />
    </span>
    <span v-show="required">*</span>
  </label>
</template>

<script>
export default {
  name: 'FormLabel',

  props: {
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label -->
  <span class="relative">
    <input
      :type="type"
      :aria-required="required.toString()"
      :aria-invalid="failed ? 'true' : null"
      :class="{ 'border-accent-red focus:border-accent-red': failed }"
      v-bind="$attrs"
      class="w-full p-2 border border-gray-700 rounded shadow-xs focus:border-accent-blue focus:outline-none"
      @input="$emit('update', $event.target.value)"
    >
    <Icon
      v-if="failed"
      name="error-solid"
      class="absolute top-0 right-0 mr-2 text-accent-red"
    />
  </span>
</template>

<script>
export default {
  name: 'FormInput',

  inheritAttrs: false,

  model: {
    event: 'update'
  },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    failed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

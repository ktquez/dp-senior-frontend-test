<template functional>
  <span
    role="alert"
    class="text-sm text-red-700"
  >
    <span v-show="props.errors.length">
      <slot>
        {{ props.errors[0] }}
      </slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'FormErrorMessage',

  props: {
    errors: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

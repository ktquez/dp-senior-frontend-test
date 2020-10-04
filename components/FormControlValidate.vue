<template>
  <ValidationProvider
    v-slot="data"
    :rules="rules"
    :name="name"
    tag="div"
    role="group"
  >
    <slot v-bind="data" />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormControlValidate',

  components: {
    ValidationProvider
  },

  props: {
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      required: true
    }
  }
}
</script>

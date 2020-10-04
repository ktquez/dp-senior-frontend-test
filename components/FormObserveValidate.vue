<template>
  <ValidationObserver
    v-slot="{ invalid, valid, validate }"
    slim
  >
    <form @submit.prevent="validate().then($emit('submitted', valid))">
      <slot :invalid="invalid" />
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'FormObserveValidate',

  components: {
    ValidationObserver
  }
}
</script>

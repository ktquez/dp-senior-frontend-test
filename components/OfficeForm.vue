<template>
  <FormObserveValidate
    ref="officeForm"
    class="bg-white"
    name="office-form"
    @submitted="submit"
  >
    <template v-slot="{ invalid: invalidForm }">
      <FocusLoop>
        <div class="px-6 py-2 pb-4">
          <div class="flex items-center justify-between mb-6">
            <h2
              id="office-form-title"
              class="font-bold"
            >
              <span aria-live="assertive">
                <span class="sr-only">Form</span> {{ office.id ? 'Edit' : 'New' }} location
              </span>
            </h2>
            <button
              type="button"
              class="p-2 -mr-2"
              aria-labelledby="office-form-close office-form-title"
              @click="$emit('on-close')"
            >
              <span
                id="office-form-close"
                class="sr-only"
              >
                Close
              </span>
              <Icon name="close" />
            </button>
          </div>
          <fieldset class="flex flex-wrap">
            <legend class="sr-only">
              Office information
            </legend>

            <div class="mb-8">
              <button
                ref="colorsButton"
                type="button"
                class="flex items-center justify-center w-full px-6 py-12 font-medium rounded-md shadow-xl hover:shadow-focus"
                aria-haspopup="true"
                aria-controls="office-form-colors"
                :aria-expanded="isColorsOpen.toString()"
                :class="_office.color"
                :style="`color: ${fontColor}`"
                @click="toggleColors"
              >
                <span v-show="isColorsOpen">Close color list</span>
                <span v-show="!isColorsOpen">Select color</span>
                <Icon
                  name="arrow-down"
                  size="4"
                  class="ml-2"
                  :class="{
                    'transform rotate-180': isColorsOpen
                  }"
                />
              </button>
              <div
                id="office-form-colors"
                class="overflow-hidden"
              >
                <TransitionSlideDown>
                  <ul
                    v-show="isColorsOpen"
                    data-test="colors"
                  >
                    <li
                      v-for="color in officeColors"
                      :key="`radio-${color}`"
                      class="px-1 mt-4"
                    >
                      <label
                        :for="`field-${color}`"
                        class="relative flex items-center justify-center px-6 py-16 font-medium rounded-md cursor-pointer focus-within:shadow-focus"
                        :class="color"
                        :style="`color: ${fontColor}`"
                      >
                        <span class="sr-only">
                          Select color {{ color.replace(/(bg|accent|primary|-)/g, ' ') }}
                        </span>
                        <Icon
                          v-if="color === _office.color"
                          size="8"
                          class="absolute flex items-center justify-center"
                          name="success"
                        />
                        <input
                          :id="`field-${color}`"
                          v-model="_office.color"
                          type="radio"
                          name="color"
                          class="absolute opacity-0"
                          :value="color"
                          :ckeched="color === _office.color"
                        >
                      </label>
                    </li>
                  </ul>
                </TransitionSlideDown>
              </div>
            </div>

            <FormControlValidate
              v-slot="{ errors, required, failed }"
              rules="required"
              name="Title"
              class="mb-4"
            >
              <FormLabel
                for="title"
                :required="required"
              >
                Title
              </FormLabel>
              <FormInput
                id="title"
                v-model="_office.title"
                name="title"
                :required="required"
                :failed="failed"
                autocomplete="organization"
              />
              <FormErrorMessage :errors="errors" />
            </FormControlValidate>

            <FormControlValidate
              v-slot="{ errors, required, failed }"
              rules="required"
              name="Address"
              class="mb-4"
            >
              <FormLabel
                for="address"
                :required="required"
              >
                Enter the address
              </FormLabel>
              <FormInput
                id="address"
                v-model="_office.address"
                name="address"
                :required="required"
                :failed="failed"
                autocomplete="street-address"
              />
              <FormErrorMessage :errors="errors" />
            </FormControlValidate>
          </fieldset>
          <fieldset class="flex flex-wrap mt-4">
            <legend class="text-sm uppercase text-link">
              Contact information
            </legend>

            <hr class="mt-2 mb-4">

            <FormControlValidate
              v-slot="{ errors, required, failed }"
              rules="required"
              name="Full name"
              class="mb-4"
            >
              <FormLabel
                for="fullname"
                :required="required"
              >
                Full name
              </FormLabel>
              <FormInput
                id="fullname"
                v-model="_office.fullName"
                name="fullname"
                :required="required"
                :failed="failed"
                autocomplete="name"
              />
              <FormErrorMessage :errors="errors" />
            </FormControlValidate>

            <FormControlValidate
              v-slot="{ errors, required, failed }"
              rules="required"
              name="Job position"
              class="mb-4"
            >
              <FormLabel
                for="jobposition"
                :required="required"
              >
                Job Position
              </FormLabel>
              <FormInput
                id="jobposition"
                v-model="_office.jobPosition"
                name="jobposition"
                :required="required"
                :failed="failed"
                autocomplete="organization-title"
              />
              <FormErrorMessage :errors="errors" />
            </FormControlValidate>

            <FormControlValidate
              v-slot="{ errors, required, failed }"
              rules="required|email"
              name="Email"
              class="mb-4"
            >
              <FormLabel
                for="email"
                :required="required"
              >
                Email address
              </FormLabel>
              <FormInput
                id="email"
                v-model="_office.email"
                name="email"
                type="email"
                :required="required"
                :failed="failed"
                autocomplete="email"
                placeholder="name@example.com"
              />
              <FormErrorMessage :errors="errors" />
            </FormControlValidate>

            <FormControlValidate
              v-slot="{ errors, required, failed }"
              rules="required"
              name="Phone"
              class="mb-4"
            >
              <FormLabel
                for="phone"
                :required="required"
              >
                Phone
              </FormLabel>
              <FormInput
                id="phone"
                v-model="_office.phone"
                name="phone"
                type="tel"
                :required="required"
                :failed="failed"
                autocomplete="tel"
                placeholder="(xxx) xxx-xxxx"
              />
              <FormErrorMessage :errors="errors" />
            </FormControlValidate>
          </fieldset>
          <button
            type="submit"
            class="px-4 py-2 my-2 font-medium rounded"
            :class="{ 'cursor-not-allowed': invalidForm, [_office.color]: true }"
            :style="`color: ${fontColor}`"
          >
            {{ office.id ? 'Update' : 'Save' }}
          </button>
        </div>
      </FocusLoop>
    </template>
  </FormObserveValidate>
</template>

<script>
import { onMounted, ref, watch } from '@nuxtjs/composition-api'

import { useOffices, useDisclosure, useColorContrast } from '@/composables'
import { programmaticFocus } from '@/utils'

import { FocusLoop } from '@vue-a11y/focus-loop'
import FormInput from '@/components/FormInput'
import FormLabel from '@/components/FormLabel'
import FormErrorMessage from '@/components/FormErrorMessage'
import FormObserveValidate from '@/components/FormObserveValidate'
import FormControlValidate from '@/components/FormControlValidate'

export default {
  name: 'OfficeForm',

  components: {
    FormInput,
    FormLabel,
    FocusLoop,
    FormErrorMessage,
    FormObserveValidate,
    FormControlValidate
  },

  props: {
    office: {
      type: Object,
      required: true
    }
  },

  setup ({ office }, { emit, refs }) {
    const { officeColors } = useOffices()
    const fontColor = ref('#000')
    const { isOpen: isColorsOpen, onClose: closeColors, toggle: toggleColors } = useDisclosure()
    const _office = ref({
      title: null,
      address: null,
      fullName: null,
      jobPosition: null,
      email: null,
      phone: null,
      color: officeColors[0],
      ...office
    })

    watch(() => _office.value.color, val => {
      const radioColor = refs.officeForm.$el.querySelector(`input[value="${val}"]`)
      if (radioColor) {
        const { color } = useColorContrast(radioColor.parentElement)
        fontColor.value = color.value
      }
    })

    onMounted(() => {
      const { color } = useColorContrast(refs.colorsButton)
      fontColor.value = color.value
    })

    function submit (isValid) {
      if (isValid) return emit('on-save', _office.value)
      setTimeout(() => {
        const firstError = refs.officeForm.$el.querySelector('[aria-invalid="true"]')
        if (firstError) programmaticFocus(firstError.parentElement)
      }, 100)
    }

    return {
      submit,
      _office,
      fontColor,
      officeColors,
      isColorsOpen,
      closeColors,
      toggleColors
    }
  }
}
</script>

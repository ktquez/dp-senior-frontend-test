import { shallowMount } from '@vue/test-utils'

import { useOffices } from '@/composables'

import OfficeForm from './OfficeForm'
import FormInput from '@/components/FormInput'
import FormLabel from '@/components/FormLabel'
import FormErrorMessage from '@/components/FormErrorMessage'
import FormObserveValidate from '@/components/FormObserveValidate'
import FormControlValidate from '@/components/FormControlValidate'
import { email, required } from 'vee-validate/dist/rules.umd.js'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

let wrapper = null
const office = {}
const submit = jest.fn()
const { officeColors } = useOffices()

extend('email', email)
extend('required', required)

beforeEach(() => {
  wrapper = shallowMount(OfficeForm, {
    propsData: {
      office
    },
    listeners: {
      submit
    },
    stubs: {
      Icon: true,
      FormObserveValidate,
      FormControlValidate,
      FormInput,
      FormLabel,
      FormErrorMessage,
      ValidationProvider,
      ValidationObserver,
      TransitionSlideDown: true
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('OfficeForm', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Render form title', () => {
    const title = wrapper.find('#office-form-title')
    expect(title.text()).toBe(`Form ${office.id ? 'Edit' : 'New'} location`)
  })

  test('Render colors list', () => {
    const list = wrapper.find('[data-test="colors"]')
    const colors = list.findAll('li')
    expect(colors.length).toBe(officeColors.length)
  })

  test('Submit form', () => {
    const form = wrapper.get('form[name="office-form"]')
    const button = wrapper.get('button[type="submit"]')
    button.trigger('submit')
    expect(form.emitted()).toHaveProperty('on-save')
  })

  test('Fill input field', async () => {
    const title = 'My New location'
    const inputTitle = wrapper.get('input[name="title"]')
    await inputTitle.setValue(title)
    expect(inputTitle.element.value).toBe(title)
  })
})

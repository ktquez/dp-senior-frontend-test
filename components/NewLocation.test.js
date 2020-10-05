import { shallowMount } from '@vue/test-utils'

import NewLocation from './NewLocation'
import TransitionSlideDown from './TransitionSlideDown'
import FormObserveValidate from './FormObserveValidate'
import { ValidationObserver } from 'vee-validate'

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(NewLocation, {
    stubs: {
      Icon: true,
      transition: true,
      ValidationObserver,
      TransitionSlideDown,
      FormObserveValidate
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('NewLocation', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Open office form', async () => {
    const button = wrapper.get('#add-office button')
    await button.trigger('click')

    await new Promise(resolve => setTimeout(resolve, 600))

    const form = wrapper.get('#add-office-form form[name="office-form"]')

    expect(form.isVisible()).toBe(true)
  })

  test('Close office form', async () => {
    const button = wrapper.get('#add-office button')
    await button.trigger('click')

    await new Promise(resolve => setTimeout(resolve, 600))

    const close = wrapper.get('#add-office-form button[data-test="close-button"]')
    await close.trigger('click')

    await new Promise(resolve => setTimeout(resolve, 600))

    const form = wrapper.find('#add-office-form form[name="office-form"]')

    expect(form.exists()).toBe(false)
  })
})

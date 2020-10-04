import { shallowMount } from '@vue/test-utils'

import Modal from './Modal'

let wrapper = null
const titleModal = 'Teste modal title'
const onClose = jest.fn()

beforeEach(() => {
  wrapper = shallowMount(Modal, {
    slots: {
      header: `'<h2>${titleModal}</h2>'`,
      footer: '<button>Cancel</button>'
    },
    listeners: {
      'on-close': onClose
    },
    stubs: {
      'focus-loop': true
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Modal', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Renders heading level two in slot body', () => {
    const heading = wrapper.find('h2')
    expect(heading.text()).toBe(titleModal)
  })

  test('Renders button slot footer', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  test('Close modal when backdrop click', () => {
    const backdrop = wrapper.find('[data-test="backdrop"]')
    backdrop.trigger('click')
    expect(onClose).toHaveBeenCalled()
  })
})

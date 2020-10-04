import { shallowMount } from '@vue/test-utils'

import Icon from './Icon'

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(Icon, {
    propsData: {
      name: 'arrow-down'
    },
    stubs: {
      'svg-icon': true
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Icon', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Should not be focusable', () => {
    expect(wrapper.attributes('focusable')).toBe('false')
  })

  test('Hidden for screen readers', () => {
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })
})

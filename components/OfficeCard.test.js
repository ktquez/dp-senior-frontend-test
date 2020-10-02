import { shallowMount } from '@vue/test-utils'

import OfficeCard from './OfficeCard'

describe('OfficeCard', () => {
  const wrapper = shallowMount(OfficeCard)

  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Should have a visible heading level two', () => {
    expect(wrapper.find('h2').isVisible()).toBeTruthy()
  })
})

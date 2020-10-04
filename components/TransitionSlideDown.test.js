import { shallowMount } from '@vue/test-utils'

import TransitionSlideDown from './TransitionSlideDown'

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(TransitionSlideDown, {
    stubs: {
      transition: true
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('TransitionSlideDown', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})

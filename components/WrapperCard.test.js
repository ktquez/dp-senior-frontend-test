import { shallowMount } from '@vue/test-utils'

import WrapperCard from './WrapperCard'

let wrapper = null
const tag = 'article'
const textCard = 'Office Card'
const template = `<h2>${textCard}</h2>`

beforeEach(() => {
  wrapper = shallowMount(WrapperCard, {
    propsData: {
      tag
    },
    slots: {
      default: template
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('WrapperCard', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test(`Should have a visible ${tag} tag`, () => {
    expect(wrapper.find(tag).isVisible()).toBeTruthy()
  })

  test('Should render the slot text', () => {
    expect(wrapper.text()).toBe(textCard)
  })
})

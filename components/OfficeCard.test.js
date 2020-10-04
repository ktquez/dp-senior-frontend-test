import { shallowMount } from '@vue/test-utils'
import makeOffices from '@/data/offices'

import OfficeCard from './OfficeCard'

const offices = makeOffices()
let wrapper = null
let office = null

beforeEach(() => {
  office = offices[0]
  wrapper = shallowMount(OfficeCard, {
    propsData: {
      office
    },
    stubs: {
      Icon: true,
      TransitionSlideDown: true
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('OfficeCard', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Render the office title', () => {
    const heading = wrapper.find('[data-test="officeTitle"]')
    expect(heading.text()).toBe(office.title)
  })

  test('Office info must not be visible', () => {
    const info = wrapper.find('[data-test="officeInfo"]')
    expect(info.isVisible()).toBe(false)
  })
})

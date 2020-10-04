import { shallowMount } from '@vue/test-utils'

import Notification from './Notification'
import { useNotification } from '@/composables'

let wrapper = null
const { notification, setNotification, setErrorNotification } = useNotification()

beforeEach(() => {
  wrapper = shallowMount(Notification, {
    propsData: {
      ...notification
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

describe('Notification', () => {
  test('Is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('Wrapper notification is not visible', () => {
    const box = wrapper.find('[data-test="notification"')
    expect(box.isVisible()).toBe(false)
  })

  test('Show notification', async () => {
    setNotification({ message: 'bla bla' })
    await wrapper.setProps(notification.value)
    const box = wrapper.find('[data-test="notification"')
    expect(box.isVisible()).toBe(true)
  })

  test('Renders notification message', async () => {
    const message = 'Test notification message'
    const box = wrapper.find('[data-test="notification"')

    setNotification({ message })
    await wrapper.setProps(notification.value)

    expect(box.text()).toBe(message)
  })

  test('Notification error', async () => {
    const message = 'Test notification error message'
    const icon = wrapper.find('[data-test="notification-icon"')

    setErrorNotification(message)
    await wrapper.setProps(notification.value)

    expect(wrapper.props().type).toBe('error')
    expect(icon.classes()).toContain('text-error')
  })
})

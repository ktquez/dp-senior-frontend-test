import fontColorContrast from 'font-color-contrast'
import { ref } from '@nuxtjs/composition-api'

export default function useColorContrast (el) {
  const color = ref('inherit')

  const elementStyle = window.getComputedStyle(el)
  if (elementStyle) {
    const arrRGB = elementStyle.getPropertyValue('background-color').replace(/(rgb\(|\)|\s)/g, '').split(',')
    color.value = fontColorContrast(arrRGB)
  }

  return {
    color
  }
}

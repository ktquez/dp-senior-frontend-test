import fontColorContrast from 'font-color-contrast'
import { ref } from '@nuxtjs/composition-api'

// TODO: Implement watch change colors, or recalc when update

export default function useColorContrast (el) {
  const color = ref('inherit')

  function getColorContrast () {
    const elementStyle = window.getComputedStyle(el)
    if (elementStyle) {
      const arrRGB = elementStyle.getPropertyValue('background-color').replace(/(rgb\(|\)|\s)/g, '').split(',')
      color.value = fontColorContrast(arrRGB)
    }
  }

  getColorContrast()

  return {
    color
  }
}

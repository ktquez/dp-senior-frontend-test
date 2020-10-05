const plugin = require('tailwindcss/plugin')
const { colors } = require('./data/offices')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.vue'],
    options: {
      whitelist: [
        ...colors
      ]
    }
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  theme: {
    extend: {
      colors: {
        main: '#E8EDF3',
        color: '#313E4F',
        link: '#226F7C',
        error: '#EB0027',
        primary: {
          gray: '#989EA7',
          'dark-blue': '#313E4F'
        },
        accent: {
          blue: '#33A6BA',
          red: '#FF7B92',
          yellow: '#FFC062'
        }
      },
      maxHeight: {
        0: '0',
        300: '300px'
      },
      boxShadow: {
        focus: '0 0 0 2px #222'
      }
    },
    fontFamily: {
      body: ['Lato', 'Segoe UI', 'Roboto']
    }
  },
  variants: {
    boxShadow: ['hover', 'focus', 'focus-within']
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        body: {
          fontFamily: config('theme.fontFamily.body').join(', '),
          backgroundColor: config('theme.colors.main'),
          color: config('theme.colors.color')
        },
        address: {
          fontStyle: 'normal'
        }
      })
    })
  ]
}

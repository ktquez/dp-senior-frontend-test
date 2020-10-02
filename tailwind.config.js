module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.vue']
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  theme: {
    extend: {
      colors: {}
    }
  },
  variants: {},
  plugins: []
}


export default {
  /*
   * Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   * Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/global',
    // Doc: https://github.com/logaretm/vee-validate
    '@/plugins/vee-validate'
  ],

  /*
   * Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api'
  ],

  /*
   * Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite'
  ],

  /*
   * Build configuration
   */
  build: {
    analyze: true,
    transpile: [
      // Doc: https://logaretm.github.io/vee-validate/guide/rules.html#importing-rules-in-nuxt-js
      'vee-validate/dist/rules'
    ],
    extend (config, ctx) {
    }
  }
}

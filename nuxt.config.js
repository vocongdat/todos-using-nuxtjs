export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'learn-nuxt-js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      },
    ],
  },
  loading: '~/components/LoadingBar.vue',
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/base.scss',
    '~/assets/styles/main.scss',
    '~/assets/fonts/flag-icon-css-master/css/flag-icon.min.css',
    '~/assets/styles/tailwind.css',
  ],

  layoutTransition: 'layout',

  pageTransition: {
    name: 'slide-fade',
    beforeEnter(el) {
      console.log('Before enter...', el)
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/vue-tooltip.js',
    '~/plugins/hello.js',
    '~/plugins/i18n.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-animejs',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    // Simple usage
    '~/modules/example',
    // Passing options directly
    ['~/modules/example', { token: '123' }],
    [
      '@nuxtjs/i18n',
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true,
          redirectOn: 'root', // recommended
        },
      },
    ],
  ],

  i18n: {
    locales: [
      {
        code: 'gb',
        name: 'English',
        iso: 'en-US',
        file: 'en-US.js',
      },
      {
        code: 'vn',
        name: 'VietNam',
        iso: 'vi-VN',
        file: 'vi-VN.js',
      },
      {
        code: 'jp',
        name: 'Japan',
        iso: 'ja-JP',
        file: 'ja-JP.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'gb',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_POSTS_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  generate: {
    fallback: '404.html',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  serverMiddleware: ['~/middleware/server-logger'],

  publicRuntimeConfig: {
    baseURL: process.env.API_POSTS_URL || 'https://nuxtjs.org',
  },

  privateRuntimeConfig: {
    apiPosts: process.env.API_POSTS_URL || 'https://nuxtjs.org',
  },
  cli: {
    badgeMessages: ['Hello NuxtJS!'],
    bannerColor: 'yellow',
  },
}

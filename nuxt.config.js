export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Tasks — a calm task board',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Tasks — a minimal, premium kanban board built with Nuxt.js. Drag tasks across your workflow, in light or dark mode.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#6366f1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://api.fontshare.com' },
      {
        rel: 'preconnect',
        href: 'https://cdn.fontshare.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=clash-display@500,600,700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      },
    ],
    script: [
      {
        // Apply the saved/system theme before first paint to avoid a flash.
        innerHTML:
          "(function(){try{var t=localStorage.getItem('theme');if(!t){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();",
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },
  loading: { color: '#6366f1', height: '2px' },
  loadingIndicator: {
    name: 'circle',
    color: '#6366f1',
    background: '#f6f7f9',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/theme.scss',
    '~/assets/fonts/flag-icon-css-master/css/flag-icon.min.css',
  ],

  layoutTransition: 'layout',

  pageTransition: {
    name: 'slide-fade',
    mode: 'out-in',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/vue-tooltip.js',
    '~/plugins/hello.js',
    '~/plugins/i18n.js',
    '~/plugins/persist.client.js',
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

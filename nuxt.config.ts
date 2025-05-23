// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Wordhub',
      link: [
        { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' }
      ]
    }
  },
  css: [
    '@/assets/scss/App.scss',
    '@/assets/scss/Fonts.scss'
  ],
  modules: [
    '@nuxtjs/i18n', 
    '@pinia/nuxt',
  ],
  i18n: {
    vueI18n: '@/i18n.config.ts'
  },
  plugins: [
    { src: '@/plugins/Global.ts'}
  ],
  runtimeConfig: {
    API_SECRET: '',
    public: {
      BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
      PRONOUNCE_BASE_URL: process.env.PRONOUNCE_BASE_URL,
    }
  },
  routeRules: {
    '/': { ssr: false },
    '/emailconfirmation': { ssr: false },
    '/forgotPassword': { ssr: false },
    '/guest': { ssr: false },
    '/history' : { ssr: false },
    '/info': { ssr: false },
    '/login': { ssr: false },
    '/protected': { ssr: false },
    '/resetPassword': { ssr: false },
    '/search': { ssr: false },
    '/signup': { ssr: false },
    '/termsprivacy': { ssr: false },
    '/openedit/word/**' : { ssr: false },
    '/openedit/quiz/**' : { ssr: false },
    '/answer' : { ssr: false },
    '/word/**' : { ssr: false },
  }
})

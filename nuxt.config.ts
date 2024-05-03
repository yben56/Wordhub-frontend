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
    '@/assets/scss/app.scss',
    '@/assets/scss/fonts.scss'
  ],
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n', 
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
    },
  },
  routeRules: {
    '/EmailConfirmation': { ssr: false }
  }
})

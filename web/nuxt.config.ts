// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/content',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  content: {
    markdown: {
      mdc: true
    }
  }
})

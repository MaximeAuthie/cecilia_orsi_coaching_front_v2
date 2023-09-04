// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/style/main.css"],
    modules: [
        "@pinia/nuxt",
        '@nuxt/image',
    ],
    build: {
        transpile: ['pinia'],
    },
    runtimeConfig: {
        public: {
            serverUrl: 'https://www.maximeauthie.fr/',
            metaLinkIconUrl : 'https://www.hebergeur-image.com/upload/90.76.204.82-64f5f7498ee28.png'
        }
    }
})

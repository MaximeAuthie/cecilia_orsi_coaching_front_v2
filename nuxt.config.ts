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
            serverUrl: 'https://www.cecilia-orsi.fr/',
            metaLinkIconUrl : 'https://www.hebergeur-image.com/upload/90.76.204.82-64f5f7498ee28.png',
            phoneNumber: '+33756815087',
            ownerBirthday: '1992-02-25 00:00:00'
        }
    }
})

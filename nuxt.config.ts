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
            serverUrl: 'https://127.0.0.1:8000/'
        }
    }
})

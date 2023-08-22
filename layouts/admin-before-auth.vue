<template>
    <ManagerHeaderComponent></ManagerHeaderComponent>
    <slot/>
</template>

<script>
    export default {
        mounted() {
            //? Renseigner les balises HTML de <head> pour bloquer le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - Connexion',
                meta: [
                    {name:'robots', content:'noindex, nofollow'},
                ],
                link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
            })
        }
    }
</script>

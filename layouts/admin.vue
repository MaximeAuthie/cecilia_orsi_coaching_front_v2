<template>
    <ManagerHeaderComponent></ManagerHeaderComponent>
    <ManagerNavigationComponent :route="route"></ManagerNavigationComponent>
    <slot/>
</template>
<script>

    export default {
        data() {
            return {
                route: ''
            }
        },
        methods: {
           
        },
        updated() {
            this.route = this.$route.path;
        },
        mounted() {
            this.route = this.$route.path;

            //? Renseigner les balises HTML de <head> pour bloquer le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - Espace administrateur',
                meta: [
                    {name:'robots', content:'noindex, nofollow'},
                ],
                link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
            })
        },
    }
</script>

<style scoped>

</style>
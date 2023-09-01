//! Layout appliqué sur les pages de l'espace administrateur, une fois l'utilisateur connecté

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
            
            //? Récupérer la route au moment du choix de l'utilisateur pour la passer en props du composant ManagerNavigationComponent
            this.route = this.$route.path;
        },
        mounted() {

            //? Récupérer la route au moment du montage du layout pour la passer en props du composant ManagerNavigationComponent
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

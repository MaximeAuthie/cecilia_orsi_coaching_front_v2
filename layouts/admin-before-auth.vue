//! Layout appliqué sur la page de connexion

<template>
    <ManagerHeaderComponent></ManagerHeaderComponent>
    <slot/>
</template>

<script>
    export default {
        mounted() {

            //? Récupérer l'url de l'icone d'onglet
            const config    = useRuntimeConfig();
            const iconUrl = config.public.metaLinkIconUrl;

            //? Renseigner les balises HTML de <head> pour bloquer le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - Connexion',
                meta: [
                    {name:'robots', content:'noindex, nofollow'},
                ],
                link: [{rel: 'icon', href: iconUrl}]
            })
        }
    }
</script>

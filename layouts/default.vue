//! Layout appliqué sur toutes les pages du site vitrine
<template>
    <headerComponent :route="route"></headerComponent>
    <slot />
    <footerComponent></footerComponent>
</template>
<script>
    
    export default {
        data() {
            return {
                route: '',
            }
        },
        methods: {

            //! Méthode pour ajouter une visite au compteur de la BDD
            async addVisit() {
        
                //? Appeler la méthode getPublicIp() du composable useIp pour récupérer l'adresse IP publique du visiteur po
                const { getPublicIp }   = useIp();
                const publicIp          = await getPublicIp();
                
                //? Déclarer la variable body
                const body = {
                    ip : publicIp
                }

                //? Appel de la méthode addVisit() du composable useStat
                const { addVisit }    = useStat();
                addVisit(body);
            }
        },
        updated() {

            //? Récupérer la route choisie par l'utilisateur pour la passer en props de headerComponent
            this.route = this.$route.path;
        },
        mounted() {

            //? Récupérer la route au montage du layout pour la passer en props de headerComponent
            this.route = this.$route.path;

            //? Ajouter une visite au compteur
            this.addVisit();
        }
    }
</script>
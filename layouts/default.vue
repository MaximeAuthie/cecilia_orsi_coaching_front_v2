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
            async addVisit() {
        
                //? Importer le composable permettant de vérifier le jwt
                const { getPublicIp } = useIp();

                //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
                const publicIp = await getPublicIp();

                //? Déclarer la variable body
                const body = {
                    ip : publicIp
                }

                //? Passer body au format json
                const bodyJson = JSON.stringify(body)
                

                //? Exécuter l'appel API si tous les champs sont remplis
                await fetch('https://127.0.0.1:8000/api/visit/add', {
                    method:'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: bodyJson,
                })
                .catch(error => {
                    console.error(error);
                    this.errorMessages.form = "Une erreur est survenue. Veuillez réessayer plus tard.";
                });
            }
        },
        updated() {
            this.route = this.$route.path;
        },
        mounted() {
            this.route = this.$route.path;
            this.addVisit();
        }
    }
</script>
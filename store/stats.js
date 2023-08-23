import { defineStore } from 'pinia';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats:      {}
  }),
  actions: {
    async getVisitsStats() {
            
        try {

            //? Importer le composable permettant de vérifier le jwt
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();
            
            //? Appeler l'api getVisitsStats()
            await $fetch('https://127.0.0.1:8000/api/visit/stats', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                }
            }).then(response => {
                //? Affecter le json de la réponse à this.stats
                const stats = response;
                this.stats  = stats;
            })

        //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
        } catch (error) {
            console.error(error); 
        }
        
        
    },
  },
});
import { defineStore } from 'pinia';

export const useVisitsStore = defineStore('visit', {
    state: () => ({
        stats:      {}
    }),
    actions: {

        //! Appeler la fonction getVisitsStats() du composable useStat et stocker le retour dans this.stats
        async getVisitsStats() {
                
            try {

                //? Appel de la méthode getVisitsStats() du composable useStat
                const { getVisitsStats }    = useVisit();
                const statsList             = await getVisitsStats();
                
                //? Stocker les données retournée dans le state this.stats
                this.stats  = statsList;

            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error); 
            }
            
            
        },
    },
});
import { defineStore } from 'pinia';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats:      {}
  }),
  actions: {
    async getVisitsStats() {
            
        try {

            //? Appel de la méthode getVisitsStats() du composable useStat
            const { getVisitsStats } = useStat();
            const statsList = await getVisitsStats();
            
            //? Stocker les données retournée dans le state this.stats
            this.stats  = statsList;

        //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
        } catch (error) {
            console.error(error); 
        }
        
        
    },
  },
});
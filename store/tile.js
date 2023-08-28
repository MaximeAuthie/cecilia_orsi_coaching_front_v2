import { defineStore } from 'pinia';

export const useTilesStore = defineStore('tiles', {
  state: () => ({
    tiles: [],
  }),
  actions: {
    async getAllTiles() {

        try {
            //? Appel de la méthode getVisitsStats() du composable useCategory
            const { getAllTiles } = useTile();
            const tilesList = await getAllTiles();

            //? Stocker les données retournée dans le state this.tiles
            this.tiles = tilesList;
            
        } catch (error) {
            console.error(error.message);
        }
        
    }
  },
});
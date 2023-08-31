import { defineStore } from 'pinia';

export const useTilesStore = defineStore('tiles', {
    state: () => ({
        tiles: [],
    }),
    actions: {
        
        //! Appeler la fonction getAllTiles() du composable useTile et stocker le retour dans this.tiles
        async getAllTiles() {

            try {

                //? Appel de la méthode getAllTiles() du composable useTile
                const { getAllTiles }   = useTile();
                const tilesList         = await getAllTiles();

                //? Stocker les données retournée dans le state this.tiles
                this.tiles = tilesList;
                
            } catch (error) {
                console.error(error.message);
            }
            
        }
    },
});
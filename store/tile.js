import { defineStore } from 'pinia';

export const useTilesStore = defineStore('tiles', {
  state: () => ({
    tiles: [],
  }),
  actions: {
    async getAllTiles() {
      console.log("GetAllTiles lancé");
        try {
            let response = await $fetch('https://127.0.0.1:8000/api/tile/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(response => {
              const tilsList = response;
              this.tiles = tilsList;
            })
            
        } catch (error) {
            console.error(error.message);
        }
        
    }
  },
});
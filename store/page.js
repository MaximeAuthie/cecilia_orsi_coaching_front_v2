import { defineStore } from 'pinia';

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [],
  }),
  actions: {
    async getAllPages() {
        try {
            //? Appel de la méthode getAllPages() du composable usePage
            const { getAllPages } = usePage();
            const pagesList = await getAllPages();

            //? Stocker les données retournée dans le state this.pages
            this.pages = pagesList;
            
        } catch (error) {
            console.error(error);
        }
        
    }
  },
});
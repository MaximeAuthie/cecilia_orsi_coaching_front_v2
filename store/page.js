import { defineStore } from 'pinia';

export const usePagesStore = defineStore('pages', {
    state: () => ({
        pages: [],
    }),
    actions: {
        
        //! Appeler la fonction getAllPages() du composable usePage et stocker le retour dans this.pages
        async getAllPages() {

            try {

                //? Appel de la méthode getAllPages() du composable usePage
                const { getAllPages } = usePage();
                const pagesList = await getAllPages();

                //? Stocker les données retournées dans le state this.pages
                this.pages = pagesList;
            
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error);
            }
            
        }
    },
});
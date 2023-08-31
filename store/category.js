import { defineStore } from 'pinia';

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: [],
    }),
    actions: {

        //! Appeler la fonction getAllCategories() du composable useCategory et stocker le retour dans this.categories
        async getAllCategories() {
        
            try {

                //? Appel de la méthode getAllCategories() du composable useCategory
                const { getAllCategories } = useCategory();
                const categoriesList = await getAllCategories();

                //? Stocker les données retournées dans le state this.categories
                this.categories = categoriesList;
            
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error.message);
            }
            
        }
    },
});
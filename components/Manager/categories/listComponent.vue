<template>
    <div class="categories_list_card">
        <div class="categories_list_card_header">
            Liste des catégories
        </div>
        <div v-if="categories.length != 0" class="categories_list_card_content">
            <ManagerCategoriesItemComponent v-for="category in categories" @update="updateCategory" :id="category.id" :name="category.name_category" :color="category.color_category"></ManagerCategoriesItemComponent>
        </div>
        <div v-else class="categories_list_card_no_categories">Aucune catégorie à afficher</div>
    </div>
</template>

<script>
import { useCategoriesStore } from '@/store/category'

export default {
    emits:['update'],
    data() {
        return {
            categories: []
        }
    },
    methods: {

        //! Récupérer les catégories à afficher dans l'interface administrateur via le store useCategoriesStore;
        getCategories() {
            const categoryStore = useCategoriesStore();

            //? Vérifier si les catégories sont toujours présentes dans le store
            if (categoryStore.categories.length > 0) {
                this.categories         = categoryStore.categories;
            } else {

            //? Si les catégories ne sont pas déjà présents dans le store, effectuer l'appel API
            categoryStore.getAllCategories()
                .then(() => {
                    this.categories       = categoryStore.categories;
                })

                //? En cas d'erreur inattendue, capter l'erreur rencontrée
                .catch((error) => {
                    console.error('Erreur lors de la récupération des catégories :', error);
                });
            }
        },

        //! Emettre un évènement quand le composant capte l'évènement "update" depuis le composant enfant ManagerCategoriesItemComponent
        updateCategory(id, name, color) {
            this.$emit('update', id, name, color);
            console.log("niv 2 activé" + this.name + this.color);
        }
    },
    
    mounted() {
        //? Exécuter this.getCategories()
        this.getCategories();

        //? Souscrire a useCategoriesStore et récupérer la liste des nouvelles catégories dans this.catergories
        const categoryStore = useCategoriesStore();
        categoryStore.$subscribe(state => {
            this.categories = categoryStore.categories;
        })
    }
}
</script>
<style scoped>
    .categories_list_card {
        display: flex;
        flex-direction: column;
        width: 90%;
        border: 1px solid #E04F5F;
        border-radius: 1vh;
        background-color: #FFFFFF;
        margin: 5vh 0;
        overflow: hidden
    }

    .categories_list_card:hover {
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
    .categories_list_card_header {
        position: relative;
        width: 100%;
        border: 1px solid #E04F5F;
        font-size: 1.8em;
        color: #FFFFFF;
        background-color: #E04F5F;
        text-align: center;
        padding: 1vh 0;
    }
    .categories_list_card_content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 3em;
        min-height: 45vh;
    }

    .categories_list_card_no_categories {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 45vh;
        font-size: 1.5em;
    }
</style>
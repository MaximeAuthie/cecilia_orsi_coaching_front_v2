<template>
    <div class="articles_list_card">
      <div class="articles_list_card_header">Liste des articles</div>
      <div v-if="articles.length != 0" class="articles_list_card_content">
        <ManagerArticlesItemComponent
          v-for="article in articles"
          @update="updateArticle"
          :id="article.id"
          :title="article.title_article"
          :date="article.date_article"
          :isPublished="article.isPublished_article"
        ></ManagerArticlesItemComponent>
      </div>
      <div v-else class="articles_list_card_no_article">Aucun article à afficher</div>
    </div>
</template>
  
<script>
    import { useArticlesStore } from "@/store/article";
    
    export default {
        emits: ["update"],
        data() {
            return {
                articles: [],
            };
        },
        methods: {

            //! Récupérer les articles à afficher dans l'interface administrateur via le store useArticlesStore;
            getArticles() {
                const articleStore = useArticlesStore();
        
                //? Vérifier si les catégories sont toujours présentes dans le store
                if (articleStore.articles.length > 0) {
                    this.articles = articleStore.articles;
                } else {
                //? Si les catégories ne sont pas déjà présents dans le store, effectuer l'appel API
                    articleStore.getAllArticles()
                        .then(() => {
                            this.articles = articleStore.articles;
                        })
            
                        //? En cas d'erreur inattendue, capter l'erreur rencontrée
                        .catch((error) => {
                            console.error("Erreur lors de la récupération des catégories :", error);
                        });
                }
            },

            //! Emettre un évènement pour signaler que l'utilisateur a cliqué sur le bouton "modifier"
            updateArticle(id, name, color) {
                this.$emit("update", id, name, color);
                console.log("niv 2 activé" + this.name + this.color);
            },
        },
    
        mounted() {
            //? Exécuter this.getArticles()
            this.getArticles();
            
            //? Souscrire a useArticlesStore et récupérer la liste des nouveaux articles dans this.articles
            const articleStore = useArticlesStore();
            articleStore.$subscribe((state) => {
                this.articles = articleStore.articles;
            });
        },
    };
</script>
  
<style scoped>
    .articles_list_card {
        display: flex;
        flex-direction: column;
        width: 90%;
        border: 1px solid #e04f5f;
        border-radius: 1vh;
        background-color: #ffffff;
        margin: 5vh 0;
        overflow: hidden;
    }

    .articles_list_card:hover {
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
  
    .articles_list_card_header {
        position: relative;
        width: 100%;
        border: 1px solid #e04f5f;
        font-size: 1.8em;
        color: #ffffff;
        background-color: #e04f5f;
        text-align: center;
        padding: 1vh 0;
    }
    .articles_list_card_content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 3em;
        min-height: 45vh;
    }

    .articles_list_card_no_article {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 45vh;
        font-size: 1.5em;
    }
</style>
  
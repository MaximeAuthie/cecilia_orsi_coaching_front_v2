<template>
    <div class="articles_list_card">
      <div class="articles_list_card_header">Liste des articles</div>
      <div class="articles_list_card_content">
        <ManagerArticlesArticleComponent
          v-for="article in articles"
          @update="updateArticle"
          :id="article.id"
          :title="article.title_article"
          :date="article.date_article"
          :isPublished="article.isPublished_article"
        ></ManagerArticlesArticleComponent>
      </div>
      <div v-if="articles.length == 0" class="articles_list_card_no_article">Aucun article à afficher</div>
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
      getArticles() {
        const store = useArticlesStore();
  
        //? Vérifier si les catégories sont toujours présentes dans le store
        if (store.articles.length > 0) {
          this.articles = store.articles;
        } else {
          //? Si les catégories ne sont pas déjà présents dans le store, effectuer l'appel API
          store
            .getAllArticles()
            .then(() => {
              this.articles = store.articles;
            })
  
            //? En cas d'erreur inattendue, capter l'erreur rencontrée
            .catch((error) => {
              console.error("Erreur lors de la récupération des catégories :", error);
            });
        }
      },
      updateArticle(id, name, color) {
        this.$emit("update", id, name, color);
        console.log("niv 2 activé" + this.name + this.color);
      },
    },
  
    mounted() {
      this.getArticles();
  
      const store = useArticlesStore();
      store.$subscribe((state) => {
        this.articles = store.articles;
        console.log("update store articles");
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
  
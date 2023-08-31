import { defineStore } from 'pinia';

export const useArticlesStore = defineStore('articles', {
    state: () => ({
        articles: [],
        validatedArticles:[],
        validatedArticlesToShow: [],
        frontPageArticle: []
    }),
    actions: {
        
        //! Modifier les articles stockés dans this.article
        updateArticle(newArticles) {
            this.articles = newArticles;
        },

        //! Appeler la fonction getAllArticles() du composable useArticle et stocker le retour dans this.articles
        async getAllArticles() {
            
            try {

                //? Appel de la méthode getAllArticles() du composable useArticle
                const { getAllArticles }    = useArticle();
                const articlesList          = await getAllArticles();

                //? Stocker les données retournées dans le state this.articles
                this.articles               = articlesList;
                
                //? Changer le format de date des propriétés date_article de this.articles
                this.formatArticlesDates('articles');

            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error); 
            }
            
        },

        //! Appeler la fonction getValidatedArticles() du composable useArticle et stocker le retour dans this.validatedArticles
        async getValidatedArticles() {
            
            try {

                //? Appel de la méthode getValidatedArticles() du composable useArticle
                const { getValidatedArticles }      = useArticle();
                const articlesList                  = await getValidatedArticles();

                //? Stocker les données retournées dans le state this.validatedArticles
                this.validatedArticles              = articlesList;

                //? Changer le format de date des propriétés date_article de this.articles
                this.formatArticlesDates('validated-articles');
                
                //? Créer un clone de this.validatedArticles pour obtenir à la liste des articles à afficher dans le blog
                this.validatedArticlesToShow        = Object.values(this.validatedArticles);

                //? Affecter les données du dernier articles à this.frontPageArticle
                this.frontPageArticle               = this.validatedArticlesToShow[this.validatedArticlesToShow.length-1];

                //? Supprimer le frontPageArticle de this.validatedArticlesToShow (pour qu'il n'apparaisse pas deux fois dans le blog)
                this.validatedArticlesToShow.splice(this.validatedArticlesToShow.length-1,1);

            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error.message);
            }
            
        },

        //! Modifier les dates du state via la fonction formatDate() du composable useUtils
        formatArticlesDates(array) {
            const { formatDate }    = useUtils();
            let arrayToFormat       = array;
            
            if (arrayToFormat == 'articles') {
                
                //? On vérifie que le this.articles n'est pas vide
                if (this.articles != '') {

                    //? Parcourir this.articles pour modifier le format de date_article grâce à la méthode formatDate() du composable useUtils
                    this.articles.forEach(article => {
                        article.date_article = formatDate(article.date_article);
                    })
                }
            } else if (arrayToFormat == 'validated-articles') {

                //? On vérifie que le this.articles n'est pas vide
                if (this.validatedArticles != '') {
                    
                    //? Parcourir this.articles pour modifier le format de date_article grâce à la méthode formatDate() du composable useUtils
                    this.validatedArticles.forEach(article => {
                        article.date_article = formatDate(article.date_article);
                    })
                }
            }
            
        }
    },
});
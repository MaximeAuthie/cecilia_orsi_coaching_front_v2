import { defineStore } from 'pinia';
import Utils from '@/services/Utils';

export const useArticlesStore = defineStore('articles', {
    state: () => ({
        articles: [],
        validatedArticles:[],
        validatedArticlesToShow: [],
        frontPageArticle: []
    }),
    actions: {
        updateArticle(newArticles) {
            this.articles = newArticles;
        },  
        async getAllArticles() {
            
            try {
                const { verifyToken } = useAuthentification();

                //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
                const jwt = await verifyToken();
                
                //? Appeler l'api getAllArticles()
                await $fetch('https://127.0.0.1:8000/api/article/all', {
                    method:'GET',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${jwt}`
                    }
                }).then(response => {
                    //? Affecter le json de la réponse à this.articles
                    const articlesList  = response;
                    this.articles       = articlesList;
                  
                    //? Changer le format de date des propriétés date_article de this.articles
                    this.formatArticlesDates('articles');

                })

            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error); 
            }
            
        },
        async getValidatedArticles() {
            
            try {
                
                //? Appeler l'api getAllArticles()
                await $fetch('https://127.0.0.1:8000/api/article/validated/all', {
                    method:'GET',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(response => {
                    //? Affecter le json de la réponse au éléments du state
                    const articlesList              = response;
                    this.validatedArticles          = articlesList;

                    //? Changer le format de date des propriétés date_article de this.articles
                    this.formatArticlesDates('validated-articles');
                    
                    //? Créer un clone de this.validatedArticles pour obtenir à la liste des articles à afficher dans le blog
                    this.validatedArticlesToShow    = Object.values(this.validatedArticles);

                    //? Affecter les données du dernier articles à this.frontPageArticle
                    this.frontPageArticle = this.validatedArticlesToShow[this.validatedArticlesToShow.length-1];

                    //? Supprimer le frontPageArticle de this.validatedArticlesToShow (pour qu'il n'apparaisse pas deux fois dans le blog)
                    this.validatedArticlesToShow.splice(this.validatedArticlesToShow.length-1,1);
                })

            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error.message);
            }
            
        },
        formatArticlesDates(array) {
            
            let arrayToFormat = array;
   
            if (arrayToFormat == 'articles') {
                
                //? On vérifie que le this.articles n'est pas vide
                if (this.articles != '') {

                    //? Parcourir this.articles pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                    this.articles.forEach(article => {
                        article.date_article = Utils.formatDate(article.date_article);
                    })
                }
            } else if (arrayToFormat == 'validated-articles') {
                //? On vérifie que le this.articles n'est pas vide
                if (this.validatedArticles != '') {
                    
                    //? Parcourir this.articles pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                    this.validatedArticles.forEach(article => {
                        article.date_article = Utils.formatDate(article.date_article);
                    })
                }
            }
            
        }
    },
});
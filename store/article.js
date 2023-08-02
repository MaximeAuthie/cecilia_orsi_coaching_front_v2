import { defineStore } from 'pinia';
import Utils from '@/services/Utils';

export const useArticlesStore = defineStore('articles', {
    state: () => ({
        articles: [],
        frontPageArticle: []
    }),
    actions: {
        updateArticle(newArticles) {
            this.articles = newArticles;
        },  
        async getAllArticles() {
            
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
                    //? Affecter le json de la réponse à this.articles
                    const articlesList = response;
                    this.articles = articlesList;
                    console.log(articlesList);
                    //? Changer le format de date des propriétés date_article de this.articles
                    this.formatArticlesDates();

                    //? Affecter les données du dernier articles à this.frontPageArticle
                    this.frontPageArticle = this.articles[this.articles.length-1];
                })

            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error.message);
            }
            
        },
        formatArticlesDates() {

            //? On vérifie que le this.articles n'est pas vide
            if (this.articles != '') {

                //? Parcourir this.articles pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                this.articles.forEach(article => {
                    article.date_article = Utils.formatDate(article.date_article);
                })
            }
        }
    },
});
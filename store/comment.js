import { defineStore } from 'pinia';
import Utils from '@/services/Utils';

export const useCommentsStore = defineStore('comments', {
    state: () => ({
        comments: [],
        commentsToValidate: []
    }),
    actions: {
        async getValidatedComments() {
            try {

                //? Appeler l'api getAllArticles()
                await $fetch('https://127.0.0.1:8000/api/comment/validated', {
                    method:'GET',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(response => {
                    //? Affecter le json de la réponse à this.articles
                    const commentsList = response;
                    this.comments = commentsList;
 
                    //? Changer le format de date des propriétés date_comment de this.comments
                    this.formatCommentsDates();
                }) 
            
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error.message);
            }
            
        },
        async getCommentsToValidate() {
            try {

                //? Appeler l'api getAllArticles()
                await $fetch('https://127.0.0.1:8000/api/comment/toValidate', {
                    method:'GET',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(response => {
                    //? Affecter le json de la réponse à this.articles
                    const commentsList = response;
                    this.commentsToValidate = commentsList;

                    //? Changer le format de date des propriétés date_comment de this.comments
                    if (this.commentsToValidate != '') {

                        //? Parcourir this.comments pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                        this.commentsToValidate.forEach(comment => {
                            comment.date_comment = Utils.formatDatetime(comment.date_comment);
                        })
                    }
                }) 
                
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error.message);
            }
            
        },
        formatCommentsDates() {

            //? On vérifie que le this.comments n'est pas vide
            if (this.comments != '') {

                //? Parcourir this.comments pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                this.comments.forEach(comment => {
                    comment.date_comment = Utils.formatDatetime(comment.date_comment);
                })
            }
        }
    },
});